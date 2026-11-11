"""Convert Figma REST nodes (fetched with geometry=paths) into standalone SVG.

Usage (as a module):
    conv = Converter(geo_json_path, image_map_path, project_root)
    svg, has_images = conv.export(node_id, include_text=False)

Supports: relativeTransform, fill/stroke geometry, SOLID/LINEAR/RADIAL gradients,
IMAGE fills (embedded as data URIs), node + paint opacity, masks (isMask),
clipsContent frames (incl. corner radius), blend modes (as CSS), visibility.
DROP_SHADOW effects (as an SVG feDropShadow in the node's own space).
Not supported: other effects (inner shadow, blur), text (skipped unless include_text).
"""
import base64, json, math, os, io, html

def _hex(c, a=1.0):
    return '#%02x%02x%02x' % tuple(max(0, min(255, round(c[k] * 255))) for k in 'rgb'), c.get('a', 1) * a


class Converter:
    def __init__(self, geo_path, image_map_path, root):
        data = json.load(open(geo_path))
        self.idx = {}
        for entry in data['nodes'].values():
            if entry and entry.get('document'):
                self._index(entry['document'])
        self.imgsrc = {}
        for e in json.load(open(image_map_path)):
            if e.get('figmaImageRef') and e.get('source'):
                self.imgsrc[e['figmaImageRef']] = os.path.join(root, e['source'])
        self.defs = []
        self.uid = 0
        self.has_images = False
        self.missing_images = set()

    def _index(self, n):
        self.idx[n['id']] = n
        for c in n.get('children', []):
            self._index(c)

    def _id(self, p):
        self.uid += 1
        return f'{p}{self.uid}'

    # ---------- paints ----------
    def _paint(self, p, w, h):
        """Return (fill attribute value, opacity) for a paint, adding defs when needed."""
        if p.get('visible') is False:
            return None
        op = p.get('opacity', 1)
        t = p['type']
        if t == 'SOLID':
            col, a = _hex(p['color'], op)
            return col, a
        if t in ('GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_DIAMOND', 'GRADIENT_ANGULAR'):
            hp = p['gradientHandlePositions']
            gid = self._id('g')
            stops = ''.join(
                f'<stop offset="{s["position"]:.4f}" stop-color="{_hex(s["color"])[0]}" stop-opacity="{s["color"].get("a",1):.4f}"/>'
                for s in p['gradientStops'])
            if t == 'GRADIENT_LINEAR':
                self.defs.append(
                    f'<linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="{hp[0]["x"]*w:.3f}" y1="{hp[0]["y"]*h:.3f}" '
                    f'x2="{hp[1]["x"]*w:.3f}" y2="{hp[1]["y"]*h:.3f}">{stops}</linearGradient>')
            else:
                cx, cy = hp[0]['x'] * w, hp[0]['y'] * h
                r = math.hypot((hp[1]['x'] - hp[0]['x']) * w, (hp[1]['y'] - hp[0]['y']) * h)
                self.defs.append(f'<radialGradient id="{gid}" gradientUnits="userSpaceOnUse" cx="{cx:.3f}" cy="{cy:.3f}" r="{r:.3f}">{stops}</radialGradient>')
            return f'url(#{gid})', op
        if t == 'IMAGE':
            src = self.imgsrc.get(p.get('imageRef'))
            if not src or not os.path.exists(src):
                self.missing_images.add(p.get('imageRef'))
                return None
            self.has_images = True
            uri = self._data_uri(src)
            pid = self._id('p')
            mode = p.get('scaleMode', 'FILL')
            if mode == 'STRETCH' and p.get('imageTransform'):
                # imageTransform maps node UV -> image UV. Invert to place the image in node space.
                (a, b, c), (d, e, f) = p['imageTransform']
                det = a * e - b * d
                ia, ib, id_, ie = e / det, -b / det, -d / det, a / det
                ic = -(ia * c + ib * f)
                if_ = -(id_ * c + ie * f)
                # image unit square -> node unit square, then scale to w,h
                m = f'matrix({ia*w:.6f} {id_*h:.6f} {ib*w:.6f} {ie*h:.6f} {ic*w:.4f} {if_*h:.4f})'
                self.defs.append(
                    f'<pattern id="{pid}" patternUnits="userSpaceOnUse" width="{w}" height="{h}">'
                    f'<image href="{uri}" width="1" height="1" preserveAspectRatio="none" transform="{m}"/></pattern>')
            else:
                par = {'FILL': 'xMidYMid slice', 'FIT': 'xMidYMid meet', 'STRETCH': 'none', 'TILE': 'xMidYMid slice'}.get(mode, 'xMidYMid slice')
                self.defs.append(
                    f'<pattern id="{pid}" patternUnits="userSpaceOnUse" width="{w}" height="{h}">'
                    f'<image href="{uri}" width="{w}" height="{h}" preserveAspectRatio="{par}"/></pattern>')
            return f'url(#{pid})', op
        return None

    _uri_cache = {}

    def _data_uri(self, path):
        if path in self._uri_cache:
            return self._uri_cache[path]
        from PIL import Image
        Image.MAX_IMAGE_PIXELS = None
        im = Image.open(path)
        im.thumbnail((1600, 1600))
        buf = io.BytesIO()
        fmt = 'PNG' if im.mode in ('RGBA', 'LA', 'P') else 'JPEG'
        if fmt == 'JPEG':
            im = im.convert('RGB')
        im.save(buf, fmt, quality=88)
        uri = f'data:image/{fmt.lower()};base64,' + base64.b64encode(buf.getvalue()).decode()
        self._uri_cache[path] = uri
        return uri

    # ---------- nodes ----------
    def _matrix(self, n):
        t = n.get('relativeTransform')
        if not t:
            return ''
        (a, c, e), (b, d, f) = t
        if abs(a - 1) < 1e-6 and abs(d - 1) < 1e-6 and abs(b) < 1e-6 and abs(c) < 1e-6:
            return f' transform="translate({e:.3f} {f:.3f})"' if (abs(e) > 1e-6 or abs(f) > 1e-6) else ''
        return f' transform="matrix({a:.6f} {b:.6f} {c:.6f} {d:.6f} {e:.3f} {f:.3f})"'

    def _geom(self, n, geoms, paints, w, h):
        out = []
        for p in paints or []:
            v = self._paint(p, w, h)
            if not v:
                continue
            fill, op = v
            blend = p.get('blendMode', 'NORMAL')
            style = f' style="mix-blend-mode:{blend.lower().replace("_","-")}"' if blend not in ('NORMAL', 'PASS_THROUGH') else ''
            for g in geoms or []:
                rule = 'evenodd' if g.get('windingRule') == 'EVENODD' else 'nonzero'
                out.append(f'<path d="{g["path"]}" fill="{fill}" fill-rule="{rule}"' + (f' fill-opacity="{op:.4f}"' if op < 0.9999 else '') + style + '/>')
        return ''.join(out)

    def _rect_path(self, n, w, h):
        r = n.get('cornerRadius', 0) or 0
        rr = n.get('rectangleCornerRadii')
        if rr and any(rr):
            tl, tr, br, bl = rr
            return (f'M{tl} 0H{w-tr}A{tr} {tr} 0 0 1 {w} {tr}V{h-br}A{br} {br} 0 0 1 {w-br} {h}H{bl}'
                    f'A{bl} {bl} 0 0 1 0 {h-bl}V{tl}A{tl} {tl} 0 0 1 {tl} 0Z')
        if r:
            r = min(r, w / 2, h / 2)
            return f'M{r} 0H{w-r}A{r} {r} 0 0 1 {w} {r}V{h-r}A{r} {r} 0 0 1 {w-r} {h}H{r}A{r} {r} 0 0 1 0 {h-r}V{r}A{r} {r} 0 0 1 {r} 0Z'
        return f'M0 0H{w}V{h}H0Z'

    def render(self, n, include_text=False, root=False):
        if n.get('visible') is False:
            return ''
        if n['type'] == 'TEXT' and not include_text:
            return ''
        size = n.get('size') or {}
        w, h = size.get('x', 0), size.get('y', 0)
        inner = []
        geoms = n.get('fillGeometry')
        if n['type'] in ('FRAME', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET', 'SECTION') and not geoms:
            if any(p.get('visible', True) for p in n.get('fills', []) or []):
                geoms = [{'path': self._rect_path(n, w, h), 'windingRule': 'NONZERO'}]
        inner.append(self._geom(n, geoms, n.get('fills'), w, h))
        inner.append(self._geom(n, n.get('strokeGeometry'), n.get('strokes'), w, h))

        # children, honoring masks: a mask child applies to the siblings after it
        kids = n.get('children', [])
        i = 0
        chunks = []
        while i < len(kids):
            k = kids[i]
            if k.get('isMask') and k.get('visible', True):
                mid = self._id('m')
                mtype = k.get('maskType', 'ALPHA')
                body = self.render(dict(k, isMask=False), include_text)
                if mtype != 'LUMINANCE':
                    # alpha/vector masks: shape matters, colour does not
                    body = f'<g style="filter:brightness(0) invert(1)">{body}</g>' if False else body.replace('fill="#', 'data-f="#').replace('data-f="#', 'fill="#ffffff" data-f="#')
                self.defs.append(f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-100000" y="-100000" width="200000" height="200000">{body}</mask>')
                rest = ''.join(self.render(x, include_text) for x in kids[i + 1:])
                chunks.append(f'<g mask="url(#{mid})">{rest}</g>')
                break
            chunks.append(self.render(k, include_text))
            i += 1
        children = ''.join(chunks)
        if n.get('clipsContent') and children and not root:
            cid = self._id('c')
            self.defs.append(f'<clipPath id="{cid}"><path d="{self._rect_path(n, w, h)}"/></clipPath>')
            children = f'<g clip-path="url(#{cid})">{children}</g>'
        inner.append(children)

        body = ''.join(inner)
        if not body:
            return ''
        shadows = [e for e in n.get('effects', []) or [] if e.get('type') == 'DROP_SHADOW' and e.get('visible', True)]
        if shadows:
            fid = self._id('s')
            prims = ''.join(
                f'<feDropShadow dx="{e["offset"]["x"]:.2f}" dy="{e["offset"]["y"]:.2f}" stdDeviation="{e.get("radius", 0) / 2:.2f}" '
                f'flood-color="{_hex(e["color"])[0]}" flood-opacity="{e["color"].get("a", 1):.3f}"/>'
                for e in shadows)
            self.defs.append(f'<filter id="{fid}" x="-20%" y="-20%" width="140%" height="140%">{prims}</filter>')
            body = f'<g filter="url(#{fid})">{body}</g>'
        op = n.get('opacity', 1)
        attrs = '' if root else self._matrix(n)
        if op < 0.9999:
            attrs += f' opacity="{op:.4f}"'
        bm = n.get('blendMode', 'PASS_THROUGH')
        if bm not in ('PASS_THROUGH', 'NORMAL'):
            attrs += f' style="mix-blend-mode:{bm.lower().replace("_","-")}"'
        return f'<g{attrs}>{body}</g>'

    def export(self, node_id, include_text=False, pad=0):
        """pad: extra px around the node so overhanging children are not cut off.
        The node's own top-left stays at (pad, pad) in the output."""
        n = self.idx[node_id]
        self.defs, self.has_images, self.missing_images = [], False, set()
        w, h = n['size']['x'], n['size']['y']
        body = self.render(n, include_text, root=True)
        W, H = w + 2 * pad, h + 2 * pad
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.2f}" height="{H:.2f}" viewBox="{-pad} {-pad} {W:.3f} {H:.3f}" fill="none">'
               f'<defs>{"".join(self.defs)}</defs>{body}</svg>')
        return svg, self.has_images

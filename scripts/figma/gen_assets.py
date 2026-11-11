"""Generate SVG / raster assets from Figma geometry.

python gen_assets.py <scratchpad> <project> <jobs.json>
jobs.json: [{"id": "...", "name": "products/row-sunorange", "kind": "raster"|"svg", "pad": 0,
             "hide": ["child id", ...], "opaque": true}]
- svg    -> <project>/_incoming/figma-svg/generated/<name>.svg
- raster -> <project>/_incoming/figma-composites/generated/<name>.svg (+ .png made by rasterize.mjs)
            and an entry in scripts/image-map.json
Also writes <scratchpad>/gen/labels-<safe name>.json with the text nodes inside each export
(position relative to the node's top-left, style, content) so text can be overlaid as live HTML.
"""
import json, os, sys

SP, P, JOBS = sys.argv[1], sys.argv[2], sys.argv[3]
sys.path.insert(0, SP)
from figma2svg import Converter

conv = Converter(f'{SP}/api/geo.json', f'{P}/scripts/image-map.json', P)
jobs = json.load(open(JOBS))
imap_path = f'{P}/scripts/image-map.json'
imap = json.load(open(imap_path))
by_name = {e.get('name'): e for e in imap}


def texts(n, ox, oy, out):
    if n.get('visible') is False:
        return
    if n['type'] == 'TEXT':
        b = n['absoluteBoundingBox']
        st = n.get('style', {})
        fills = [p for p in n.get('fills', []) if p.get('type') == 'SOLID' and p.get('visible', True)]
        col = fills[0]['color'] if fills else None
        out.append({
            'text': n['characters'], 'x': round(b['x'] - ox, 1), 'y': round(b['y'] - oy, 1),
            'w': round(b['width'], 1), 'h': round(b['height'], 1),
            'font': st.get('fontFamily'), 'weight': st.get('fontWeight'), 'size': st.get('fontSize'),
            'lineHeight': round(st.get('lineHeightPx', 0), 1), 'align': st.get('textAlignHorizontal'),
            'color': '#%02X%02X%02X' % tuple(round(col[k] * 255) for k in 'rgb') if col else None,
        })
    for c in n.get('children', []):
        texts(c, ox, oy, out)


for job in jobs:
    node = conv.idx.get(job['id'])
    if not node:
        print('MISSING NODE', job['id'], job['name'])
        continue
    pad = job.get('pad', 0)
    # "hide": child ids to leave out (e.g. cards drawn as live HTML).
    # "opaque": true resets opacity 0 (scroll-animation start states in Figma) to 1.
    for hid in job.get('hide', []):
        if hid in conv.idx:
            conv.idx[hid]['visible'] = False
    if job.get('opaque'):
        def _opaque(n):
            if n.get('opacity', 1) < 0.001:
                n['opacity'] = 1
            for c in n.get('children', []):
                _opaque(c)
        _opaque(node)
    svg, has_img = conv.export(job['id'], pad=pad)
    kind = job.get('kind', 'svg')
    if kind == 'svg' and has_img:
        print('NOTE', job['name'], 'contains images -> exporting as raster')
        kind = 'raster'
    if kind == 'svg':
        out = f'{P}/_incoming/figma-svg/generated/{job["name"]}.svg'
    else:
        out = f'{P}/_incoming/figma-composites/generated/{job["name"]}.svg'
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w').write(svg)
    w, h = node['size']['x'] + 2 * pad, node['size']['y'] + 2 * pad
    if kind == 'raster':
        name = 'generated/' + job['name']
        entry = {'source': os.path.relpath(out, P)[:-4] + '.png', 'name': name,
                 'displayMaxPx': [round(w), round(h)], 'figmaImageRef': None, 'skipReason': None,
                 'note': f'Rendered from Figma geometry (node {job["id"]}, pad {pad})'}
        if name in by_name:
            by_name[name].update(entry)
        else:
            imap.append(entry)
            by_name[name] = entry
    labels = []
    nb = node['absoluteBoundingBox']
    texts(node, nb['x'] - pad, nb['y'] - pad, labels)
    if labels:
        os.makedirs(f'{SP}/gen', exist_ok=True)
        json.dump(labels, open(f'{SP}/gen/labels-{job["name"].replace("/", "__")}.json', 'w'), ensure_ascii=False, indent=1)
    print(kind.upper().ljust(6), job['name'], f'{round(w)}x{round(h)}', f'{len(svg)//1024}KB', f'{len(labels)} labels', 'missing-img' if conv.missing_images else '')

json.dump(imap, open(imap_path, 'w'), ensure_ascii=False, indent=1)

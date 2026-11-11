import json, sys
def load(p):
    d = json.load(open(p)); idx = {}
    def walk(n, parent=None):
        n['_parent'] = parent['id'] if parent else None
        idx[n['id']] = n
        for c in n.get('children', []): walk(c, n)
    walk(d['document']); return d, idx
def hx(c, op=1):
    s = '#%02X%02X%02X' % tuple(round(c[k]*255) for k in 'rgb')
    a = c.get('a',1)*op
    return s + (f'@{a:.2f}' if a < 0.999 else '')
def paints(ps):
    out=[]
    for p in ps or []:
        if p.get('visible') is False: continue
        if p['type']=='SOLID': out.append(hx(p['color'], p.get('opacity',1)))
        elif p['type']=='IMAGE': out.append('IMAGE')
        else: out.append(p['type']+':'+'>'.join(hx(s['color']) for s in p.get('gradientStops',[])))
    return ','.join(out)
def spec(n):
    a=[f"{n['type']} \"{n['name']}\""]
    bb=n.get('absoluteBoundingBox')
    if bb: a.append(f"{round(bb['width'])}x{round(bb['height'])}")
    if n.get('layoutMode'): a.append(f"AL:{n['layoutMode']} gap{n.get('itemSpacing',0)} pad {n.get('paddingTop',0)}/{n.get('paddingRight',0)}/{n.get('paddingBottom',0)}/{n.get('paddingLeft',0)}")
    if n.get('cornerRadius'): a.append(f"r{n['cornerRadius']}")
    if n.get('rectangleCornerRadii'): a.append('r'+'/'.join(str(x) for x in n['rectangleCornerRadii']))
    f=paints(n.get('fills')); 
    if f: a.append('fill '+f)
    s=paints(n.get('strokes'))
    if s: a.append(f"stroke {s} w{n.get('strokeWeight')}")
    fx=[e for e in n.get('effects',[]) if e.get('visible',True)]
    if fx: a.append('fx '+';'.join(f"{e['type']} {e.get('offset',{}).get('x')},{e.get('offset',{}).get('y')} b{e.get('radius')} {hx(e['color']) if 'color' in e else ''}" for e in fx))
    if n.get('opacity',1)<1: a.append(f"op{n['opacity']:.2f}")
    if n['type']=='TEXT':
        st=n.get('style',{})
        a.append(f"\"{n.get('characters','')[:30]}\" {st.get('fontFamily')} {st.get('fontWeight')} {st.get('fontSize')}/{round(st.get('lineHeightPx',0),1)} ls{st.get('letterSpacing',0)} {st.get('textCase','')}")
    if n.get('layoutGrids'): a.append('GRIDS '+json.dumps(n['layoutGrids']))
    if n.get('visible') is False: a.append('HIDDEN')
    return ' | '.join(a)
def dump(idx, nid, maxd=3, maxk=12, out=None):
    out = out if out is not None else []
    def rec(n,d):
        out.append('  '*d+spec(n))
        if d<maxd:
            for c in n.get('children',[])[:maxk]: rec(c,d+1)
    rec(idx[nid],0); return out

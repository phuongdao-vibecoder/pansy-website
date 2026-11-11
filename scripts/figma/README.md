# Figma → SVG tools

Used when Figma's image-render API is unavailable (rate limited). They rebuild
illustrations from the vector geometry returned by
`GET /v1/files/:key/nodes?ids=…&geometry=paths`.

| File | Purpose |
|---|---|
| `figma2svg.py` | Converter: Figma node JSON → standalone SVG (transforms, fills, strokes, gradients, image fills, masks, clipping, opacity). Photos are embedded as data URIs. |
| `gen_assets.py` | Runs a jobs file. Pure vectors → `_incoming/figma-svg/generated/`. Illustrations with photos → `_incoming/figma-composites/generated/` (+ an entry in `scripts/image-map.json`). Also dumps text-label positions so text can be overlaid as live HTML. |
| `figlib.py` | Small helpers for reading the Figma file JSON. |
| `jobs-*.json` | The exports used so far (Sản phẩm, product detail, About, Thực đơn/Công thức, Liên hệ). Job options: `pad` (px around the node), `kind` (`svg`/`raster`), `hide` (child ids to leave out, e.g. cards drawn as HTML), `opaque` (render layers Figma stores at 0 % opacity, the scroll-animation start state, at 100 %). |

Inputs (git-ignored): `_incoming/figma-api/geo.json` (nodes with geometry) and `file.json` (whole file).

```bash
python3 -m venv .venv && .venv/bin/pip install pillow
.venv/bin/python scripts/figma/gen_assets.py scripts/figma _incoming/figma-api . scripts/figma/jobs-products.json  # see note
node scripts/rasterize-composites.mjs   # SVG with photos -> 2x PNG
npm run images                          # -> public/images + public/svg
```
Note: the export ignores the node's own rotation/mirroring (e.g. a "previous" arrow that is the "next" arrow turned 180°); apply it in CSS.

Note: `gen_assets.py` currently expects the scratchpad layout `<dir>/api/geo.json`; point its first argument at a folder that contains `api/geo.json` (e.g. copy `_incoming/figma-api` to `<dir>/api`).

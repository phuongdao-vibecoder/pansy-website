# Pansy — Frontend Demo

A frontend-only demo of the Pansy melon website, built from the Figma file
[Pansy (Final)](https://www.figma.com/design/g4PojEPpLpLAD76MMVJ3F1/Pansy--Final-).
There is no backend, database or admin portal.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. The internal token preview is at http://localhost:3000/design-system.

Other scripts: `npm run build` (production build), `npm run lint`,
`npm run images` (rebuilds `public/images` + `public/svg` from the raw Figma exports in `_incoming/`; only needed when assets change).

## Images
Use the generated index with `next/image`:
```tsx
import Image from "next/image";
import { img } from "@/content/images";

<Image {...img("shared/product-sunorange")} alt="Dưa lưới SunOrange" sizes="25vw" />
```
SVGs (logos, mascots, icons, decorations) are in `public/svg/` and are used as `<img src="/svg/...">`.

## Stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · `next/font` (Nunito from Google Fonts, October Compressed H+L Heavy stored locally).

## Project docs
| File | Contents |
|---|---|
| [PROJECT_PLAN.md](PROJECT_PLAN.md) | Scope, decisions, phases |
| [SITEMAP.md](SITEMAP.md) | Pages, routes, Figma frame IDs, section order |
| [DESIGN_SPEC.md](DESIGN_SPEC.md) | Colors, type, spacing, component specs |
| [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md) | Figma components mapped to code |
| [ASSET_INVENTORY.md](ASSET_INVENTORY.md) | Images, SVGs, fonts |

## Folder structure
```
src/
  app/
    (site)/            all public pages (Vietnamese routes)
    design-system/     internal token preview
    fonts/             October Compressed H+L Heavy (commercial — do not redistribute)
    fonts.ts           next/font setup
    globals.css        design tokens (@theme) and base styles
  components/
    ui/                primitives (Button…)
    motion/            Reveal (scroll fade-in + slide-up)
    layout/            header, footer, page shells
    sections/          page sections (added from Phase 3)
  content/             typed content data (products, recipes, nav)
  lib/                 small helpers
_incoming/             raw Figma exports + source fonts (git-ignored)
docs/figma-snapshots/  reference screenshots
```

## Design tokens
All tokens come from the Figma variables and styles, and are defined in `src/app/globals.css`.
Tailwind's default colors, text sizes, radii and shadows are cleared, so only Pansy values exist:
- Colors: `sunorange-*`, `sunhoney-*`, `sunyellow-*`, `green-*`, `yellow-*`, `grey-*`, `cream`, `honey-card`, plus aliases `brand`, `ink`, `eyebrow`
- Text: `text-display`, `text-h1`…`text-h5`, `text-ot-subheading`, `text-ot-title`, `text-ot-small`, `text-body-lg`, `text-body`, `text-subtitle`, `text-caption`, `text-footnote`
- Fonts: `font-sans` (Nunito), `font-display` (October Compressed H+L Heavy; wrap text in `DisplayText`)
- Radius: `rounded-xs` 8 · `sm` 16 · `md` 20 · `lg` 24 · `xl` 32 · `full`
- Shadows: `shadow-hard-sm|md|lg` (hard offset, no blur)
- Layout: `container-site` (1128 + gutters), `container-narrow` (744), `section-gap`

## Font license
October Compressed H+L Heavy is a commercial Typotheque font. Keep the repository private and
confirm the web license before any public deployment.

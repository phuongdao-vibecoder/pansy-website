# CLAUDE.md — Pansy Website Demo

@AGENTS.md

Start every session by reading **HANDOFF.md** (current state and the next step), then **PROJECT_PLAN.md** (decisions and deviations).

## Project
Frontend-only demo of the Pansy melon website, built from Figma `Pansy (Final)` (file key `g4PojEPpLpLAD76MMVJ3F1`). It is a learning project before the real site and an Admin Portal.
**Out of scope:** backend, database, admin portal, real form submission, authentication, e-commerce. Do not add them.

## Commands
- `npm run dev` — dev server on :3000 (launch config `pansy-dev` in `.claude/launch.json`)
- `npx tsc --noEmit && npm run lint && npm run build` — run all three before calling work done
- `npm run images` — rebuild `public/images` + `public/svg` and `src/content/images.ts` from `_incoming/` (only when assets change)
- `node scripts/rasterize-composites.mjs` — 2× PNGs for generated SVGs that contain photos (then `npm run images`)
- If `PageProps`/`LayoutProps` types are missing: `npx next typegen`

## Rules
1. **Follow Figma; don't invent.** Text, colors, sizes and positions come from Figma. Anything not in Figma (tablet layout, validation, motion timing…) is a decision: log it in `PROJECT_PLAN.md` under the phase's notes.
2. **Use the design tokens** in `src/app/globals.css` (Tailwind's default palette, type scale, radii and shadows are disabled). Colors: `sunorange-*`, `sunhoney-*`, `sunyellow-*`, `green-*`, `yellow-*`, `grey-*`, `cream`, `brand`, `ink`, `eyebrow`. Layout: `container-site`, `container-narrow`, `section-gap`.
3. **Content lives in `src/content/*.ts`**, not hard-coded in components (except short fixed labels). Vietnamese text exactly as in Figma.
4. **Images:** `next/image` with `{...img("key")}` from `@/content/images`. Never edit `src/content/images.ts` by hand (it is generated). Add new rasters through `scripts/image-map.json` and `npm run images`. SVGs go in `_incoming/figma-svg/…` and are copied to `public/svg/` by the same script.
5. **Next.js 16 with Cache Components:** read the bundled docs in `node_modules/next/dist/docs/` before using unfamiliar APIs. Dynamic routes use `generateStaticParams` and read `params` **inside `<Suspense>`**. Do not use `usePathname`/`useSearchParams` in shared layout components (that breaks prerendering).
6. **Responsive:** design at 1440 (desktop) and 375 (mobile); tablet 768–1023 is derived (mobile header, simplified grids). Check every page at 1440, 768 and 375 with no horizontal scroll.
7. **Reuse before creating:** `Button`, `Carousel`, `Marquee`, `Reveal`, `PageBanner`, `MelonSection`/`MelonBand`, `Occasions` (`heading`/`items`/`tone`), `Testimonials` (`tone`), `RecipeCarousel` (`tone`), `WhereToBuy`, `RetailerStrip`, `FeatureTiles`. Wrap each page section in `Reveal`.
8. **Accessibility:** real headings, `alt` text (empty for decoration), keyboard support for interactive widgets, reduced motion respected (already in `globals.css`).
9. **Figma access:** MCP calls are used up (Starter View seat, 20/month). REST token is in `~/.figma_token` (never print it). The image-render endpoint is rate-limited until about 2026-11-14. Use the local dumps in `_incoming/figma-api/` (`file.json` = whole file, `geo.json` = vector geometry for all remaining pages) and the converter in `scripts/figma/`.
10. **Licensing:** the display font (October Compressed H+L Heavy, Typotheque) is a commercial font; its web licence is unconfirmed. Text in it must go through `DisplayText` (no Vietnamese glyphs). Keep the repo private; don't publish or deploy publicly until the web license is confirmed.
11. **Git:** local repository on branch `main` (set up 2026-11-11, author "Pansy Team", no remote). Commit, push or add a remote only when the user asks. The display-font WOFF2 in `src/app/fonts/` is git-ignored on purpose (licence unconfirmed); never commit it.
12. **Verification in the browser pane:** the hidden pane paints no frames. Scroll animations and smooth scrolling won't run there, and it may show a hydration warning about `loading` attributes; verify those against the server HTML instead.

## Where things are
- Docs: `HANDOFF.md`, `PROJECT_PLAN.md`, `DESIGN_SPEC.md` (specs), `SITEMAP.md` (pages, Figma frame IDs, section order), `ASSET_INVENTORY.md`, `COMPONENT_INVENTORY.md`
- Routes: `src/app/(site)/…` (standard footer with contact form), `src/app/(contact)/lien-he` (footer slot for the FAQ)
- Raw design inputs (git-ignored): `_incoming/`

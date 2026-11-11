# HANDOFF — Pansy Website Demo

> Last updated: **2026-11-11** (session 2: Phases 7–14: About, Thực đơn + Công thức, Liên hệ, QA, brand assets, responsive pass, display font, Nunito demo, **final pre-deployment QA**). Read this file first, then `CLAUDE.md` and `PROJECT_PLAN.md`.

## 0. TL;DR
- Frontend-only demo of the Pansy melon website, built from Figma `Pansy (Final)` (`g4PojEPpLpLAD76MMVJ3F1`).
- Stack: **Next.js 16.4.5 (App Router, Cache Components) + TypeScript + Tailwind CSS v4**, static pages, no backend.
- **Done:** setup, assets, global shell (header, footer, contact form), **Home** (approved by the user), **Sản phẩm** and the **product detail template** (SunOrange, SunYellow, SunHoney), **About (`/ve-pansy`)** (approved), **Thực đơn (`/thuc-don`) + Công thức (`/thuc-don/[slug]`)** (approved), **Liên hệ (`/lien-he`)** (approved), **Phase 10 QA** (tablet, accessibility, performance, animations). Every designed page is built and checked.
- **Final QA done (Phase 14, 2026-11-11):** all routes, links, widgets and forms checked; 15 pages × 8 widths clean; tsc, lint, build pass; 4 small fixes. Report: PROJECT_PLAN "Phase 14 notes" and §5a below.
- **Next step:** your review of the QA report, then deployment (only with your approval). See §7.
- Run it: `npm run dev` → http://localhost:3000 (token preview: `/design-system`).

> **Temporary UX/UI demo (2026-11-11): display headings are set in Nunito ExtraBold 800, not October Compressed H+L Heavy.** Done by pointing `--font-display` at Nunito in `src/app/globals.css` (plus a `.font-display { font-weight: 800 }` rule) and removing `october.variable` from `<html>` in `src/app/layout.tsx` and commenting out the October declaration in `src/app/fonts.ts` (2026-11-11, so the font file is not in the build at all). Because Nunito is wider, two desktop heroes were adjusted: home title 56/68 (was 72/90) and product title 84/96 (was 100/110) with the product slogan capped at 527 px; each change is marked "Nunito demo" in the code. Headings show **full Vietnamese with accents** in the demo (your decision 2026-11-11): `STRIP_ACCENTS = false` in `src/components/ui/DisplayText.tsx` (the unaccented rule and `toLatin()` are kept, just switched off). **To restore Heavy:** swap the two `--font-display` lines in `globals.css`, delete the `.font-display` weight rule, add `october.variable` back in `layout.tsx`, uncomment the October block (and its `localFont` import) in `fonts.ts`, set `STRIP_ACCENTS = true` in `DisplayText.tsx`, and undo the three "Nunito demo" size tweaks.

**Display font status (confirmed by Pansy 2026-11-11):**
- **Current display font:** October Compressed H+L Heavy (weight 850), file `src/app/fonts/OctoberCompressedHL-Heavy.woff2`. Implementation and the heading rule (`DisplayText`: unaccented Vietnamese on screen, full Vietnamese for screen readers) stay as they are.
- **Files match:** the supplied TTF and the site WOFF2 are the same font (all tables identical except checksum and the WOFF2 flag).
- **No OnlineWebFonts attribution:** kept out of the footer by Pansy's decision, because the specific licensing terms for this font remain unverified (the CC BY 4.0 notice is not shown to apply to a Typotheque font).
- **Public deployment pending:** no public deploy or distribution with this font until the licence (Typotheque web embedding / commercial use) is confirmed.

## 1. Completed tasks
| Phase | Result |
|---|---|
| Analysis | Figma analysed via MCP, then the REST API. Docs written: `PROJECT_PLAN.md`, `DESIGN_SPEC.md`, `SITEMAP.md`, `ASSET_INVENTORY.md`, `COMPONENT_INVENTORY.md` |
| Decisions (user) | Home reference frame `2384:22325` · Next.js + Tailwind · user supplied the October font · Figma REST token · "Coming soon" pages for undesigned links · Vietnamese slugs · repeat sample recipe data · contact form shows the success popup |
| 1. Setup | Next.js project, design tokens in `globals.css`, fonts, route stubs, `/design-system` |
| 2. Assets | 135 original images → WebP (317 MB → ~10 MB), 61+ SVGs, typed index `src/content/images.ts`, `npm run images` |
| 3. Global shell | `SiteHeader` (dropdown and mobile menu), `SiteFooter` (melon shape), `ContactSection` + `ContactForm` + success dialog, `Marquee` |
| 4–5. Home | All sections built and checked at 1440/768/375; **approved by the user** |
| 6. Products | `/san-pham` and `/san-pham/[slug]` (3 products) built and checked at 1440/375 |
| 7. About | `/ve-pansy`: hero, giới thiệu, giá trị cốt lõi, orange box (map, stats, certifications), trải nghiệm, tầm nhìn + 10-step timeline + hoạt động sản xuất, where to buy, slogan band. Checked at 1440/1024/768/375; tsc, lint, build pass. **Approved** |
| 8. Menu + recipe | `/thuc-don` (tabs, featured card, grid, pagination, TikTok carousel, mobile "Xem thêm") and `/thuc-don/[slug]` (video cover, stats, ingredients, steps, reactions, tags, comments with local add, related). Checked at 1440/768/375. Also fixed the swapped carousel arrows site-wide. **Approved** |
| 9. Contact | `/lien-he`: yellow patterned block (title, form + success popup, photo collage, details) and the FAQ accordion in the `(contact)` footer slot. Checked at 1440/1024/768/375. **Approved** |
| 10. QA | Tablet cap (704 px content at 768–1023), testimonial text bug fixed, axe clean except contrast, mobile-menu focus handling, reduced-motion fixes (marquee, carousel), lazy decorative images, art-directed contact collage, svgo in `npm run images` (SVGs 3.2 → 2.4 MB). Lighthouse mobile performance 82–95, CLS 0. Details: PROJECT_PLAN "Phase 10 notes" |
| 12. Display font | Switched to October Compressed H+L Heavy with Latin spelling in display text (`DisplayText`, `src/lib/latin.ts`); fixed product-detail and About boxes overflowing at 1024–1299. Details: PROJECT_PLAN "Phase 12 notes" |
| 11. Brand + responsive | Official Facebook/TikTok links (new tab, `noopener noreferrer`; Instagram/Zalo removed), exact Figma brand colours restored on buttons and cards, OnlineWebFonts font download reviewed and rejected, overflow fixed at 1024–1299 and on phones (SunHoney label), ≥ 24 px tap targets, scan at 8+ widths. Details: PROJECT_PLAN "Phase 11 notes" |
| 14. Final QA | Full audit and QA before deployment. Fixed: form data in the URL when submitted before hydration (contact + comment forms), partner logos squashed at 320, home intro photo stretched 4.5 %, tap targets under 24 px (carousel dots, menu arrows, back link, mobile-menu links). Details: PROJECT_PLAN "Phase 14 notes" |
| Tooling | Figma → SVG converter (`scripts/figma/`), built because the Figma render API is rate-limited |

## 2. Files created or modified
**Docs:** `HANDOFF.md` (this file), `CLAUDE.md`, `PROJECT_PLAN.md`, `DESIGN_SPEC.md`, `SITEMAP.md`, `ASSET_INVENTORY.md`, `COMPONENT_INVENTORY.md`, `README.md`, `docs/figma-snapshots/*.png`
**Config:** `package.json` (+ `images` script, `svgo` dev dependency), `next.config.ts` (images: AVIF/WebP, qualities, localPatterns), `.gitignore` (+ `/_incoming/`), `.claude/launch.json` (dev server `pansy-dev`, production server `pansy-prod` on :3001), `tsconfig.json`, `eslint.config.mjs`, `AGENTS.md` (Next.js generated, keep)
**Scripts:** `scripts/optimize-images.mjs`, `scripts/rasterize-composites.mjs`, `scripts/image-map.json`, `scripts/figma/{figma2svg.py, gen_assets.py, figlib.py, jobs-*.json (incl. jobs-about.json), README.md}`; Python venv with Pillow in `.venv/` (git-ignored)
**App (`src/app`):** `layout.tsx`, `fonts.ts`, `fonts/OctoberCompressedHL-Heavy.woff2`, `globals.css`, `not-found.tsx`, `design-system/page.tsx`, `(site)/layout.tsx`, `(site)/page.tsx` (Home), `(site)/san-pham/page.tsx`, `(site)/san-pham/[slug]/page.tsx`, `(site)/ve-pansy/page.tsx` (About), `(site)/thuc-don/page.tsx`, `(site)/thuc-don/[slug]/page.tsx`, `(site)/trang-trai|he-thong-phan-phoi|diem-ban|tin-tuc|tin-tuc/[slug]/page.tsx` (Coming soon), `(contact)/layout.tsx`, `(contact)/lien-he/page.tsx`
**Components (`src/components`):** `icons.tsx`; `ui/{Button,Carousel,Marquee}.tsx`; `motion/Reveal.tsx`; `forms/ContactForm.tsx`; `layout/{SiteHeader,SiteFooter,ComingSoon}.tsx`; `sections/{ContactSection,FeatureTiles,Occasions,PageBanner,ProductLines,RecipeCarousel,Testimonials,WhereToBuy}.tsx`; `sections/home/{HomeHero,HomeIntro,SocialFeed}.tsx`; `sections/products/{Differences,GrowingProcess,ProductComparison,ProductShowcase,RetailerStrip}.tsx`; `sections/detail/{ProductDetailSections,SpecTabs}.tsx`; `sections/about/{AboutHero,AboutIntro (+CoreValues),RegionStrengths,Experiences,HistoryTimeline}.tsx`; `sections/menu/{RecipeCard,MenuCollection,VideoSection}.tsx`; `sections/recipe/{RecipeArticle,CommentSection,RelatedRecipes}.tsx`; `sections/contact/{ContactHero,FaqSection}.tsx`
**Content (`src/content`):** `site.ts`, `home.ts`, `products.ts`, `productDetails.ts`, `about.ts`, `menu.ts`, `contact.ts`, `recipes.ts`, `images.ts` (**generated**, do not edit)
**Lib:** `src/lib/cn.ts`, `src/lib/latin.ts`, `src/lib/blockNativeSubmit.ts` (no-op form action, Phase 14)
**Assets:** `public/images/**` (147 WebP), `public/svg/**` (101 SVG, incl. `svg/generated/`)
**Raw inputs (git-ignored, `_incoming/`):** `fonts/` (OTF + WOFF2), `figma-images/` (originals), `figma-svg/` (SVG exports + `generated/`), `figma-composites/` (2× renders), `figma-api/{file.json,geo.json}` (Figma REST dumps, 124 MB), `asset-manifest.json`

## 3. Architecture
```
src/app/
  layout.tsx              root: <html lang="vi">, fonts, metadata (noindex), "js" class script
  (site)/layout.tsx       SiteHeader + page + SiteFooter(ContactSection)
  (contact)/layout.tsx    SiteHeader + page + SiteFooter() (card slot left for the FAQ)
  (site)/…pages           Home, products, placeholders, Coming soon
src/components/
  ui/       Button (Figma Pansy-Button), Carousel (scroll-snap + flower arrows + dots), Marquee
  layout/   SiteHeader (client), SiteFooter (+ MelonTop, MelonSection, MelonBand), ComingSoon
  sections/ page sections; shared ones at the top level, page-specific in home/, products/, detail/
  motion/   Reveal (fade + slide up on scroll, IntersectionObserver)
src/content/  typed content (all text copied from Figma); images.ts = generated image index
```
Key patterns:
- **Images:** `<Image {...img("key")} …>` from `@/content/images`. SVGs are plain `<img src="/svg/…">`.
- **Orange melon backgrounds:** `MelonSection` (flows into the footer; the footer hides its own stem through a `body:has([data-melon-continues])` CSS rule) and `MelonBand` (closed shape with a curved bottom).
- **Tone props:** `Occasions`/`Testimonials` take `tone="orange"`; `RecipeCarousel` takes `tone="cream"`; `Occasions` also takes `heading` and `items` (reused for "Pansy tại điểm bán").
- **Dynamic routes:** `generateStaticParams` + read `params` **inside `<Suspense>`** (Cache Components "instant navigation" rule). The header must **not** use `usePathname` (that breaks prerendering).
- **Illustrations with text:** a generated picture plus live HTML labels positioned in % from Figma coordinates (`ProductShowcase`, `Differences`).

## 4. Confirmed design specs and assets (details in `DESIGN_SPEC.md`)
- **Grid:** desktop frame 1440, container **1128** (12 × 72, gutter 24), narrow column 744; mobile 375, content 343 (4 columns, 16 margin). Full-bleed backgrounds are drawn at 1920.
- **Section gap:** 200 desktop / 160 tablet / 120 mobile (`section-gap` utility).
- **Colors** (Tailwind tokens): `sunorange-*` (500 `#F37326` brand), `sunhoney-*` (500 `#F05D24`), `sunyellow-*` (500 `#ED4823`), `green-*` (500 `#00AB4E`, 700 `#00803B` eyebrow, 950 `#004D23` ink), `yellow-*` (500 `#F8EC23`), `grey-*`, `cream #FFEED7`, `sunorange-bg #FFF4E0`, `honey-card #FBB040`.
- **Type:** Nunito 600/700/800 (body and headings), October Compressed H+L Heavy 850 (display, WOFF2 in `src/app/fonts/`, shown in Latin spelling via `DisplayText`). Tokens: `text-display|h1…h5|ot-subheading|ot-title|ot-small|body-lg|body|subtitle|caption|footnote`.
- **Radius:** xs 8 · sm 16 · md 20 · lg 24 · xl 32 · full. **Shadows:** `shadow-hard-sm|md|lg` (hard offset, no blur).
- **Buttons:** Green/Orange/Yellow/White × sm 34 / md 38 / lg 48 (pill); Ghost/Outline small only.
- **Motion:** every section fades in and slides up on scroll (Figma note); timing 600 ms is our choice.
- **Assets:** see `ASSET_INVENTORY.md`. Three Figma images are designer placeholders (left out). The pink "ÆON" logo is left out.

## 5. Unresolved issues and risks
| # | Issue | Notes |
|---|---|---|
| 1 | **Figma image-render API rate-limited** until about **2026-11-14** (`Retry-After` 397,414 s from 2026-11-09) | Use `_incoming/figma-api/geo.json` + `scripts/figma/` to render art from vectors; it already contains the About, Thực đơn, Công thức and Liên hệ frames. MCP calls are also used up (20/month, View seat) |
| 2 | **Font license** | October Compressed L (Typotheque) is commercial. Confirm the web license before any public deploy; keep the repo private |
| 3 | Product pages were not compared against fresh Figma renders | Built from Figma data (positions, colors, text); worth a visual review by the user |
| 4 | Only Chrome tested (headless, via puppeteer-core and Lighthouse) | Safari 18.6 is installed (automation needs Develop → Allow Remote Automation + `safaridriver --enable`); Firefox and Edge are not installed; real phones untested. For phone screenshots use puppeteer `setViewport` (headless `--window-size` has a minimum width and gives false clipping at 320/375). The hidden pane paints no frames: for visual checks use headless Chrome screenshots with `--force-prefers-reduced-motion` (otherwise unrevealed sections come out blank) |
| 5 | Social section on mobile shows the 10-video grid image | Figma has a one-video carousel, but the thumbnails exist only as one flattened image |
| 6 | Instagram and Zalo removed (no URLs) | Icons and files deleted 2026-11-10; re-export from Figma if ever needed |
| 7 | Figma token stored in `~/.figma_token` | Delete it and revoke in Figma when the project no longer needs it |
| 8 | `scripts/figma/gen_assets.py` expects `<dir>/api/geo.json` | Small path quirk; see `scripts/figma/README.md` |
| 9 | Git: local only | Repository on `main` since 2026-11-11 (author "Pansy Team"), no remote. `src/app/fonts/*.woff2` is git-ignored (font licence unconfirmed); restoring the font on a fresh clone needs the file from `_incoming/fonts/`. Ask before commits, remotes or pushes |
| 10 | Dev console shows a hydration warning in the browser pane | Caused by the pane changing `loading` attributes, not by app code (server HTML verified) |

## 5a. Deployment readiness (2026-11-11)
| Area | Status |
|---|---|
| Build | ✅ `npx tsc --noEmit`, `npm run lint`, `npm run build` pass; 24 routes prerendered (static / partial prerender); no backend, env vars or secrets needed |
| Links, images, forms, widgets | ✅ verified in Chrome (production build) |
| Responsive 320–1920 | ✅ automated scan in Chrome, no issues |
| Accessibility | ✅ axe clean except colour contrast (accepted brand-colour gap) |
| Other browsers / real devices | ⚠️ not tested (Safari, Firefox, Edge, iOS, Android, iPad) |
| Display font licence | ✅ **Resolved for the demo build (2026-11-11, your decision):** the October declaration in `src/app/fonts.ts` is commented out, so the production build no longer contains or serves the font (`.next/static/media` holds only Nunito; the old font URL returns 404). The WOFF2 and licence files stay in the repo / `_incoming/`. The Typotheque licence is still needed before restoring the font on a public site |
| Search engines | Site is `noindex` (demo) |
| Git / hosting | ✅ Local git repository with the initial commit (2026-11-11). ⏳ No remote and no deployment yet; both need your approval |

## 6. Pending tasks (in order)
1. **Display font (done, verified 2026-11-11):** October Compressed H+L Heavy. Web file `src/app/fonts/OctoberCompressedHL-Heavy.woff2` (WOFF2, 34 KB). Verified 2026-11-11 against the supplied TTF (`c020adb2187fcfabcfc64f60feee1d8e.ttf`, 159 KB): same family, style, version 1.0, weight 850, metrics, 439 glyph outlines and advance widths, kerning and every other table; the only differences are the checksum and the WOFF2 "lossless transform" flag, so no reconversion was needed. Originals (TTF, WOFF, WOFF2, EOT, SVG, `License.txt`) are kept unchanged in the Downloads folder and copied to `_incoming/fonts/October Compressed H+L Heavy (OnlineWebFonts)/`. **Heading text rule:** every text in this font goes through `<DisplayText>` (`src/components/ui/DisplayText.tsx`, `toLatin()` in `src/lib/latin.ts`): shown without diacritics ("Dưa lưới" → "Dua luoi"), with the original Vietnamese in an sr-only copy. Body text, buttons, navigation, SEO metadata, alt and accessibility text keep full Vietnamese spelling.
2. **Font licence and attribution** (user): **Licence (unconfirmed):** no supplied document grants commercial use or web embedding of this Typotheque font. Local demo only: do not deploy publicly or distribute the font until Typotheque confirms web rights (web licence for the domain and expected pageviews), or a free alternative is chosen. **Attribution:** the OnlineWebFonts credit line ("Fonts made from Web Fonts is licensed by CC BY 4.0") was **not added** to the footer. The rule was to add it only if CC BY 4.0 applies to this font, and the documents do not show that: the font itself states "Copyright (c) 2017 Typotheque.com All rights reserved" with a link to the Typotheque EULA, while the CC BY line is OnlineWebFonts' generic site notice (OnlineWebFonts is not the copyright holder, and its own notice says some fonts are trials that may need a commercial licence for embedding). Showing the line would state a licence the documents do not support. It can be added in minutes if Pansy decides otherwise.
3. **Manual browser/device checks:** Safari (macOS, iOS), Firefox, Edge, an Android phone, an iPad. Automated checks covered Chrome only.
4. Decided and done: exact Figma brand colours (known WCAG AA gap on white-on-orange/green), #FFF4E0 on About/Thực đơn/Công thức, `PagePlaceholder` deleted, social URLs set.

## 7. Exact next step
Review the Phase 14 QA report (PROJECT_PLAN "Phase 14 notes" and §5a above). Git is set up (local, initial commit on `main`). Next: choose a remote (e.g. a private GitHub repository) and hosting; nothing is pushed or deployed until you say so.

Earlier note: Ask the user for the Typotheque web licence (the OnlineWebFonts credit stays out unless the licence terms are verified) and whether to automate Safari (they must enable Develop → Allow Remote Automation and run `safaridriver --enable`) or install Firefox for testing. Nothing else is blocked.
Re-run checks after changes: `npx tsc --noEmit && npm run lint && npm run build`; axe can be injected from `node_modules/axe-core/axe.min.js` (copy it to `public/_qa/` temporarily and delete it afterwards). Overflow/clipping scan: load each page in an iframe of the target width and compare element rects with the viewport (see Phase 10/11 notes).

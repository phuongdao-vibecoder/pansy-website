# PROJECT_PLAN — Pansy Frontend Demo

> **Status (2026-11-10, session 2):** 🟢 Phases 1–10 done: setup, assets, global shell, **Home**, **Sản phẩm + product detail template**, **About**, **Thực đơn + Công thức**, **Liên hệ** (all approved), and **QA** (tablet, accessibility, performance, animations). **Waiting on:** Typotheque web licence for the display font (H+L Heavy); manual Safari / Firefox / Edge / real-device checks. Handoff details: [HANDOFF.md](HANDOFF.md).

### Implementation decisions not specified in Figma (Phase 3)
| Decision | Why |
|---|---|
| Header **scrolls away** with the page (not sticky) | Figma places it over the hero with no sticky note. Easy to change later |
| No "current page" highlight in the nav | Not in the design. It would also make every page dynamic under Cache Components |
| Form rules: name + phone required; email optional but checked; message optional | Figma has no validation states. Error text appears below fields (white on orange mobile, dark green on the yellow card) |
| Success popup check icon = green circle | Figma uses a green badge shape (43×48); a circle is close enough for the demo |
| Tablet (768–1023 px): mobile header/menu, stacked contact form (max 560 px), footer columns side by side | No tablet design (hybrid approach, §4) |
| Social icons link to `#` | Real profile URLs not provided |

### Implementation decisions and deviations (Phase 4: Home)
| Item | What was done | Why |
|---|---|---|
| Hero melon group, product card images | Exported from Figma as **composite PNGs** (`home/hero-melons`, `shared/product-card-*`) | In Figma they are many clipped layers; one picture looks the same and is simpler |
| "MỚI" badge | On **SunYellow** (not SunHoney, as SITEMAP first said) | That is what the Figma frames show |
| Recipe carousel (4 slides) | Sinh tố dưa lưới, Salad Dưa Lưới, Kem Tuyết Dưa Lưới Bạc Hà, Kem Dưa Lưới, using text found elsewhere in the Figma file | Figma shows 4 dots but designs only one slide |
| Social "Theo dõi @Pansymelon" | The 10 thumbnails are **one flattened image** in Figma, so it is shown as one picture on every screen size | Figma's mobile one-video carousel needs separate thumbnails, which the file does not have |
| Retailer logos | 16 of 17 shown; the pink "ÆON" logo is left out | It is cropped from a hidden image layer that could not be reproduced reliably |
| WinMart / Kingfoodmart logos | Cropped to the wordmark (slogan line hidden) | Matches the Figma crop |
| Orange melon background | Starts above the recipes and flows into the footer (`MelonSection`); the footer hides its own stem on that page | Matches the single continuous melon shape in Figma |
| Tablet (768–1023) | Mobile hero and stacked sections; occasions in 3 columns without the stagger; products in a carousel | No tablet design (hybrid approach, §4) |
| Scroll animation | `Reveal` wraps each section (fade in + slide up 32 px, 600 ms) | Figma annotation; timing is our choice |
> **Figma:** `Pansy (Final)` — https://www.figma.com/design/g4PojEPpLpLAD76MMVJ3F1/Pansy--Final-
> **Analyzed:** 2026-11-09
> **Legend:** **[FIGMA]** from the design · **[REC]** recommendation for you to approve · **[UNVERIFIED]** still to check

## 1. Objective
Build a **frontend-only demo** of the Pansy melon brand website from the existing Figma design. It is a learning project for Claude Code workflows, ahead of the full website and Admin Portal.

**In scope:** 9 page templates, Desktop and Mobile, static content, scroll animations, carousels, tabs, accordions, and a client-side contact form (validation and a success message only).
**Out of scope (as requested):** Admin Portal, backend, database, real form submission, CMS, authentication, e-commerce.

## 2. Related documents
| Doc | Contents |
|---|---|
| [SITEMAP.md](SITEMAP.md) | Pages, Figma frame IDs, section order, navigation, undesigned links |
| [DESIGN_SPEC.md](DESIGN_SPEC.md) | Colors, typography, spacing, radius, shadows, motion |
| [COMPONENT_INVENTORY.md](COMPONENT_INVENTORY.md) | Figma components and variants, mapped to proposed code components |
| [ASSET_INVENTORY.md](ASSET_INVENTORY.md) | Images, logos, icons, fonts; download status; what you need to upload |
| `docs/figma-snapshots/` | Screenshots of both Home-Desktop frames |

## 3. Key findings [FIGMA]
1. **9 pages**, all with **Desktop (1440)** and **Mobile (375)** frames. **No Tablet frames.**
2. **Official Homepage Desktop:** ✅ **confirmed `2384:22325`** (in section "Home-DONE"). `2417:57027` is the prototype start frame showing the pre-animation states. Use it only as a reference for the animation.
3. Design tokens are well defined as **Figma variables**: 6 color scales, a spacing scale, radius tokens and button size tokens. There are 22 text styles and 3 hard-shadow effect styles. About 40% of canvas colors are raw hex values with no variable, mostly in illustrations.
4. Fonts: **Nunito** (free) and a commercial October Compressed display font, missing in Figma. *(The site uses October Compressed H+L Heavy, see Phase 12 notes.)*
5. **138 unique raster images**, plus many vector illustrations (pattern, mascot, flowers, arrows).
6. Design-wide motion: **Fade In + Slide Up on scroll**. Many carousels and hover states.
7. The MCP analysis stopped early (Starter-plan limit), so it was **finished through the Figma REST API** on 2026-11-09. Button, header, card, form, footer, grid and mobile type specs are now verified (DESIGN_SPEC §5). All 135 images and 61 SVGs are downloaded (ASSET_INVENTORY §2).

## 4. Responsive strategy

**From Figma:** Desktop 1440 and Mobile 375 only. Desktop content container 1128; mobile content 343 with 16 px margins. Full-bleed backgrounds are drawn at 1920.

**[REC] Hybrid responsive approach.** Tablet is not designed, so treat these as recommendations, not specs:

| Range | Approach |
|---|---|
| **< 768 px** | Follow the **Mobile 375** design. Content is fluid at 100% minus 2×16 px margins |
| **768–1199 px (tablet, not designed)** | Use **desktop structure with fluid widths**. Container = 100% minus 2×32 px. Multi-column grids drop columns (3→2 for product, occasion and recipe cards). Type and spacing scale between the mobile and desktop values with `clamp()`. The header switches to the **mobile menu below 1024 px** |
| **≥ 1200 px** | Follow **Desktop 1440**. Container max-width 1128, centered. Backgrounds fill the full viewport width (the Figma 1920 backgrounds show this intent) |
| **> 1440 px** | Content stays at 1128. Backgrounds and patterns keep stretching |

Tablet screens will be **checked visually** during the build. Any layout decisions made then will be written down as "derived, not designed".

## 5. Tech stack — ✅ approved 2026-11-09 (Next.js + Tailwind)

| Choice | Why |
|---|---|
| **Next.js (App Router) + TypeScript** | File-based routing for 9 pages. Static export, so no backend is needed. Good preparation for the future full site and Admin Portal |
| **Tailwind CSS v4** | Figma variables map cleanly to `@theme` tokens |
| Content in local **TypeScript data files** (`/content/*.ts`) | Products, recipes, testimonials and retailers as typed data. Easy to swap for an API or CMS later. No database |
| `next/font` (Nunito) + local `@font-face` (October Compressed L) | Self-hosted fonts |
| Small, light libraries only: **Embla Carousel** (carousels), **Motion** or IntersectionObserver (reveal) | Keeps the learning surface small |
| Hosting (optional): Vercel preview deploy | Easy to share the demo for review |

(Alternative considered and not chosen: Vite + React + React Router.)

## 6. Phased plan (after approval)

| Phase | Deliverable | Depends on |
|---|---|---|
| **0. Close the open questions** (§7) | Answers, fonts, final Home frame choice | You |
| ~~**0b. Finish the Figma verification**~~ ✅ | Specs verified; 135 images and 61 SVGs downloaded | Done via the REST API |
| ~~**1. Setup**~~ ✅ | Next.js 16.4.5 + Tailwind 4 project; tokens in `globals.css`; Nunito and October fonts; route stubs; Button, Reveal and ComingSoon; `/design-system` preview. Lint, typecheck and build pass | Done 2026-11-09 |
| ~~**2. Asset export**~~ ✅ | 132 WebP images (317 MB → 9.4 MB) with readable names in `public/images/`; 61 SVGs in `public/svg/`; typed index `src/content/images.ts`; `next/image` set up for AVIF/WebP; `npm run images` script | Done 2026-11-09 |
| ~~**3. Global shell**~~ ✅ | `SiteHeader` (desktop pill + Sản Phẩm dropdown; mobile bar + full-screen menu), `SiteFooter` (stem + melon background + link footer, with a card slot), `ContactSection` + `ContactForm` (validation + success popup), `Marquee`. Route groups: `(site)` shows the contact form in the footer; `(contact)` leaves the slot for the FAQ | Done 2026-11-09 |
| ~~**4. Home page**~~ ✅ | Hero, marquee, intro, product lines, occasions, testimonials, where to buy, recipe carousel, social, then contact + footer. Checked against Figma at 1440 / 768 / 375 | Done 2026-11-09 |
| ~~**5. Review checkpoint**~~ ✅ | Home approved by you on 2026-11-09 | Done |
| ~~**6. Product pages**~~ ✅ | Sản phẩm (banner, product rows, comparison, growing process, orange melon band, retailers) + one data-driven detail template for SunOrange / SunYellow / SunHoney (hero, info, spec tabs, certifications, recipes, in-store, retailers, cross-sell). Checked at 1440 / 375 | Done 2026-11-09 |
| ~~**7. About**~~ ✅ | Hero, giới thiệu, giá trị cốt lõi, orange box (map, stats, certifications), trải nghiệm, tầm nhìn, 10-step timeline, hoạt động sản xuất, where to buy, slogan band (Figma `2673:28685` / `406:24188`). Checked at 1440 / 1024 / 768 / 375 | Done 2026-11-10 |
| ~~**8. Thực đơn + Công thức**~~ ✅ | `/thuc-don`: banner + breadcrumb, filter tabs, featured card, 3 × 3 grid, pagination, TikTok video carousel; mobile "Xem thêm". `/thuc-don/[slug]`: banner, video cover, stats, ingredients, 4 steps, back link + reactions, tags, comments + form, related recipes. Checked at 1440 / 768 / 375 | Done 2026-11-10 |
| ~~**9. Liên hệ**~~ ✅ | Yellow patterned top block (title, form with success popup, photo collage, contact details) and the FAQ accordion card in the footer slot. Checked at 1440 / 1024 / 768 / 375 | Done 2026-11-10 |
| ~~**10. Responsive and QA**~~ ✅ | Tablet pass (768–1023), axe on every page at 1440 / 375, keyboard and reduced-motion fixes, Lighthouse + image/SVG weight, real-Chrome animation check. Colour contrast left for your decision (see Phase 10 notes) | Done 2026-11-10 |

## 7. Open questions — please answer before development ⚠️

1. ~~**Homepage Desktop frame**~~ ✅ Answered on 2026-11-09: `2384:22325`.
2. ~~**October Compressed L**~~ ✅ Answered on 2026-11-09: you will provide licensed font files. Put them in `_incoming/fonts/`; they move to `app/fonts/` (loaded with `next/font/local`) during Phase 1. ✅ Received the `.otf` and converted it to `.woff2`. Vietnamese coverage is OK. ⚠️ Confirm that the Typotheque license covers web use before any public deploy.
3. ~~**Figma access**~~ ✅ Resolved on 2026-11-09 with option (d), the REST API. The token is stored in `~/.figma_token`, outside the project. **Delete it and revoke the token when the project no longer needs it.** Background for reference: your account has a **View seat on the Starter plan**. Figma allows that seat **up to 20 MCP read calls per month** (Figma's rate-limit docs). The limit was used up during this analysis, and a retry on 2026-11-09 was still blocked. Figma does not publish the reset date. Options:
   a) Wait for next month's reset, then do the remaining checks (~10–15 calls are needed, mostly for asset export).
   b) Upgrade to a **Full or Dev seat on Professional or above** (up to 200 calls/day).
   c) Export the assets manually from the Figma app, and give screenshots or Dev Mode values for the [UNVERIFIED] specs.
   d) Use the **Figma REST API** with a personal access token. It is separate from the MCP limit. You would create the token and set it yourself as an environment variable.
4. ~~**Tech stack**~~ ✅ Answered on 2026-11-09: Next.js (App Router) + TypeScript + Tailwind CSS v4.
5. ~~**Undesigned links**~~ ✅ Answered on 2026-11-09: link them to simple **"Coming soon" pages**. These use the shared header and footer, a short message, and a button back to the Home page.
6. ~~**Contact form**~~ ✅ Answered on 2026-11-09: validate in the browser, then show the designed **success popup** (`2899:37652`). Nothing is sent anywhere.
7. ~~**URL language**~~ ✅ Answered on 2026-11-09: **Vietnamese slugs**, as listed in SITEMAP §2.
8. ~~**Thực đơn content**~~ ✅ Answered on 2026-11-09: repeat the sample recipe data to fill the grid, the category tabs and the pagination.

**All open questions are answered.** The remaining caution: confirm the Typotheque web license before any public deployment.

## 8. Risks / notes
- **Very tall pages** (up to ~14,500 px on mobile About) with many images. Lazy-loading and image optimization are required.
- Many section-level components exist only as **animation states**. Code will rebuild the motion; it will not copy each frame.
- Some layers overlap or sit at odd positions (e.g. About "Tin tức" and the Footer; the stray frame `3022:36104` "Frame 6969" near About). These will be checked visually.
- There are small inconsistencies in the design tokens (DESIGN_SPEC §1.1, §2.2). The build will follow what the canvas shows.

### Phase 6 notes (product pages)
| Item | What was done | Why |
|---|---|---|
| **Figma image-render API blocked** | On 2026-11-09 Figma returned `429` with `Retry-After ≈ 4.6 days` for image renders (Starter plan, "low" tier). The node-data endpoint still worked. | — |
| Illustrations rebuilt from vectors | Wrote a Figma → SVG converter (`scripts/figma/`). Product rows, comparison pictures, "differences" picture, growing-process scenes, mascots and decorations are rendered from Figma's own vector geometry. Pictures containing photos are rasterized to WebP (`generated/*` in `public/images`); pure vectors stay SVG (`public/svg/generated/`). | Keeps the art pixel-faithful without the render API |
| Illustration labels | Text on illustrations (e.g. "Thanh Mát", "BAO BÌ") is live HTML placed at the Figma coordinates (in %, so it scales) | Text stays crisp, translatable and accessible |
| Spec table mascot | Only the SunOrange page has it in Figma; reused for all three | Consistency |
| "Hàm lượng dinh dưỡng" tab | Same nutrition values for all three products | That is what Figma has |
| Detail routes | `params` is read inside `<Suspense>` | Removes the Next.js "instant navigation" insight; pages are still fully prerendered |
| Not visually compared | Without the render API I compared against the Figma data (positions, sizes, colors, text) and the earlier frame screenshots, not against fresh renders of these pages | — |

### Phase 7 notes (About)
| Item | What was done | Why |
|---|---|---|
| "Tin tức" block | Left out | It is hidden in the Figma frame (desktop and mobile) |
| Timeline order | Chronological, as in the mobile frame; on desktop the cards follow the snake path (row 2 runs right → left) | Matches both frames |
| Timeline photos | Taken from the image fills in Figma; desktop and mobile agree on every step | — |
| Cambodian flag ribbon | The desktop version (clipped to the photo corner) is used on mobile too | Mobile places it slightly differently; one asset keeps it simple |
| Hidden-by-animation layers | Several Figma layers (flowers, map, mascot) are stored at 0 % opacity as the scroll-animation start state. The converter now has an `"opaque": true` job option that renders them at 100 %, and a `"hide"` option to leave out cards drawn as HTML | They are visible in the finished design |
| Hero white wash | Figma's linear gradients converted to CSS (`128deg` desktop, `168deg` mobile) | Same look, no extra image |
| Scaling below 1137 px | Timeline, production collage and experience collage are placed in % of their Figma frames, text in `cqw` | Keeps the zig-zag layouts intact at 1024–1279 px |
| Certification cards | Stacked at 1024–1279 px, 3 columns from 1280 px | Three columns are too narrow for the 20 px titles at 1024 |
| Tablet (768–1023) | Uses the mobile layouts (timeline list max 420 px wide, stats 2 × 2) | No tablet design |
| Mobile background pattern | Home's mobile pattern is reused | The About mobile pattern frame was not exported; the two look alike |
| Not visually compared | Built from Figma data and the local vector renders; no fresh Figma renders (API still blocked) | — |

### Phase 8 notes (Thực đơn + Công thức)
| Item | What was done | Why |
|---|---|---|
| Sample recipes | The list shows Figma's placeholder card ("Kem dưa lưới", HẰNG NGÀY, 23-8-2022) over Figma's photos; every card opens the recipe page | Decision 2026-11-09: repeat sample data |
| Tabs and pagination | Interactive (selected tab, current page, prev/next), but the cards stay the same | No real recipe data or backend yet; real filtering needs the Admin Portal data |
| Mobile list | 3 cards, then "Xem thêm" shows the other 7 | As in the Figma mobile frame (no pagination there) |
| Recipe body | Only "Kem Dưa Lưới" is designed; the other recipes reuse its body with their own title, category and banner photo | Repeat sample data |
| Step 4 title | "4. Bảo quản kem dưa lưới" (desktop Figma says "1.", mobile "4.") | Desktop numbering is a typo |
| Mobile recipe banner | Uses the recipe's own photo (Figma mobile shows the granita photo) | Keeps banner = recipe |
| Video cover / TikTok cards | Picture + play button only; TikTok cards link to the TikTok profile (still `#`) | No video files or URLs |
| Comments | Validation (name + comment required); a sent comment is added on the page only and lost on reload | No backend |
| Reaction labels | Accessible names "Thích", "Yêu thích", "Buồn" for the 👍 ❤️ 😢 icons | Figma has icons only |
| **Carousel arrows (all pages)** | The exported "Arrow Flower" files are named the wrong way round (`*-left` draws ">"). `Carousel` now swaps them, so "previous" shows "<" — this also fixes Home, Sản phẩm and the product pages | Bug found while building the video row |
| Rotated/mirrored Figma icons | Pagination "previous" and "Quay về Thực đơn" arrows are mirrored in CSS; the side flowers use the Figma transform matrices | The converter exports the unrotated shape |
| `Carousel` | New `controls="bar"` layout (dots left, arrows right, below the row) and `dotColor="honey"` | Figma "Video-d" |
| `PageBanner` | New props: breadcrumb, mobile image, overlay gradient, marquee placement, flowers on/off, height and title offset. Sản phẩm renders as before | Reuse for Thực đơn and Công thức |

### Phase 9 notes (Liên hệ)
| Item | What was done | Why |
|---|---|---|
| FAQ answers | Taken from the hidden answer layers of each Figma FAQ instance; all four start closed, one open at a time | Figma shows only the closed state |
| FAQ arrow | Closed = the Figma arrow ("v"); open = the same arrow turned 180° | The open variant lives on the component page, which is not in the local geometry dump |
| Contact form | Reuses `ContactForm` with a new `variant="page"` (yellow background on all sizes, taller message box, Large button on desktop); same validation and success popup | Same form as the footer card |
| Email / phone | Rendered as `mailto:` / `tel:` links | Small usability gain; text unchanged |
| Background | Desktop: the Figma shape (convex bottom) as a CSS mask over #FBB040, with the dotted pattern at 7 %; mobile: flat #FBB040 block | As in the frames |
| Collage | Rendered from Figma with its hard drop shadows (the converter now supports `DROP_SHADOW`). The big yellow flower is cut on the right, as in Figma's own render | Figma render bounds are 221 px wide |
| Layout 1024–1127 | Columns are flexible (500 : 552) with a 40 px gap, 80 px from 1280 | Fixed 500 + 552 + 80 does not fit at 1024 |
| Tablet | Mobile order, capped at 560 px | No tablet design |
| Dev server | After scripted edits the dev server sometimes keeps serving old server markup (hydration warning). A restart fixes it | Tooling, not app code |

### Phase 10 notes (QA)
| Item | What was done | Why |
|---|---|---|
| Tablet 768–1023 | `container-site` stops growing at 704 px content (the 768 layout, centred). The orange "Quy trình trồng trọt" band stays full width with its content centred | The mobile layout stretched to ~940 px: 130-character lines, 930 × 600 recipe cards. No tablet design |
| Tablet check | No horizontal scroll at 768 / 900 / 1000 / 1023 on any page; screenshots of every page at 1000 | — |
| Testimonials bug | Card text now `text-ink`. On orange pages (Sản phẩm) the white mobile/tablet card inherited white text and was blank | Bug, also on phones |
| Headings | Sản phẩm product names are `h2` (were `h3` straight after the `h1`) | axe heading-order |
| Landmarks | Carousel labels no longer repeat their section's name; the TikTok section is no longer a named region | axe landmark-unique |
| Carousel track | Focusable (`tabIndex=0`, focus ring) so the comparison carousel can be scrolled by keyboard | axe scrollable-region-focusable |
| Mobile menu | While open, the page behind is `inert` (Tab stays in the menu); Escape closes it and returns focus to the menu button | Keyboard use |
| Reduced motion | Marquee now stops (`motion-reduce:animate-none`; the old base-layer rule lost to the utility); carousel arrows jump instead of smooth-scrolling | Bug found in the real-browser check |
| axe result | 0 violations on all pages at 1440 and 375 **except colour contrast** | — |
| Colour contrast | **Not changed: your decision.** Brand pairs below WCAG AA (4.5 : 1 small text, 3 : 1 large): white on #F37326 2.9 (orange buttons, cards); white on #F05D24 3.3 (footer links, text on orange bands; passes for large text only); white on #00AB4E 3.0 (green buttons); white on #ED4823 3.8 ("MỚI" badge); yellow #F8EC23 on orange/green 2.3–2.7 (headline accents); orange #F37326 on cream/white/yellow 2.3–2.9 (section titles, marquee); eyebrow #00803B on #FFEED7 4.44 (just under) | Changing them changes the Figma palette |
| Contrast fix (your choice 2026-11-10: "fix small text only") | Text under 24 px now reaches 4.5 : 1 inside components: green buttons, active tabs and current page `green-700` (hover 800, press 950); orange buttons `sunorange-800` (hover 900, press 950); "MỚI" badge `sunyellow-700`; core-value chips `green-800` and cards `sunorange-800`; Sản phẩm product cards `sunorange-800` / `sunyellow-700` / `sunhoney-700`; green recipe card `green-800`; orange recipe-card tagline `sunorange-900`; eyebrow token `green-700` → `green-800`. Large headings unchanged | The 500 shades fail with white text; 600 shades still fail. Side effect: oranges read browner |
| Contrast still failing | Small white text on the full-width bands: the melon/footer band #F05D24 (footer links, copyright, section intros, timeline) and the orange process band #F37326 on Sản phẩm (step text, yellow "01–03") | Only a darker band or black text would pass. **Your decision 2026-11-10: leave the bands as designed** (known WCAG AA gap) |
| Page background (your decision 2026-11-10) | About, Thực đơn and Công thức use #FFF4E0 as in their Figma frames (`data-page-bg="light"` on `<main>` + a `body:has()` rule in `globals.css`); Home, Sản phẩm, product pages and Liên hệ keep #FFEED7. The Công thức side flowers are now visible | Matches Figma |
| `PagePlaceholder` removed (2026-11-10) | No imports or routes used it; it only showed Phase 1 dev info (Figma IDs, phase). `ComingSoon` covers undesigned pages. tsc, lint and build pass | Dead code |
| Carousel dots | 8 px dots left as designed | WCAG 2.5.8 exception: the arrow buttons do the same thing |
| Lazy loading | 51 decorative `<img>` below the hero now `loading="lazy"` | They downloaded with the hero and delayed LCP |
| Liên hệ collage | One `<picture>` (`getImageProps`) loaded eagerly with high priority; only the matching collage downloads | It was the LCP image and was lazy; both versions downloaded |
| SVG weight | `npm run images` now minifies SVGs over 40 KB with svgo (precision 5): `public/svg` 3.2 → 2.4 MB. Every changed file was rendered before/after in Chrome: differences are anti-aliasing only | Patterns were 170–310 KB, `process-3.svg` 640 KB |
| Lighthouse (mobile, slow 4G, production build) | Performance 77–84 → **82–95**; LCP 4.5–6.5 s → **3.0–4.9 s**; CLS 0; best practices 100; accessibility 94–97 (contrast only). SEO is low on purpose (`noindex` while private) | — |
| Animations (real Chrome) | Scroll reveal: 600 ms fade + 32 px rise, nothing left hidden after scrolling; carousel smooth-scrolls; marquee runs; with reduced motion all three are off | Hidden pane could not show this |
| Not covered | Safari and Firefox (no browsers here); real phones | Worth a manual look before any demo |

### Phase 11 notes (brand assets and responsive pass, 2026-11-10)
| Item | What was done | Why |
|---|---|---|
| Social links | Facebook and TikTok set to the official profiles in `src/content/site.ts` (footer, home "Theo dõi", Thực đơn TikTok cards). External links: `target="_blank" rel="noopener noreferrer"` plus "(mở trong tab mới)" for screen readers. Instagram and Zalo removed (icons and files, 2026-11-10). No `#` links remain | Your URLs; no invented URLs |
| Brand colours | Reverted the "small text" contrast pass: buttons, active tabs, current page, "MỚI" badge, core-value cards and chips, product cards, green recipe card, tagline and eyebrow are back to the Figma values (orange #F37326, green #00AB4E, yellow #F8EC23) | Your decision; supersedes the Phase 10 contrast fix |
| Contrast | White text on orange/green buttons and cards is below WCAG AA (2.9–3.3 : 1). Accepted as a known gap to keep the Figma look | Your decision |
| Font | (Superseded by Phase 12.) OnlineWebFonts "October Compressed H+L Heavy" download reviewed and first rejected (Typotheque copyright, no valid web licence, 96 Vietnamese characters missing, wrong weight). Site keeps the October Compressed L Black file you supplied, for the local demo only. You prefer Heavy (2026-11-10); switch when a Typotheque Heavy file with Vietnamese is available | See ASSET_INVENTORY §4 |
| 1024–1299 px overflow | Home and Sản phẩm scrolled sideways at 1024–1200 (88 / 56 px). Fixed: testimonial offset `min(250px, 100% − 798px)`; process band bleed only from 1300; product art 420 px with 80 px room for the SunHoney label below 1300; decoration overflow clipped (`overflow-x-clip` on Home and Sản phẩm `<main>`) | Fixed Figma widths do not fit below ~1300 |
| SunHoney label on phones | "Vân lưới dày đặc" was clipped on phones (an older bug). That row keeps 16 % room on the right below 1024 | Found by the new clipped-text scan |
| Touch targets | Footer links, breadcrumb and Liên hệ email/phone get invisible vertical padding (≥ 24 px tall, layout unchanged) | 18–22 px tall before |
| Checks | Automated scan at 1920, 1440, 1366, 1299, 1280, 1200, 1100, 1024, 768, 430, 375, 320 on all pages: no horizontal scroll, no clipped text, no tap target under 24 px; axe clean apart from colour contrast; phone-viewport screenshots at 320 / 375 / 430; tsc, lint, build pass | — |
| Browsers | **Automated:** Chrome 157 only (pane, headless, puppeteer, Lighthouse). **Static review:** Tailwind v4 needs Safari 16.4+, Firefox 128+, Chrome/Edge 111+; features used (`:has()`, `inert`, container queries, `overflow: clip`, `dvh`, `<dialog>`, `color-mix`) are all within that range; `scrollbar-width` has a `::-webkit-scrollbar` fallback. **Not tested:** Safari 18.6 (installed; automation needs Develop → Allow Remote Automation + `safaridriver --enable`), Firefox and Edge (not installed), real phones and tablets | Only Chrome is automatable here |

### Phase 12 notes (display font, 2026-11-11)
| Item | What was done | Why |
|---|---|---|
| Font | Display font is now October Compressed H+L Heavy (weight 850) from `src/app/fonts/OctoberCompressedHL-Heavy.woff2`; the Black file was removed from `src/app/fonts/` (moved to the Trash; the original stays in `_incoming/fonts/`). Sizes, line heights, letter spacing unchanged | Your decision |
| Latin spelling | Every text set in the display font (26 headings, product names, slogans, header product menu, Coming soon titles) goes through `<DisplayText>`: visible text without diacritics ("Dua Luoi Pansy", "CHUAN GION"), original Vietnamese in an sr-only span for screen readers and search engines. Page titles, metadata, alt text and all Nunito text stay Vietnamese | The font has none of the 31 Vietnamese letters the site uses |
| Verified | All visible display-font text uses only characters the font contains; the Heavy face loads (850); build bundles only the Heavy file | — |
| Overflow found while re-scanning | Product detail pages scrolled sideways at 1024–1440 (white certification card bleeding 64 px; recipe flower). The 64 px bleed of that card and the two About boxes now starts at 1300 px; decoration clipped on product pages. Scan clean at 320–1920 | Same pattern as the Phase 11 fixes |
| Licence | Not confirmed (see ASSET_INVENTORY §4). Local demo only | — |
| TTF check and attribution (2026-11-11) | Supplied TTF and site WOFF2 are the same font (all tables match except checksum/WOFF2 flag); WOFF2 kept. OnlineWebFonts CC BY credit **not added**, confirmed by you 2026-11-11: the licensing terms for this font remain unverified. No layout shift (CLS ≤ 0.0002 on a slow connection), no overflow at 320–1920 | Your rule: add only if CC BY applies |

### Phase 13 notes (Nunito demo, 2026-11-11)
| Item | What was done | Why |
|---|---|---|
| Display font | All headings that used the display font now use Nunito ExtraBold 800 (`--font-display` → Nunito; Heavy font not loaded). Heavy implementation, file and docs kept for switching back | Your request: review the overall UX/UI with Nunito |
| Size tweaks | Desktop only: home hero title 56/68 (was 72/90, it wrapped to five lines over the buttons); product detail title 84/96 (was 100/110, "SunOrange" ran into the photo); product slogan max 527 px. Marked "Nunito demo" in code | Nunito is much wider than the compressed font |
| Text rule | Headings show full Vietnamese accents in the demo: `STRIP_ACCENTS = false` in `DisplayText.tsx` (one flag; set back to `true` with the Heavy font). Verified on all 13 pages: every display heading accented, no hidden duplicate copies, no overflow at 320–1920, accents not clipped at the tight hero line heights | Your decision 2026-11-11 (Nunito has every Vietnamese letter) |
| Checks | Nunito 800 on every display heading; no overflow or clipped heading at 320–1920; tsc, lint, build pass | — |

### Phase 14 notes (final QA before deployment, 2026-11-11)
Audit of every route, then functional, responsive and technical QA. Typography and font setup left unchanged (your instruction).

**Pages audited:** Home, Về Pansy, Sản phẩm, SunOrange / SunYellow / SunHoney, Thực đơn, 4 recipe pages (`kem-dua-luoi`, `sinh-to-dua-luoi`, `salad-dua-luoi`, `kem-tuyet-dua-luoi-bac-ha`), Liên hệ, the 4 Coming soon pages (Tin tức, Trang trại, Điểm bán, Hệ thống phân phối), `/tin-tuc/chuyen-nha-pansy`, and the 404 page. **News** has no design (the About "Tin tức" block is hidden in Figma), so it stays a Coming soon page. **Knowledge / Guide**: Figma has no such page; the only guide items ("Hướng dẫn bảo quản", "Hướng dẫn thanh toán") are hidden footer links in every frame, so nothing was built.

| Fix | Change | Why (verified) |
|---|---|---|
| Form data in URL | `action={blockNativeSubmit}` (new `src/lib/blockNativeSubmit.ts`, a no-op) on the contact form and the recipe comment form; `onSubmit` still does all the work | A submit before React hydrated did a native GET: `/?name=&phone=&email=&message=` and `/thuc-don/kem-dua-luoi?name=&comment=…` were seen. React now renders a non-submitting action in the HTML |
| Partner logos at 320 | Footer partner logos: `height: auto` (was fixed height) | At 320 the first row is wider than the screen; logos shrank in width only (squashed boxes, Next.js image warning). Unchanged at ≥ 375 (within 0.5 px) |
| Intro product photo | `object-cover` on the desktop boxed-melons image (Home "Giới thiệu") | The 841 × 1202 Figma box has a different ratio from the photo (0.70 vs 0.67): it was stretched about 4.5 %. Figma fills the box, which `cover` matches |
| Tap targets | Invisible 24 px hit areas (`::after`) on carousel dots (8 px), the desktop "Sản Phẩm" arrow (20 × 15) and the mobile-menu arrow; `py-1 -my-1` on "Quay về Thực đơn" and the mobile-menu links (22 px tall) | WCAG 2.5.8 minimum 24 × 24. No visual change |

**QA results** (Chrome only: production build via `next start`, headless Chrome through puppeteer-core, plus the browser pane):
- **Links:** crawler found 15 linked pages, all 200; 1,198 image/asset URLs, none broken. No `#` or empty links; no Instagram/Zalo. Facebook `https://www.facebook.com/PansyMelonVietnam` and TikTok `https://www.tiktok.com/@pansymelon.official` open in a new tab with `noopener noreferrer`. Unknown slugs (`/san-pham/abc`, `/thuc-don/khong-co`) show the 404 page with `noindex` (HTTP 200 because the page streams, normal for Next.js). `/tin-tuc/<any>` shows Coming soon.
- **Functional:** desktop dropdown (hover and click, Escape closes); mobile menu (opens full screen, page inert, scroll locked, Escape closes and returns focus, link tap closes it, product sub-list opens); recipe carousel arrows; FAQ accordion; product spec tabs; Thực đơn filters, pagination (first/last disabled, ellipsis) and mobile "Xem thêm"; contact form (required name and phone, phone and email format, focus on first error, values kept on error, success popup, reset, popup closes); recipe comments (validation, new comment added, form cleared).
- **Responsive:** 15 pages × 8 widths (1920, 1440, 1366, 1024, 768, 430, 375, 320): no horizontal scroll, no element off-screen, no clipped text, no broken or stretched images.
- **Console:** no errors or warnings on any page (dev and production). One dev-only Next.js warning about `intro-farm-aerial` at mobile widths comes from the hidden desktop copy of that image; no visual effect.
- **Accessibility (axe-core):** only `color-contrast`, the accepted brand-colour gap.
- **Build:** `npx tsc --noEmit`, `npm run lint`, `npm run build` pass (24 routes, static / partial prerender). Dependencies complete (`npm ls` clean); no unused components.
- **Deployment blocker found:** the unused October Compressed H+L Heavy WOFF2 is still emitted in the production build (`.next/static/media/OctoberCompressedHL_Heavy-*.woff2`, `@font-face` in the CSS) because `fonts.ts` declares it. A public deploy would distribute the font. Left as is (typography frozen); needs your decision.
- **Resolved (your decision, 2026-11-11):** the October `localFont` declaration in `src/app/fonts.ts` is commented out (restore steps in the comment and in HANDOFF). Rebuilt: `.next/static/media` holds only the Nunito files, no `@font-face` for October, the old font URL returns 404, headings still Nunito 800 on Home / product / recipe / Liên hệ, no console errors; tsc, lint, build pass. The font file `src/app/fonts/OctoberCompressedHL-Heavy.woff2` and the originals in `_incoming/` are kept. (Local dev cache `.next/dev` still holds old copies; it is never deployed.)
- **Not tested:** Safari, Firefox, Edge, real phones and tablets (no manual testing was done in those).
- **Browser pane note:** the hidden pane never swaps in streamed Suspense content (no frames), so product and recipe widgets look dead there. Test them in headless Chrome or a real browser.

**Tooling:** `.claude/launch.json` gained `pansy-prod` (`next start` on port 3001) for testing the production build.

## Pending / open items (as of 2026-11-11)
- Contrast: decided. Exact Figma brand colours everywhere, including buttons and cards (known WCAG AA gap, see Phase 11 notes).
- Manual checks still needed: Safari (macOS + iOS), Firefox, Edge, a real Android phone and an iPad. Automated testing covered Chrome only.
- Figma image-render API rate-limited until about 2026-11-14; use `scripts/figma/` with `_incoming/figma-api/geo.json`.
- Confirm the **web licence** for October Compressed H+L Heavy with Typotheque before any public deploy (the OnlineWebFonts notice is not a valid licence).
- Git: local repository set up 2026-11-11 (branch `main`, author "Pansy Team", initial commit, no remote). The October font WOFF2 is git-ignored (licence unconfirmed); a fresh clone builds fine without it because the build no longer uses it. Nothing deployed.
- Optional before a real launch: a custom `error.tsx` (not needed for this static demo), and real recipe/news content (the menu repeats sample data; filters and pagination are visual only).

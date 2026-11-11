# ASSET_INVENTORY — Pansy Website

> **Source:** Figma `Pansy (Final)` — `g4PojEPpLpLAD76MMVJ3F1` · analyzed 2026-11-09
> **[FIGMA]** = confirmed in the file · **[UNVERIFIED]** = seen in low-resolution screenshots or inferred from layer names; confirm during export · **[REC]** = recommendation

---

## 1. Summary [FIGMA]

| Metric | Value |
|---|---|
| Nodes scanned (section "Final Version") | ~24,600 |
| **Unique raster images** (image fills, counted by image hash) | **138** |
| Fonts missing in the Figma environment | **October Compressed L** (16 text nodes) |
| Paint/color styles | None (colors are variables) |

## 2. Download status — ✅ done on 2026-11-09 via the Figma REST API

| What | Result | Location |
|---|---|---|
| **Original raster images** (as uploaded to Figma, full resolution) | ✅ **135 / 135 downloaded**: 84 PNG + 51 JPG, **317 MB** in total. These are all the images visible in the 18 page frames (the earlier count of 138 included 3 hidden layers) | `_incoming/figma-images/<page>/<section>--<layer>.<ext>` |
| **SVG exports** | ✅ **61 SVGs**, 1.3 MB, no embedded bitmaps. Includes logos (3), mascots (4), patterns (3), melon backgrounds and decorations (11), icons (7), and all 32 Arrow Flower variants | `_incoming/figma-svg/{brand,mascot,decor,icons}/` |
| **Manifest** | ✅ Maps every file to its Figma node, page, section, layer and the largest size it is displayed at | `_incoming/asset-manifest.json` |
| Frame screenshots | ✅ | `docs/figma-snapshots/` |

Notes:
- The originals are **very large**: up to 20 MB each (largest: Thực đơn recipe images, the Home intro image, the recipe banner). The manifest's `displayMaxPx` gives the largest size each image is shown at. **[REC]** During Phase 2, resize to 2× that size and convert to WebP/AVIF, then move the results to `public/images/`. This should cut the total to well under 30 MB.
- The footer "Pansy" logo SVG has a **white** wordmark (for the orange footer), so it looks blank on a white preview. That is expected.
- File names come from Figma layer names, which are often generic ("Rectangle 22", "Frame 289"). They will get meaningful names when they move to `public/images/`.
- Third-party logos (retailers) are inside the raster set under `home/dia-chi-mua-dua-luoi--image-*.png`.

## 2b. Phase 2: optimized for the web ✅ (2026-11-09)

| | Result |
|---|---|
| Script | `npm run images` → [scripts/optimize-images.mjs](scripts/optimize-images.mjs). It only rebuilds changed files; `--force` rebuilds everything |
| Name map | [scripts/image-map.json](scripts/image-map.json): each Figma original mapped to a readable name, assigned after reviewing every image visually |
| Output | **132 WebP images, 9.4 MB** (down from 317 MB) in `public/images/{home,about,products,sunorange,sunyellow,sunhoney,menu,recipe,contact,shared}/` · **61 SVGs** in `public/svg/` |
| Sizing rule | width = min(original, 2× the largest size shown in Figma, 2560 px). WebP quality 80, transparency kept |
| Code index | [src/content/images.ts](src/content/images.ts) (generated): `img("home/hero-sunorange")` returns `{src, width, height}` for `next/image` |
| Delivery | `next/image` serves **AVIF** to browsers that support it, otherwise WebP (checked: the 640 px product image = 38 KB AVIF). Only `/images/**` can be optimized |
| Images used on several pages | Kept once under `shared/` (retailer logos, footer partners, certifications, product shots, occasion photos, feature tiles, testimonials) |

**Left out on purpose: designer placeholders in Figma** (no real image exists)

| Original | What it is | Where |
|---|---|---|
| `contact/container--vector.png` | Flat light-grey square | Contact page gallery (1 of 4 tiles) |
| `home/testimonials--image-360.jpg` | Pure white image | Home testimonial card |
| `menu/thuc-don-mobile-1--placeholder-image.png` | Grey "image" icon placeholder | Thực đơn mobile recipe card |

These slots will reuse a nearby real image in the build. You can supply real photos later.

**Masks and effects** (they are not photos; the design layers them over other images): `shared/masks/product-glow`, `shared/masks/product-shape`, `shared/masks/soft-shadow`, `shared/pattern-dots`, `shared/pattern-dots-2`. **[REC]** In Phase 3+ these will probably be redone in CSS (gradients, `mask-image`) where that looks the same.

**Added in Phase 4:** 4 composite renders exported from Figma at 2× (`_incoming/figma-composites/`): `home/hero-melons`, `shared/product-card-sunorange|sunyellow|sunhoney`. Also 17 more SVGs: hero band and flowers, occasions outline flower, testimonial bubbles and flower, where-to-buy flower and mascot, recipe mascot, social flowers and white social icons, star icon.

**Added in Phase 6 (from Figma geometry, see `scripts/figma/README.md`):** raster `generated/products/{row,compare}-*`, `generated/products/differences(-mobile)`, `generated/detail/*-feature`; SVG `public/svg/generated/{products,detail,brand}/*` (process scenes and icons, banner flowers, white logo, spec mascot, cross-sell blob, recipe flower). Also `decor/occasions-flower-outline-yellow.svg` (yellow copy for orange backgrounds).

## 3. Inventory by category

Status column: ✅ confirmed in Figma · 🔍 seen in screenshots, not yet exported · ❓ inferred from layer names.

### 3.1 Brand

| Asset | Where | Type (expected) | Status |
|---|---|---|---|
| **Pansy logo** (wordmark with leaf) | Header, footer, mobile menu | Vector → SVG | 🔍 |
| Soleil Farm logo | Footer (partner) | Vector or raster | 🔍 |
| **Mascot**: melon character (green body, orange face) | Hero, intro, testimonials, contact, footer | Raster or vector illustration | 🔍 |
| Favicon / app icons | — | — | ❌ Not in the design. Must be created from the logo **[REC]** |

### 3.2 Decorative and illustration

| Asset | Where | Type | Status |
|---|---|---|---|
| **Background pattern** (cream leaf/flower line pattern) | *Pattern* frames: Home 1920×5596, About 2550×5649, mobile 1611×5322 and others | Vector → SVG, or a tile [REC] | ✅ frames exist |
| Melon-stem divider (green T-shaped stem) | Home, before the orange recipe block | Vector | 🔍 |
| Orange "rind" curve backgrounds | Hero bottom, recipe block | Vector | 🔍 |
| Yellow flower decorations | Social section, contact | Vector | 🔍 |
| **Arrow Flower** set (32 variants) | Carousels and links | Vector → SVG | ✅ `297:24568` |
| Floating decorative vectors | Recipe detail (`406:38415`, `406:38584`, `406:38585`, `406:38586`), Products mobile `406:32594` | Vector | ✅ |
| Marquee star/flower separators | Ticker | Vector | 🔍 |
| Bình Thuận region map | About, *Bản đồ* | Vector or raster | ❓ |

### 3.3 Product images

| Asset | Where | Status |
|---|---|---|
| Hero composite: 3 boxed melons with mascots | Home hero | 🔍 |
| SunOrange / SunYellow / SunHoney product photos (whole melon and in gift box) | Product cards, product rows, detail hero | 🔍 |
| Melon cut / flesh photos | Intro tiles, detail info | 🔍 |
| Product detail hero image "dua 2 1" (600×600) | SunYellow `406:35593`, SunHoney `406:37107` | ✅ |
| Feature tiles: Độ brix 14+, Chắc giòn, Vân lưới dày, Vị béo Vanila | Home intro, product detail | 🔍 |
| Product feature images: Hình dáng / Vân lưới / Bao bì / Độ ngọt | Products page | 🔍 |

### 3.4 Lifestyle and content photos

| Asset | Where | Status |
|---|---|---|
| Farm / greenhouse aerial photo | Home intro, About | 🔍 |
| Occasion photos: altar offering, family gathering, gift giving | Home, Products | 🔍 |
| Testimonial avatars (Mẹ Xoài, Mẹ Huyền Lizzie) | Testimonials | 🔍 |
| Recipe photos (sinh tố, kem, salad…) | Recipe carousel, Thực đơn grid, recipe detail steps | 🔍 |
| Social / TikTok thumbnails (10 on Home) | "Theo dõi @Pansymelon" | 🔍 |
| Video cover (Thực đơn *Video-d*) | Thực đơn | ✅ component `2174:5119` |
| Farmer/staff photo | Contact form section | 🔍 |
| Contact page background photo | Contact desktop *Background* 1920×1284 | ✅ frame |
| About: timeline photos (11), production activity photos (5), store activity photos (trial / display / tradeshow) | About, product details | ✅ component variants exist |
| News thumbnails | About → Tin tức | 🔍 |

### 3.5 Third-party logos

| Asset | Where | Status |
|---|---|---|
| **Retailer logos** "CÁC ĐIỂM BÁN DƯA PANSY". Seen in the screenshot (low-res, confirm on export): WinMart, Kingfoodmart, Co.op, AEON, Co.opmart, Co.opXtra, Tops Market, MM Mega Market, Lotte Mart and others | Where-to-buy section (2 rows, ~16 logos) | 🔍 |
| Footer distribution logos (Lotte Mart, Co.op, city/mall logos…) | Footer "Hệ Thống Phân Phối" | 🔍 |
| Certification logos: GlobalG.A.P, GRASP | About, product detail | ❓ |
| Social icons: TikTok, Facebook, Instagram (orange circles in footer) | Social section, footer | ✅ Facebook and TikTok linked to the official profiles (2026-11-10). Instagram and Zalo removed, icon files included (no URLs; files moved to the Trash) |

**[REC]** Third-party brand logos are trademarks. That is fine for an internal demo. Before going public, confirm you have permission to show them.

### 3.6 Icons

| Icon | Source | Status |
|---|---|---|
| mdi:heart (24, 32) | Material Design Icons | ✅ |
| Arrow 24 | Custom | ✅ `148:1364` |
| Chevron (nav dropdown), stars (ratings), contact icons (mail, phone, clock), play button | Unknown | 🔍 |

**[REC]** Export the custom icons as SVG. For generic icons (chevron, mail, phone, clock, star, play), an open icon set such as `@mdi/js` or Lucide is fine, since the design already uses MDI.

## 4. Needs your manual upload ⚠️

**Display font status (confirmed by Pansy 2026-11-11):**
- **Current display font:** October Compressed H+L Heavy (weight 850), file `src/app/fonts/OctoberCompressedHL-Heavy.woff2`. Implementation and the heading rule (`DisplayText`: unaccented Vietnamese on screen, full Vietnamese for screen readers) stay as they are.
- **Files match:** the supplied TTF and the site WOFF2 are the same font (all tables identical except checksum and the WOFF2 flag).
- **No OnlineWebFonts attribution:** kept out of the footer by Pansy's decision, because the specific licensing terms for this font remain unverified (the CC BY 4.0 notice is not shown to apply to a Typotheque font).
- **Public deployment pending:** no public deploy or distribution with this font until the licence (Typotheque web embedding / commercial use) is confirmed.


| Item | Why | What to provide |
|---|---|---|
| **Display font: October Compressed H+L Heavy** | Commercial Typotheque font, not on Google Fonts | ✅ **In use (2026-11-11).** Web file `src/app/fonts/OctoberCompressedHL-Heavy.woff2` (WOFF2, 34 KB). Verified 2026-11-11 against the supplied TTF (`c020adb2187fcfabcfc64f60feee1d8e.ttf`, 159 KB): same family, style, version 1.0, weight 850, metrics, 439 glyph outlines and advance widths, kerning and every other table; the only differences are the checksum and the WOFF2 "lossless transform" flag, so no reconversion was needed. Originals (TTF, WOFF, WOFF2, EOT, SVG, `License.txt`) are kept unchanged in the Downloads folder and copied to `_incoming/fonts/October Compressed H+L Heavy (OnlineWebFonts)/`.<br>**Heading text rule:** every text in this font goes through `<DisplayText>` (`src/components/ui/DisplayText.tsx`, `toLatin()` in `src/lib/latin.ts`): shown without diacritics ("Dưa lưới" → "Dua luoi"), with the original Vietnamese in an sr-only copy. Body text, buttons, navigation, SEO metadata, alt and accessibility text keep full Vietnamese spelling.<br>**Attribution:** the OnlineWebFonts credit line ("Fonts made from Web Fonts is licensed by CC BY 4.0") was **not added** to the footer. The rule was to add it only if CC BY 4.0 applies to this font, and the documents do not show that: the font itself states "Copyright (c) 2017 Typotheque.com All rights reserved" with a link to the Typotheque EULA, while the CC BY line is OnlineWebFonts' generic site notice (OnlineWebFonts is not the copyright holder, and its own notice says some fonts are trials that may need a commercial licence for embedding). Showing the line would state a licence the documents do not support. It can be added in minutes if Pansy decides otherwise.<br>**Licence (unconfirmed):** no supplied document grants commercial use or web embedding of this Typotheque font. Local demo only: do not deploy publicly or distribute the font until Typotheque confirms web rights (web licence for the domain and expected pageviews), or a free alternative is chosen. |
| Nunito | — | Nothing needed (Google Fonts) |
| Favicon / social share image | Not designed | Optional. Can be generated from the logo |
| Higher-resolution logos (SVG) | Only if the Figma export gives raster logos | Brand SVG files |
| Video files / TikTok URLs | Only thumbnails are in Figma | ✅ Profile URL received; cards link to the TikTok profile. Individual video URLs still optional |
| Instagram / Zalo | Shown in Figma | Removed 2026-11-10 (Pansy has no URLs) |
| Real content for undesigned pages | Trang Trại, Hệ Thống Phân Phối, news articles | Optional for the demo |

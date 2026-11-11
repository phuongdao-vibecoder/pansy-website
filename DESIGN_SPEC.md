# DESIGN_SPEC — Pansy Website

> **Source:** Figma `Pansy (Final)` — `g4PojEPpLpLAD76MMVJ3F1` · analyzed 2026-11-09
> **Updated 2026-11-11:** approved brand button colours (§5.2), responsive requirements (§3.6), social URLs and display font (§6).
> **[FIGMA]** = read directly from Figma variables, styles or nodes · **[REC]** = recommendation, not in the design · **[UNVERIFIED]** = not yet checked (the Figma MCP call limit was reached)

---

## 1. Color

### 1.1 Color variables — collection "Primitives" [FIGMA]

There are **no local Paint Styles**. All brand colors are Figma **Variables** (one mode).

| Scale | 950 | 900 | 800 | 700 | 600 | **500** | 400 | 300 | 200 | Extra |
|---|---|---|---|---|---|---|---|---|---|---|
| **SunOrange** (main brand orange) | #6D3411 | #924517 | #B6561D | #C25C1E | #DB6822 | **#F37326** | #FBD4BC | #FDEADE | #FEF1E9 | Background **#FFF4E0** · Accent **#FEE8C2** |
| **SunHoney** | #6C2A10 | #903816 | #B4461B | #C04A1D | #D85420 | **#F05D24** | #FACDBB | #FDE7DE | #FEEFE9 | |
| **SunYellow** (red-orange in value) | #6B2010 | #8E2B15 | #B2361A | #BE3A1C | #D54120 | **#ED4823** | #F9C6BB | #FCE4DE | #FDEDE9 | |
| **Green** | #004D23 | #00672F | #00672F | #00803B | #009A46 | **#00AB4E** | #C7EDC5 | #D9F2E4 | #E6F7ED | |
| **Yellow** | #706A10 | #958E15 | #BAB11A | #C6BD1C | #DFD420 | **#F8EC23** | #FDF9BB | #FEFCDE | #FEFDE9 | |
| **Greyscale** | #111111 | #5E5E5E | #303030 | #474747 | #777777 | #919191 | #DADADA | #EEEEEE | #F7F7F7 | White #FFFFFF |

**Problems in the variables [FIGMA]:**
- `Green/800` and `Green/900` have the same value (#00672F).
- `Greyscale/900` (#5E5E5E) is *lighter* than `Greyscale/800` (#303030), so the scale is out of order.
- The scale named "SunYellow" holds red-orange values (#ED4823). The yellow hues are in the separate "Yellow" scale.

### 1.2 Most-used fill colors in the "Final Version" frames [FIGMA]
Counted across about 24,600 nodes. Raw hex values are used directly on layers. Many colors on the canvas are **not** linked to variables.

| Hex | Uses | Variable match | Likely role |
|---|---|---|---|
| #F37326 | 3,324 | SunOrange/500 | Primary brand orange (backgrounds, headings, buttons) |
| #FFFFFF | 2,846 | Greyscale/White | Cards, text on orange |
| **#FFEED7** | 1,710 | — none | Cream page background |
| #000000 / #010101 | ~2,976 | — none | Mostly from logos, illustrations and pattern vectors **[UNVERIFIED]** |
| #FFBC64, #FBB040, #FAAF40 | ~2,000 | — none | Warm yellow accents and illustrations |
| #F58427, #FD8800, #F47427, #F37427 | ~1,900 | — none (close to SunOrange/500) | Orange variants, probably in illustrations |
| #004D23 | 536 | Green/950 | Dark green headings ("Chia sẻ của bạn về…") |
| #0CA44C, #10A047, #00AB4E, #088446, #00803B | ~1,200 | partly Green/500, Green/700 | Green buttons, the melon stem graphic |
| #FFCE09, #F8EC23, #FCD600 | ~520 | Yellow/500 partly | Yellow highlights, flower decorations |
| #FFF4E0 | 100 | SunOrange/Background | Section background |
| #ED4823, #F05D24 | ~120 | SunYellow/500, SunHoney/500 | Product-specific accents |

**[REC]** In code, define CSS tokens from the **variables** (1.1). Add two extra tokens for colors that are used in key components but have no variable: `--color-cream: #FFEED7` (page background) and `--color-honey-card: #FBB040` (contact card). Do not turn every one-off illustration color into a token.

### 1.3 Gradients [FIGMA]
- Brown-to-white fade: `#B34B00 → … → #FFFFFF` (12 stops, 144 uses). Probably image overlays or vignettes **[UNVERIFIED]**.

---

## 2. Typography

### 2.1 Font families [FIGMA]

| Family | Weights used | Where | Availability |
|---|---|---|---|
| **Nunito** | SemiBold 600, Bold 700, ExtraBold 800 | All headings and body text | ✅ Free on Google Fonts |
| **October Compressed** (display) | **Site: October Compressed H+L Heavy, weight 850** (see §6) | Display titles, slogans ("CHUẨN GIÒN…", product names, section titles) | ❌ **Missing.** Not installed in the Figma environment (16 text nodes flagged *missing font*). Commercial typeface: **you need to supply licensed web-font files** |
| Roboto SemiBold 16 | 1 node | Stray use | Ignore **[REC]** |
| Inter Regular ~102 | 1 node | Stray use | Ignore **[REC]** |

### 2.2 Local text styles [FIGMA]

| Style | Family / weight | Size | Line height | Letter spacing |
|---|---|---|---|---|
| H1/Bold | Nunito 800 | 56 | 72 | 0 |
| H2/Bold | Nunito 800 | 49 | 58.8 | 0 |
| H2/Regular | Nunito 700 | 49 | 58.8 | 0 |
| H3 / Bold | Nunito 800 | 39 | 46.8 | 0 |
| H4/Bold | Nunito 800 | 31 | 37.2 | 0 |
| H4/Regular | Nunito 700 | 31 | 37.2 | 0 |
| H5/Bold | Nunito 800 | 25 | 32 | 0 |
| H5/Mobile | Nunito 800 | 20 | auto | 0 |
| BodyLg/Bold | Nunito 700 | 20 | 24 | 0 |
| BodyLg/Regular | Nunito **600** | 20 | auto | 0 |
| Body/Bold | Nunito 700 | 16 | auto | −0.5% |
| Body/Regular | Nunito **600** | 16 | auto | −0.5% |
| Subtitle/Bold | Nunito 700 | 14 | 18 | 0 |
| Subtitle/Regular | Nunito 600 | 14 | 18 | 0 |
| Caption/Bold | Nunito 700 | 12 | 14.4 | 0 |
| Caption / Regular | Nunito 600 | 12 | 14.4 | 0 |
| Footnote / Bold | Nunito 700 | 10 | auto | 0 |
| Footnote / Regular | Nunito 600 | 10 | auto | 0 |
| OT/Display | October Compressed H+L Heavy | 72 | 90 | 0 |
| OT/Subheading *(name used twice)* | October Compressed H+L Heavy | 48 | 56 | 2% |
| OT/Subheading *(name used twice)* | October Compressed H+L Heavy | 28 | auto | 2% |
| OT/Title | October Compressed H+L Heavy | 32 | auto | 2% |

Notes [FIGMA]: all "Regular" styles use **SemiBold (600)**, not 400. Two different styles are both named `OT/Subheading`.
The type scale follows a ratio of about 1.25 (10 → 12 → 14 → 16 → 20 → 25 → 31 → 39 → 49 → 56).

### 2.3 Sizes actually used on the canvas [FIGMA]
Most common: Nunito Bold 14 (374), Bold 16 (244), SemiBold 16 (219), Bold 20 (98), ExtraBold 20/25 (79 each).
The display font is used at 16, 20, 24, 28, 32, 40, 48, 72, 80, 81 and 100 (sizes from Figma, unchanged). Sizes 40, 80, 81 and 100 are **not** in any text style.

Mobile type sizes measured on the canvas are in §5.8. Only `H5/Mobile` exists as a text style.

---

## 3. Spacing, layout and radius

### 3.1 Number scale — "Primitives / Number Scale/2's" [FIGMA]
`3XS 2 · 2XS 4 · XS 8 · Small 12 · Medium 16 · Large 20 · XL 24 · 2XL 28 · 3XL 32 · 4XL 48 · 5XL 64 · Full 1000`

### 3.2 Radius tokens — "Sizing Token" [FIGMA]
`Radius/XS 8 · Radius/Sm 16 · Radius/Md 20 · Radius/Lg 24 · Radius/XL 32 · Radius/Full 1000 (pill)`
How often each corner radius is used on the canvas: 1000 (340) · 16 (155) · 8 (84) · 20 (54) · 24 (33) · 32 (33) · 4 (19) · 2 (9) · 12 (3).

### 3.3 Component tokens — "Component Token" (modes Small / Medium / Large) [FIGMA]

| Token | Small | Medium | Large |
|---|---|---|---|
| Radius | 1000 | 1000 | 1000 |
| Spacing (gap) | 8 | 8 | 8 |
| Icon Size | 16 | 24 | 28 |
| V-padding | 12 | 12 | 12 |
| H-padding | 16 | 20 | 24 |
| Full Padding (icon-only button) | 8 | 12 | 12 |

These are the button size tokens (they match the Small/Medium/Large variants of Pansy-Button).

### 3.4 Grid and containers (from frame and child positions) [FIGMA]

| | Desktop | Mobile |
|---|---|---|
| Frame width | **1440** | **375** |
| Content container | **1128 px**, centered (x = 156 → 156 px side margins) | **343 px** (16 px side margins) |
| Narrow reading column | **744 px** (x = 348): product spec table, recipe body | 343 |
| Full-bleed backgrounds | Drawn at **1920 px** wide (x = −240) so they reach past 1440 | Some drawn wider than 375 and clipped |
| Header | 1128 × 88, overlaid on the hero | Menu bar 375 × 72 |
| Gap between sections | **200 px** (consistent on Home: 1860→2060, 2632→2834, 3596→3796, 4619→4819, 5392→5592) | **~120 px** (Home: 2264→2384, 2926→3046, 5356→5476, 6630→6750; one gap ≈ 99) |
| Hero height | 919 (Home), 900 (About), 853 (product detail), 600 (inner-page banners) | 842 / 880 / 780 / 500–600 |

Layout grids are confirmed in §5.1: desktop 12 × 72 with a 24 px gutter; mobile 4 columns with a 16 px gutter.

### 3.6 Responsive requirements (approved 2026-11-10) [REC]
Figma has only 1440 and 375. The site must work, without horizontal scroll, clipped text or a scaled-down desktop layout, at:

| Width | Device | Layout |
|---|---|---|
| 1920 | Large desktop | Desktop; content stays 1128 centred, backgrounds full width |
| 1440 | Desktop | Figma desktop |
| 1366 | Laptop | Desktop |
| 1024 | Small laptop | Desktop header and layouts; fluid where fixed Figma widths do not fit (testimonial offset, product art 420 px, process band without side bleed until 1300 px) |
| 768 | Tablet | Mobile structure with tablet grids; content capped at 704 px and centred up to 1023 |
| 430 | Large mobile | Mobile |
| 375 | Mobile | Figma mobile |
| 320 | Small mobile | Mobile |

Breakpoints (`globals.css`): sm 640, md 768, lg 1024, xl 1200 (plus 1300 for the two bleed exceptions above). Images keep their aspect ratios (`aspect-*` or intrinsic size). Touch targets are at least 24 × 24 px: small text links get invisible vertical padding, and small icon controls (carousel dots, menu arrows) get an invisible `::after` hit area (2026-11-11). Images inside fixed Figma boxes use `object-cover` so they never stretch. Verified 2026-11-11 on all pages at the eight widths above (Chrome only).

### 3.5 Effects — local Effect Styles [FIGMA]
**Hard offset shadows with no blur** (a "neo-brutalist" look):

| Style | Offset | Blur | Color |
|---|---|---|---|
| S | 6, 6 | 0 | #111111 @ 50% |
| Md | 12, 12 | 0 | #111111 @ 50% |
| Lg | 20, 20 | 0 | #111111 @ 50% |

---

## 4. Motion [FIGMA]

Annotation on the canvas (node `2893:36165`), translated:
> "Animation applies to both Desktop and Mobile: when the user scrolls to a section, that section appears with a **Fade In + Slide Up** effect."

Other motion shown by component variants [FIGMA]:
- Section components come in **Start/Default** or **1/2** variant pairs (Hero, Image, ĐỊA CHỈ…, Menu, Social, Giới thiệu, Testimonials). These are the before and after states of the scroll reveal.
- **Carousels**: Carousel-1 (marquee ticker), Carousel-m, Hành trình (11-step timeline), Hoạt động sx (5), Quy trình (4), Testimonials (4), Số liệu (5), Giá trị cốt lõi (4), Dịp (4).
- **Hover states**: Pansy-Button (Hover/Press/Focus), the *Hover* set, the *Hover Sản phẩm* dropdown, and occasion cards (Chưng cúng / Sum họp / Biếu: 2 variants each).
- **Accordion**: FAQ and FAQ-Mobile (open and closed).
- **Tabs**: product spec "thông số" / "hàm lượng".

Not specified in Figma: durations, easing and slide distance **[REC]**. A suggested default is 600 ms, ease-out, 24–40 px translateY, run once per section, and turned off when `prefers-reduced-motion` is set.

---

## 5. Component specs — verified via the Figma REST API (2026-11-09) [FIGMA]

### 5.1 Layout grids
| Frame | Grid |
|---|---|
| Desktop (all pages) | **12 columns × 72 px, 24 px gutter, centered** (= 1128 px) |
| Mobile | **4 columns, stretch, 16 px margin, 16 px gutter** (= 343 px) |

### 5.2 Pansy-Button (`124:2919`)
All buttons are pill-shaped (radius 1000), Nunito Bold, laid out with auto-layout.

| Size | Height | Padding (V / H) | Text | Icon |
|---|---|---|---|---|
| Small | 34 | 8 / 16 | 14 / 18 | 16 |
| Medium | 38 | 8 / 20 | 16 / 21.8, ls −0.5% | 24 |
| Large | 48 | 12 / 24 | 20 / 24 | 28 |
Icon-only buttons (Icon = Alone) are square (Large = 52×52). The gap between text and icon is 8.
**Note:** the canvas uses V-padding **8** for Small and Medium. The Component Token says 12. Follow the canvas.

| Type | Default bg / text | Hover bg | Press bg | Focus | Disabled bg / text |
|---|---|---|---|---|---|
| **Green** | #00AB4E / #FFFFFF | #009A46 | #00803B | + 3 px ring #C7EDC5 | #DADADA / #F7F7F7 |
| **Orange** | #F37326 / #FFFFFF | #DB6822 | #C25C1E | + 3 px ring #FBD4BC | #DADADA / #F7F7F7 |
| **Yellow** | #F8EC23 / #004D23 | #DFD420 | #C6BD1C | + 3 px ring #FDF9BB | #DADADA / #F7F7F7 |
| **White** | #FFFFFF / #004D23 | #EEEEEE | #DADADA | + 3 px ring #DADADA | #DADADA / #EEEEEE |
| **Ghost** | no bg, text #004D23, no padding | — | — | — | — |
| **Outline** | 1 px border #004D23, text #004D23, padding 4 / 12 | — | — | — | — |
Hover, Press and Focus use the 600, 700 and 400 steps of the same color scale. Ghost and Outline exist **only in Small / Default** (one variant each).

**Approved brand button colours (2026-11-10):** Orange **#F37326**, Green **#00AB4E**, Yellow **#F8EC23**, exactly as in Figma; one set across all pages, no darker orange/brown variants. Text stays as in Figma: white on Orange and Green (2.9 : 1 and 3.0 : 1, below WCAG AA for body-size text, a known and accepted gap), dark green #004D23 on Yellow (12.4 : 1). Coloured cards (product rows, core values, green recipe card) also use the Figma 500 shades.

How often the button is used on the pages (126 instances): Green Medium 33 · Orange Medium 17 · Green Small 17 · White Small 14 · White Medium 11 · others are fewer.

### 5.3 Header / navigation
- **Desktop navbar:** a white pill bar, 1128 × 64 (radius 1000), horizontal padding 32. The 88 px Header frame adds vertical space around it, and the bar floats over the hero.
  Logo (vector, 89 × 37) on the left. Nav links on the right with a 32 px gap: Nunito Bold 16, color **#004D23**.
  **Hover state:** a 1.5 px underline in #004D23 appears 2 px under the text.
  "Sản Phẩm" has a chevron (10 × 5). Last item: Orange Medium button "Liên Hệ".
- **Sản Phẩm dropdown:** white panel, 136 px wide, radius 8, no shadow. 3 items: "Dưa lưới SunOrange / SunYellow / SunHoney" in **October Compressed L 16 / 24**, color #F37326, padding ≈ 12 / 10. The hover underline is 1 px #F05D24.
- **Mobile bar:** 375 × 72, holding a white pill 344 × 56 (padding 0 / 8 / 0 / 24). Logo on the left; on the right, an **orange round 40 px hamburger button** (#F37326) with 3 lines.
- **Mobile menu (open):** full screen 375 × 812, background **#FFF4E0**. The nav bar stays at the top. Links are stacked (padding 40 / 16, gap 24): Về Pansy · Sản Phẩm (expands into the 3 products, gap 16–20) · Thực Đơn · **Green** Medium button "Liên Hệ".

### 5.4 Cards
| Card | Size | Spec |
|---|---|---|
| **Product card** (home) | 360 × 410 (3 across, gap 24) | White, radius 20, **4 px border in the product color** (SunOrange #F37326, SunYellow #ED4823, SunHoney #F05D24), padding 28, gap 16. Image area 304 × 249. Title in **October Compressed L 32 / 41.6**, ls 2%, product color. Tagline Nunito Bold 16 #004D23 |
| **Occasion card** | 360 × 453 (3 across, gap 24) | Image background with a **gradient from transparent to #F37326** at the bottom, radius 24, padding 28, hard shadow ≈ 4.5 / 4.5 #111111 @ 50% |
| **Testimonial card** | ≈ 795 × 268 | A speech-bubble shape with a **hard shadow ≈ 10 / 10 (no blur)**. Round avatar 220 px, gap 20. Text column 436 px |
| **Section eyebrow** | — | Nunito Bold 14 / 18, uppercase, color **#00803B** (Green/700). Gap of 24 to the title |
| **Section title** | — | Desktop Nunito ExtraBold 49 / 58.8 (H2). Color #F37326 on cream backgrounds, #FFFFFF on orange |

### 5.5 Contact form (in the Footer component `2899:42099` and on the Contact page)
- Card: **radius 32, background #FBB040** (warm yellow; it has no variable), about 1128 × 581, with a photo on the right.
- Title "Liên hệ với Pansy": **October Compressed L 48 / 56**, ls 2%, white.
- Form column 422 px wide; gap 16 between fields, 25 between groups.
- **Text inputs:** height 40, **pill (radius 1000)**, background **#FFF4E0**, no border, padding ≈ 6 / 13. The label sits inside the field as a placeholder: Nunito Bold 14, color #00803B at 80% opacity.
- **Textarea:** height 89, radius 16, same colors.
- Submit: **Green** Medium button "Gửi thông tin", full width (422).
- **Success popup** (`2899:37652`): 343 wide, radius 16, background #FFF4E0, padding 24, gap 20. Green check icon, then "Gửi thông tin thành công!" (Nunito Bold 20, #004D23), the text "Cảm ơn bạn đã quan tâm đến dưa lưới Pansy. Chúng tôi sẽ sớm liên hệ." (Nunito SemiBold 14), and a Green Small button "Tiếp tục khám phá".
- **Behaviour (demo):** browser-side validation only, nothing is sent. Name and phone required, phone must be a Vietnamese number (0 + 9–10 digits, +84 accepted), email optional but checked. Errors show under each field and focus moves to the first one. The form has a no-op React `action` so a submit before hydration never puts the typed data in the URL (2026-11-11).

### 5.6 Footer
- The Footer component (1920 × 1487) contains the **Contact Us** block, the **footer** component `16:20084` (1440 × 445, which **is** in use, not legacy), and a decorative melon group (1121 × 225).
- Link columns: Nunito Bold 14 / 18, white, column gap 8. The Frame 62 row uses a 168 px gap between groups.
- Copyright line: Nunito SemiBold 12 / 14.4, white.

### 5.7 FAQ accordion
- Each item is 870 wide. The question is Nunito Bold 20 / 24, #004D23, with a 48 px **Arrow Flower** icon on the right. The answer is shown with an 8 px gap when the item is open.

### 5.8 Mobile type sizes (counted across all mobile frames)
| Use | Mobile | Desktop equivalent |
|---|---|---|
| Hero display (October) | 40 / 52 | 72 / 90 |
| Page banner title (October) | 48 / 56 | 72+ |
| October titles (product names, "Liên hệ với Pansy") | 32 / 41.6 and 28 / 36.4 | 32 / 48 |
| Section title (Nunito 800) | **31 / 37.2** | 49 / 58.8 |
| Sub-section title (Nunito 800) | 25 / 32 | 39 or 31 (depends on the section) |
| Card title (Nunito 800) | 20 / 27.3 | 25 |
| Body | 16 / 21.8 (600) · 14 / 18 | same |

## 6. Brand links and font status (updated 2026-11-11)

> **Temporary UX/UI demo (2026-11-11): display headings are set in Nunito ExtraBold 800, not October Compressed H+L Heavy.** Done by pointing `--font-display` at Nunito in `src/app/globals.css` (plus a `.font-display { font-weight: 800 }` rule) and removing `october.variable` from `<html>` in `src/app/layout.tsx` and commenting out the October declaration in `src/app/fonts.ts` (2026-11-11, so the font file is not in the build at all). Because Nunito is wider, two desktop heroes were adjusted: home title 56/68 (was 72/90) and product title 84/96 (was 100/110) with the product slogan capped at 527 px; each change is marked "Nunito demo" in the code. Headings show **full Vietnamese with accents** in the demo (your decision 2026-11-11): `STRIP_ACCENTS = false` in `src/components/ui/DisplayText.tsx` (the unaccented rule and `toLatin()` are kept, just switched off). **To restore Heavy:** swap the two `--font-display` lines in `globals.css`, delete the `.font-display` weight rule, add `october.variable` back in `layout.tsx`, uncomment the October block (and its `localFont` import) in `fonts.ts`, set `STRIP_ACCENTS = true` in `DisplayText.tsx`, and undo the three "Nunito demo" size tweaks.

**Display font status (confirmed by Pansy 2026-11-11):**
- **Current display font:** October Compressed H+L Heavy (weight 850), file `src/app/fonts/OctoberCompressedHL-Heavy.woff2`. Implementation and the heading rule (`DisplayText`: unaccented Vietnamese on screen, full Vietnamese for screen readers) stay as they are.
- **Files match:** the supplied TTF and the site WOFF2 are the same font (all tables identical except checksum and the WOFF2 flag).
- **No OnlineWebFonts attribution:** kept out of the footer by Pansy's decision, because the specific licensing terms for this font remain unverified (the CC BY 4.0 notice is not shown to apply to a Typotheque font).
- **Public deployment pending:** no public deploy or distribution with this font until the licence (Typotheque web embedding / commercial use) is confirmed.

- **Social profiles:** Facebook https://www.facebook.com/PansyMelonVietnam · TikTok https://www.tiktok.com/@pansymelon.official (both answered 200 when checked). External links open in a new tab with `rel="noopener noreferrer"`. Instagram and Zalo appear in Figma but Pansy has no URLs, so they were removed (2026-11-10).
- **Display font:** **October Compressed H+L Heavy** (Typotheque, v1.0, Regular style, weight 850; PostScript `OctoberCompressedH+L-Heavy`), used for every display heading. Sizes, line heights and letter spacing follow the Figma text styles. Web file `src/app/fonts/OctoberCompressedHL-Heavy.woff2` (WOFF2, 34 KB). Verified 2026-11-11 against the supplied TTF (`c020adb2187fcfabcfc64f60feee1d8e.ttf`, 159 KB): same family, style, version 1.0, weight 850, metrics, 439 glyph outlines and advance widths, kerning and every other table; the only differences are the checksum and the WOFF2 "lossless transform" flag, so no reconversion was needed. Originals (TTF, WOFF, WOFF2, EOT, SVG, `License.txt`) are kept unchanged in the Downloads folder and copied to `_incoming/fonts/October Compressed H+L Heavy (OnlineWebFonts)/`.
- **Heading text rule:** every text in this font goes through `<DisplayText>` (`src/components/ui/DisplayText.tsx`, `toLatin()` in `src/lib/latin.ts`): shown without diacritics ("Dưa lưới" → "Dua luoi"), with the original Vietnamese in an sr-only copy. Body text, buttons, navigation, SEO metadata, alt and accessibility text keep full Vietnamese spelling.
- **Attribution:** the OnlineWebFonts credit line ("Fonts made from Web Fonts is licensed by CC BY 4.0") was **not added** to the footer. The rule was to add it only if CC BY 4.0 applies to this font, and the documents do not show that: the font itself states "Copyright (c) 2017 Typotheque.com All rights reserved" with a link to the Typotheque EULA, while the CC BY line is OnlineWebFonts' generic site notice (OnlineWebFonts is not the copyright holder, and its own notice says some fonts are trials that may need a commercial licence for embedding). Showing the line would state a licence the documents do not support. It can be added in minutes if Pansy decides otherwise.
- **Licence (unconfirmed):** no supplied document grants commercial use or web embedding of this Typotheque font. Local demo only: do not deploy publicly or distribute the font until Typotheque confirms web rights (web licence for the domain and expected pageviews), or a free alternative is chosen.

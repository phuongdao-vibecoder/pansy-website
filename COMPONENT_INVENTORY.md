# COMPONENT_INVENTORY — Pansy Website

> **Source:** Figma `Pansy (Final)` — `g4PojEPpLpLAD76MMVJ3F1` · analyzed 2026-11-09
> **[FIGMA]** = from the file · **[REC]** = proposed code component · **[UNVERIFIED]** = not yet inspected in detail

The file has **one formal design-system component** (Pansy-Button). Every other component is a **section-level component** stored in the "Component" section of the Website page. Most of their variants are **animation or carousel states**, not visual options.

---

## 1. Atoms / UI primitives

| Figma component | ID | Variants / properties [FIGMA] | Proposed code component [REC] |
|---|---|---|---|
| **Pansy-Button** | `124:2919` (page "Component") | 242 variants. **Type**: Green, Yellow, Orange, White (each: 5 states × 3 sizes × 4 icon options), plus Ghost and Outline (**Small/Default only**) · **State**: Default, Hover, Press, Focus, Disabled · **Size**: Small, Medium, Large · **Icon**: Right, Left, Alone, None · props `Text` (text), `-Icon` (instance swap) | `<Button variant size icon iconPosition>`. Hover, press, focus and disabled become CSS states, not props. Full specs are in DESIGN_SPEC §5.2 ✅ |
| **Button Arrow** | (instances, e.g. `406:19988`, "Type = Red") | Round arrow button, 52×52; variants not inspected | `<IconButton>` / carousel arrow |
| **Arrow Flower** | `297:24568` | 32 variants. **Type**: Green, Red, White, Yellow · **Direction**: Up, Down, Left, Right · **Size**: Large, Small | `<FlowerArrow color direction size>` (decorative arrow, probably used in carousels) |
| **Arrow** | `148:1364` | 24×24 icon | Icon |
| **mdi:heart** | `2899:38252`, `2899:38242`, `2899:38244` | Frames: 32 and 24 px (Material Design Icons) | Icon (testimonial "like") |
| **Date** | `162:20766` | Single component | `<DateBadge>` (news and recipe cards) **[UNVERIFIED]** |
| **Hover** | `2227:5508` | 2 variants: nav link default, and with a 1.5 px #004D23 underline ✅ | CSS hover state on `<NavLink>` |
| **Component 1** | `2122:4774` | 2 variants: dropdown item default, and with a 1 px #F05D24 underline ✅ | CSS hover on a dropdown item |

## 2. Layout / global

| Figma component | ID | Variants [FIGMA] | Proposed code [REC] |
|---|---|---|---|
| **navbar** | `2227:5316` | 1 variant (Default) | `<SiteHeader>` desktop |
| Header frames on each page | e.g. `2384:22980` | Plain frames (1128×88), **not instances** | Same `<SiteHeader>` |
| **Hover Sản phẩm** | `2122:4722` (frame) | Products dropdown, 136×120 | `<NavDropdown>` |
| **Menu** (mobile bar) | Frames `2955:36390` 375×72; `2955:36410` and `2955:36357` 375×812 | Closed bar plus 2 full-screen open states | `<MobileNav>` (drawer) |
| **Menu Expand** | `2925:45161` | 2 variants | Accordion inside the mobile menu: "Sản Phẩm" expands to show the 3 products (see the open-menu frames) ✅ |
| **Footer** (current) | `2899:42099` | 1920×1487. Includes the "Liên hệ với Pansy" form plus the link footer | `<ContactSection>` + `<SiteFooter>` |
| footer | `16:20084` 1440×445 (desktop); `161:11347` 375×698 (mobile) | **In use**: the desktop one is nested inside the Footer component ✅ | `<SiteFooter>` |
| Contact page footer | inside `406:18016` | Footer without the form, plus FAQ | `<SiteFooter>` alone |
| **Carousel-1** | `2774:57296` | 4 variants (1, 2, Variant3, Variant4). 1920×32 marquee | `<Marquee>` (CSS infinite scroll) |
| **Pop up** | `2899:37652` (frame) | 343×242. **Confirmed: the form-success modal** "Gửi thông tin thành công!" ✅ | `<SuccessDialog>` |

## 3. Home sections

| Figma component | ID | Variants [FIGMA] | Proposed code [REC] |
|---|---|---|---|
| **Hero** | `2339:7384` | 2 (1 = start, 2 = end) | `<HomeHero>` |
| **Giới thiệu** (home) | `2384:7393` | 3 | `<IntroSection>` |
| **Products** | `2384:8067` | 4 | `<ProductLineSection>` + `<ProductCard>` |
| **Image** | `2339:15238` | 2 (Default, Start) | Scroll-reveal state |
| **Image** (occasions / store) | `2774:10700` | 12 (4, 1, 2, 3, Variant1–4, điểm bán1–4) | `<OccasionsSection>`, store-activity gallery |
| **Dịp** | `2774:11992` | 4 | `<OccasionCard>` set |
| **Chưng cúng / Sum họp / Biếu** | `2384:7980`, `2384:7986`, `2384:7989` | 2 each (default and hover/expanded) | `<OccasionCard>` with a hover reveal |
| **Testimonials** | `2679:32331` | 4 | `<TestimonialCarousel>` + `<TestimonialCard>` |
| **ĐỊA CHỈ MUA DƯA LƯỚI** | `2384:8927` | 2 (Default, Start) | `<WhereToBuy>` + retailer logo grid |
| **Carousel-m** | `2128:5948` | 3 | Mobile recipe carousel |
| **Card tổng hợp** | `2155:5527` | 3 | `<RecipeCard>` (large carousel card) **[UNVERIFIED]** |
| **Card 1** | `2774:42190` | 1 | Card (recipe/news) **[UNVERIFIED]** |
| **Social** | `2515:9668` | 2 (Default, Start) | `<SocialGrid>` "Theo dõi @Pansymelon" |
| **Menu** (section) | `2515:9557` | 2 (Start, Default) | Recipe section reveal state |
| **Contact Us** | `2515:8462` | 2 | `<ContactForm>` |
| **Contact us - Mobile** | `164:5770` | 1 | Same, responsive |

## 4. About sections

| Figma component | ID | Variants [FIGMA] | Proposed code [REC] |
|---|---|---|---|
| **Giới thiệu** (about) | `2774:43055` | 3 (1, Variant2, Variant3) | `<StoryCarousel>` (3 stories) |
| **Giá trị cốt lõi** | `2774:43251` | 4 | `<CoreValues>` (tabs or carousel) |
| **Số liệu** | `2774:44312` | 5 | `<StatsSection>` (29 / 30 / 4 / 70.000+) |
| **Bản đồ** | `2774:43863` | 2 | `<RegionMap>` |
| **Hành trình** | `2774:37740` | 11 (one per timeline step) | `<Timeline>` |
| **Hoạt động sx** | `2774:44516` | 5 | `<ActivityCarousel>` |

## 5. Products and product detail

| Figma component | ID | Variants [FIGMA] | Proposed code [REC] |
|---|---|---|---|
| **SunOrange 1 / SunYellow 1 / SunHoney 1** | `2384:53441`, `2384:53444`, `2384:53447` | 2 each | `<ProductRow>` (Products page) |
| **SunOrange 2 / SunYellow 2 / SunHoney 2** | `2384:54040`, `2384:54044`, `2384:54048` | 2 each | Mobile product block |
| **SunOrange 3 / SunYellow 3 / SunHoney 3** | `2311:5557`, `2311:5560`, `2311:5563` | 2 each | Product card (cross-sell) |
| **SunOrange 4 / SunYellow 4 / SunHoney 4** | `2417:56972`, `2417:56969`, `2417:56966` | 3 each (1, 2, mobile) | Product detail hero / info |
| SunYellow 5 / SunHoney 5 | `2915:38830`, `2915:38868` (frames) | 320×597 | Cross-sell card |
| **[Product]-thông số** | `2568:8701`, `2568:8704`, `2568:8707` (desktop); `2578:9145`, `2576:10288`, `2576:10285` (mobile) | 2 each (thông số, hàm lượng) | `<SpecTabs>` (spec and nutrition tables) |
| **Quy trình** | `2774:51683` | 4 | `<GrowingProcess>` (01–03) |

**[REC]** The three products share one layout, so build each set as **one component driven by product data** (name, color theme, images, specs). Do not build three separate copies.

## 6. Recipes / media

| Figma component | ID | Variants [FIGMA] | Proposed code [REC] |
|---|---|---|---|
| **Video** | `2162:8373` | 3 | Mobile video block |
| **Video-d** | `2174:5119` | 2 | `<VideoFeature>` (desktop) |
| **FAQ** | `2174:6942` | 2 (open, closed) + `Text` prop | `<FaqAccordion>` |
| **FAQ - Mobile** | `2174:7502` | 2 | Same, responsive |

---

## 7a. Built so far (code)

| Code component | File | Figma source |
|---|---|---|
| `Button` | `src/components/ui/Button.tsx` | Pansy-Button 124:2919 |
| `Reveal` | `src/components/motion/Reveal.tsx` | Scroll annotation 2893:36165 |
| `Marquee` | `src/components/ui/Marquee.tsx` | Group 2384:22716 / Carousel-1 |
| `SiteHeader` (desktop dropdown + mobile menu) | `src/components/layout/SiteHeader.tsx` | navbar 2227:5316, Hover Sản phẩm 2122:4722, Menu 2955:36357 |
| `SiteFooter` | `src/components/layout/SiteFooter.tsx` | Footer 2899:42099, footer 16:20084 / 161:11347 |
| `ContactSection` | `src/components/sections/ContactSection.tsx` | Contact Us 2515:8462, Contact us - Mobile 164:5770 |
| `ContactForm` + success dialog | `src/components/forms/ContactForm.tsx` | Frame 59, Pop up 2899:37652 |
| `ComingSoon` | `src/components/layout/` | — (not designed) |
| `MelonSection` | `src/components/layout/SiteFooter.tsx` | Melon Bg 2384:22860 |
| `Carousel` | `src/components/ui/Carousel.tsx` | Arrow Flower 297:24568, Slider Dots |
| `HomeHero` | `src/components/sections/home/HomeHero.tsx` | Hero 2339:7384 |
| `HomeIntro` + `FeatureTiles` | `src/components/sections/home/HomeIntro.tsx`, `sections/FeatureTiles.tsx` | Giới thiệu 2384:7393 |
| `ProductLines` + `ProductCard` | `src/components/sections/ProductLines.tsx` | Products 2384:8067, SunOrange/Yellow/Honey 3 |
| `Occasions` | `src/components/sections/Occasions.tsx` | Image 2774:10700, Chưng cúng / Sum họp / Biếu |
| `Testimonials` | `src/components/sections/Testimonials.tsx` | Testimonials 2679:32331 |
| `WhereToBuy` | `src/components/sections/WhereToBuy.tsx` | ĐỊA CHỈ MUA DƯA LƯỚI 2384:8927 |
| `RecipeCarousel` | `src/components/sections/RecipeCarousel.tsx` | Menu 2515:9557, Card tổng hợp |
| `SocialFeed` | `src/components/sections/home/SocialFeed.tsx` | Social 2515:9668 |

## 7. Proposed shared code components [REC]

The repeated patterns found above are reduced to this set for the build:

`SiteHeader` · `MobileNav` · `SiteFooter` · `ContactSection` (form) · `Button` · `IconButton` · `SectionHeading` (eyebrow + title, with October and Nunito variants) · `Marquee` · `Reveal` (fade-in and slide-up on scroll) · `Carousel` · `ProductCard` · `ProductRow` · `SpecTabs` · `OccasionCard` · `TestimonialCard` · `RecipeCard` · `NewsCard` · `RetailerLogoGrid` · `SocialGrid` · `Timeline` · `StatsSection` · `FaqAccordion` · `Breadcrumb` · `PageBanner` · `Pagination` · `CategoryTabs`.

Sections that repeat across pages (reuse them in code):

| Section | Appears on |
|---|---|
| Where to buy ("Tìm mua Dưa lưới Pansy tại") | Home, About, Products, all 3 product details |
| Recipes carousel ("Gợi ý từ căn bếp Pansy") | Home, all 3 product details |
| Testimonials | Home, Products |
| Occasions (3 cards) | Home, Products |
| Contact form + footer | Every page except Contact |
| Marquee ticker | Home, About, Products, product details, Thực đơn |

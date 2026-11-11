# SITEMAP — Pansy Website (Frontend Demo)

> **Source:** Figma file `Pansy (Final)` — key `g4PojEPpLpLAD76MMVJ3F1`
> **Analyzed:** 2026-11-09 via Figma MCP (read-only)
>
> **Legend**
> - **[FIGMA]**: read directly from the Figma file (node names, IDs, sizes, text, order)
> - **[REC]**: Claude's recommendation. Not part of the design. Needs your approval.
> - **[UNVERIFIED]**: needs another Figma pass. The Figma Starter-plan MCP call limit was hit during this analysis.

---

## 1. File structure [FIGMA]

| Figma page | ID | Contents |
|---|---|---|
| **Website** | `0:1` | Section **"Final Version"** (`406:17798`): all page designs.<br>Section **"Component"** (`2002:23023`): ~70 section-level components and variant sets.<br>Floating annotation text (`2893:36165`) |
| **Component** | `124:2920` | Only one item: **Pansy-Button** component set (`124:2919`, 242 variants) |

The design has **9 page templates**. Each one has a Desktop frame (1440 px) and a Mobile frame (375 px). They sit inside Figma Sections whose names end in "-DONE".

## 2. Pages [FIGMA]

| # | Page (Figma section name) | Desktop frame | Mobile frame | Route (Vietnamese slugs ✅ approved) |
|---|---|---|---|---|
| 1 | Home — `Home-DONE` | `2384:22325` "Home-Desktop" 1440×9017 | `406:19593` "Home-mobile" 375×10278 | `/` |
| 2 | About / Về Pansy — `About-DONE` | `2673:28685` 1440×12827 | `406:24188` 375×14507 | `/ve-pansy` |
| 3 | Products / Sản phẩm — `Sản phẩm-DONE` | `2417:54168` 1440×10778 | `406:31280` 375×12834 | `/san-pham` |
| 4 | SunOrange detail — `SunOrange - DONE` | `406:33571` 1440×8959 | `406:34432` 375×9997 | `/san-pham/sunorange` |
| 5 | SunYellow detail — `SunYellow-DONE` | `406:35104` 1440×8959 | `406:35963` 375×9971 | `/san-pham/sunyellow` |
| 6 | SunHoney detail — `SunHoney-DONE` | `406:36617` 1440×8959 | `406:37268` 375×9956 | `/san-pham/sunhoney` |
| 7 | Menu (recipe list) / Thực đơn — `Thực đơn - DONE` | `406:37920` 1440×5606 | `2955:36548` (wraps `2174:5853`) 375×4967 | `/thuc-don` |
| 8 | Recipe detail / Công thức — `Công thức-DONE` | `406:38414` 1440×7148 | `406:38803` 375×7627 | `/thuc-don/[slug]` (sample: `kem-dua-luoi`) |
| 9 | Contact / Liên hệ — `Contact-DONE` | `406:17957` 1440×2730 | `406:17800` 375×2751 | `/lien-he` |

### 2.1 Official Homepage Desktop frame — ✅ confirmed: `2384:22325` (2026-11-09)

There are **two** frames named "Home-Desktop" (both 1440×9017):

| Frame | Location | What it shows [FIGMA] |
|---|---|---|
| **`2384:22325`** | Inside section `Home-DONE`, beside Home-mobile | **The finished design.** All sections are fully rendered. Its instances use the "end" variants (`Hero/Property 1=2`, `Giới thiệu/3`, `Image/4`, `Testimonials/2`, `ĐỊA CHỈ…/Default`). |
| `2417:57027` | Loose inside "Final Version", next to the animation note | The **prototype flow start point** (flow "Desktop"). It uses the "start" variants (`Hero/1`, `ĐỊA CHỈ…/Start`, etc.). In a static view most sections look empty or hidden. These are the *before* states of the scroll animation. |

**Decision (approved by you):** **`2384:22325`** is the official visual reference for building. `2417:57027` is used only to understand the animation start states.
Screenshots of both frames: `docs/figma-snapshots/`.

Prototype flows defined in the file [FIGMA]: `Desktop` → `2417:57027`, `Mobile` → `406:19593`, `Flow 1` → `406:17957` (Contact desktop).

---

## 3. Sections per page (top-to-bottom) [FIGMA]

Vertical order comes from each child's `y` position inside the frame. Section names in quotes are the visible headings. Section names in *italics* are Figma layer names.

### 3.1 Home — Desktop `2384:22325`
1. **Header / Navbar** (*Header* 1128×88, floats over the hero): logo · Về Pansy · Sản Phẩm ▾ · Thực Đơn · [Liên Hệ] button
2. **Hero** (*Hero* instance, 1920×919): "Dưa Lưới Pansy" / "CHUẨN GIÒN CHUẨN NGỌT CHUẨN PANSY"; buttons "Liên hệ ngay", "Khám phá sản phẩm"; product photo with mascots; strip "Những trải nghiệm đặc biệt bạn không muốn bỏ lỡ" + 4 badges (CHẮC GIÒN · NGỌT ĐẬM · THƠM VANI · TIÊU CHUẨN QUỐC TẾ)
3. **Marquee ticker** (*Group* 1883×27): scrolling text "CHUẨN GIÒN CHUẨN NGỌT CHUẨN PANSY ✸ DƯA LƯỚI VIỆT CHUẨN QUỐC TẾ …"
4. **Intro: "Giới thiệu Pansy"** (*Giới thiệu* instance): text + "Tìm hiểu thêm" button; 4 feature photo tiles (Độ brix 14+, Chắc giòn, Vân lưới dày, Vị béo Vanila đặc trưng); large farm/product image
5. **Product lines: "DÒNG SẢN PHẨM"** (*Frame 6952*): 3 product cards (SunOrange, SunYellow with "MỚI" badge, SunHoney) + "Điểm bán gần tôi" button
6. **Occasions: "Dưa lưới Pansy, món quà dịu dàng từ thiên nhiên dành cho bạn."** (*Image* instance): eyebrow "KHI VỊ NGỌT TRỞ THÀNH MỘT PHẦN CỦA KỶ NIỆM"; 3 cards: Dịp chưng cúng · Dịp gia đình sum họp · Dịp biếu tặng
7. **Testimonials: "Chia sẻ của bạn về Dưa lưới Pansy"** (*Testimonials* instance): review cards (Mẹ Xoài, Mẹ Huyền Lizzie) with stars, avatar, heart icon
8. **Where to buy: "Tìm mua Dưa lưới Pansy tại"** (*ĐỊA CHỈ MUA DƯA LƯỚI*): intro text + "CÁC ĐIỂM BÁN DƯA PANSY" retailer logo grid
9. **Bottom block** (*Frame 6903*, 1921×3425). It contains these in order:
   - Melon-stem graphic that turns into an orange background
   - **Recipes: "Gợi ý từ căn bếp Pansy"**: eyebrow "TƯƠI NGON MỖI NGÀY, ĐƠN GIẢN TỪ PANSY"; recipe carousel (sample "Sinh tố dưa lưới") with arrows + dots; "Xem tất cả" button
   - **Social: "Theo dõi @Pansymelon"**: 2×5 grid of video/photo thumbnails + TikTok/Facebook/Instagram icons
   - **Contact form: "Liên hệ với Pansy"**: Họ và Tên, Số điện thoại, Email, Để lại lời nhắn, [Gửi thông tin] + photo
   - **Footer**

### 3.2 Home — Mobile `406:19593`
Menu bar (375×72) → Hero (*Frame 6939*) → Intro (*Frame 6851*) → Product lines (*Frame 6886*) → Occasions (*Image*) → Testimonials (*Testimonial / 22 /*) → Where to buy (*Tìm mua dưa*) → Recipes + Social + Contact + Footer (*Frame 6850*).
Same order as desktop. The background *Pattern* sits behind the content.

### 3.3 About / Về Pansy — Desktop `2673:28685`
1. Header
2. **Hero**: "DƯA LƯỚI PANSY" / "DƯA LƯỚI VIỆT ĐẠT CHUẨN QUỐC TẾ"; intro paragraph; "CHUẨN GIÒN, CHUẨN NGỌT, CHUẨN PANSY"; buttons "Liên hệ ngay", "Tìm hiểu về Soleil Farm"
3. **"Giới thiệu Pansy"**: 3 stories: Khởi Nguồn Từ Nắng Gió · Sức Mạnh Của Công Nghệ · Gói Gọn Sự Tận Tụy
4. **"Giá trị cốt lõi"**: SỰ TƯƠI MỚI LÀ KIM CHỈ NAM · UY TÍN TRONG TỪNG LẦN TRỒNG · NGÔI NHÀ CỦA SỨC KHOẺ
5. **"Vùng trồng & thế mạnh & năng lực sản xuất"**: map (Bắc Bình, Bình Thuận) and stats: 29 Nhà Màng Đạt Chuẩn Israel · 30 Hecta · 4 Mùa Vụ/Năm · 70.000+ Điểm Bán. Then **"Chứng nhận và tiêu chuẩn của Pansy"**: 3 items
6. **"NHỮNG TRẢI NGHIỆM ĐẶC BIỆT BẠN KHÔNG MUỐN BỎ LỠ"**: Chất lượng quốc tế · Ngọt - giòn - chắc · Thơm vanila · Quà biếu sang trọng
7. **"TẦM NHÌN & SỨ MỆNH"** (inside *BG*)
8. **"LỊCH SỬ HÌNH THÀNH — MỘT HÀNH TRÌNH MỘT CHỮ TÂM-MỘT TRÁI NGON"**: timeline from 05/2023 to 08/2025 (11 steps)
9. **"Hoạt động sản xuất của Pansy"**: trồng trọt · đóng gói · phân phối xuất khẩu · tiếp thị (5-variant carousel)
10. Where to buy: "Tìm mua Dưa lưới Pansy tại"
11. Marquee ticker (*Carousel-1*)
12. **"TIN TỨC MỚI NHẤT — Chuyện nhà Pansy"**: news cards
13. Footer (with contact form)

*Note [FIGMA]:* On desktop, "Tin tức" (y=11236, h=695) and the Footer (y=11340) overlap in the frame. The order should be checked visually. **[UNVERIFIED]**

### 3.4 About — Mobile `406:24188`
Menu → Hero → Intro + Core values → Region & stats → Experiences → Vision & Mission → Timeline → Production activities → Where to buy → Ticker → News → Contact + Footer.

### 3.5 Products / Sản phẩm — Desktop `2417:54168`
1. Header
2. **Banner**: "DÒNG SẢN PHẨM CỦA / Dưa Pansy" (600 px tall, full-bleed)
3. **Product rows** (*Frame 6961*): SunOrange, SunYellow, SunHoney. Each row has a description, attribute chips and a "Xem thêm" link
4. **"Tổng quan các dòng dưa của Pansy"**: comparison table (Độ ngọt · Độ giòn · Hương vị · Hình dáng · Phù hợp)
5. **"Quy trình trồng trọt"**: 01 Gieo hạt · 02 Chăm sóc · 03 Thu hoạch (4-variant carousel)
6. **Block** (*Frame 6700*): Testimonials → "Khám phá điểm khác biệt cùng Dưa lưới Pansy" (HÌNH DÁNG · VÂN LƯỚI · BAO BÌ · ĐỘ NGỌT VÀ ĐỘ GIÒN) → Occasions (3 cards)
7. "Tìm mua Dưa lưới Pansy tại"
8. Footer

Mobile `406:31280`: Banner → Ticker → Product rows → Process timeline → Occasions + Testimonials → Where to buy → Contact + Footer.

### 3.6 Product detail — SunOrange `406:33571` (SunYellow and SunHoney use the same template)
1. Header
2. **Hero**: "SẢN PHẨM CỦA PANSY / Dưa lưới SunOrange"; slogan "ĐẬM VỊ NẮNG, NGỌT TRỌN KHOẢNH KHẮC"; large product image
3. **"THÔNG TIN CHI TIẾT"**: "Dưa Lưới Ruột Cam Pansy SunOrange" + description + 4 feature tiles
4. **"Thông số sản phẩm" / "Hàm lượng dinh dưỡng"**: tabbed spec table (744 px wide). Rows: Giống dưa, Hình dáng, Ruột quả, Hương vị, Độ ngọt, Trọng lượng, Quy cách đóng gói. Buttons "Đến nơi bán", "Liên hệ ngay"
5. **Block** (*Frame 6945*):
   - Recipes carousel "Gợi ý từ căn bếp Pansy"
   - **"Pansy tại điểm bán"**: Hoạt động dùng thử · trưng bày · tradeshow
   - **"Khám phá các dòng dưa khác từ Pansy"**: 2 cross-sell product cards
   - "Tìm mua Dưa lưới Pansy tại" + certification notes (GlobalG.A.P, GRASP)
6. Footer

Mobile versions [FIGMA]: `406:34432` (SunOrange), `406:35963` (SunYellow), `406:37268` (SunHoney).

### 3.7 Thực đơn (recipe list) — Desktop `406:37920`
1. Header
2. **Banner**: breadcrumb "TRANG CHỦ > THỰC ĐƠN"; title "Cảm Hứng từ Dưa Lưới"
3. Marquee ticker
4. **"Tuyển tập vị ngon từ dưa"**: category filter tabs (Tất cả (52), Hằng ngày (6), Trung thu (6), Giáng sinh (6), Lễ tình nhân (6), Mùa hè (6)); recipe card grid; pagination (1 2 3 4 … 15)
5. **Video section** (*Video-d*): "Những món ăn ngon từ dưa hấu có thể làm đơn giản tại nhà" + TikTok
6. Footer

### 3.8 Công thức (recipe detail) — Desktop `406:38414`
1. Header
2. **Banner**: breadcrumb "TRANG CHỦ > THỰC ĐƠN > HẰNG NGÀY"; title "Kem Dưa Lưới"
3. **Recipe body** (744 px column): stats (7 Nguyên liệu · 60 Phút · 4 Người ăn); ingredient list; numbered steps with images; "Quay về Thực đơn"; tags; comments "Bình luận (1)"
4. Decorative vectors floating at the sides
5. **"Khám phá công thức khác"**: related recipe cards + "Xem tất cả"
6. Footer

### 3.9 Contact / Liên hệ — Desktop `406:17957`
1. Header over the background image
2. **Contact block**: "Liên hệ với Pansy" form + info card "Để được tư vấn thêm" (Pansy@soleilfarm.vn · 0903 730 012 · 9:00 AM – 6:00 PM)
3. **FAQ: "CÂU HỎI THƯỜNG GẶP — Tất tần tật những điều bạn cần biết về Pansy"**: accordion with 4 questions
4. Footer (links only, no form, because the page already has one)

---

## 4. Navigation [FIGMA]

**Main nav (desktop header and mobile menu):** Về Pansy · Sản Phẩm (dropdown: *Hover Sản phẩm* frame. Items: Dưa lưới SunOrange / SunYellow / SunHoney ✅) · Thực Đơn · Liên Hệ (button)

**Footer links:** Về Pansy · Sản Phẩm · Thực Đơn · Liên Hệ | Trang Trại · Hệ Thống Phân Phối | social icons | "©Bản quyền thuộc về Pansy. Thiết kế bởi Beau Agency"

## 5. Links that point to pages with no design ⚠️

These links appear in the design, but the file has no page for them. **Decision (2026-11-09):** each one opens a simple **"Coming soon" page** with the shared header and footer (e.g. `/trang-trai`, `/he-thong-phan-phoi`, `/diem-ban`, `/tin-tuc/[slug]`). External social links open the real profiles if URLs are provided; otherwise they go to `#`.

| Link / CTA | Where it appears |
|---|---|
| Trang Trại | Footer |
| Hệ Thống Phân Phối | Footer |
| Điểm bán gần tôi / Đến nơi bán (store locator) | Home product section, product detail |
| Tìm hiểu về Soleil Farm | About hero |
| News article detail ("Chuyện nhà Pansy" cards) | About → Tin tức |
| Recipe list categories and pagination pages | Thực đơn (only one list state is designed) |
| Social posts / TikTok videos | Home, Thực đơn (external links) |

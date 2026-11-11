/**
 * Product detail content (Figma SunOrange 406:33571, SunYellow 406:35104, SunHoney 406:36617).
 * All text copied from Figma, including both tabs of the spec tables
 * ("SunOrange/SunYellow/SunHoney-thông số" component sets 2568:8701/8704/8707).
 */
import type { ImageKey } from "./images";
import type { ProductSlug } from "./site";

export type ProductDetail = {
  slug: ProductSlug;
  /** Page background (product color). */
  bg: "bg-sunorange-500" | "bg-sunyellow-500" | "bg-sunhoney-500";
  /** Hex for borders/gradients that need the raw value. */
  hex: string;
  heroImage: ImageKey;
  slogan: [string, string];
  infoTitle: [string, string];
  infoParagraphs: string[];
  featureImage: ImageKey;
  specs: { label: string; value: string }[];
};

const specLabels = [
  "Giống dưa",
  "Hình dáng bên ngoài",
  "Ruột quả",
  "Hương vị",
  "Độ ngọt (°Brix)",
  "Trọng lượng trung bình",
  "Quy cách đóng gói",
];
const specRows = (values: string[]) => values.map((value, i) => ({ label: specLabels[i], value }));

export const productDetails: Record<ProductSlug, ProductDetail> = {
  sunorange: {
    slug: "sunorange",
    bg: "bg-sunorange-500",
    hex: "#F37326",
    heroImage: "sunorange/hero-product",
    slogan: ["Đậm vị nắng,", "Ngọt trọn khoảnh khắc"],
    infoTitle: ["Dưa Lưới Ruột Cam", "Pansy SunOrange"],
    infoParagraphs: [
      "Được nuôi dưỡng từ ánh nắng rực rỡ và dòng nước tinh khiết của Soleil Farm, SunOrange mang đến trải nghiệm tròn đầy của một lát dưa lưới đúng nghĩa: giòn chắc - ngọt sâu - đậm vị tự nhiên.",
      "Với màu cam rực rỡ cùng hương thơm nhẹ nhàng, đây là lựa chọn lý tưởng cho bữa sáng tràn đầy năng lượng, buổi sum họp nhẹ nhàng, hay một món quà biếu tinh tế, gửi gắm sự tươi mới và thành ý đến người nhận.",
    ],
    featureImage: "generated/detail/sunorange-feature",
    specs: specRows([
      "SunOrange (Hami)",
      "Dáng oval dài, vỏ xanh đậm, vân lưới dày nổi rõ",
      "Màu cam tươi, mọng nước",
      "Ngọt thanh, hậu vị đậm, thơm nhẹ tự nhiên",
      "14 - 16° Brix",
      "1.3 – 3.0 kg/quả",
      "Quả lẻ / Combo 2–3 quả / Hộp quà cao cấp",
    ]),
  },
  sunyellow: {
    slug: "sunyellow",
    bg: "bg-sunyellow-500",
    hex: "#ED4823",
    heroImage: "sunyellow/hero-product",
    slogan: ["Mềm dịu vừa đủ", "Ngọt lành sẻ chia"],
    infoTitle: ["Dưa Vàng Ruột Cam", "Pansy SunYellow"],
    infoParagraphs: [
      "Mang sắc vàng óng ánh cùng kết cấu dẻo ngọt vừa phải, SunYellow là dòng dưa lưới gợi nhiều cảm xúc: từ mứt handmade trong ngày lễ đến những lát dưa mát lành trên bàn thờ gia tiên, hay món tráng miệng cuối tuần.",
      "Vị ngọt thanh đọng lâu, lớp vỏ mỏng dễ gọt và hình dáng cân đối khiến SunYellow là lựa chọn yêu thích cho các hộp quà biếu tặng hoặc các dịp lễ cần một loại trái cây chưng cúng với ngoại hình tinh tế, mang ý nghĩa sâu sắc.",
    ],
    featureImage: "generated/detail/sunyellow-feature",
    specs: specRows([
      "SunYellow (Hami)",
      "Dáng oval dài, vỏ vàng, vân lưới trắng nhẹ",
      "Màu cam tươi, mọng nước",
      "Ngọt thanh, hậu vị đậm, thơm nhẹ tự nhiên",
      "14 - 16° Brix",
      "2 – 3.0 kg/quả",
      "Quả lẻ / Combo 2–3 quả / Hộp quà cao cấp",
    ]),
  },
  sunhoney: {
    slug: "sunhoney",
    bg: "bg-sunhoney-500",
    hex: "#F05D24",
    heroImage: "sunhoney/hero-product",
    slogan: ["Vị ngọt đậm đà,", "Trọn vẹn từng giọt nắng"],
    infoTitle: ["Dưa Lưới Đế Đặc Mật", "Pansy SunHoney"],
    infoParagraphs: [
      "Mật ngọt từ nắng - Dưa lưới Mật SunHoney là kết tinh của ánh nắng, đất lành và sự chăm sóc tỉ mỉ. Từng trái dưa sở hữu vị ngọt đậm đà như mật, ruột cam tươi sáng và độ giòn thanh mát.",
      "Không chỉ là trái cây - mỗi quả dưa SunHoney là lời cam kết về chất lượng, sự tận tâm và trải nghiệm cao cấp dành cho người thưởng thức.",
    ],
    featureImage: "generated/detail/sunhoney-feature",
    specs: specRows([
      "SunHoney",
      "Dáng oval tròn, màu xanh đậm, vân lưới dày",
      "Màu cam tươi, mọng nước",
      "Ngọt đậm như mật, thơm nhẹ tự nhiên",
      "14 - 16° Brix",
      "2.1 – 3.0 kg/quả",
      "Quả lẻ / Combo 2–3 quả / Hộp quà cao cấp",
    ]),
  },
};

/** "Hàm lượng dinh dưỡng" tab — identical for the three products in Figma. */
export const nutrition = [
  { label: "Năng lượng", value: "~34 kcal" },
  { label: "Nước", value: "~90 g" },
  { label: "Vitamin A (từ Beta-Carotene)", value: "~169 µg RAE" },
  { label: "Beta-Carotene", value: "~2,020 µg" },
  { label: "Vitamin C", value: "~36.7 mg" },
  { label: "Vitamin E", value: "~0.05 mg" },
  { label: "Kali", value: "~267 mg" },
  { label: "Folate (Vitamin B9)", value: "~21 µg" },
  { label: "Chất xơ", value: "~0.9 g" },
];

export const certifications = {
  intro: [
    "Việc nắm thông tin hàng hóa sẽ giúp quý khách an tâm hơn khi sử dụng, đặc biệt với hàng nông sản.",
    "Xem nội dung ở tem phụ trên mỗi thùng sản phẩm sẽ giúp bạn truy xuất được thông tin cụ thể.",
  ],
  items: [
    {
      title: "Canh tác an toàn,\nbền vững, trách nhiệm.",
      text: "Dưa lưới Pansy được trồng theo quy trình đạt chuẩn quốc tế GlobalG.A.P, đảm bảo an toàn thực phẩm, bảo vệ môi trường và sức khỏe người tiêu dùng.",
      logo: "shared/cert-globalgap" as ImageKey,
    },
    {
      title: "Tôn trọng người làm nông,\nGắn kết cộng đồng",
      text: "GRASP là tiêu chuẩn xã hội của GlobalG.A.P, thể hiện cam kết chăm lo điều kiện làm việc và quyền lợi của người lao động tại trang trại.",
      logo: "shared/cert-globalgap-grasp" as ImageKey,
    },
  ],
  label: "shared/product-label" as ImageKey,
};

/** "Pansy tại điểm bán" cards (Figma "Image" variant "điểm bán"). */
export const inStore: { title: string; image: ImageKey }[] = [
  { title: "Hoạt động dùng thử", image: "shared/instore-sampling" },
  { title: "Hoạt động trưng bày", image: "shared/instore-display" },
  { title: "Hoạt động tradeshow", image: "shared/instore-tradeshow" },
];

export const crossSellImage: Record<ProductSlug, ImageKey> = {
  sunorange: "shared/crosssell-sunorange",
  sunyellow: "shared/crosssell-sunyellow",
  sunhoney: "shared/crosssell-sunhoney",
};

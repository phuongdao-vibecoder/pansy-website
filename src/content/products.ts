/**
 * Product-line content for the "Sản phẩm" page (Figma 2417:54168 / mobile 406:31280).
 * Text copied from Figma. Label positions are measured from the Figma illustration
 * frames (incl. the 30 px padding added when the illustration was exported).
 */
import type { ImageKey } from "./images";
import type { ProductSlug } from "./site";

export type IllustrationLabel = {
  text: string;
  /** Position inside the 525×626 exported illustration (px). */
  x: number;
  y: number;
  w: number;
  /** "headline" = orange 20/24 bold centered; "note" = green 16 bold. */
  kind: "headline" | "note";
  align?: "left" | "center";
};

export type ProductLine = {
  slug: ProductSlug;
  description: string;
  photos: [ImageKey, ImageKey];
  illustration: ImageKey;
  labels: IllustrationLabel[];
  compareImage: ImageKey;
  compare: { label: string; value: string }[];
};

const compareLabels = ["Độ ngọt", "Độ giòn", "Hương vị", "Hình dáng", "Phù hợp"];
const rows = (values: string[]) => values.map((value, i) => ({ label: compareLabels[i], value }));

export const productLines: ProductLine[] = [
  {
    slug: "sunorange",
    description:
      "Thưởng thức một miếng Dưa Lưới Vỏ Xanh Ruột Cam Pansy, bạn đã bắt đầu hành trình khám phá sự hài hoà giữa vị ngọt đậm và siêu giòn mát, hứa hẹn mang đến một trải nghiệm độc đáo và đầy lôi cuốn từ những lát dưa đầu tiên. Mỗi quả dưa SunOrange được sản xuất và kiểm định theo tiêu chuẩn quốc tế GlobalGAP, đảm bảo rằng chúng không chỉ đáp ứng mà còn vượt qua các yêu cầu nghiêm ngặt về chất lượng.",
    photos: ["products/gift-box-four", "products/gift-box-cut"],
    illustration: "generated/products/row-sunorange",
    labels: [
      { text: "Hài hòa vị ngọt đậm,\nmát giòn trên từng lát cắt", x: 143.5, y: 30, w: 238, kind: "headline" },
      { text: "Vị ngọt\nvừa phải", x: 53, y: 218, w: 67, kind: "note", align: "center" },
      { text: "Thanh Mát", x: 400.3, y: 240, w: 81, kind: "note" },
      { text: "Thơm ngon", x: 59, y: 503.6, w: 85, kind: "note" },
    ],
    compareImage: "generated/products/compare-sunorange",
    compare: rows([
      "14+ độ Brix",
      "4/5 - Giòn",
      "Thơm nhẹ, ngọt thanh, hậu vị đậm",
      "Oval dài, vân lưới xanh nổi rõ, đầy đặn",
      "Ăn tươi, làm các món giải khát, salad",
    ]),
  },
  {
    slug: "sunyellow",
    description:
      "Như một món quà từ thiên nhiên, Dưa Lưới Vỏ Vàng Ruột Cam Pansy mang đến hương vị độc đáo - một trải nghiệm hoàn hảo, đẳng cấp giữa vị ngọt đậm và độ giòn cuốn hút nhưng vẫn đảm bảo nguồn dưỡng chất cần thiết. Mỗi quả dưa SunYellow là một biểu tượng của sự tận tâm và sự kiểm soát chất lượng, đem đến cho trải nghiệm cao cấp và đậm chất từ thiên nhiên.",
    photos: ["products/gift-pair", "products/gift-in-hand"],
    illustration: "generated/products/row-sunyellow",
    labels: [
      { text: "Nồng đậm vị ngọt,\ngiòn ngon cuốn hút", x: 173.5, y: 30, w: 179, kind: "headline" },
      { text: "Vitamin B5", x: 407.3, y: 337, w: 83, kind: "note" },
      { text: "Giàu Kali", x: 75, y: 515.6, w: 67, kind: "note" },
    ],
    compareImage: "generated/products/compare-sunyellow",
    compare: rows([
      "14+ độ Brix",
      "4/5 - Giòn",
      "Thơm nhẹ, ngọt thanh, hậu vị đậm",
      "Oval dài, vân lưới trắng nhẹ",
      "Ăn tươi, Chưng cúng, Biếu tặng",
    ]),
  },
  {
    slug: "sunhoney",
    description:
      "Mật ngọt từ nắng – Dưa Lưới Mật Pansy là kết tinh của ánh nắng, đất lành và sự chăm sóc tỉ mỉ. Từng trái dưa sở hữu vị ngọt đậm đà như mật, ruột cam tươi sáng và độ giòn thanh mát. Không chỉ là trái cây – mỗi quả dưa SunHoney là lời cam kết về chất lượng, sự tận tâm và trải nghiệm cao cấp dành cho người thưởng thức.",
    photos: ["products/gift-box-four", "products/gift-box-cut"],
    illustration: "generated/products/row-sunhoney",
    labels: [
      { text: "Vị ngọt đậm đà\nTrọn vẹn từng giọt nắng", x: 151.5, y: 30, w: 223, kind: "headline" },
      { text: "Oval tròn", x: 41, y: 249, w: 70, kind: "note" },
      { text: "Vân lưới dày đặc", x: 434.8, y: 241, w: 122, kind: "note" },
      { text: "Vỏ xanh", x: 21, y: 480.6, w: 60, kind: "note" },
    ],
    compareImage: "generated/products/compare-sunhoney",
    compare: rows([
      "14+ độ Brix",
      "4/5 - Giòn",
      "Thơm nhẹ, ngọt đậm như mật ong",
      "Oval tròn, vân lưới xanh nổi rõ, đầy đặn",
      "Ăn tươi, Chưng cúng, Biếu tặng",
    ]),
  },
];

/** "Quy trình trồng trọt" (Figma "Quy trình" 2774:51683). */
export const growingSteps = [
  {
    number: "01",
    title: "Gieo hạt cây trồng",
    text: "Tùy vào loại hạt giống mà bạn gieo trồng, hạt giống F1 sẽ không cần phải ngâm ủ, bạn có thể ươm trực tiếp vào đất, còn các loại hạt giống khác sẽ phải ngâm ủ trong nước.",
    icon: "/svg/generated/products/process-icon-1.svg",
    iconSize: [71, 33] as const,
    art: "/svg/generated/products/process-1.svg",
    artSize: [318, 253] as const,
  },
  {
    number: "02",
    title: "Chăm sóc tận tâm",
    text: "Chăm sóc cây đến khi cây được 5 – 6 lá thật thì bắt đấu bấm ngọn, Soleil Farm sử dụng mô hình canh tác hữu cơ, và công nghệ từ nước ngoài để tập trung chất dinh dưỡng cho việc ra hoa tạo quả.",
    icon: "/svg/generated/products/process-icon-2.svg",
    iconSize: [74, 70] as const,
    art: "/svg/generated/products/process-2.svg",
    artSize: [369, 255] as const,
  },
  {
    number: "03",
    title: "Thu hoạch sản phẩm",
    text: "Khi vườn dưa lưới của Soleil Farm đã gần đến thời gian thu hoạch, Soleil Farm sẽ chuẩn bị nhiều nguồn nhân chất lượng cao để đóng gói và bảo quản để mang đến tay khách hàng những trái dưa chất lượng nhất.",
    icon: "/svg/generated/products/process-icon-3.svg",
    iconSize: [54, 55] as const,
    art: "/svg/generated/products/process-3.svg",
    artSize: [375, 304] as const,
  },
];

/** "Khám phá điểm khác biệt cùng Dưa lưới Pansy" — label positions in the 1121×996 Figma frame. */
export const differences = [
  { title: "Bao bì", text: "Bao bì, tem chỉnh chu, bắt\nmắt, nổi bật trên kệ.", x: 0, y: 396, w: 235 },
  { title: "Độ ngọt và độ giòn", text: "Độ ngọt: cao >13,5 brix và ổn định.\nĐộ giòn: thịt dưa giòn không bị bỡ.", x: 778, y: 356, w: 354 },
  { title: "Vân lưới", text: "Vân lưới sắc nét, tương đối\nđều và đẹp mắt.", x: 817, y: 758, w: 243 },
  { title: "Hình dáng", text: "Cuốn dưa dài, nguyên cuốn, xanh tươi.\nHình dáng oval đều và phân loại size rõ ràng.", x: 0, y: 843, w: 408 },
];

/** Bigger retailer strip on the Products page (Figma Frame 6706), three rows with Figma box sizes. */
export const retailerRows: { name: string; image: ImageKey; w: number; h: number; cropTop?: boolean; round?: boolean }[][] = [
  [
    { name: "GO!", image: "shared/retailers/go", w: 99, h: 45 },
    { name: "Farmers Market", image: "shared/retailers/farmers-market", w: 128, h: 45 },
    { name: "WinMart", image: "shared/retailers/winmart", w: 173, h: 43, cropTop: true },
    { name: "Kingfoodmart", image: "shared/retailers/kingfoodmart", w: 207, h: 25, cropTop: true },
    { name: "Co.op mart", image: "shared/retailers/coopmart", w: 105, h: 59 },
  ],
  [
    { name: "Tops Market", image: "shared/retailers/tops-market", w: 90, h: 67 },
    { name: "AEON Citimart", image: "shared/retailers/aeon-citimart", w: 284, h: 28 },
    { name: "Co.opXtra", image: "shared/retailers/coopxtra", w: 152, h: 45 },
    { name: "MM Mega Market", image: "shared/retailers/mm-mega-market", w: 100, h: 56 },
  ],
  [
    { name: "141 Fresh Fruits", image: "shared/retailers/141-fresh-fruits-alt", w: 67, h: 67, round: true },
    { name: "1989 Fruits", image: "shared/retailers/1989-fruits", w: 78, h: 68 },
    { name: "Tony Fruit", image: "shared/retailers/tony-fruit", w: 83, h: 56 },
    { name: "Annam Gourmet", image: "shared/retailers/annam-gourmet", w: 71, h: 71 },
    { name: "Finelife", image: "shared/retailers/finelife", w: 68, h: 56 },
    { name: "LOTTE", image: "shared/retailers/lotte", w: 86, h: 67 },
    { name: "Big C", image: "shared/retailers/big-c", w: 56, h: 56 },
  ],
];

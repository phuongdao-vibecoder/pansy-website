/**
 * Home page content (Figma Home-Desktop 2384:22325 / Home-mobile 406:19593).
 * All text is copied from the Figma file.
 */
import type { ImageKey } from "./images";

export const heroStrengths = ["Chắc giòn", "Ngọt đậm", "Thơm vani", "Tiêu chuẩn quốc tế"];

export const intro = {
  paragraphs: [
    "Pansy tự hào mang đến cho bạn những quả dưa lưới tươi ngon nhất, được trồng và thu hoạch bởi trang trại Soleil Farm - tọa lạc tại vùng đất Bình Thuận đầy nắng và gió.",
    "Thưởng thức miếng dưa lưới đầu tiên, chúc mừng bạn đã bắt đầu hành trình khám phá sự hài hòa CHUẨN GIÒN - CHUẨN NGỌT - CHUẨN PANSY.",
    "Hứa hẹn mang đến một trải nghiệm độc đáo và đầy lôi cuốn mà bạn không muốn bỏ lỡ.",
  ],
};

/** The four feature tiles (also used on the product detail pages). */
export const features: { label: string; image: ImageKey }[] = [
  { label: "Độ brix 14+", image: "shared/feature-brix" },
  { label: "Chắc giòn", image: "shared/feature-crunchy" },
  { label: "Vân lưới dày", image: "shared/feature-netting" },
  { label: "Vị béo Vanila đặc trưng", image: "shared/feature-vanilla" },
];

export const occasions: { title: string; description: string; image: ImageKey }[] = [
  {
    title: "Dịp chưng cúng",
    description: "Tỏ lòng thành kính, gửi trọn tâm an",
    image: "shared/occasion-offering",
  },
  {
    title: "Dịp gia đình sum họp",
    description: "Thưởng thức dưa mát sau bữa cơm",
    image: "shared/occasion-family",
  },
  {
    title: "Dịp biếu tặng",
    description: "Món quà sức khoẻ, gửi trọn yêu thương",
    image: "shared/occasion-gift",
  },
];

export const testimonials: { name: string; quote: string; image: ImageKey }[] = [
  {
    name: "Mẹ Xoài",
    quote:
      "Dưa lưới Pansy ra mắt Bộ sưu tập quà Tết “Vẹn toàn Như Ý” cực kỳ ấn tượng với ngoại hình thùng dưa và tem Tết siêu xinh, đặc biệt là bao lì xì nữa. Gia đình nào mà đang đau đầu vì lựa chọn quà Tết thì giờ đây được “cứu cánh” rồi nhé!",
    image: "shared/testimonial-1",
  },
  {
    name: "Mẹ Huyền Lizzie",
    quote:
      "Từ bao bì thùng dưa, tem nhãn đến bao lì xì bắt mắt, dưa lưới Pansy hứa hẹn sẽ là món quà biếu tinh tế, chu đáo cho người thân và bạn bè, khiến ngày Tết thêm phần sum vầy, trọn vẹn.",
    image: "shared/testimonial-2",
  },
];

export const whereToBuy = {
  lead: "Dưa lưới Pansy – từ nông trại sạch đến tận tay bạn!",
  points: [
    "Bạn có thể dễ dàng mua Pansy tại siêu thị, cửa hàng trái cây hoặc đặt online.",
    "Dù ở đâu, Pansy luôn giữ trọn độ tươi – ngọt – giòn như vừa hái tại vườn.",
  ],
};

/**
 * Retailer logos, in the Figma desktop order (two rows), with their Figma box sizes.
 * Figma also shows a separate pink "ÆON" logo cropped from a hidden image layer;
 * it is left out here (16 of 17 logos shown).
 */
export const retailers: {
  name: string;
  image: ImageKey;
  w: number;
  h: number;
  /** Crop to the top of the image (logos whose file includes a slogan line below). */
  cropTop?: boolean;
}[][] = [
  [
    { name: "GO!", image: "shared/retailers/go", w: 71, h: 32 },
    { name: "Farmers Market", image: "shared/retailers/farmers-market", w: 92, h: 32 },
    { name: "WinMart", image: "shared/retailers/winmart", w: 124, h: 31, cropTop: true },
    { name: "Kingfoodmart", image: "shared/retailers/kingfoodmart", w: 148, h: 18, cropTop: true },
    { name: "Co.op mart", image: "shared/retailers/coopmart", w: 75, h: 42 },
    { name: "AEON Citimart", image: "shared/retailers/aeon-citimart", w: 153, h: 15 },
    { name: "Co.opXtra", image: "shared/retailers/coopxtra", w: 109, h: 32 },
  ],
  [
    { name: "141 Fresh Fruits", image: "shared/retailers/141-fresh-fruits", w: 48, h: 48 },
    { name: "Tops Market", image: "shared/retailers/tops-market", w: 65, h: 48 },
    { name: "MM Mega Market", image: "shared/retailers/mm-mega-market", w: 71, h: 40 },
    { name: "1989 Fruits", image: "shared/retailers/1989-fruits", w: 59, h: 52 },
    { name: "Tony Fruit", image: "shared/retailers/tony-fruit", w: 60, h: 40 },
    { name: "Annam Gourmet", image: "shared/retailers/annam-gourmet", w: 51, h: 51 },
    { name: "Finelife", image: "shared/retailers/finelife", w: 49, h: 40 },
    { name: "LOTTE", image: "shared/retailers/lotte", w: 61, h: 48 },
    { name: "Big C", image: "shared/retailers/big-c", w: 40, h: 40 },
  ],
];

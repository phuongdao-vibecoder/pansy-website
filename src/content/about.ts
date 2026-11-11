/**
 * Về Pansy (About) content. All text copied from Figma
 * "About-Desktop" 2673:28685 / "About-Mobile" 406:24188.
 */
import type { ImageKey } from "./images";

export const aboutHero = {
  title: "DƯA LƯỚI PANSY",
  subtitle: "DƯA LƯỚI VIỆT ĐẠT CHUẨN QUỐC TẾ",
  text: "Pansy là thương hiệu dưa lưới cao cấp được trồng và chăm sóc tại Soleil Farm, nhà màng công nghệ cao giữa vùng đất Bình Thuận đầy nắng và gió. Với quy trình canh tác đạt chuẩn quốc tế, mỗi trái dưa được tuyển chọn và thu hoạch đúng độ chín để mang đến hương vị giòn ngọt tự nhiên, chất lượng đồng đều và trải nghiệm xứng đáng trong từng lần thưởng thức. Đó cũng là triết lý làm nên",
  slogan: "CHUẨN GIÒN, CHUẨN NGỌT, CHUẨN PANSY",
  primaryCta: "Liên hệ ngay",
  secondaryCta: "Tìm hiểu về Soleil Farm",
};

/** "Giới thiệu Pansy": three short stories. */
export const aboutStories = [
  {
    title: "Khởi Nguồn Từ Nắng Gió",
    text: "Giữa dải đất Bình Thuận khắc nghiệt, chúng tôi không thấy khó khăn, chỉ thấy cơ hội. Pansy ra đời để chứng minh: chính cái nắng, cái gió và thổ nhưỡng nơi đây là chất xúc tác hoàn hảo nhất cho những quả dưa lưới ngọt lành, chuẩn quốc tế.",
  },
  {
    title: "Sức Mạnh Của Công Nghệ",
    text: "Năm 2023, Soleil Farm hiện thực hóa giấc mơ nông nghiệp công nghệ cao. Trên quy mô 12ha, chúng tôi phủ xanh 29 nhà màng cùng hệ thống tưới chuẩn Israel. Công nghệ giúp Soleil Farm kiêu hãnh vượt qua thời tiết, duy trì sản lượng 4 mùa/năm đạt chuẩn GlobalGAP & GRASP.",
  },
  {
    title: "Gói Gọn Sự Tận Tụy",
    text: "Mỗi sản phẩm trao tay là một lời cam kết \"tươi nhất, ngon nhất, dinh dưỡng nhất\" – nơi tình yêu đất Việt hòa vào bộ ba cực phẩm dưa lưới:\nSunOrange – Rực rỡ, mọng nước.\nSunYellow – Giòn ngọt, đậm đà.\nSunHoney – Thanh tao như mật ngọt.",
  },
];

export const aboutStoryImages: ImageKey[] = ["about/story-farmland", "about/story-greenhouse"];

/** "Giá trị cốt lõi" */
export const coreValues = [
  {
    title: "SỰ TƯƠI MỚI LÀ KIM CHỈ NAM",
    text: "Độ tươi ngon của trái cây là yếu tố then chốt quyết định lựa chọn và trải nghiệm của khách hàng. Vì vậy, chúng tôi tối ưu từng chi tiết từ khâu thu hoạch, nhiệt độ vận chuyển đến tốc độ phân phối.",
  },
  {
    title: "UY TÍN TRONG TỪNG LẦN TRỒNG",
    text: "Đạt tiêu chuẩn quốc tế GlobalGAP & GRASP thực hiện hoá được mong muốn mang đến những sản phẩm lành mạnh nhất đến cho người tiêu dùng trong nước và quốc tế.",
  },
  {
    title: "NGÔI NHÀ CỦA SỨC KHOẺ",
    text: "Trang trại được đặt tại vùng đất “ít mưa nhiều nắng” Bình Thuận với khí hậu và thổ nhưỡng thích hợp để nuôi trồng và chăm sóc những quả Dưa lưới thơm ngon giòn ngọt và sản lượng quanh năm.",
  },
];

/** "Vùng trồng & thế mạnh & năng lực sản xuất" (orange box). */
export const region = {
  title: ["Vùng trồng & thế mạnh &", "năng lực sản xuất"],
  text: "Bắt đầu năm 2022, Trang trại Soleil Farm được đặt tại vùng đất Bình Thuận với khí hậu thích hợp để nuôi trồng và chăm sóc những quả Dưa lưới Pansy thơm ngon và chất lượng quanh năm. Tại đây, chúng tôi luôn đáp ứng các chỉ tiêu chất lượng cùng những thế mạnh mà chỉ có ở Soleil Farm:",
  province: "Bình Thuận",
  district: "Bắc Bình",
};

export const regionStats: { value: string; plus?: boolean; label: string; image: ImageKey }[] = [
  { value: "29", label: "Nhà Màng\nĐạt Chuẩn Israel", image: "about/story-greenhouse" },
  { value: "30", label: "Hecta Diện Tích\nTrồng Dưa Lưới", image: "about/region-farm-aerial" },
  { value: "4", label: "Mùa Vụ/ Năm", image: "about/region-melons-vine" },
  { value: "70.000", plus: true, label: "Điểm Bán", image: "about/region-boxes" },
];

export const standards = {
  title: ["Chứng nhận và", "tiêu chuẩn của Pansy"],
  text: "Tại Pansy, chất lượng không phải là tuyên bố, mà là hệ thống được vận hành nghiêm túc mỗi ngày. Chúng tôi áp dụng các tiêu chuẩn quốc tế trong canh tác và kiểm soát chất lượng, để mỗi trái dưa đến bạn đều đạt độ an toàn, tươi ngon, đồng nhất.",
  image: "about/region-farmer-greenhouse" as ImageKey,
  items: [
    {
      title: "Canh tác an toàn,\nBền vững, Trách nhiệm",
      text: "Đảm bảo an toàn thực phẩm, bảo vệ môi trường và sức khoẻ người tiêu dùng.",
      logo: { image: "shared/cert-globalgap" as ImageKey, alt: "GlobalG.A.P." },
    },
    {
      title: "Gắn kết cộng đồng\nngười làm nông",
      text: "Cam kết chăm lo điều kiện và quyền lợi của người lao động.",
      logo: { image: "shared/cert-globalgap-grasp" as ImageKey, alt: "GlobalG.A.P. GRASP" },
    },
    {
      title: "Truy xuất\nnguồn gốc rõ ràng",
      text: "Mỗi trái dưa lưới Pansy đều có mã GGN giúp khách hàng dễ dàng kiểm tra.",
      logo: { svg: "/svg/generated/about/cert-ggn.svg", alt: "GGN Certified Farming" },
    },
  ],
};

/** "NHỮNG TRẢI NGHIỆM ĐẶC BIỆT BẠN KHÔNG MUỐN BỎ LỠ:" */
export const experiences = {
  eyebrow: "NHỮNG TRẢI NGHIỆM ĐẶC BIỆT BẠN KHÔNG MUỐN BỎ LỠ:",
  items: ["Chất lượng quốc tế", "Ngọt - giòn - chắc", "Thơm vanila", "Quà biếu sang trọng"],
};

export const vision = {
  eyebrow: "TẦM NHÌN & SỨ MỆNH",
  title: ["Sự tinh tế trong từng khâu", "lựa chọn nguyên vật liệu"],
  text: "Pansy không chỉ mong muốn trở thành một thương hiệu dưa lưới hàng đầu Việt Nam, mà còn khát khao vươn ra thế giới như biểu tượng của một thế hệ nông sản mới.",
};

/**
 * "LỊCH SỬ HÌNH THÀNH" timeline, in chronological order (Figma mobile order; on desktop
 * the path snakes left→right, right→left, left→right). `images` with two entries are the
 * two square product shots Figma places side by side inside the card photo.
 */
export type TimelineStep = {
  date: string;
  title: string;
  images: ImageKey[];
  /** Cambodian flag ribbon over the photo corner. */
  flag?: boolean;
};

export const timeline = {
  eyebrow: "LỊCH SỬ HÌNH THÀNH",
  title: ["MỘT HÀNH TRÌNH", "MỘT CHỮ TÂM-MỘT TRÁI NGON"],
  steps: [
    { date: "05/2023", title: "Bắt đầu mô hình\nsản xuất", images: ["about/story-greenhouse"] },
    { date: "08/2023", title: "Ra mắt 2 dòng\nAngelica & Pansy", images: ["about/timeline-angelica-launch", "about/timeline-pansy-box"] },
    { date: "09/2023", title: "Triển khai\nMarketing", images: ["about/timeline-retail-booth"] },
    { date: "10/2023", title: "Chứng nhận đạt chuẩn\nGlobalGAP & GRASP", images: ["shared/cert-globalgap", "about/timeline-globalgap-grasp"] },
    { date: "10/2023", title: "Xuất khẩu sang\nCampuchia", images: ["about/timeline-rebrand"], flag: true },
    { date: "06/2024", title: "Ra mắt\nDưa lưới Vàng SunYellow", images: ["about/timeline-gift-box-2"] },
    { date: "06/2024", title: "Đổi nhận diện\nthương hiệu Pansy", images: ["about/timeline-gift-box-1"] },
    { date: "09/2024", title: "Giới thiệu ở\nAsia Fruit Logistica", images: ["about/timeline-expo-booth"] },
    { date: "09/2024", title: "Mở rộng diện tích\nlên đến 29+ ha", images: ["home/intro-farm-aerial"] },
    { date: "08/2025", title: "Ra mắt\nDưa lưới Mật SunHoney", images: ["about/timeline-sunhoney-launch"] },
  ] satisfies TimelineStep[] as TimelineStep[],
};

/** "Hoạt động sản xuất của Pansy" */
export const activities = {
  title: ["Hoạt động sản xuất", "của Pansy"],
  items: [
    { title: "Hoạt động trồng trọt", image: "about/activity-planting" as ImageKey },
    { title: "Hoạt động đóng gói", image: "about/activity-packing" as ImageKey },
    { title: "Hoạt động phân phối xuất khẩu", image: "about/activity-distribution-truck" as ImageKey },
    { title: "Hoạt động tiếp thị", image: "about/activity-marketing" as ImageKey },
  ],
};

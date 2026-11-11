/**
 * Thực đơn (recipe list) and Công thức (recipe detail) content.
 * Text copied from Figma "Thực đơn - Desktop" 406:37920 / mobile 2955:36548 and
 * "Công thức - Desktop" 406:38414 / mobile 406:38803.
 *
 * Figma fills the list with one placeholder recipe ("Kem dưa lưới", HẰNG NGÀY, 23-8-2022)
 * over different photos. The demo keeps that sample data (decision 2026-11-09: repeat the
 * sample recipes); every card opens the designed recipe page.
 */
import type { ImageKey } from "./images";
import type { RecipeCategory } from "./recipes";

export const menuBanner = {
  breadcrumb: "THỰC ĐƠN",
  title: ["Cảm Hứng", "từ Dưa Lưới"],
};

export const menuIntro = {
  /** Line break used on mobile only (Figma mobile). */
  title: ["Tuyển tập vị ngon", "từ dưa"],
  text: "Khám phá hương vị tươi mát phù hợp cho mọi dịp trong năm",
};

/** Filter tabs with the counts shown in Figma. */
export const menuTabs: { key: "all" | RecipeCategory; label: string; count: number }[] = [
  { key: "all", label: "Tất cả", count: 52 },
  { key: "hang-ngay", label: "Hằng ngày", count: 6 },
  { key: "trung-thu", label: "Trung thu", count: 6 },
  { key: "giang-sinh", label: "Giáng sinh", count: 6 },
  { key: "le-tinh-nhan", label: "Lễ tình nhân", count: 6 },
  { key: "mua-he", label: "Mùa hè", count: 6 },
];

/** Pagination shown in Figma: 1 2 3 4 … 15. */
export const menuPageCount = 15;

export type MenuCard = {
  slug: string;
  category: string;
  title: string;
  facts: { label: string; value: string }[];
  date: string;
  image: ImageKey;
};

const sample = {
  slug: "kem-dua-luoi",
  category: "HẰNG NGÀY",
  title: "Kem dưa lưới",
  facts: [
    { label: "Nguyên liệu chính", value: "Dưa lưới ruột cam nhà Pansy bất kì, chuối chín, mật ong, đá viên." },
    { label: "Thời gian thực hiện", value: "5 phút." },
  ],
  date: "23-8-2022",
};

/** Large card at the top of the desktop list (Figma Frame 6772). */
export const menuFeatured: MenuCard = { ...sample, image: "shared/recipe-granita" };

/** 3 × 3 grid, photos in Figma order. */
export const menuCards: MenuCard[] = (
  [
    "menu/recipe-fruit-salad",
    "menu/recipe-melon-yogurt",
    "menu/recipe-fruit-bowl",
    "shared/recipe-granita",
    "menu/recipe-melon-juice",
    "menu/recipe-melon-cake",
    "menu/recipe-fruit-bowl",
    "menu/recipe-fruit-salad",
    "menu/recipe-melon-yogurt",
  ] as ImageKey[]
).map((image) => ({ ...sample, image }));

/** TikTok video cards (Figma "Video-d" 2174:5125). */
export const menuVideos: { title: string; image: ImageKey }[] = (
  ["menu/video-1", "menu/video-2", "menu/video-farmer", "menu/video-1"] as ImageKey[]
).map((image) => ({ title: "Những món ăn ngon từ dưa hấu có thể làm đơn giản tại nhà", image }));

/* ---------- Recipe detail ---------- */

export type RecipeDetail = {
  categoryLabel: string;
  title: string;
  heroImage: ImageKey;
  stats: { icon: string; value: string; label: string }[];
  ingredientsTitle: string;
  ingredients: string[];
  methodTitle: string;
  steps: { title: string; text: string; image: ImageKey }[];
  tags: string[];
  reactions: { icon: string; count: number; label: string }[];
  comments: { name: string; text: string }[];
};

/**
 * The only designed recipe ("Kem Dưa Lưới"). Other sample recipes reuse this body.
 * Figma numbers the last step "1." on desktop and "4." on mobile; "4." is used.
 */
export const recipeDetail: RecipeDetail = {
  categoryLabel: "HẰNG NGÀY",
  title: "Kem Dưa Lưới",
  heroImage: "recipe/step-drink",
  stats: [
    { icon: "/svg/generated/recipe/icon-ingredients.svg", value: "7", label: "Nguyên liệu" },
    { icon: "/svg/generated/recipe/icon-time.svg", value: "60", label: "Phút" },
    { icon: "/svg/generated/recipe/icon-servings.svg", value: "4", label: "Người ăn" },
  ],
  ingredientsTitle: "Nguyên liệu chuẩn bị",
  ingredients: [
    "Dưa lưới / 2 kg",
    "Sữa không đường / 550 ml",
    "Bột mì / 1 kg",
    "Đường / 50 gram",
    "Kem sữa tươi / 550 ml",
    "Muối biển / 10 gr",
  ],
  methodTitle: "Cách chế biến kem dưa lưới",
  steps: [
    {
      title: "1. Sơ chế nguyên liệu",
      text: "Dưa lưới bổ đôi, dùng muỗng múc bỏ phần hạt. Gọt vỏ, sau đó dùng dao cắt dưa lưới thành những khối vuông nhỏ. Xếp dưa lưới đã cắt lên khay sau đó bỏ ngăn đá khoảng 1 - 2 tiếng cho phần dưa lưới đông lại.",
      image: "recipe/step-cut",
    },
    {
      title: "2. Xay hỗn hợp dưa lưới",
      text: "Bắc nồi lên bếp, cho nước và đường vào nồi đun sôi ở lửa vừa. Sau đó khuấy đều liên tục ở lửa riu riu cho đến khi phần nước đường hơi đặc lại thì tắt lửa, để nguội rồi thái dưa thành từng miếng nhỏ.",
      image: "recipe/step-halve",
    },
    {
      title: "3. Xay hỗn hợp dưa lưới",
      text: "Dưa lưới bổ đôi, dùng muỗng múc bỏ phần hạt. Gọt vỏ, sau đó dùng dao cắt dưa lưới thành những khối vuông nhỏ. Xếp dưa lưới đã cắt lên khay sau đó bỏ ngăn đá khoảng 1 - 2 tiếng cho phần dưa lưới đông lại.",
      image: "recipe/step-cubes",
    },
    {
      title: "4. Bảo quản kem dưa lưới",
      text: "Kem đá bào chanh dưa lưới cực đơn giản nhưng lại mang đến hương vị chua ngọt từ chanh và dưa lưới, cũng như vị đắng nhẹ của vỏ chanh cùng lớp đá bào mát lạnh đích thị là \"món ăn\" giải nhiệt cho mùa hè.",
      image: "recipe/step-yogurt",
    },
  ],
  tags: ["Soleil Farm", "Dưa lưới", "Kem dưa lưới", "Món ngon mỗi ngày"],
  reactions: [
    { icon: "/svg/generated/recipe/reaction-1.svg", count: 2, label: "Thích" },
    { icon: "/svg/generated/recipe/reaction-2.svg", count: 2, label: "Yêu thích" },
    { icon: "/svg/generated/recipe/reaction-3.svg", count: 2, label: "Buồn" },
  ],
  comments: [
    {
      name: "Nguyệt Minh",
      text: "Wow! Bài viết của Soleil Farm rất hay và bổ ích. Cảm ơn Soleil Farm đã chia sẻ nhưng thông tin bổ ích này đến với mọi người.",
    },
  ],
};

/** "Khám phá công thức khác" (Figma "Tin tức" 406:38560 on the recipe page). */
export const relatedRecipes = {
  eyebrow: "THỰC ĐƠN",
  title: "Khám phá công thức khác",
  items: [
    { slug: "salad-dua-luoi", title: "Salad Dưa Lưới", image: "recipe/related-salad" as ImageKey, facts: sample.facts },
    { slug: "kem-dua-luoi", title: "Kem dưa lưới", image: "shared/recipe-granita" as ImageKey, facts: sample.facts },
  ],
};

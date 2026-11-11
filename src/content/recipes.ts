/**
 * Recipe content. Text is copied from the Figma file:
 *  - "Sinh tố dưa lưới": Home recipe carousel (Figma "Menu" 2515:9557)
 *  - "Salad Dưa Lưới", "Kem Tuyết Dưa Lưới Bạc Hà": recipe page related cards (406:38970)
 *  - "Kem Dưa Lưới": the designed recipe detail page (406:38414)
 * The list page repeats this sample data to fill the grid (decision 2026-11-09).
 */
import type { ImageKey } from "./images";

export type RecipeCategory =
  | "hang-ngay"
  | "trung-thu"
  | "giang-sinh"
  | "le-tinh-nhan"
  | "mua-he";

export type Recipe = {
  slug: string;
  title: string;
  category: RecipeCategory;
  /** Small orange line under the title in the carousel, e.g. "ĐÁNH THỨC NGÀY MỚI". */
  tagline?: string;
  summary: string;
  /** Pairs of bold label + value shown under the summary. */
  facts: { label: string; value: string }[];
  image: ImageKey;
};

export const recipeCategories: Record<RecipeCategory, string> = {
  "hang-ngay": "Hằng ngày",
  "trung-thu": "Trung thu",
  "giang-sinh": "Giáng sinh",
  "le-tinh-nhan": "Lễ tình nhân",
  "mua-he": "Mùa hè",
};

export const recipes: Recipe[] = [
  {
    slug: "sinh-to-dua-luoi",
    title: "Sinh tố dưa lưới",
    category: "hang-ngay",
    tagline: "Đánh thức ngày mới",
    summary:
      "Một ly sinh tố dưa lưới mát lạnh không chỉ mang lại hương vị ngọt thanh, mà còn cung cấp lượng vitamin C dồi dào, giúp bạn khởi đầu ngày mới với tinh thần sảng khoái.",
    facts: [
      { label: "Nguyên liệu chính", value: "Dưa lưới ruột cam nhà Pansy bất kì, chuối chín, mật ong, đá viên." },
      { label: "Thời gian thực hiện", value: "5 phút." },
    ],
    image: "shared/recipe-smoothie",
  },
  {
    slug: "salad-dua-luoi",
    title: "Salad Dưa Lưới",
    category: "hang-ngay",
    summary:
      "Đây là món khai vị mang phong cách Địa Trung Hải, kết hợp hoàn hảo giữa vị ngọt thanh của dưa và vị mặn nhẹ của phô mai.",
    facts: [
      { label: "Thời gian chế biến", value: "15 phút" },
      { label: "Mức độ khó", value: "Dễ" },
    ],
    image: "recipe/related-salad",
  },
  {
    slug: "kem-tuyet-dua-luoi-bac-ha",
    title: "Kem Tuyết Dưa Lưới Bạc Hà",
    category: "mua-he",
    summary:
      "Một món tráng miệng giải nhiệt thuần khiết, giữ trọn vẹn màu cam rực rỡ và hương thơm tự nhiên của dòng dưa SunHoney.",
    facts: [
      { label: "Thời gian chế biến", value: "20 phút (không tính thời gian chờ đông đá)" },
      { label: "Mức độ khó", value: "Trung bình" },
    ],
    image: "shared/recipe-granita",
  },
  {
    slug: "kem-dua-luoi",
    title: "Kem Dưa Lưới",
    category: "hang-ngay",
    summary:
      "Kem đá bào chanh dưa lưới cực đơn giản nhưng lại mang đến hương vị chua ngọt từ chanh và dưa lưới, cũng như vị đắng nhẹ của vỏ chanh cùng lớp đá bào mát lạnh đích thị là \"món ăn\" giải nhiệt cho mùa hè.",
    facts: [
      { label: "Nguyên liệu chính", value: "Dưa lưới ruột cam nhà Pansy bất kì, chuối chín, mật ong, đá viên." },
      { label: "Thời gian thực hiện", value: "5 phút." },
    ],
    image: "recipe/banner",
  },
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);

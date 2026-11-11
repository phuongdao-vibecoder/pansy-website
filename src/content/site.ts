/**
 * Site-wide content: routes, navigation and product list.
 * Routes follow SITEMAP.md (Vietnamese slugs, approved 2026-11-09).
 */

export const routes = {
  home: "/",
  about: "/ve-pansy",
  products: "/san-pham",
  product: (slug: ProductSlug) => `/san-pham/${slug}`,
  menu: "/thuc-don",
  recipe: (slug: string) => `/thuc-don/${slug}`,
  contact: "/lien-he",
  // Destinations with no design yet: they show a "Coming soon" page.
  farm: "/trang-trai",
  distribution: "/he-thong-phan-phoi",
  stores: "/diem-ban",
  news: "/tin-tuc",
} as const;

export type ProductSlug = "sunorange" | "sunyellow" | "sunhoney";

export type Product = {
  slug: ProductSlug;
  name: string;
  /** Short tagline used on product cards (Figma "SunOrange 3" etc.) */
  tagline: string;
  /** Tailwind color token for the product accent */
  color: "sunorange-500" | "sunyellow-500" | "sunhoney-500";
  isNew?: boolean;
};

export const products: Product[] = [
  {
    slug: "sunorange",
    name: "Dưa lưới SunOrange",
    tagline: "Đậm vị • Thơm dịu • Mọng nước",
    color: "sunorange-500",
  },
  {
    slug: "sunyellow",
    name: "Dưa lưới SunYellow",
    tagline: "Giòn ngọt • Thanh mát • Tươi mới",
    color: "sunyellow-500",
    isNew: true, // Figma shows the "MỚI" badge on the SunYellow card
  },
  {
    slug: "sunhoney",
    name: "Dưa lưới SunHoney",
    tagline: "Ngọt đậm • Giòn tan • Hậu vị mật ong",
    color: "sunhoney-500",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; color: Product["color"] }[];
};

/** Main navigation (Figma "navbar" 2227:5316). "Liên Hệ" is rendered as a button. */
/** Order used in the Figma dropdown and mobile menu: Orange, Honey, Yellow. */
const navProductOrder: ProductSlug[] = ["sunorange", "sunhoney", "sunyellow"];

export const mainNav: NavItem[] = [
  { label: "Về Pansy", href: routes.about },
  {
    label: "Sản Phẩm",
    href: routes.products,
    children: navProductOrder.map((slug) => {
      const p = products.find((x) => x.slug === slug)!;
      return { label: p.name, href: routes.product(slug), color: p.color };
    }),
  },
  { label: "Thực Đơn", href: routes.menu },
];

export const contactNavItem = { label: "Liên Hệ", href: routes.contact };

/** Footer link groups (Figma "footer" 16:20084) */
export const footerNav = {
  main: [...mainNav.map(({ label, href }) => ({ label, href })), contactNavItem],
  secondary: [
    { label: "Trang Trại", href: routes.farm },
    { label: "Hệ Thống Phân Phối", href: routes.distribution },
  ],
};

/**
 * Official social profiles (provided 2026-11-10). Figma also shows Instagram and Zalo; Pansy has
 * no URLs for them, so they and their icon files were removed (2026-11-10).
 */
export const socialLinks = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/PansyMelonVietnam" },
  { label: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@pansymelon.official" },
] as const;

export const tiktokUrl = socialLinks[1].href;

/** Attributes for links to other sites: new tab, no access to window.opener, no referrer. */
export const externalLinkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Distribution partners shown in the footer (Figma "Hệ Thống Phân Phối"). */
export const footerPartners = [
  // Two rows, sizes are the Figma boxes (Frame 2598).
  [
    { name: "LOTTE Mart", image: "shared/footer-partners/lotte-mart", w: 119, h: 15 },
    { name: "The City", image: "shared/footer-partners/the-city", w: 73, h: 28 },
    { name: "MM Mega Market", image: "shared/footer-partners/mm-mega-market", w: 52, h: 32 },
  ],
  [
    { name: "Co.op mart", image: "shared/footer-partners/coopmart", w: 73, h: 32 },
    { name: "AEON MALL", image: "shared/footer-partners/aeon-mall", w: 98, h: 14 },
    { name: "Big C", image: "shared/footer-partners/big-c", w: 26, h: 32 },
  ],
] as const;

export const contactInfo = {
  email: "Pansy@soleilfarm.vn",
  phone: "0903 730 012",
  hours: "9:00 AM - 6:00 PM",
};

/** Pages that are linked in the design but not designed. */
export const comingSoonPages = {
  farm: { title: "Trang Trại Soleil Farm" },
  distribution: { title: "Hệ Thống Phân Phối" },
  stores: { title: "Điểm Bán Gần Bạn" },
  news: { title: "Tin Tức" },
} as const;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Occasions } from "@/components/sections/Occasions";
import { RecipeCarousel } from "@/components/sections/RecipeCarousel";
import {
  CertificationCard,
  CrossSell,
  DetailHero,
  DetailInfo,
} from "@/components/sections/detail/ProductDetailSections";
import { SpecTabs } from "@/components/sections/detail/SpecTabs";
import { RetailerStrip } from "@/components/sections/products/RetailerStrip";
import { inStore, productDetails } from "@/content/productDetails";
import { getProduct, products } from "@/content/site";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/san-pham/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProduct(slug)?.name ?? "Sản phẩm" };
}

/**
 * Product detail template (Figma SunOrange 406:33571, SunYellow 406:35104, SunHoney 406:36617).
 * Order: hero → info → spec tabs → certification card → (cream) recipes → in-store →
 * retailers → other products → contact + footer.
 */
export default function ProductDetailPage({ params }: PageProps<"/san-pham/[slug]">) {
  // Reading params is wrapped in Suspense so client navigations can show the shell
  // instantly (Next.js "instant navigation"); all three slugs are still prerendered.
  return (
    <Suspense fallback={<main className="min-h-dvh bg-sunorange-500" aria-busy="true" />}>
      <ProductDetail params={params} />
    </Suspense>
  );
}

async function ProductDetail({ params }: { params: PageProps<"/san-pham/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const detail = productDetails[product.slug];

  return (
    <main className="overflow-x-clip">
      {/* Product-colored part, with the faint dotted pattern (7%) behind the top */}
      <div className={cn("relative isolate pb-[120px] lg:pb-[200px]", detail.bg)}>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[2265px] bg-[url(/images/shared/pattern-dots-2.webp)] bg-[length:1490px_auto] bg-top opacity-[0.07]" />
        <DetailHero detail={detail} />
        <DetailInfo detail={detail} />
        <SpecTabs detail={detail} />
      </div>

      {/* The certification card straddles the colored → cream edge (Figma: 463 px into the card) */}
      <div className="relative">
        <div aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-[180px] lg:h-[463px]", detail.bg)} />
        <CertificationCard />
      </div>

      <RecipeCarousel tone="cream" className="mt-[120px] lg:mt-[211px]" />
      <Occasions
        id="instore-title"
        items={inStore}
        heading={
          <h2 id="instore-title" className="text-h4 font-extrabold text-brand lg:text-h2">
            Pansy tại điểm bán
          </h2>
        }
      />
      <RetailerStrip />
      <CrossSell current={product.slug} />
    </main>
  );
}

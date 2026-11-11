import type { Metadata } from "next";
import { MelonBand } from "@/components/layout/SiteFooter";
import { Occasions } from "@/components/sections/Occasions";
import { PageBanner } from "@/components/sections/PageBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Differences } from "@/components/sections/products/Differences";
import { GrowingProcess } from "@/components/sections/products/GrowingProcess";
import { ProductComparison } from "@/components/sections/products/ProductComparison";
import { ProductShowcase } from "@/components/sections/products/ProductShowcase";
import { RetailerStrip } from "@/components/sections/products/RetailerStrip";
import { Marquee } from "@/components/ui/Marquee";
import { DisplayText } from "@/components/ui/DisplayText";

export const metadata: Metadata = { title: "Sản phẩm" };

/**
 * Sản phẩm (Figma Sản phẩm - Desktop 2417:54168, Mobile 406:31280).
 * Order: banner → product rows → comparison → growing process → orange melon band
 * (differences, slogan band, occasions, testimonials) → retailers → contact + footer.
 */
export default function ProductsPage() {
  return (
    <main className="overflow-x-clip">
      <PageBanner image="products/banner" imagePosition="50% center">
        <h1 className="flex flex-col gap-0.5 font-display uppercase">
          <span className="text-ot-small tracking-[0.02em] text-green-500 lg:text-ot-subheading"><DisplayText>Dòng sản phẩm của</DisplayText></span>
          <span className="text-[48px] leading-[56px] tracking-[0.02em] text-brand normal-case lg:text-[100px] lg:leading-[130px] lg:tracking-normal">
            <DisplayText>Dưa Pansy</DisplayText>
          </span>
        </h1>
      </PageBanner>
      <ProductShowcase />
      <ProductComparison />
      <GrowingProcess />
      <MelonBand>
        <Differences />
        <Marquee className="mt-16 bg-yellow-500 lg:mt-[84px]" />
        <Occasions tone="orange" className="mt-[100px]! lg:mt-[189px]!" />
        <Testimonials tone="orange" className="mt-[100px]! lg:mt-[200px]!" />
      </MelonBand>
      <RetailerStrip />
    </main>
  );
}

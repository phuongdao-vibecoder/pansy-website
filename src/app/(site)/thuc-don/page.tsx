import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { MenuCollection } from "@/components/sections/menu/MenuCollection";
import { VideoSection } from "@/components/sections/menu/VideoSection";
import { menuBanner } from "@/content/menu";
import { DisplayText } from "@/components/ui/DisplayText";

export const metadata: Metadata = { title: "Thực đơn" };

/**
 * Thực đơn (Figma "Thực đơn - Desktop" 406:37920, mobile 2955:36548).
 * Banner (+ slogan band) → "Tuyển tập vị ngon từ dưa" (tabs, cards, pagination) →
 * TikTok videos → contact + footer (layout).
 */
export default function MenuPage() {
  return (
    <main data-page-bg="light" className="overflow-x-clip">
      <PageBanner
        image="menu/banner-overlay"
        mobileImage="menu/banner-mobile"
        breadcrumb={[{ label: menuBanner.breadcrumb }]}
        flowers={false}
        marquee="mobile-bottom"
        className="h-[532px] lg:h-[600px]"
        contentClassName="pt-[120px] lg:pt-[181px] [&>nav]:mb-2 lg:[&>nav]:mb-5"
      >
        <h1 className="font-display text-[40px]/[52px] text-white lg:text-[80px]/[100px]">
          <DisplayText>{menuBanner.title[0]}</DisplayText> <br className="hidden lg:block" />
          <DisplayText>{menuBanner.title[1]}</DisplayText>
        </h1>
      </PageBanner>
      <MenuCollection />
      <VideoSection />
    </main>
  );
}

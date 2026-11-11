import type { Metadata } from "next";
import { WhereToBuy } from "@/components/sections/WhereToBuy";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntro, CoreValues } from "@/components/sections/about/AboutIntro";
import { Experiences } from "@/components/sections/about/Experiences";
import { HistoryTimeline } from "@/components/sections/about/HistoryTimeline";
import { RegionStrengths } from "@/components/sections/about/RegionStrengths";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = { title: "Về Pansy" };

/**
 * Về Pansy (Figma About-Desktop 2673:28685, About-Mobile 406:24188).
 * Order: hero → giới thiệu → giá trị cốt lõi → vùng trồng / số liệu / chứng nhận →
 * trải nghiệm → tầm nhìn + lịch sử hình thành + hoạt động sản xuất → nơi mua → slogan band
 * → contact + footer (layout). The "Tin tức" block is hidden in Figma, so it is left out.
 */
export default function AboutPage() {
  return (
    <main data-page-bg="light" className="overflow-x-clip">
      <AboutHero />
      {/* Cream leaf pattern (Figma "Pattern" 2673:28686, 2550 wide, from y=878) */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-[22px] bottom-0 -z-10 bg-[url(/svg/decor/pattern-home-mobile.svg)] bg-[length:1611px_auto] bg-top bg-repeat-y md:bg-[url(/svg/decor/pattern-about-desktop.svg)] md:bg-[length:2550px_auto] md:bg-no-repeat"
        />
        <AboutIntro />
        <CoreValues />
        <RegionStrengths />
        <Experiences />
        <HistoryTimeline />
      </div>
      <WhereToBuy />
      <Marquee className="section-gap bg-white" />
    </main>
  );
}

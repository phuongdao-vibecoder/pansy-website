import { MelonSection } from "@/components/layout/SiteFooter";
import { Occasions } from "@/components/sections/Occasions";
import { ProductLines } from "@/components/sections/ProductLines";
import { RecipeCarousel } from "@/components/sections/RecipeCarousel";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhereToBuy } from "@/components/sections/WhereToBuy";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { SocialFeed } from "@/components/sections/home/SocialFeed";

/**
 * Home (Figma Home-Desktop 2384:22325, Home-mobile 406:19593).
 * Section order follows SITEMAP.md §3.1. The contact form and footer come from the layout.
 */
export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <HomeHero />
      {/* Cream leaf pattern behind the middle sections (Figma "Pattern" frames) */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[941px] bottom-0 -z-10 bg-[url(/svg/decor/pattern-home-mobile.svg)] bg-[length:1611px_auto] bg-top bg-repeat-y md:bg-[url(/svg/decor/pattern-home-desktop.svg)] md:bg-[length:1920px_auto]"
        />
        <HomeIntro />
        <ProductLines />
        <Occasions />
        <Testimonials />
        <WhereToBuy />
      </div>
      <MelonSection>
        <RecipeCarousel />
        <SocialFeed />
      </MelonSection>
    </main>
  );
}

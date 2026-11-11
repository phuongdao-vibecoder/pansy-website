import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureTiles } from "@/components/sections/FeatureTiles";
import { Button } from "@/components/ui/Button";
import { intro } from "@/content/home";
import { img } from "@/content/images";
import { routes } from "@/content/site";

/**
 * "Giới thiệu Pansy" (Figma "Giới thiệu" 2384:7393 variant 3; mobile "Frame 6851").
 * Full-bleed farm photo fading to cream at the top, with the boxed melons
 * photo-composited on the right. Desktop height 941.
 */
export function HomeIntro() {
  const farm = img("home/intro-farm-aerial");
  const melons = img("home/intro-product");
  const farmMobile = img("home/intro-farm-mobile");
  const melonsMobile = img("home/intro-product-mobile");

  return (
    <section aria-labelledby="intro-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={farm.src} width={farm.width} height={farm.height} alt="" sizes="100vw" className="hidden size-full object-cover md:block" />
        <Image src={farmMobile.src} width={farmMobile.width} height={farmMobile.height} alt="" sizes="100vw" className="size-full object-cover md:hidden" />
        {/* Cream fade: solid to ~32% of the height, clear by 70% (Figma gradient handles) */}
        <div className="absolute inset-0 bg-linear-to-b from-[#FCF0DB] from-30% to-[#FCF0DB]/0 to-60% md:from-32% md:to-70%" />
        {/* Melons: Figma "stretch" fill → x 44.1%–87.9% of the 1920 frame, 841×1202, cropped at the bottom */}
        <Image src={melons.src} width={melons.width} height={melons.height} alt="" sizes="841px" className="absolute top-0 left-[calc(50%-114px)] hidden h-[1202px] w-[841px] max-w-none object-cover md:block" />
        <Image src={melonsMobile.src} width={melonsMobile.width} height={melonsMobile.height} alt="" sizes="100vw" className="absolute inset-0 size-full object-cover object-bottom md:hidden" />
      </div>

      <Reveal className="container-site pt-9 pb-[560px] md:pb-24 lg:h-[941px] lg:pt-[152px] lg:pb-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-4">
          {/* On mobile the button moves below the paragraphs (Figma mobile order). */}
          <div className="contents lg:flex lg:w-[442px] lg:flex-col lg:items-start lg:gap-3">
            <h2 id="intro-title" className="text-h5 font-extrabold lg:text-h1">
              Giới thiệu <span className="text-brand">Pansy</span>
            </h2>
            <Button href={routes.about} variant="white" size="lg" className="order-last self-start max-lg:min-h-[34px] max-lg:px-4 max-lg:py-2 max-lg:text-subtitle lg:order-none">
              Tìm hiểu thêm
            </Button>
          </div>
          <div className="flex flex-col gap-4 text-subtitle lg:w-[553px] lg:text-body">
            {intro.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <FeatureTiles className="mt-8 max-w-[407px] lg:mt-8" />
      </Reveal>
    </section>
  );
}

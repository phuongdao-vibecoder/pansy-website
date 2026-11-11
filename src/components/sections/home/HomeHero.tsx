import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { heroStrengths } from "@/content/home";
import { img } from "@/content/images";
import { routes } from "@/content/site";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * Home hero (Figma "Hero" 2339:7384, variant 2; mobile "Frame 6939" 2789:36335).
 * Desktop: 919 px tall, orange #F37326 with a darker diagonal band and two flowers,
 * title + buttons on the left, the melon group on the right, the four strengths
 * centered below, and a yellow slogan band at y=804.
 * Positions are measured from the 1920 px Figma frame, centered on the viewport.
 */
export function HomeHero() {
  const melons = img("home/hero-melons");

  return (
    <section className="relative isolate overflow-hidden bg-sunorange-500 text-white">
      {/* Background shapes (desktop positions relative to the 1920 px frame) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img
          src="/svg/decor/home-hero-band.svg"
          alt=""
          width={2138}
          height={2096}
          className="absolute top-[530px] left-1/2 max-w-none -translate-x-[54%] scale-[0.5] origin-top md:top-[460px] lg:top-[393px] lg:ml-[-1046px] lg:translate-x-0 lg:scale-100"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img
          src="/svg/decor/home-hero-flower-dark.svg"
          alt=""
          width={304}
          height={287}
          className="absolute top-[54px] right-[-70px] w-[186px] lg:top-[63px] lg:right-auto lg:left-1/2 lg:ml-[-826px] lg:w-[304px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img
          src="/svg/decor/home-hero-flower-light.svg"
          alt=""
          width={250}
          height={236}
          className="absolute top-[479px] left-1/2 ml-[519px] hidden lg:block"
        />
      </div>

      <div className="container-site relative pt-[111px] lg:h-[804px] lg:pt-0">
        {/* Title block (Figma Frame 113: x=394, y=176) */}
        <div className="flex flex-col gap-3 lg:absolute lg:top-[176px] lg:w-[481px] lg:gap-4">
          <p className="font-display text-ot-small tracking-[0.02em] lg:text-ot-subheading"><DisplayText>Dưa Lưới Pansy</DisplayText></p>
          {/* Nunito demo: lg 56/68 instead of text-display (72/90) so the three lines fit 481 px; restore with the display font */}
          <h1 className="font-display text-[40px]/[52px] tracking-[0.02em] text-yellow-500 uppercase lg:text-[56px]/[68px] lg:tracking-normal">
            <DisplayText>Chuẩn giòn</DisplayText>
            <br />
            <DisplayText>Chuẩn ngọt</DisplayText>
            <br />
            <DisplayText>Chuẩn Pansy</DisplayText>
          </h1>
          <div className="mt-1 flex flex-wrap gap-3 lg:mt-2 lg:gap-4">
            <Button href={routes.contact} variant="green" size="lg" className="max-lg:min-h-[34px] max-lg:px-4 max-lg:py-2 max-lg:text-subtitle">
              Liên hệ ngay
            </Button>
            <Button href={routes.products} variant="white" size="lg" className="max-lg:min-h-[34px] max-lg:px-4 max-lg:py-2 max-lg:text-subtitle">
              Khám phá sản phẩm
            </Button>
          </div>
        </div>

        {/* Melon group (Figma "Hero image" at y=154; its content overhangs the 728 px frame, so the export is 794×450 starting at x=753) */}
        <Image
          src={melons.src}
          width={melons.width}
          height={melons.height}
          alt="Ba dòng dưa lưới Pansy: SunYellow, SunOrange và SunHoney"
          sizes="(min-width: 1024px) 794px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="mx-auto mt-8 w-full max-w-[560px] lg:absolute lg:top-[154px] lg:left-[calc(var(--gutter)+357px)] lg:mt-0 lg:w-[794px] lg:max-w-none"
        />

        {/* Strengths (Figma Frame 119, centered, y=658) */}
        <div className="relative mt-6 flex flex-col items-center gap-4 pb-9 text-center lg:absolute lg:inset-x-0 lg:top-[658px] lg:mt-0 lg:gap-6 lg:pb-0">
          <p className="text-subtitle lg:text-body-lg lg:font-bold">Những trải nghiệm đặc biệt bạn không muốn bỏ lỡ</p>
          <ul className="flex flex-col items-center gap-2 lg:flex-row lg:gap-12">
            {heroStrengths.map((s) => (
              <li key={s} className="flex items-center gap-1 text-body font-extrabold uppercase lg:text-h5">
                {/* eslint-disable-next-line @next/next/no-img-element -- small vector icon */}
                <img src="/svg/icons/star-flower.svg" alt="" width={22} height={24} className="size-4 lg:h-6 lg:w-[22px]" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Marquee className="bg-yellow-500" />
      <div className="h-[29px] lg:h-[83px]" aria-hidden="true" />
    </section>
  );
}

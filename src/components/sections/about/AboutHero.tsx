import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { aboutHero } from "@/content/about";
import { img } from "@/content/images";
import { routes } from "@/content/site";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * About hero (Figma "Hero" 3022:35750, 1920×900; mobile "Frame 6968" 3022:36085, 375×880).
 * Desktop: farm photo (bottom part of the picture, Figma image transform) with a white
 * wash from the top-left, and a frosted white panel (40 %, background blur) on the left.
 * Mobile: same photo cropped to the right, white wash from the top, text directly on it.
 * The white washes are Figma's linear gradients converted to CSS.
 */
export function AboutHero() {
  const photo = img("about/hero");
  return (
    <section aria-labelledby="about-hero-title" className="relative isolate overflow-hidden h-[880px] lg:h-[900px]">
      <div aria-hidden="true" className="absolute inset-y-0 left-1/2 -z-10 w-full -translate-x-1/2 lg:w-[1920px]">
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt=""
          sizes="(min-width: 1024px) 1920px, 100vw"
          loading="eager"
          fetchPriority="high"
          className="size-full object-cover object-[75%_100%] lg:object-[50%_99%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(168deg,#fff_39%,rgb(255_255_255/0)_59%)] lg:bg-[linear-gradient(128deg,#fff_43%,rgb(255_255_255/0)_62%)]" />
      </div>

      <div className="container-site relative pt-[104px] lg:pt-[193px]">
        <div className="flex flex-col gap-6 lg:-ml-8 lg:w-[545px] lg:gap-8 lg:rounded-lg lg:bg-white/40 lg:px-8 lg:py-12 lg:backdrop-blur-[31px]">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <h1 id="about-hero-title" className="font-display text-[40px]/[52px] tracking-normal text-brand lg:text-display">
                <DisplayText>{aboutHero.title}</DisplayText>
              </h1>
              <p className="font-display text-[24px]/[31.2px] tracking-[0.02em] text-green-500 lg:text-ot-title">
                <DisplayText>{aboutHero.subtitle}</DisplayText>
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-subtitle lg:text-body">{aboutHero.text}</p>
              <p className="font-display text-[16px]/[20.8px] tracking-[0.02em] text-sunhoney-500 lg:text-[20px]/[26px]">
                <DisplayText>{aboutHero.slogan}</DisplayText>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 lg:flex-row lg:gap-4">
            <Button href={routes.contact} variant="green" size="lg" className="max-lg:min-h-[34px] max-lg:px-4 max-lg:py-2 max-lg:text-subtitle">
              {aboutHero.primaryCta}
            </Button>
            <Button
              href={routes.farm}
              variant="white"
              size="lg"
              className="border-[0.5px] border-ink max-lg:min-h-[34px] max-lg:px-4 max-lg:py-2 max-lg:text-subtitle max-lg:text-eyebrow lg:border"
            >
              {aboutHero.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      <Marquee className="absolute inset-x-0 bottom-0 bg-yellow-500" />
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import { img } from "@/content/images";
import { menuVideos } from "@/content/menu";
import { externalLinkProps, tiktokUrl } from "@/content/site";

/**
 * TikTok video row (Figma "Video-d" 2174:5125; mobile "Video" 2925:45218).
 * Cards 360×640 (mobile 343×610), r20, dark fades at top and bottom (80 % black),
 * TikTok label top-left, green play button in the middle, title at the bottom.
 * Dots left and red flower arrows right under the row. Cards link to the TikTok profile
 * (new tab).
 */

export function VideoSection() {
  return (
    <section className="section-gap">
      <Reveal className="container-site">
        <Carousel
          label="Video công thức trên TikTok"
          controls="bar"
          dots
          dotColor="honey"
          inactiveDotClassName="bg-grey-400"
          arrowColor="red"
          arrowSize="large"
          trackClassName="gap-6 -mx-[var(--gutter)] px-[var(--gutter)] scroll-px-[var(--gutter)] lg:mx-0 lg:px-0 lg:scroll-px-0"
          slideClassName="w-full max-w-[343px] md:w-[calc((100%-24px)/2)] md:max-w-none lg:w-[calc((100%-48px)/3)]"
          controlsClassName="[&_img]:max-lg:size-10"
        >
          {menuVideos.map((v, i) => {
            const photo = img(v.image);
            return (
              <a
                key={i}
                href={tiktokUrl}
                {...externalLinkProps}
                className="relative isolate flex aspect-[360/640] flex-col justify-between overflow-hidden rounded-md p-7 text-white outline-none focus-visible:ring-3 focus-visible:ring-green-400 max-lg:aspect-[343/610] max-lg:px-5"
              >
                <Image src={photo.src} width={photo.width} height={photo.height} alt="" sizes="(min-width: 1024px) 360px, 343px" className="absolute inset-0 -z-10 size-full object-cover" />
                <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.8)_-8%,rgb(0_0_0/0)_16%,rgb(0_0_0/0)_80%,rgb(0_0_0/0.8)_100%)]" />
                <span className="flex items-center gap-[11px] text-body font-bold">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                  <img loading="lazy" src="/svg/generated/menu/tiktok.svg" alt="" width={32} height={32} />
                  Tiktok
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                <img loading="lazy" src="/svg/generated/menu/play.svg" alt="" width={53} height={53} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110" />
                <span className="max-w-[303px] pb-[26px] text-body-lg font-bold">
                  {v.title}
                  <span className="sr-only"> (TikTok, mở trong tab mới)</span>
                </span>
              </a>
            );
          })}
        </Carousel>
      </Reveal>
    </section>
  );
}

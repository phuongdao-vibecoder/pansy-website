import Image from "next/image";
import { PansyFlower } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { retailers, whereToBuy } from "@/content/home";
import { img } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * "Tìm mua Dưa lưới Pansy tại" (Figma "ĐỊA CHỈ MUA DƯA LƯỚI" 2384:8927; mobile "Tìm mua dưa").
 * Used on Home, About, Products and the product detail pages.
 */
export function WhereToBuy({ className }: { className?: string }) {
  const photo = img("shared/where-to-buy-gift-box");
  return (
    <section aria-labelledby="where-to-buy-title" className={cn("section-gap", className)}>
      <Reveal className="container-site">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Mobile order: title, photo, text (Figma mobile) */}
          <div className="contents lg:flex lg:w-[421px] lg:flex-col lg:gap-10">
            <h2 id="where-to-buy-title" className="text-h4 font-extrabold lg:text-h2">
              Tìm mua
              <br />
              Dưa lưới Pansy tại
            </h2>
            <div className="order-last flex flex-col gap-4 text-body font-bold lg:order-none">
              <p>{whereToBuy.lead}</p>
              <ul className="flex flex-col gap-4">
                {whereToBuy.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <PansyFlower size={13} className="mt-1 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative lg:w-[553px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
            <img loading="lazy" src="/svg/decor/buy-flower.svg" alt="" aria-hidden="true" width={293} height={297} className="absolute -top-[60px] -right-4 w-[119px] lg:-top-[98px] lg:right-[-90px] lg:w-[293px]" />
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt="Hộp quà dưa lưới Pansy"
              sizes="(min-width: 1024px) 553px, 100vw"
              className="relative aspect-[553/290] w-full rounded-lg object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
            <img loading="lazy" src="/svg/mascot/buy-mascot.svg" alt="" aria-hidden="true" width={88} height={100} className="absolute right-6 -bottom-8 w-[53px] lg:-right-[13px] lg:-bottom-[46px] lg:w-[88px]" />
          </div>
        </div>

        <h3 className="mt-16 text-center text-subtitle font-bold text-eyebrow uppercase lg:text-left">
          Các điểm bán dưa Pansy
        </h3>
        <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-6 lg:flex lg:flex-col lg:gap-6">
          {retailers.map((row, r) => (
            <ul
              key={r}
              className={cn(
                "contents lg:flex lg:items-center lg:justify-between",
                r === 1 && "lg:px-12",
              )}
            >
              {row.map((logo) => (
                <li key={logo.name} className="flex h-12 items-center justify-center lg:h-[52px]">
                  <Image
                    src={img(logo.image).src}
                    width={logo.w}
                    height={logo.h}
                    alt={logo.name}
                    className={logo.cropTop ? "object-cover object-top" : "object-contain"}
                    style={{ width: logo.w, height: logo.h }}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

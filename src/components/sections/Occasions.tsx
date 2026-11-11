import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { occasions } from "@/content/home";
import { img, type ImageKey } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * "Dưa lưới Pansy, món quà dịu dàng từ thiên nhiên dành cho bạn." (Figma "Image" 2774:10700
 * variant 4 + "Dịp" cards 2384:7980/7986/7989; mobile "Image" 406:20707).
 * Desktop: three 360×453 cards, the middle one raised by 85 px; the description
 * appears on hover/focus (Figma hover variant). Mobile: stacked 343×343 cards,
 * description always visible. Tablet (768–1023, not designed): three cards in a row, no offset.
 */
export function Occasions({
  className,
  tone = "cream",
  heading,
  items = occasions,
  id = "occasions-title",
}: {
  className?: string;
  tone?: "cream" | "orange";
  /** Replaces the default eyebrow + title (used by "Pansy tại điểm bán"). */
  heading?: ReactNode;
  items?: { title: string; description?: string; image: ImageKey }[];
  id?: string;
}) {
  const onOrange = tone === "orange";
  return (
    <section aria-labelledby={id} className={cn("section-gap overflow-x-clip", className)}>
      <Reveal className="container-site relative">
        {/* Outline flower with the yellow mascot (top right) */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src={onOrange ? "/svg/decor/occasions-flower-outline-yellow.svg" : "/svg/decor/occasions-flower-outline.svg"}
          alt=""
          aria-hidden="true"
          width={380}
          height={347}
          className="absolute top-[88px] right-[-38px] w-[203px] lg:top-[90px] lg:right-[calc(var(--gutter)-99px)] lg:w-[380px]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/decor/group12-occasions.svg"
          alt=""
          aria-hidden="true"
          width={112}
          height={120}
          className="absolute top-[129px] right-[34px] w-[62px] lg:top-[211px] lg:right-[calc(var(--gutter)+26px)] lg:w-[112px]"
        />

        <div className="relative flex max-w-[572px] flex-col gap-2 lg:gap-6">
          {heading ?? (
            <>
              {!onOrange && (
                <p className="text-subtitle font-bold text-eyebrow uppercase">Khi vị ngọt trở thành một phần của kỷ niệm</p>
              )}
              <h2 id={id} className={cn("text-h5 font-extrabold lg:text-h2", onOrange && "text-white")}>
                <span className={onOrange ? "text-yellow-500" : "text-brand"}>Dưa lưới Pansy</span>, món quà
                <br />
                dịu dàng từ thiên nhiên
                <br />
                dành cho bạn.
              </h2>
            </>
          )}
        </div>

        <ul className="relative mt-16 flex flex-col gap-4 md:grid md:grid-cols-3 md:items-start lg:mt-[5px] lg:gap-6">
          {items.map((o, i) => {
            const image = img(o.image);
            return (
              <li key={o.title} className={cn(i !== 1 && "lg:mt-[85px]")}>
                <article
                  tabIndex={0}
                  className={cn(
                    "group relative flex aspect-square flex-col justify-end gap-1 overflow-hidden rounded-sm p-4 text-white outline-none",
                    "shadow-[4px_4px_0_0_rgb(17_17_17/0.5)] focus-visible:ring-3 focus-visible:ring-green-400",
                    "md:aspect-[360/453] lg:rounded-lg lg:p-7",
                  )}
                >
                  <Image src={image.src} width={image.width} height={image.height} alt="" sizes="(min-width: 1024px) 360px, 100vw" className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 -z-10 bg-linear-to-b from-sunorange-500/0 from-55% to-sunorange-500" />
                  <h3 className="text-body-lg font-extrabold lg:text-h5">{o.title}</h3>
                  {o.description && (
                  <p
                    className={cn(
                      "text-body",
                      "lg:max-h-0 lg:font-bold lg:opacity-0 lg:transition-all lg:duration-300",
                      "lg:group-hover:max-h-12 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-12 lg:group-focus-visible:opacity-100",
                    )}
                  >
                    {o.description}
                  </p>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

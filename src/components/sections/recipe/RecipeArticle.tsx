import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import type { RecipeDetail } from "@/content/menu";
import { routes } from "@/content/site";
import { CommentSection } from "./CommentSection";

/**
 * Recipe body (Figma "Frame 6805" 406:38427: 744 wide column; mobile 406:38836: 343).
 * Video cover → stats card → ingredients → method steps (text + photo) → back link and
 * reactions → tags → comments. Cream flowers float at the sides on desktop.
 */
export function RecipeArticle({ detail, title }: { detail: RecipeDetail; title: string }) {
  const hero = img(detail.heroImage);
  return (
    <article className="relative">
      <Flowers />
      <div className="container-narrow relative mt-[70px] flex flex-col gap-16 lg:mt-[150px]">
        <div className="flex flex-col gap-12">
          <Reveal className="flex flex-col gap-7">
            {/* Video cover: the design shows a play button; there is no video file, so it is a picture only. */}
            <div className="relative overflow-hidden rounded-sm">
              <Image src={hero.src} width={hero.width} height={hero.height} alt={title} sizes="(min-width: 768px) 744px, 100vw" className="aspect-[343/215] w-full object-cover md:aspect-[744/379]" />
              <span aria-hidden="true" className="absolute inset-0 bg-black/20" />
              {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
              <img loading="lazy" src="/svg/generated/recipe/play.svg" alt="" aria-hidden="true" width={52} height={52} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <ul aria-label="Thông tin công thức" className="flex flex-col gap-4 rounded-sm bg-white px-5 py-[22px] md:flex-row md:items-center md:justify-between md:px-11">
              {detail.stats.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <li aria-hidden="true" className="h-px bg-grey-400 md:h-[26px] md:w-px" />}
                  <li className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                    <img loading="lazy" src={s.icon} alt="" width={24} height={24} />
                    <span className="flex items-baseline gap-1">
                      <span className="text-h5 font-extrabold">{s.value}</span>
                      <span className="text-body">{s.label}</span>
                    </span>
                  </li>
                </Fragment>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col gap-3">
            <h2 className="text-body-lg/[27.3px] font-extrabold md:text-body-lg md:font-bold">{detail.ingredientsTitle}</h2>
            <ul className="flex flex-col gap-2 text-body">
              {detail.ingredients.map((i) => (
                <li key={i}>- {i}</li>
              ))}
            </ul>
          </Reveal>

          <section aria-labelledby="method-title" className="flex flex-col gap-4 md:gap-[26px]">
            <h2 id="method-title" className="text-h5 font-extrabold md:text-h4">
              {detail.methodTitle}
            </h2>
            <ol className="flex flex-col gap-[52px]">
              {detail.steps.map((s) => {
                const photo = img(s.image);
                return (
                  <li key={s.title}>
                    <Reveal className="flex flex-col gap-8">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-body font-bold md:text-body-lg">{s.title}</h3>
                        <p className="text-body">{s.text}</p>
                      </div>
                      <Image src={photo.src} width={photo.width} height={photo.height} alt="" sizes="(min-width: 768px) 744px, 100vw" className="aspect-square w-full rounded-sm object-cover md:aspect-[744/379]" />
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-[18px] border-t border-ink pt-[18px]">
            <div className="flex flex-col gap-3 px-0.5 md:flex-row md:items-center md:justify-between">
              <Link href={routes.menu} className="-my-1 flex items-center gap-2 py-1 text-body font-bold hover:underline">
                {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                <img loading="lazy" src="/svg/generated/recipe/arrow-back.svg" alt="" width={18} height={18} className="rotate-180" />
                Quay về Thực đơn
              </Link>
              <ul className="flex gap-[5px]" aria-label="Lượt tương tác">
                {detail.reactions.map((r) => (
                  <li key={r.label} className="flex items-center gap-2 rounded-full bg-[#FFEDCE] px-3 py-0.5 text-body font-bold">
                    {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                    <img loading="lazy" src={r.icon} alt={r.label} width={16} height={16} />
                    {r.count}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-[14px]">
            <p className="px-1.5 text-subtitle font-bold text-eyebrow">tags</p>
            <ul className="flex flex-wrap gap-1">
              {detail.tags.map((t) => (
                <li key={t} className="rounded-full bg-green-500/12 px-3 pt-1.5 pb-[7px] text-subtitle">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <CommentSection initial={detail.comments} />
        </div>
      </div>
    </article>
  );
}

/** Cream flowers (#FFEED2) at the sides, desktop only; positions from the 1440 frame, page-relative. */
const flowers = [
  { src: "flower-1", x: 979, y: 632, w: 370, h: 339, t: "scaleY(-1)" },
  { src: "flower-2", x: -129, y: 1527, w: 298, h: 273, t: "matrix(0.8986, 0.4387, 0.4387, -0.8986, 0, 0)" },
  { src: "flower-3", x: 1134, y: 2278, w: 166, h: 152, t: "matrix(0.8986, 0.4387, 0.4387, -0.8986, 0, 0)" },
  { src: "flower-4", x: 131, y: 3273, w: 111, h: 101, t: "matrix(0.8986, 0.4387, 0.4387, -0.8986, 0, 0)" },
];

function Flowers() {
  // The article starts 600 px below the page top (under the banner).
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[-600px] hidden lg:block">
      {flowers.map((f) => (
        // eslint-disable-next-line @next/next/no-img-element -- decorative vector
        <img loading="lazy"
          key={f.src}
          src={`/svg/generated/recipe/${f.src}.svg`}
          alt=""
          width={f.w}
          height={f.h}
          className="absolute max-w-none"
          style={{ left: `calc(50% + ${f.x - 720}px)`, top: f.y, transform: f.t }}
        />
      ))}
    </div>
  );
}

import Image from "next/image";
import { PansyFlower } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { experiences } from "@/content/about";
import { img, type ImageKey } from "@/content/images";

/**
 * "NHỮNG TRẢI NGHIỆM ĐẶC BIỆT…" (Figma "Frame 212" 2673:29209; mobile 406:25138).
 * List of four highlights left; photo collage right (498×524 on desktop, 342×360 on mobile,
 * same proportions): four photos with one rounded outer corner and a hard #F05D24 shadow,
 * an orange flower in the middle and the yellow mascot at the bottom.
 * Positions are in % of the 498×524 Figma frame.
 */
const W = 498;
const H = 524;
const photos: { key: ImageKey; x: number; y: number; w: number; h: number; corner: string }[] = [
  { key: "about/experience-international", x: 0, y: 0, w: 238, h: 251, corner: "rounded-tl-sm lg:rounded-tl-md" },
  { key: "about/experience-gift", x: 259, y: 273, w: 238, h: 251, corner: "rounded-br-sm lg:rounded-br-md" },
  { key: "about/experience-vanilla", x: 259, y: 45, w: 204, h: 206, corner: "rounded-tr-sm lg:rounded-tr-md" },
];
const last = { key: "about/experience-quality" as ImageKey, x: 34, y: 273, w: 204, h: 206, corner: "rounded-bl-sm lg:rounded-bl-md" };

const box = (x: number, y: number, w: number, h: number) => ({
  left: `${(x / W) * 100}%`,
  top: `${(y / H) * 100}%`,
  width: `${(w / W) * 100}%`,
  height: `${(h / H) * 100}%`,
});

function Photo({ p }: { p: (typeof photos)[number] }) {
  return (
    <Image
      {...img(p.key)}
      alt=""
      sizes="(min-width: 1024px) 238px, 163px"
      className={`absolute object-cover shadow-[3.6px_3.6px_0_0_var(--color-sunhoney-500)] lg:shadow-[5.3px_5.3px_0_0_var(--color-sunhoney-500)] ${p.corner}`}
      style={box(p.x, p.y, p.w, p.h)}
    />
  );
}

export function Experiences() {
  return (
    <section aria-labelledby="experiences-title" className="mt-[119px] lg:mt-[200px]">
      <Reveal className="container-site flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-col gap-[34px] lg:w-[500px] lg:gap-[49px]">
          <h2 id="experiences-title" className="max-w-[260px] text-subtitle font-bold text-eyebrow lg:max-w-none">
            {experiences.eyebrow}
          </h2>
          <ul className="flex flex-col gap-6 lg:gap-16">
            {experiences.items.map((t) => (
              <li key={t} className="flex items-center gap-2 lg:gap-3">
                <PansyFlower size={24} className="size-4 shrink-0 text-brand lg:size-6" />
                <span className="text-body-lg/[27.3px] font-extrabold lg:text-h4">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[498/524] w-full max-w-[342px] self-center lg:max-w-[498px] lg:shrink-0" aria-hidden="true">
          {photos.map((p) => (
            <Photo key={p.key} p={p} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy" src="/svg/generated/about/experience-flower.svg" alt="" width={171} height={189} className="absolute" style={box(164, 178, 171, 189)} />
          <Photo p={last} />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy" src="/svg/generated/about/experience-mascot.svg" alt="" width={99} height={107} className="absolute" style={box(173, 440, 99, 107)} />
        </div>
      </Reveal>
    </section>
  );
}

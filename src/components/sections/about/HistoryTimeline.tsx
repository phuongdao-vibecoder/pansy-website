import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { activities, timeline, vision, type TimelineStep } from "@/content/about";
import { img } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * Figma "BG" (2673:29335, 1920×4205; mobile "Frame 320" 406:24737):
 * "TẦM NHÌN & SỨ MỆNH" text → melon stem → farm photo inside the curved melon top,
 * fading into #F05D24 → "LỊCH SỬ HÌNH THÀNH" timeline on orange → white
 * "Hoạt động sản xuất" card that starts on the orange and ends on the cream page.
 */
export function HistoryTimeline() {
  return (
    <section aria-labelledby="vision-title" className="mt-[120px] lg:mt-[200px]">
      <Reveal className="container-site flex flex-col items-center gap-6 text-center">
        <p className="text-subtitle font-bold text-eyebrow">{vision.eyebrow}</p>
        <div className="flex flex-col gap-4">
          <h2 id="vision-title" className="text-h5 font-extrabold lg:text-h2">
            {vision.title[0]}
            <br />
            {vision.title[1]}
          </h2>
          <p className="mx-auto max-w-[585px] text-body lg:text-body-lg/[27.3px]">{vision.text}</p>
        </div>
      </Reveal>

      {/* Melon stem (Figma "Melon Bg", 1121×227 desktop / 292×59 mobile) */}
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img loading="lazy"
        src="/svg/decor/melon-bg-about.svg"
        alt=""
        aria-hidden="true"
        width={1121}
        height={228}
        className="relative z-10 mx-auto mt-[120px] block w-[min(1121px,78vw)] lg:mt-[69px]"
      />

      <VisionPhoto />

      <div className="relative bg-sunhoney-500 pb-[700px] lg:pb-[775px]">
        <div className="container-site relative -mt-[31px] flex flex-col items-center gap-4 text-center lg:-mt-[363px] lg:gap-6">
          <p className="text-subtitle font-bold text-white lg:text-yellow-500">{timeline.eyebrow}</p>
          <h2 className="max-w-[305px] text-h4 font-extrabold text-yellow-500 lg:max-w-none lg:text-h1">
            {timeline.title[0]}
            <br />
            {timeline.title[1]}
          </h2>
        </div>
        <TimelineMobile />
        <TimelineDesktop />
      </div>

      <Activities />
    </section>
  );
}

/** Farm photo clipped to the melon top, fading to orange (rendered from Figma "Clip path group"). */
function VisionPhoto() {
  const desktop = img("generated/about/vision-desktop");
  const mobile = img("generated/about/vision-mobile");
  return (
    <div aria-hidden="true" className="relative -mt-px">
      <Image src={mobile.src} width={mobile.width} height={mobile.height} alt="" sizes="100vw" className="w-full lg:hidden" />
      <div className="relative hidden h-[859px] overflow-hidden lg:block">
        <Image
          src={desktop.src}
          width={desktop.width}
          height={desktop.height}
          alt=""
          sizes="1920px"
          className="absolute top-0 left-1/2 h-full w-[1920px] max-w-none -translate-x-1/2"
        />
      </div>
    </div>
  );
}

/* ---------- Timeline ---------- */

/** Photo of a timeline step; two-image steps show two square shots side by side (Figma "Group 25"). */
function StepPhoto({ step, sizes, className, style }: { step: TimelineStep; sizes: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {step.images.length === 1 ? (
        <Image {...img(step.images[0])} alt="" sizes={sizes} className="size-full object-cover" />
      ) : (
        step.images.map((key, i) => (
          <Image
            key={key}
            {...img(key)}
            alt=""
            sizes={sizes}
            className="absolute top-[-2.9%] h-[102.9%] w-[72.1%] bg-white object-cover"
            style={{ left: i === 0 ? "-22.1%" : "50%" }}
          />
        ))
      )}
      {step.flag && (
        // eslint-disable-next-line @next/next/no-img-element -- Cambodian flag ribbon rendered from Figma
        <img loading="lazy" src="/svg/generated/about/timeline-cambodia-desktop.svg" alt="" width={144} height={137} className="absolute top-0 left-[41%] w-[59%]" />
      )}
    </div>
  );
}

/**
 * Mobile / tablet: vertical list (Figma "Container" 406:24748). A white rail on the left with
 * a flower at the first step, dots for the others and an arrow at the end.
 */
function TimelineMobile() {
  const steps = timeline.steps;
  return (
    <ol className="container-site mt-[35px] max-w-[calc(420px+2*var(--gutter))] text-white lg:hidden">
      {steps.map((s, i) => {
        const first = i === 0;
        const lastStep = i === steps.length - 1;
        return (
          <li key={`${s.date}-${s.title}`} className="flex gap-4">
            <div aria-hidden="true" className="flex w-5 shrink-0 flex-col items-center gap-2">
              <span className={cn("w-[3px] bg-white", first ? "h-2.5" : "h-5")} />
              {first ? (
                // eslint-disable-next-line @next/next/no-img-element -- decorative vector
                <img loading="lazy" src="/svg/generated/about/timeline-start-mobile.svg" alt="" width={30} height={30} className="max-w-none" />
              ) : (
                <span className="size-3 rounded-full bg-white" />
              )}
              <span className="w-[3px] flex-1 bg-white" />
              {lastStep && (
                // eslint-disable-next-line @next/next/no-img-element -- decorative vector
                <img loading="lazy" src="/svg/generated/about/timeline-end-mobile.svg" alt="" width={23} height={24} className="-mt-3 max-w-none" />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-8 pt-4 pb-8">
              <div className="flex flex-col items-start gap-5">
                <p className="rounded-xs bg-yellow-500 px-2 py-0.5 text-body-lg/[27.3px] font-extrabold text-brand">{s.date}</p>
                <h3 className="text-body font-bold">{s.title.replace("\n", " ")}</h3>
              </div>
              <StepPhoto step={s} sizes="(min-width: 768px) 420px, 307px" className="aspect-[307/215] rounded-sm" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Desktop: the path snakes left→right, right→left, left→right (Figma "Hành trình new"
 * 2962:36298, 1137×1177). Path, flowers and mascots are one SVG rendered from Figma (padded
 * 100 px); the ten cards are live HTML placed at their Figma positions, in % of the frame,
 * with text sized in cqw so everything scales together below 1137 px.
 */
const TW = 1137;
const TH = 1177;
const cardPos = [
  [191, 0], [479, 0], [767, 0],
  [864, 388], [576, 388], [288, 388], [0, 388],
  [191, 776], [479, 776], [767, 776],
];
const cq = (px: number) => `${(px / TW) * 100}cqw`;

function TimelineDesktop() {
  return (
    <div className="container-site mt-[100px] hidden lg:block">
      <ol className="relative aspect-[1137/1177] w-full [container-type:inline-size]">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/generated/about/timeline-decor.svg"
          alt=""
          aria-hidden="true"
          width={1337}
          height={1377}
          className="pointer-events-none absolute max-w-none"
          style={{ left: `${(-100 / TW) * 100}%`, top: `${(-100 / TH) * 100}%`, width: `${(1337 / TW) * 100}%` }}
        />
        {timeline.steps.map((s, i) => {
          const [x, y] = cardPos[i];
          return (
            <li
              key={`${s.date}-${s.title}`}
              className="absolute"
              style={{ left: `${(x / TW) * 100}%`, top: `${(y / TH) * 100}%`, width: `${(264 / TW) * 100}%`, height: `${(279 / TH) * 100}%` }}
            >
              <div
                className="absolute inset-x-0 bottom-0 flex items-end justify-center bg-yellow-500 text-center"
                style={{ top: "41.58%", borderRadius: cq(20), paddingBottom: cq(16) }}
              >
                <h3 className="font-bold whitespace-pre-line" style={{ fontSize: cq(20), lineHeight: 1.2 }}>
                  {s.title}
                </h3>
              </div>
              <StepPhoto
                step={s}
                sizes="244px"
                className="absolute"
                style={{ left: "3.79%", top: "12.19%", width: "92.42%", height: "61.29%", borderRadius: cq(16) }}
              />
              <p
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-500 font-extrabold text-brand"
                style={{ fontSize: cq(25), lineHeight: 1.28, padding: `${cq(2)} ${cq(8)}`, borderRadius: cq(8) }}
              >
                {s.date}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ---------- Hoạt động sản xuất ---------- */

/**
 * White card (Figma "Frame 226" 2673:29758: 1256 wide, r32, soft shadow; mobile 406:25115).
 * Desktop: four photo cards in a zig-zag (Figma "Hoạt động sx" 2774:44522, 1127×1279) with
 * orange flowers behind; mobile: a simple list in the Figma mobile order.
 */
const AW = 1127;
const AH = 1279;
const activityPos = [
  [672, 40], // trồng trọt
  [0, 308], // đóng gói
  [576, 527], // phân phối xuất khẩu
  [288, 955], // tiếp thị
];

function Activities() {
  return (
    <div className="container-site relative z-10 -mt-[600px] lg:-mt-[543px]">
      <Reveal className="relative overflow-hidden rounded-xs bg-white px-4 py-[33px] shadow-[0_1px_2px_rgb(0_0_0/0.1)] min-[1300px]:-mx-16 lg:rounded-xl lg:px-16 lg:py-[92px] lg:shadow-[0_2px_4px_-2px_rgb(0_0_0/0.06),0_4px_8px_-2px_rgb(0_0_0/0.1)]">
        <h2 id="activities-title" className="relative z-10 text-h4 font-extrabold lg:absolute lg:top-[92px] lg:left-16 lg:text-h2">
          {activities.title[0]}
          <br />
          {activities.title[1]}
        </h2>

        {/* Mobile */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/generated/about/activities-flower-mobile.svg"
          alt=""
          aria-hidden="true"
          width={137}
          height={138}
          className="absolute top-[86px] left-[247px] w-[137px] max-w-none lg:hidden"
          style={{ transform: "matrix(0.7913, -0.6114, -0.6114, -0.7913, 0, 0)" }}
        />
        <ul aria-labelledby="activities-title" className="relative mt-8 flex flex-col gap-8 lg:hidden">
          {activities.items.map((a) => (
            <li key={a.title} className="flex flex-col gap-[13px]">
              <Image {...img(a.image)} alt="" sizes="(min-width: 768px) 700px, 311px" className="aspect-[311/212] w-full rounded-sm object-cover shadow-[4px_4px_0_0_rgb(17_17_17/0.5)]" />
              <h3 className="text-body font-bold">{a.title}</h3>
            </li>
          ))}
        </ul>

        {/* Desktop */}
        <ul aria-labelledby="activities-title" className="relative hidden aspect-[1127/1279] [container-type:inline-size] lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy"
            src="/svg/generated/about/activities-decor.svg"
            alt=""
            aria-hidden="true"
            width={1167}
            height={1319}
            className="pointer-events-none absolute max-w-none"
            style={{ left: `${(-20 / AW) * 100}%`, top: `${(-20 / AH) * 100}%`, width: `${(1167 / AW) * 100}%` }}
          />
          {activities.items.map((a, i) => {
            const [x, y] = activityPos[i];
            return (
              <li key={a.title} className="absolute flex flex-col" style={{ left: `${(x / AW) * 100}%`, top: `${(y / AH) * 100}%`, width: `${(455 / AW) * 100}%`, gap: `${(20 / AW) * 100}cqw` }}>
                <Image {...img(a.image)} alt="" sizes="455px" className="aspect-[455/320] w-full rounded-md object-cover shadow-hard-sm" />
                <h3 className="font-bold" style={{ fontSize: `${(20 / AW) * 100}cqw`, lineHeight: 1.2 }}>
                  {a.title}
                </h3>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}

import { Fragment } from "react";
import { PansyFlower } from "@/components/icons";
import { cn } from "@/lib/cn";

/**
 * Scrolling slogan strip (Figma "Group" 2384:22716 on Home, "Carousel-1" on other pages).
 * In Figma the text is outlined vectors, about 27 px tall, in #F37326; it is rebuilt
 * here as live text (Nunito ExtraBold, uppercase) so it stays crisp and readable.
 * The animation stops for users who prefer reduced motion (globals.css).
 */
const defaultItems = [
  "Chuẩn giòn chuẩn ngọt chuẩn Pansy",
  "Dưa lưới Việt chuẩn quốc tế",
];

export function Marquee({
  items = defaultItems,
  className,
}: {
  items?: string[];
  className?: string;
}) {
  // Repeat the list so one copy is always wider than the screen, then render it twice
  // and slide by -50% for a seamless loop.
  const run = Array.from({ length: 4 }, () => items).flat();
  const copy = (hidden: boolean) => (
    <div className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden || undefined}>
      {run.map((text, i) => (
        <Fragment key={i}>
          <span className="whitespace-nowrap">{text}</span>
          <PansyFlower size={16} />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden py-1 text-body-lg font-extrabold text-brand uppercase", className)}>
      <p className="sr-only">{items.join(" · ")}</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none" aria-hidden="true">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}

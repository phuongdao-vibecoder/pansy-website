"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Minimal carousel: native horizontal scroll with snap points, flower-shaped
 * arrow buttons (Figma "Arrow Flower" 297:24568) and optional dots
 * (Figma "Slider Dots"). Swipe works through normal touch scrolling.
 */
type ArrowColor = "green" | "red" | "white" | "yellow";

export function Carousel({
  children,
  label,
  arrowColor = "green",
  arrowSize = "large",
  dots = false,
  dotColor = "yellow",
  inactiveDotClassName = "bg-white",
  className,
  trackClassName,
  slideClassName,
  arrowsClassName,
  controls = "overlay",
  controlsClassName,
}: {
  children: ReactNode;
  /** Accessible name, e.g. "Công thức từ Pansy". */
  label: string;
  arrowColor?: ArrowColor;
  arrowSize?: "large" | "small";
  dots?: boolean;
  dotColor?: "yellow" | "green" | "honey";
  /** Inactive dot color class (white by default, for orange backgrounds). */
  inactiveDotClassName?: string;
  className?: string;
  trackClassName?: string;
  /** Width of each slide, e.g. "w-full" or "w-[80%]". */
  slideClassName?: string;
  /** Position of the arrow buttons; defaults to the vertical middle, on the edges. */
  arrowsClassName?: string;
  /** "overlay": arrows on the slides; "bar": dots left and arrows right in a row below (Figma "Video-d"). */
  controls?: "overlay" | "bar";
  controlsClassName?: string;
}) {
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const w = (el.firstElementChild as HTMLElement).offsetWidth;
    setIndex(Math.round(el.scrollLeft / Math.max(w, 1)));
    // With several slides in view the track can end before the last index is reached.
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    const frame = requestAnimationFrame(onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el?.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    const target = el?.children[Math.max(0, Math.min(i, slides.length - 1))] as HTMLElement | undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  const size = arrowSize === "large" ? 48 : 40;
  const arrow = (dir: "left" | "right") => (
    <button
      type="button"
      onClick={() => goTo(index + (dir === "left" ? -1 : 1))}
      disabled={dir === "left" ? index === 0 : index >= slides.length - 1 || atEnd}
      aria-label={dir === "left" ? "Trước" : "Tiếp theo"}
      className="pointer-events-auto shrink-0 rounded-full transition-[transform,opacity] outline-none hover:scale-110 focus-visible:ring-3 focus-visible:ring-green-400 disabled:opacity-40"
    >
      {/* The exported Figma variants are named the other way round: "*-right" draws "<". */}
      {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector arrow */}
      <img src={`/svg/icons/arrow-flower/${arrowColor}-${dir === "left" ? "right" : "left"}-${arrowSize}.svg`} alt="" width={size} height={size} />
    </button>
  );

  const dotList = (
    <div className={cn("flex", controls === "bar" ? "gap-2" : "gap-[9px]")} role="tablist" aria-label="Chọn trang">
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`Trang ${i + 1}`}
          onClick={() => goTo(i)}
          className={cn("relative size-2 rounded-full transition-colors after:absolute after:-inset-2 after:content-['']", i === index ? (dotColor === "yellow" ? "bg-yellow-500" : dotColor === "green" ? "bg-green-500" : "bg-sunhoney-500") : inactiveDotClassName)}
        />
      ))}
    </div>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={cn("relative", className)}>
      <div
        ref={trackRef}
        // Focusable so keyboard users can scroll it with the arrow keys even when slides hold no links.
        tabIndex={0}
        className={cn(
          "flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "rounded-xs outline-none focus-visible:ring-3 focus-visible:ring-green-400",
          trackClassName,
        )}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className={cn("shrink-0 snap-start", slideClassName ?? "w-full")}
          >
            {slide}
          </div>
        ))}
      </div>

      {controls === "overlay" && slides.length > 1 && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between",
            arrowsClassName,
          )}
        >
          {arrow("left")}
          {arrow("right")}
        </div>
      )}

      {controls === "overlay" && dots && slides.length > 1 && <div className="mt-6 flex justify-center">{dotList}</div>}

      {controls === "bar" && slides.length > 1 && (
        <div className={cn("mt-6 flex items-center justify-between gap-8 lg:mt-12", controlsClassName)}>
          {dots ? dotList : <span />}
          <div className="flex gap-4">
            {arrow("left")}
            {arrow("right")}
          </div>
        </div>
      )}
    </div>
  );
}

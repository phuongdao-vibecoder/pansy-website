"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll reveal: Fade In + Slide Up, once per element.
 * Figma annotation 2893:36165 asks for this on every section (desktop and mobile).
 * Timing (600 ms ease-out, 32 px) is a recommendation; Figma gives none.
 * Styles live in globals.css ([data-reveal]); reduced motion turns it off.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  delayMs = 0,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delayMs?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal="hidden"
      className={className}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

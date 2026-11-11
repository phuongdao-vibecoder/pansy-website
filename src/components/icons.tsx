import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Chevron used next to "Sản Phẩm" (Figma vector 12×7, stroke 1.6). */
export function ChevronDown({ size = 12, ...props }: IconProps) {
  return (
    <svg width={size} height={(size * 7) / 12} viewBox="0 0 12 7" fill="none" aria-hidden="true" {...props}>
      <path d="M.83.83 6 6 11.17.83" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
}

/** Three-line menu icon (Figma "Frame 82": 20×16, gap 3). */
export function MenuIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg width={size} height={(size * 16) / 20} viewBox="0 0 20 16" fill="none" aria-hidden="true" {...props}>
      <path d="M1.5 2h17M1.5 8h17M1.5 14h17" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

/** Pansy six-petal flower, used as the marquee separator. */
export function PansyFlower({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} cx="12" cy="6.2" rx="3.6" ry="5.4" transform={`rotate(${deg} 12 12)`} />
      ))}
    </svg>
  );
}

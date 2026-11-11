import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Pansy-Button (Figma 124:2919). Specs: DESIGN_SPEC.md §5.2.
 * Hover / Press / Focus / Disabled are CSS states, not props.
 */
export type ButtonVariant = "green" | "orange" | "yellow" | "white" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  green:
    // Brand colours, exact Figma values: green #00AB4E, orange #F37326, yellow #F8EC23
    // (approved 2026-11-10). White text on green/orange is 3.0 / 2.9 : 1, below WCAG AA for
    // body-size text: a known, accepted gap (see PROJECT_PLAN Phase 10 notes).
    "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-400",
  orange:
    "bg-sunorange-500 text-white hover:bg-sunorange-600 active:bg-sunorange-700 focus-visible:ring-sunorange-400",
  yellow:
    "bg-yellow-500 text-ink hover:bg-yellow-600 active:bg-yellow-700 focus-visible:ring-yellow-400",
  white:
    "bg-white text-ink hover:bg-grey-300 active:bg-grey-400 focus-visible:ring-grey-400",
  // Ghost and Outline only exist as Small/Default in Figma; hover is a derived underline.
  ghost: "text-ink !p-0 hover:underline focus-visible:ring-green-400",
  outline: "border border-ink text-ink hover:bg-white/60 focus-visible:ring-green-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-[34px] px-4 py-2 gap-2 text-subtitle",
  md: "min-h-[38px] px-5 py-2 gap-2 text-body",
  lg: "min-h-12 px-6 py-3 gap-2 text-body-lg",
};

const iconOnlyClasses: Record<ButtonSize, string> = {
  sm: "size-[34px] p-2",
  md: "size-[38px] p-2",
  lg: "size-[52px] p-3",
};

const iconSize: Record<ButtonSize, number> = { sm: 16, md: 24, lg: 28 };

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show the up-right arrow icon. "only" renders an icon button (needs aria-label). */
  icon?: "left" | "right" | "only";
  className?: string;
  children?: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "orange", size = "md", icon, className, children, ...rest } = props;

  const classes = cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-bold whitespace-nowrap",
    "transition-colors duration-150 outline-none focus-visible:ring-3",
    "disabled:pointer-events-none disabled:bg-grey-400 disabled:text-grey-200",
    "aria-disabled:pointer-events-none aria-disabled:bg-grey-400 aria-disabled:text-grey-200",
    variantClasses[variant],
    icon === "only" ? iconOnlyClasses[size] : sizeClasses[size],
    className,
  );

  const arrow = icon ? <ArrowUpRight size={iconSize[size]} /> : null;
  const content = (
    <>
      {icon === "left" && arrow}
      {icon !== "only" && children}
      {(icon === "right" || icon === "only") && arrow}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

function ArrowUpRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

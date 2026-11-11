import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { img } from "@/content/images";
import { externalLinkProps, footerNav, footerPartners, routes, socialLinks } from "@/content/site";

/**
 * Footer (Figma "Footer" 2899:42099 desktop, "Frame 6859" mobile).
 * Layout: green stem + orange melon-shaped background (#F05D24), a slot for the
 * card that sits on top (contact form on most pages, FAQ on the Contact page),
 * then the link footer (Figma "footer" 16:20084 / 161:11347).
 */
export function SiteFooter({ children }: { children?: ReactNode }) {
  return (
    <footer data-site-footer className="relative mt-[var(--section-gap)] overflow-x-clip text-white">
      <MelonTop />
      <div className="relative overflow-hidden bg-sunhoney-500 pb-6 lg:pb-[100px]">
        {/* Large lighter flower behind the card and links (Figma 552×609, #F37326) */}
        <div className="pointer-events-none absolute inset-x-0 top-[420px] lg:top-[590px]" aria-hidden="true">
          <div className="container-site relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
            <img loading="lazy"
              src="/svg/decor/footer-flower.svg"
              alt=""
              width={552}
              height={609}
              className="absolute -left-[100px] w-[260px] lg:-left-[255px] lg:w-[552px]"
            />
          </div>
        </div>

        <div className="relative pt-10 lg:pt-[67px]">{children}</div>
        <FooterLinks />
      </div>
    </footer>
  );
}

/**
 * Stem + curved melon top. The curve keeps the Figma proportions (149 px tall at 1920 px).
 * Pages that start the orange melon earlier (Home: recipes + social) render their own
 * <MelonSection>; the footer then hides its own top (see globals.css).
 */
export function MelonTop() {
  const stem = { "--stem-w": "clamp(249px, 58vw, 1121px)" } as CSSProperties;
  return (
    <div data-melon-top className="relative" style={stem} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img loading="lazy"
        src="/svg/decor/group14-footer.svg"
        alt=""
        width={1121}
        height={226}
        className="relative z-10 mx-auto block w-[var(--stem-w)]"
      />
      <svg
        viewBox="0 0 1920 149"
        preserveAspectRatio="none"
        className="relative -mt-[calc(var(--stem-w)*25/1121)] -mb-px block h-[max(40px,7.76vw)] w-full"
      >
        <path d="M0 149C0 149 253.8 0 955.2 0C1656.7 0 1920 149 1920 149Z" fill="var(--color-sunhoney-500)" />
      </svg>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="container-site relative mt-16 lg:mt-[174px]">
      <div className="flex flex-col gap-11 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <Link href={routes.home} aria-label="Pansy — Trang chủ" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- white vector logo */}
          <img loading="lazy" src="/svg/brand/logo-footer-pansy.svg" alt="" width={264} height={51} className="h-[51px] w-auto" />
        </Link>

        <div className="flex flex-col gap-11 md:flex-row md:flex-wrap md:gap-16 lg:flex-1 lg:flex-nowrap">
          <ul className="grid shrink-0 grid-flow-col grid-cols-2 grid-rows-2 gap-x-10 gap-y-4 md:grid-flow-row md:grid-cols-1 md:grid-rows-none md:gap-y-2">
            {footerNav.main.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="-my-1 inline-block py-1 text-subtitle font-bold hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 flex-col gap-6">
            <Link href={footerNav.secondary[0].href} className="-my-1 inline-block py-1 text-subtitle font-bold hover:underline">
              {footerNav.secondary[0].label}
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element -- Soleil Farm vector logo */}
            <img loading="lazy" src="/svg/brand/logo-footer-2.svg" alt="Soleil Farm" width={74} height={53} className="max-w-none" />
          </div>

          <div className="flex shrink-0 flex-col gap-6">
            <Link href={footerNav.secondary[1].href} className="-my-1 inline-block py-1 text-subtitle font-bold hover:underline">
              {footerNav.secondary[1].label}
            </Link>
            <div className="flex flex-col gap-4">
              {footerPartners.map((row, r) => (
                <ul key={r} className={r === 0 ? "flex items-center gap-12" : "flex items-center gap-[21px]"}>
                  {row.map((p) => (
                    <li key={p.name} className="flex h-8 items-center">
                      <Image
                        src={img(p.image).src}
                        width={p.w}
                        height={p.h}
                        alt={p.name}
                        className="object-contain"
                        // Height follows width so logos scale evenly when the row is squeezed at 320 px (QA 2026-11-11).
                        style={{ width: p.w, height: "auto" }}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <ul className="flex gap-2">
          {socialLinks.map((s) => (
            <li key={s.icon}>
              <a
                href={s.href}
                {...externalLinkProps}
                aria-label={`${s.label} (mở trong tab mới)`}
                className="flex size-8 items-center justify-center rounded-full bg-honey-card transition-transform hover:scale-110"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- icon */}
                <img loading="lazy" src={`/svg/icons/social/${s.icon}.svg`} alt="" width={19} height={19} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-11 flex flex-col gap-2 border-t border-white/60 pt-2.5 text-caption md:flex-row md:justify-between lg:mt-20">
        <p>©Bản quyền thuộc về Pansy. Thiết kế bởi Beau Agency</p>
        <p className="hidden md:block">©Bản quyền thuộc về Pansy.</p>
      </div>
    </div>
  );
}

/** Orange melon area that starts above the footer and flows into it. */
export function MelonSection({ children }: { children: ReactNode }) {
  return (
    <div data-melon-continues className="section-gap text-white">
      <MelonTop />
      <div className="relative bg-sunhoney-500 pt-10 lg:pt-[51px]">{children}</div>
    </div>
  );
}

/**
 * A closed melon shape: stem + curved top, orange body, curved bottom
 * (Figma "Frame 6700" on Sản phẩm: vector 1920×3450 with a 197 px bottom curve).
 */
export function MelonBand({ children }: { children: ReactNode }) {
  return (
    <div className="section-gap text-white">
      <MelonTop />
      <div className="relative bg-sunhoney-500 pt-16 pb-10 lg:pt-[56px] lg:pb-16">{children}</div>
      <svg viewBox="0 0 1920 197" preserveAspectRatio="none" aria-hidden="true" className="-mt-px block h-[max(40px,10.26vw)] w-full">
        <path d="M0 0H1920V0C1920 0 1666.2 197 964.8 197C263.3 197 0 0 0 0Z" fill="var(--color-sunhoney-500)" />
      </svg>
    </div>
  );
}

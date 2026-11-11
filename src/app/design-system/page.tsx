import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";

/**
 * Internal page for checking the design tokens against Figma.
 * Not linked from the site.
 */
export const metadata: Metadata = { title: "Design system" };

const scales = ["sunorange", "sunhoney", "sunyellow", "green", "yellow", "grey"] as const;
const steps = ["950", "900", "800", "700", "600", "500", "400", "300", "200"] as const;

// Full class names written out so Tailwind can find them.
const swatch: Record<(typeof scales)[number], Record<(typeof steps)[number], string>> = {
  sunorange: { 950: "bg-sunorange-950", 900: "bg-sunorange-900", 800: "bg-sunorange-800", 700: "bg-sunorange-700", 600: "bg-sunorange-600", 500: "bg-sunorange-500", 400: "bg-sunorange-400", 300: "bg-sunorange-300", 200: "bg-sunorange-200" },
  sunhoney: { 950: "bg-sunhoney-950", 900: "bg-sunhoney-900", 800: "bg-sunhoney-800", 700: "bg-sunhoney-700", 600: "bg-sunhoney-600", 500: "bg-sunhoney-500", 400: "bg-sunhoney-400", 300: "bg-sunhoney-300", 200: "bg-sunhoney-200" },
  sunyellow: { 950: "bg-sunyellow-950", 900: "bg-sunyellow-900", 800: "bg-sunyellow-800", 700: "bg-sunyellow-700", 600: "bg-sunyellow-600", 500: "bg-sunyellow-500", 400: "bg-sunyellow-400", 300: "bg-sunyellow-300", 200: "bg-sunyellow-200" },
  green: { 950: "bg-green-950", 900: "bg-green-900", 800: "bg-green-800", 700: "bg-green-700", 600: "bg-green-600", 500: "bg-green-500", 400: "bg-green-400", 300: "bg-green-300", 200: "bg-green-200" },
  yellow: { 950: "bg-yellow-950", 900: "bg-yellow-900", 800: "bg-yellow-800", 700: "bg-yellow-700", 600: "bg-yellow-600", 500: "bg-yellow-500", 400: "bg-yellow-400", 300: "bg-yellow-300", 200: "bg-yellow-200" },
  grey: { 950: "bg-grey-950", 900: "bg-grey-900", 800: "bg-grey-800", 700: "bg-grey-700", 600: "bg-grey-600", 500: "bg-grey-500", 400: "bg-grey-400", 300: "bg-grey-300", 200: "bg-grey-200" },
};

const extraColors = [
  ["bg-cream", "cream #FFEED7"],
  ["bg-sunorange-bg", "sunorange-bg #FFF4E0"],
  ["bg-sunorange-accent", "sunorange-accent #FEE8C2"],
  ["bg-honey-card", "honey-card #FBB040"],
] as const;

const typeStyles = [
  ["font-display text-display uppercase", "OT/Display 72 — CHUẨN GIÒN CHUẨN NGỌT"],
  ["font-display text-ot-subheading uppercase", "OT/Subheading 48 — Liên hệ với Pansy"],
  ["font-display text-ot-title uppercase", "OT/Title 32 — Dưa lưới SunOrange"],
  ["font-display text-ot-small uppercase", "OT/Subheading 28 — Dưa Lưới Pansy"],
  ["text-h1 font-extrabold", "H1 56 — Dưa lưới Pansy"],
  ["text-h2 font-extrabold", "H2 49 — Chia sẻ của bạn về Dưa lưới Pansy"],
  ["text-h3 font-extrabold", "H3 39 — Gợi ý từ căn bếp Pansy"],
  ["text-h4 font-extrabold", "H4 31 — Tổng quan các dòng dưa"],
  ["text-h5 font-extrabold", "H5 25 — Sinh tố dưa lưới"],
  ["text-body-lg font-bold", "BodyLg Bold 20 — Độ brix 14+"],
  ["text-body", "Body Regular 16 — Dưa lưới không chỉ để ăn tươi, mà còn là nguyên liệu."],
  ["text-subtitle font-bold uppercase text-eyebrow", "Subtitle Bold 14 — DÒNG SẢN PHẨM"],
  ["text-caption", "Caption 12 — ©Bản quyền thuộc về Pansy."],
  ["text-footnote", "Footnote 10 — ghi chú"],
] as const;

const variants: ButtonVariant[] = ["green", "orange", "yellow", "white"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export default function DesignSystemPage() {
  return (
    <main className="container-site flex flex-col gap-20 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-subtitle font-bold text-eyebrow uppercase">Pansy · Internal</p>
        <h1 className="font-display text-ot-subheading text-brand uppercase">Design system</h1>
        <p className="text-body">Tokens from Figma, rendered with Tailwind. Compare against DESIGN_SPEC.md.</p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Colors</h2>
        {scales.map((scale) => (
          <div key={scale} className="flex flex-col gap-2">
            <p className="text-subtitle font-bold">{scale}</p>
            <div className="grid grid-cols-9 gap-1">
              {steps.map((step) => (
                <div key={step} className="flex flex-col gap-1">
                  <div className={`h-12 rounded-xs ${swatch[scale][step]}`} />
                  <span className="text-caption">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {extraColors.map(([cls, label]) => (
            <div key={cls} className="flex flex-col gap-1">
              <div className={`h-12 rounded-xs border border-grey-400 ${cls}`} />
              <span className="text-caption">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Typography</h2>
        <div className="flex flex-col gap-4 text-ink">
          {typeStyles.map(([cls, label]) => (
            <p key={label} className={cls}>
              {label}
            </p>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Buttons</h2>
        {variants.map((variant) => (
          <div key={variant} className="flex flex-wrap items-center gap-4 rounded-sm bg-sunorange-bg p-4">
            <span className="w-16 text-subtitle font-bold">{variant}</span>
            {sizes.map((size) => (
              <Button key={size} variant={variant} size={size}>
                Liên hệ ngay
              </Button>
            ))}
            <Button variant={variant} size="md" icon="right">
              Xem thêm
            </Button>
            <Button variant={variant} size="lg" icon="only" aria-label="Xem thêm" />
            <Button variant={variant} size="md" disabled>
              Disabled
            </Button>
          </div>
        ))}
        <div className="flex flex-wrap items-center gap-4 rounded-sm bg-sunorange-bg p-4">
          <span className="w-16 text-subtitle font-bold">other</span>
          <Button variant="ghost" size="sm" icon="right">
            Tìm hiểu thêm
          </Button>
          <Button variant="outline" size="sm" icon="right">
            Xem thêm
          </Button>
        </div>
        <p className="text-caption">Hover, press (click and hold), and Tab for focus to check the states.</p>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Radius &amp; shadows</h2>
        <div className="flex flex-wrap gap-6">
          {["rounded-xs", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-full"].map((r) => (
            <div key={r} className={`flex size-24 items-center justify-center bg-white text-caption ${r}`}>
              {r}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-10 pb-6">
          {["shadow-hard-sm", "shadow-hard-md", "shadow-hard-lg"].map((s) => (
            <div key={s} className={`flex h-24 w-40 items-center justify-center rounded-md bg-white text-caption ${s}`}>
              {s}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Scroll reveal</h2>
        <p className="text-body">Scroll down: each card fades in and slides up once.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 120, 240].map((delay) => (
            <Reveal key={delay} delayMs={delay} className="h-40 rounded-md border-4 border-sunorange-500 bg-white p-7">
              <p className="font-display text-ot-title text-sunorange-500 uppercase">Dưa lưới SunOrange</p>
              <p className="text-body font-bold">Đậm vị • Thơm dịu • Mọng nước</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-h4 font-extrabold">Images &amp; SVG</h2>
        <p className="text-body">Optimized images from public/images via next/image, plus raw SVG exports.</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Image {...img("shared/product-sunorange")} alt="Dưa lưới SunOrange" sizes="(min-width: 768px) 25vw, 50vw" className="h-auto w-full rounded-md bg-white" />
          <Image {...img("shared/product-sunyellow")} alt="Dưa lưới SunYellow" sizes="(min-width: 768px) 25vw, 50vw" className="h-auto w-full rounded-md bg-white" />
          <Image {...img("shared/product-sunhoney")} alt="Dưa lưới SunHoney" sizes="(min-width: 768px) 25vw, 50vw" className="h-auto w-full rounded-md bg-white" />
          <Image {...img("shared/occasion-family")} alt="Gia đình thưởng thức dưa lưới" sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full rounded-md object-cover" />
        </div>
        <div className="flex flex-wrap items-center gap-8 rounded-sm bg-brand p-6">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVGs from Figma */}
          <img src="/svg/brand/logo-header.svg" alt="Pansy" width={89} height={37} className="rounded-xs bg-white p-2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/brand/logo-footer-pansy.svg" alt="Pansy" width={264} height={51} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/mascot/hero-mascot-3.svg" alt="" width={63} height={72} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/icons/arrow-flower/yellow-right-large.svg" alt="" width={48} height={48} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4 font-extrabold">Marquee</h2>
        <Marquee />
      </section>
    </main>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { img } from "@/content/images";
import { productLines, type ProductLine } from "@/content/products";
import { getProduct, routes } from "@/content/site";
import { cn } from "@/lib/cn";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * Product rows on "Sản phẩm" (Figma Frame 6961 + "SunOrange/SunYellow/SunHoney 1").
 * Desktop: colored card (456 wide) and illustration (465×566) side by side, alternating.
 * Mobile: card, then illustration below.
 * The illustration is rendered from Figma geometry; its text labels are live HTML,
 * positioned in % so they scale with the picture.
 */
const cardBg = {
  sunorange: "bg-sunorange-500",
  sunyellow: "bg-sunyellow-500",
  sunhoney: "bg-sunhoney-500",
} as const;

const headlineColor = {
  sunorange: "text-sunorange-500",
  sunyellow: "text-sunyellow-500",
  sunhoney: "text-sunorange-500",
} as const;

// Illustration frame in Figma is 465×566; the export adds 30 px on every side.
const FW = 465;
const FH = 566;
const PAD = 30;

function Illustration({ line }: { line: ProductLine }) {
  const art = img(line.illustration);
  return (
    <div className="relative mx-auto aspect-[465/566] w-full max-w-[465px] shrink-0 [container-type:inline-size] lg:mx-0 lg:w-[420px] min-[1300px]:w-[465px]">
      <Image
        src={art.src}
        width={art.width}
        height={art.height}
        alt=""
        sizes="(min-width: 1024px) 525px, 100vw"
        className="absolute max-w-none"
        style={{
          left: `${(-PAD / FW) * 100}%`,
          top: `${(-PAD / FH) * 100}%`,
          width: `${((FW + 2 * PAD) / FW) * 100}%`,
        }}
      />
      {line.labels.map((l) => (
        <p
          key={l.text}
          className={cn(
            "absolute font-bold whitespace-pre-line",
            l.kind === "headline" ? cn("text-center", headlineColor[line.slug]) : "text-ink",
            l.align === "center" && "text-center",
          )}
          style={{
            left: `${((l.x - PAD) / FW) * 100}%`,
            top: `${((l.y - PAD) / FH) * 100}%`,
            width: `${(l.w / FW) * 100 + 4}%`,
            fontSize: `${((l.kind === "headline" ? 20 : 16) / FW) * 100}cqw`,
            lineHeight: l.kind === "headline" ? 1.2 : 1.36,
          }}
        >
          {l.text}
        </p>
      ))}
    </div>
  );
}

function ProductCardLarge({ line }: { line: ProductLine }) {
  const product = getProduct(line.slug)!;
  return (
    <article className={cn("flex flex-col gap-8 rounded-md p-6 text-white lg:w-[456px] lg:shrink-0 lg:p-8", cardBg[line.slug])}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[21px]">
          <div className="flex items-center justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element -- white vector logo */}
            <img loading="lazy" src="/svg/generated/brand/logo-white-small.svg" alt="Pansy" width={121} height={54} />
            <Button href={routes.product(line.slug)} variant="yellow" size="md">
              Xem thêm
            </Button>
          </div>
          <hr className="border-white" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-ot-title tracking-[0.02em] text-yellow-500 uppercase"><DisplayText>{product.name}</DisplayText></h2>
          <p className="text-body">{line.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {line.photos.map((key) => {
          const p = img(key);
          return (
            <Image
              key={key}
              src={p.src}
              width={p.width}
              height={p.height}
              alt=""
              sizes="(min-width: 1024px) 188px, 45vw"
              className="aspect-[188/152] w-full rounded-xs object-cover"
            />
          );
        })}
      </div>
    </article>
  );
}

const labelsPastRightEdge = (line: ProductLine) => line.labels.some((l) => l.x - PAD + l.w > FW);

export function ProductShowcase() {
  return (
    <section aria-label="Các dòng dưa Pansy" className="container-site mt-[120px] flex flex-col gap-[120px] overflow-x-clip lg:mt-[160px] lg:gap-16 lg:overflow-x-visible">
      {productLines.map((line, i) => (
        <Reveal
          key={line.slug}
          className={cn(
            "flex flex-col gap-[50px] lg:items-start lg:justify-between lg:gap-0",
            i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse",
          )}
        >
          <ProductCardLarge line={line} />
          {/* SunHoney's "Vân lưới dày đặc" label sits ~17 % past the art's right edge (it uses the
              page margin in Figma). Below 1300 there is no margin for it, so that row keeps room
              on the right: 16 % on phones/tablets, 80 px at 1024–1299 (with smaller art). */}
          <div className={cn("lg:mt-1.5", labelsPastRightEdge(line) && "max-lg:pr-[16%] lg:max-[1299px]:pr-[80px]")}>
            <Illustration line={line} />
          </div>
        </Reveal>
      ))}
    </section>
  );
}

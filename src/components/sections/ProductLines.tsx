import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { img, type ImageKey } from "@/content/images";
import { products, routes, type Product } from "@/content/site";
import { cn } from "@/lib/cn";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * "DÒNG SẢN PHẨM" (Figma Frame 6952 / "Products" 2384:8067; mobile Frame 6886).
 * Desktop: three 360×410 cards in a row. Mobile: one card at a time with red flower arrows.
 */
const cardStyle: Record<Product["color"], { border: string; text: string }> = {
  "sunorange-500": { border: "border-sunorange-500", text: "text-sunorange-500" },
  "sunyellow-500": { border: "border-sunyellow-500", text: "text-sunyellow-500" },
  "sunhoney-500": { border: "border-sunhoney-500", text: "text-sunhoney-500" },
};

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const image = img(`shared/product-card-${product.slug}` as ImageKey);
  const s = cardStyle[product.color];
  return (
    <Link
      href={routes.product(product.slug)}
      className={cn(
        "group relative flex h-full flex-col items-center gap-4 rounded-md border-4 bg-white px-4 py-7 text-center outline-none lg:p-7",
        "transition-transform hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-green-400",
        s.border,
        className,
      )}
    >
      {product.isNew && (
        <span className="absolute top-6 right-6 z-10 rounded-full bg-sunyellow-500 px-3 py-1 text-subtitle font-bold text-white">
          MỚI
        </span>
      )}
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt={product.name}
        sizes="(min-width: 1024px) 304px, 80vw"
        className="aspect-[304/249] w-full object-contain"
      />
      <h3 className={cn("font-display text-ot-small tracking-[0.02em] uppercase lg:text-ot-title", s.text)}><DisplayText>{product.name}</DisplayText></h3>
      <p className="text-body font-bold text-ink">{product.tagline}</p>
    </Link>
  );
}

export function ProductLines() {
  return (
    <section aria-labelledby="product-lines-title" className="section-gap">
      <Reveal className="container-site flex flex-col items-center gap-12">
        <h2 id="product-lines-title" className="text-subtitle font-bold text-eyebrow uppercase">
          Dòng sản phẩm
        </h2>

        <ul className="hidden w-full grid-cols-3 gap-6 lg:grid">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        <Carousel
          label="Danh sách dòng sản phẩm"
          arrowColor="red"
          arrowSize="small"
          className="-mx-[var(--gutter)] w-[calc(100%+2*var(--gutter))] lg:hidden"
          trackClassName="gap-6 px-[27px] scroll-px-[27px]"
          slideClassName="w-[320px]"
          arrowsClassName="px-[9px]"
        >
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </Carousel>

        <Button href={routes.stores} variant="orange" size="lg" className="max-lg:min-h-[38px] max-lg:px-5 max-lg:py-2 max-lg:text-body">
          Điểm bán gần tôi
        </Button>
      </Reveal>
    </section>
  );
}

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Carousel } from "@/components/ui/Carousel";
import { img } from "@/content/images";
import { productLines, type ProductLine } from "@/content/products";
import { getProduct } from "@/content/site";
import { cn } from "@/lib/cn";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * "Tổng quan các dòng dưa của Pansy" (Figma Frame 6814 + "SunOrange/SunYellow/SunHoney 2").
 * Desktop: three 360×622 colored cards. Mobile: carousel ("Card tổng hợp" 2155:5527).
 */
const cardBg = {
  sunorange: "bg-sunorange-500",
  sunyellow: "bg-sunyellow-500",
  sunhoney: "bg-sunhoney-500",
} as const;

function CompareCard({ line }: { line: ProductLine }) {
  const product = getProduct(line.slug)!;
  const picture = img(line.compareImage);
  return (
    <article className={cn("flex h-full flex-col gap-5 rounded-sm p-6", cardBg[line.slug])}>
      <h3 className="font-display text-ot-title tracking-[0.02em] text-yellow-500 uppercase"><DisplayText>{product.name}</DisplayText></h3>
      <Image
        src={picture.src}
        width={picture.width}
        height={picture.height}
        alt=""
        sizes="(min-width: 1024px) 307px, 80vw"
        className="mx-auto -my-2.5 w-full max-w-[307px]"
      />
      <table className="w-full overflow-hidden rounded-sm bg-white text-left text-body text-ink outline outline-[0.8px] outline-sunhoney-500 [border-collapse:collapse]">
        <tbody>
          {line.compare.map((row) => (
            <tr key={row.label} className="border-t-[0.8px] border-sunhoney-500 first:border-t-0">
              <th scope="row" className="w-[115px] border-r-[0.8px] border-sunhoney-500 px-[18px] py-2 align-top font-bold">
                {row.label}
              </th>
              <td className="p-2 align-top">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export function ProductComparison() {
  return (
    <section aria-labelledby="compare-title" className="section-gap">
      <Reveal className="container-site flex flex-col gap-12">
        <h2 id="compare-title" className="text-h4 font-extrabold lg:text-h2">
          Tổng quan các dòng dưa của Pansy
        </h2>
        <ul className="hidden grid-cols-3 gap-6 lg:grid">
          {productLines.map((l) => (
            <li key={l.slug}>
              <CompareCard line={l} />
            </li>
          ))}
        </ul>
        <Carousel
          label="Tổng quan các dòng dưa"
          arrowColor="red"
          arrowSize="small"
          className="-mx-[var(--gutter)] w-[calc(100%+2*var(--gutter))] lg:hidden"
          trackClassName="gap-6 px-[27px] scroll-px-[27px]"
          slideClassName="w-[320px]"
          arrowsClassName="px-[6px]"
        >
          {productLines.map((l) => (
            <CompareCard key={l.slug} line={l} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}

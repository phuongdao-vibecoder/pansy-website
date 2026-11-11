import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import { retailerRows } from "@/content/products";
import { cn } from "@/lib/cn";

/**
 * "Tìm mua Dưa lưới Pansy tại" — logo-only version used on Sản phẩm (Figma Frame 6706;
 * mobile Frame 254). Desktop: three rows spread across 1128 px. Mobile: two columns.
 * The pink "ÆON" logo is left out (see PROJECT_PLAN Phase 4 notes).
 */
export function RetailerStrip() {
  return (
    <section aria-labelledby="retailers-title" className="section-gap">
      <Reveal className="container-site">
        <h2 id="retailers-title" className="text-center text-body-lg font-extrabold lg:text-left lg:text-h2">
          Tìm mua Dưa lưới Pansy tại
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 lg:mt-16 lg:flex lg:flex-col lg:gap-8">
          {retailerRows.map((row, r) => (
            <ul key={r} className={cn("contents lg:flex lg:items-center lg:justify-between", r === 1 && "lg:px-6")}>
              {row.map((logo) => (
                <li key={logo.name} className="flex h-14 items-center justify-center lg:h-[71px]">
                  <Image
                    src={img(logo.image).src}
                    width={logo.w}
                    height={logo.h}
                    alt={logo.name}
                    className={cn(
                      "max-w-[140px] lg:max-w-none",
                      logo.cropTop ? "object-cover object-top" : "object-contain",
                      logo.round && "rounded-full",
                    )}
                    style={{ width: logo.w, height: logo.h }}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

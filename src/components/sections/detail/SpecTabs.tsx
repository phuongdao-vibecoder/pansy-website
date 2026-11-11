"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { nutrition, type ProductDetail } from "@/content/productDetails";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * "Thông số sản phẩm / Hàm lượng dinh dưỡng" (Figma "SunOrange-thông số" 2568:8701, 744 wide).
 * Two pill tabs (active = green, inactive = white), a white table with a 2 px border in the
 * product color, then "Đến nơi bán" (green) and "Liên hệ ngay" (white). A mascot sits to the left.
 */
export function SpecTabs({ detail }: { detail: ProductDetail }) {
  const [tab, setTab] = useState<"spec" | "nutrition">("spec");
  const id = useId();
  const tabs = [
    { key: "spec" as const, label: "Thông số sản phẩm" },
    { key: "nutrition" as const, label: "Hàm lượng dinh dưỡng" },
  ];
  const rows =
    tab === "spec"
      ? detail.specs
      : [{ label: "Thành phần dinh dưỡng (100g)", value: "Hàm lượng" }, ...nutrition];

  return (
    <section aria-label="Thông số sản phẩm" className="section-gap">
      <div className="container-narrow relative flex flex-col items-center gap-8">
        {/* Mascot (Figma Frame 6740; only drawn in the SunOrange file, reused for all three) */}
        {/* eslint-disable-next-line @next/next/no-img-element -- mascot rendered from Figma */}
        <img loading="lazy"
          src="/svg/generated/detail/sunorange-spec-mascot.svg"
          alt=""
          aria-hidden="true"
          width={108}
          height={128}
          className="absolute bottom-[40px] left-[calc(var(--gutter)-37px)] hidden lg:block"
        />
        <div role="tablist" aria-label="Thông tin sản phẩm" className="flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              id={`${id}-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls={`${id}-panel`}
              onClick={() => setTab(t.key)}
              className={cn(
                "min-h-[38px] rounded-full px-5 py-2 text-body font-bold transition-colors outline-none focus-visible:ring-3 focus-visible:ring-green-400",
                tab === t.key ? "bg-green-500 text-white" : "bg-white text-ink hover:bg-grey-300",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-${tab}`}
          className="w-full overflow-hidden rounded-md border-2 bg-white"
          style={{ borderColor: detail.hex }}
        >
          <table className="w-full text-left text-body text-ink">
            <tbody>
              {rows.map((r, i) => {
                const header = tab === "nutrition" && i === 0;
                return (
                  <tr key={r.label} className="border-b last:border-b-0" style={{ borderColor: detail.hex }}>
                    <th scope="row" className="w-1/2 border-r px-4 py-5 align-top font-bold" style={{ borderColor: detail.hex }}>
                      {r.label}
                    </th>
                    <td className={cn("px-4 py-5 align-top", header ? "font-bold" : "font-semibold")}>{r.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          <Button href={routes.stores} variant="green" size="md">
            Đến nơi bán
          </Button>
          <Button href={routes.contact} variant="white" size="md">
            Liên hệ ngay
          </Button>
        </div>
      </div>
    </section>
  );
}

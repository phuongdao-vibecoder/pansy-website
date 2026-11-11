import Image from "next/image";
import { features } from "@/content/home";
import { img } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * 2×2 photo tiles: Độ brix 14+, Chắc giòn, Vân lưới dày, Vị béo Vanila đặc trưng
 * (Figma Frame 6831–6834: 191×191, radius 8, dark gradient from the bottom,
 * hard shadow ≈4 px, white Nunito Bold 20 label). Also used on product detail pages.
 */
export function FeatureTiles({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-4 lg:gap-6", className)}>
      {features.map((f) => {
        const i = img(f.image);
        return (
          <li
            key={f.label}
            className="relative aspect-square overflow-hidden rounded-xs shadow-[4px_4px_0_0_rgb(17_17_17/0.5)]"
          >
            <Image src={i.src} width={i.width} height={i.height} alt="" sizes="(min-width: 1024px) 191px, 45vw" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <p className="absolute inset-x-2 bottom-3 text-center text-body font-bold text-white lg:text-body-lg">{f.label}</p>
          </li>
        );
      })}
    </ul>
  );
}

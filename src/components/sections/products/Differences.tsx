import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { img } from "@/content/images";
import { differences } from "@/content/products";

/**
 * "Khám phá điểm khác biệt cùng Dưa lưới Pansy" (Figma Frame 6699, 1121×996; mobile Frame 6962).
 * Desktop: the product picture with white hand-drawn arrows (rendered from Figma) and
 * four labels placed at their Figma positions (in %, so they follow the picture).
 * Mobile: picture, then the four labels stacked and centered.
 */
const W = 1121;
const H = 996;

export function Differences() {
  const art = img("generated/products/differences");
  const artMobile = img("generated/products/differences-mobile");
  return (
    <section aria-labelledby="differences-title" className="container-site">
      <Reveal>
        <h2 id="differences-title" className="text-center text-body-lg font-extrabold lg:text-h2">
          Khám phá điểm khác biệt cùng
          <br />
          <span className="text-h5 text-yellow-500 lg:text-h2">Dưa lưới Pansy</span>
        </h2>

        {/* Desktop: picture + positioned labels */}
        <div className="relative mx-auto mt-[-80px] hidden aspect-[1121/996] w-full max-w-[1121px] [container-type:inline-size] lg:block">
          <Image src={art.src} width={art.width} height={art.height} alt="" sizes="1121px" className="absolute inset-0 size-full" />
          {differences.map((d) => (
            <div
              key={d.title}
              className="absolute flex flex-col gap-2 text-center"
              style={{ left: `${(d.x / W) * 100}%`, top: `${(d.y / H) * 100}%`, width: `${(d.w / W) * 100 + 2}%` }}
            >
              <h3 className="font-extrabold text-yellow-500 uppercase" style={{ fontSize: `${(31 / W) * 100}cqw`, lineHeight: 1.2 }}>
                {d.title}
              </h3>
              <p className="whitespace-pre-line" style={{ fontSize: `${(20 / W) * 100}cqw`, lineHeight: 1.365 }}>
                {d.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="mt-5 lg:hidden">
          <Image src={artMobile.src} width={artMobile.width} height={artMobile.height} alt="" sizes="100vw" className="mx-auto w-full max-w-[343px]" />
          <ul className="mt-5 flex flex-col items-center gap-7 text-center">
            {[differences[1], differences[0], differences[3], differences[2]].map((d) => (
              <li key={d.title} className="flex max-w-[343px] flex-col gap-2">
                <h3 className="text-body-lg font-extrabold text-yellow-500 uppercase">{d.title}</h3>
                <p className="text-body whitespace-pre-line">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

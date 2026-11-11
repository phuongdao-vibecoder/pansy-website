import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/content/home";
import { img } from "@/content/images";
import { cn } from "@/lib/cn";

/**
 * "Chia sẻ của bạn về Dưa lưới Pansy" (Figma "Testimonials" 2679:32331 variant 2;
 * mobile "Testimonial / 22 /" 406:20829).
 * Desktop: speech-bubble cards (white SVG shape + hard grey shadow), round 220 px photo
 * with an orange flower behind it; the first card sits right, the second left.
 * Mobile: plain white cards, photo on top, orange flower in the bottom-right corner.
 */
function Stars() {
  return (
    <div className="flex gap-[7px]" role="img" aria-label="5 trên 5 sao">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.5 6.6-.8z"
            fill="var(--color-sunhoney-500)"
          />
        </svg>
      ))}
    </div>
  );
}

function Heart() {
  // eslint-disable-next-line @next/next/no-img-element -- Figma "mdi:heart" icon
  return <img loading="lazy" src="/svg/icons/heart.svg" alt="" aria-hidden="true" width={32} height={32} className="size-7 lg:size-8" />;
}

export function Testimonials({ className, tone = "cream" }: { className?: string; tone?: "cream" | "orange" }) {
  const onOrange = tone === "orange";
  return (
    <section aria-labelledby="testimonials-title" className={cn("section-gap", className)}>
      <Reveal className="container-site">
        <h2 id="testimonials-title" className={cn("text-h4 font-extrabold lg:text-center lg:text-h2", onOrange && "text-white")}>
          Chia sẻ của bạn về <br className="lg:hidden" />
          <span className={onOrange ? "text-yellow-500" : "text-sunhoney-500"}>Dưa lưới Pansy</span>
        </h2>

        <ul className="mt-8 flex flex-col gap-8 lg:mt-[79px] lg:gap-16">
          {testimonials.map((t, i) => {
            const photo = img(t.image);
            const right = i % 2 === 0;
            return (
              <li key={t.name} className={cn("lg:relative lg:h-[268px] lg:w-[798px]", right ? "lg:ml-[min(250px,calc(100%-798px))]" : "lg:ml-[80px]")}>
                {/* Desktop bubble shape */}
                {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector shape */}
                <img loading="lazy"
                  src={`/svg/decor/testimonial-bubble-${right ? "right" : "left"}.svg`}
                  alt=""
                  aria-hidden="true"
                  width={798}
                  height={268}
                  className="absolute inset-0 hidden size-full drop-shadow-[10px_10px_0_rgb(17_17_17/0.5)] lg:block"
                />
                <article
                  className={cn(
                    "relative overflow-hidden rounded-md bg-white p-4 pb-6 text-ink",
                    "lg:flex lg:h-full lg:items-start lg:gap-5 lg:overflow-visible lg:bg-transparent lg:pt-[18px] lg:pb-0",
                    right ? "lg:pl-[16px]" : "lg:pl-[81px]",
                  )}
                >
                  {/* Mobile corner flower (Figma 96×96, #F37326): mostly outside the bottom-right corner, behind the text */}
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
                  <img loading="lazy" src="/svg/decor/testimonial-flower.svg" alt="" aria-hidden="true" width={96} height={96} className="absolute -right-3 -bottom-10 size-24 lg:hidden" />
                  <div className="relative shrink-0 lg:size-[232px]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
                    <img loading="lazy" src="/svg/decor/testimonial-flower.svg" alt="" aria-hidden="true" width={71} height={71} className="absolute top-0 left-0 hidden lg:block" />
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt=""
                      sizes="(min-width: 1024px) 220px, 90vw"
                      className="relative aspect-[311/150] w-full rounded-xs object-cover lg:absolute lg:top-[5px] lg:left-[13px] lg:size-[220px] lg:rounded-full"
                    />
                  </div>
                  <div className="relative mt-4 flex flex-col gap-4 lg:mt-[23px] lg:w-[436px] lg:gap-5">
                    <div className="flex items-center justify-between">
                      <Stars />
                      <Heart />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-body-lg font-extrabold lg:text-h5">{t.name}</h3>
                      <p className="text-body">{t.quote}</p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

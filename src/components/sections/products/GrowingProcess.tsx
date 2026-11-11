import { Reveal } from "@/components/motion/Reveal";
import { growingSteps } from "@/content/products";

/**
 * "Quy trình trồng trọt" (Figma "Quy trình" 2774:51683; mobile "Timeline / 11 /").
 * Desktop: orange card 1270 wide (71 px wider than the container on each side),
 * radius 32, padding 64/48, three columns: number, title, text, icon, illustration.
 * Mobile: full-width orange band with a vertical timeline (dot + line on the left).
 * Illustrations are SVG rendered from Figma geometry.
 */
export function GrowingProcess() {
  return (
    <section aria-labelledby="process-title" className="section-gap">
      <Reveal className="lg:container-site">
        <div className="bg-sunorange-500 px-4 py-16 text-white md:px-[max(var(--gutter),calc((100%-44rem)/2))] min-[1300px]:-mx-[71px] lg:rounded-xl lg:px-12 lg:py-16">
          <h2 id="process-title" className="text-h4 font-extrabold text-yellow-500 lg:text-h2">
            Quy trình trồng trọt
          </h2>

          <ol className="mt-12 flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-6">
            {growingSteps.map((s, i) => (
              <li key={s.number} className="relative flex gap-4 lg:flex-col lg:gap-0">
                {/* Mobile timeline marker */}
                <div className="flex w-5 shrink-0 flex-col items-center gap-2.5 pt-2 lg:hidden" aria-hidden="true">
                  <span className="size-5 rounded-full border-4 border-yellow-500 bg-sunorange-500" />
                  {i < growingSteps.length - 1 && <span className="w-0.5 flex-1 bg-yellow-500/60" />}
                </div>

                <div className="flex flex-1 flex-col gap-5 pb-10 lg:gap-0 lg:pb-0">
                  <div className="flex flex-col gap-[19px] lg:min-h-[188px] lg:px-4">
                    <p className="text-subtitle font-bold text-yellow-500">{s.number}</p>
                    <div className="flex flex-col gap-[9px]">
                      <h3 className="text-body-lg font-extrabold text-yellow-500 uppercase lg:text-h5">{s.title}</h3>
                      <p className="text-body">{s.text}</p>
                    </div>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element -- icon rendered from Figma */}
                  <img loading="lazy" src={s.icon} alt="" width={s.iconSize[0]} height={s.iconSize[1]} className="hidden self-center lg:mt-14 lg:block" />
                  {/* eslint-disable-next-line @next/next/no-img-element -- illustration rendered from Figma */}
                  <img loading="lazy"
                    src={s.art}
                    alt=""
                    width={s.artSize[0]}
                    height={s.artSize[1]}
                    className="w-full max-w-[318px] self-center lg:mt-auto lg:max-w-none lg:pt-12"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}

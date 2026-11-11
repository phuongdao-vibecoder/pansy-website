import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { aboutStories, aboutStoryImages, coreValues } from "@/content/about";
import { img } from "@/content/images";

/**
 * "Giới thiệu Pansy" (Figma "Giới thiệu" 2899:39471; mobile Frame 179 406:24410).
 * Desktop: text column (552) left, two stacked photos (512×276, r20) right with an orange
 * flower behind and the green mascot peeking over the second photo.
 * Mobile: title, two small photos side by side (the second 56 px lower), then the stories.
 */
export function AboutIntro() {
  const [first, second] = aboutStoryImages.map(img);
  return (
    <section aria-labelledby="about-intro-title" className="mt-[105px] lg:mt-[200px]">
      <Reveal className="container-site relative flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-16">
        <div className="contents lg:flex lg:w-[552px] lg:flex-col lg:gap-6 lg:py-3">
          <h2 id="about-intro-title" className="text-h4 font-extrabold lg:text-h2">
            Giới thiệu Pansy
          </h2>
          <ul className="order-last flex flex-col gap-8 lg:order-none">
            {aboutStories.map((s) => (
              <li key={s.title} className="flex flex-col gap-2">
                <h3 className="text-body-lg/[27.3px] font-extrabold lg:text-body-lg/[28px] lg:font-bold">{s.title}</h3>
                <p className="text-body whitespace-pre-line">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative isolate flex items-start gap-[6.25px] lg:block lg:h-[576px] lg:w-[512px] lg:shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy"
            src="/svg/generated/about/intro-flower.svg"
            alt=""
            aria-hidden="true"
            width={272}
            height={300}
            className="absolute -top-[85px] right-[-54px] -z-10 w-[111px] lg:-top-[103px] lg:right-[-78px] lg:w-[272px]"
          />
          <Image
            src={first.src}
            width={first.width}
            height={first.height}
            alt="Cánh đồng dưa lưới tại Soleil Farm"
            sizes="(min-width: 1024px) 512px, 50vw"
            className="aspect-[168/162] w-1/2 rounded-xs object-cover lg:absolute lg:top-10 lg:aspect-[512/276] lg:w-full lg:rounded-md"
          />
          <Image
            src={second.src}
            width={second.width}
            height={second.height}
            alt="Nhà màng trồng dưa lưới Pansy"
            sizes="(min-width: 1024px) 512px, 50vw"
            className="mt-14 aspect-[168/162] w-1/2 rounded-xs object-cover lg:absolute lg:top-[340px] lg:mt-0 lg:aspect-[512/276] lg:w-full lg:rounded-md"
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy"
            src="/svg/generated/about/intro-mascot.svg"
            alt=""
            aria-hidden="true"
            width={136}
            height={95}
            className="absolute top-[110px] left-[1px] w-[81px] lg:top-[485px] lg:left-[366px] lg:w-[136px]"
          />
        </div>
      </Reveal>
    </section>
  );
}

/**
 * "Giá trị cốt lõi" (Figma 2774:43255; mobile Frame 177 406:24512).
 * Orange cards (r16) with a green tag overlapping the top edge by 20 px.
 */
export function CoreValues() {
  return (
    <section aria-labelledby="core-values-title" className="mt-[100px] lg:mt-[200px]">
      <Reveal className="container-site flex flex-col gap-8 lg:gap-12">
        <h2 id="core-values-title" className="text-center text-h4 font-extrabold lg:text-h2">
          Giá trị cốt lõi
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {coreValues.map((v) => (
            <li key={v.title} className="relative pt-5">
              <h3 className="absolute top-0 left-1/2 w-[calc(100%-32px)] max-w-[323px] -translate-x-1/2 rounded-xs bg-green-500 px-2 pt-[7px] whitespace-nowrap pb-[5px] text-center text-body/[24px] font-extrabold text-yellow-500 lg:text-[18px]/[24.6px]">
                {v.title}
              </h3>
              <p className="flex h-full min-h-[180px] items-center rounded-sm bg-sunorange-500 px-5 pt-[41px] pb-5 text-center text-body text-white lg:min-h-[188px]">
                {v.text}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

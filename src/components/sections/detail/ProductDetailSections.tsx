import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { FeatureTiles } from "@/components/sections/FeatureTiles";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { img } from "@/content/images";
import { certifications, crossSellImage, type ProductDetail } from "@/content/productDetails";
import { getProduct, products, routes, type Product } from "@/content/site";
import { cn } from "@/lib/cn";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * Sections of the product detail template (Figma SunOrange/SunYellow/SunHoney pages).
 * The page background is the product color down to the middle of the certification card,
 * then cream.
 */

/** Hero (Figma "Frame 6717", 853 px): title left, 600×600 product photo right, slogan, yellow band. */
export function DetailHero({ detail }: { detail: ProductDetail }) {
  const product = getProduct(detail.slug)!;
  const photo = img(detail.heroImage);
  return (
    <section className="relative isolate overflow-hidden text-white lg:h-[853px]">
      <div className="container-site relative pt-[103px] pb-16 lg:pt-[214px] lg:pb-0">
        <div className="flex flex-col gap-3 lg:w-[527px]">
          <p className="text-subtitle font-bold uppercase">Sản phẩm của Pansy</p>
          <h1 className="font-display text-[48px] leading-[56px] tracking-[0.02em] text-yellow-500 lg:text-[84px] lg:leading-[96px]">{/* Nunito demo: 84/96 instead of 100/110; restore with the display font */}
            <DisplayText>{product.name}</DisplayText>
          </h1>
        </div>
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt={product.name}
          sizes="(min-width: 1024px) 600px, 90vw"
          loading="eager"
          fetchPriority="high"
          className="mx-auto mt-6 w-full max-w-[300px] lg:absolute lg:top-[154px] lg:left-[calc(var(--gutter)+528px)] lg:mt-0 lg:w-[600px] lg:max-w-none"
        />
        <p className="mt-6 font-display text-ot-small tracking-[0.02em] uppercase lg:absolute lg:top-[558px] lg:mt-0 lg:max-w-[527px] lg:text-ot-subheading">{/* Nunito demo: max-w keeps it off the photo */}
          <DisplayText>{detail.slogan[0]}</DisplayText>
          <br />
          <DisplayText>{detail.slogan[1]}</DisplayText>
        </p>
      </div>
      <Marquee className="bg-yellow-500 lg:absolute lg:inset-x-0 lg:top-[820px]" />
    </section>
  );
}

/** "THÔNG TIN CHI TIẾT" (Figma Frame 6737 / 6753): centered title, text, tiles + product picture. */
export function DetailInfo({ detail }: { detail: ProductDetail }) {
  const feature = img(detail.featureImage);
  return (
    <section aria-labelledby="info-title" className="mt-[120px] text-white lg:mt-[149px]">
      <Reveal className="container-site flex flex-col items-center gap-12">
        <div className="flex max-w-[552px] flex-col items-center gap-4 text-center">
          <div className="flex flex-col gap-3">
            <p className="text-subtitle font-bold uppercase">Thông tin chi tiết</p>
            <h2 id="info-title" className="font-display text-ot-title tracking-[0.02em] lg:text-ot-subheading">
              <DisplayText>{detail.infoTitle[0]}</DisplayText>
              <br />
              <DisplayText>{detail.infoTitle[1]}</DisplayText>
            </h2>
          </div>
          {detail.infoParagraphs.map((p) => (
            <p key={p} className="text-body">
              {p}
            </p>
          ))}
        </div>
        <div className="flex w-full flex-col items-center gap-10 lg:w-[936px] lg:flex-row lg:justify-between lg:gap-16">
          <FeatureTiles className="w-full max-w-[456px] lg:gap-6 [&>li]:aspect-[200/219] [&>li]:rounded-sm" />
          <Image
            src={feature.src}
            width={feature.width}
            height={feature.height}
            alt=""
            sizes="(min-width: 1024px) 415px, 80vw"
            className="w-full max-w-[415px] lg:-my-5 lg:-mr-5"
          />
        </div>
      </Reveal>
    </section>
  );
}

/** White certification card (Figma "Frame 2604": 1256 wide, radius 32, padding 64). */
export function CertificationCard() {
  const label = img(certifications.label);
  return (
    <section aria-label="Chứng nhận" className="container-site relative">
      <Reveal className="rounded-lg bg-white p-6 text-[#003C28] min-[1300px]:-mx-16 lg:rounded-xl lg:p-16">
        <div className="flex flex-col gap-4 text-body-lg font-bold lg:text-h4">
          {certifications.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-8 lg:mt-16 lg:flex-row lg:items-center lg:gap-6">
          <ul className="flex flex-1 flex-col divide-y-[0.4px] divide-[#003C28]">
            {certifications.items.map((c) => {
              const logo = img(c.logo);
              return (
                <li key={c.title} className="flex items-center gap-6 py-6 first:pt-0 last:pb-0 text-ink">
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-body-lg font-extrabold whitespace-pre-line lg:text-h5">{c.title}</h3>
                    <p className="text-body">{c.text}</p>
                  </div>
                  <Image src={logo.src} width={142} height={142} alt="" className="size-20 shrink-0 object-contain lg:size-[142px]" />
                </li>
              );
            })}
          </ul>
          <Image
            src={label.src}
            width={label.width}
            height={label.height}
            alt="Tem phụ thông tin sản phẩm Pansy"
            sizes="(min-width: 1024px) 552px, 100vw"
            className="w-full rounded-lg border border-grey-950 object-cover lg:h-[387px] lg:w-[552px]"
          />
        </div>
      </Reveal>
    </section>
  );
}

/** "Khám phá các dòng dưa khác từ Pansy" (Figma Frame 6867 + "SunYellow/SunHoney 4"). */
const crossBorder: Record<Product["color"], string> = {
  "sunorange-500": "border-sunorange-500",
  "sunyellow-500": "border-sunyellow-500",
  "sunhoney-500": "border-sunhoney-500",
};
const crossText: Record<Product["color"], string> = {
  "sunorange-500": "text-sunorange-500",
  "sunyellow-500": "text-sunyellow-500",
  "sunhoney-500": "text-sunhoney-500",
};

export function CrossSell({ current }: { current: Product["slug"] }) {
  const others = products.filter((p) => p.slug !== current);
  return (
    <section aria-labelledby="crosssell-title" className="section-gap">
      <Reveal className="container-site">
        <h2 id="crosssell-title" className="text-center text-h4 font-extrabold lg:text-h2">
          Khám phá các dòng dưa khác
          <br />
          từ Pansy
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-20">
          {others.map((p) => {
            const photo = img(crossSellImage[p.slug]);
            return (
              <li key={p.slug}>
                <article className={cn("relative isolate flex flex-col items-center gap-4 overflow-hidden rounded-md border-4 bg-white px-7 pt-7 text-center", crossBorder[p.color])}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
                  <img loading="lazy" src="/svg/generated/detail/crosssell-blob.svg" alt="" aria-hidden="true" width={539} height={517} className="absolute top-0 left-1/2 -z-10 w-[110%] max-w-none -translate-x-1/2" />
                  <Image src={photo.src} width={photo.width} height={photo.height} alt={p.name} sizes="(min-width: 1024px) 488px, 90vw" className="w-full max-w-[300px] lg:max-w-[340px]" />
                  <div className="flex flex-col items-center gap-4 pb-7">
                    <h3 className={cn("font-display text-ot-title tracking-[0.02em] uppercase", crossText[p.color])}><DisplayText>{p.name}</DisplayText></h3>
                    <p className="text-body font-bold lg:text-body-lg">{p.tagline}</p>
                    <Button href={routes.product(p.slug)} variant="orange" size="md">
                      Khám phá ngay
                    </Button>
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

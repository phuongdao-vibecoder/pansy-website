import { getImageProps } from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactHero } from "@/content/contact";
import { img } from "@/content/images";
import { contactInfo } from "@/content/site";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * Liên hệ top block (Figma "Container" 406:17964 on "Background" 406:17958; mobile "Frame 57").
 * Yellow #FBB040 background with a 7 % dotted pattern behind the header; on desktop it ends in
 * a convex curve that the footer's melon stem overlaps.
 * Desktop: title + form left (500), photo collage + contact details right (552).
 * Mobile: title → collage → details → form.
 */
const info = [
  { icon: "/svg/generated/contact/icon-mail.svg", label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: "/svg/generated/contact/icon-phone.svg", label: "Điện thoại", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
  { icon: "/svg/generated/contact/icon-clock.svg", label: "Giờ làm việc", value: contactInfo.hours },
];

export function ContactHero() {
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...img("generated/contact/collage-desktop"), alt: "", sizes: "657px" });
  const { props: collageProps } = getImageProps({
    ...img("generated/contact/collage-mobile"),
    alt: "",
    sizes: "403px",
    loading: "eager",
    fetchPriority: "high",
  });
  return (
    <section aria-labelledby="contact-page-title" className="relative isolate text-white">
      <Background />
      <div className="container-site grid gap-8 pt-[137px] max-lg:max-w-[calc(560px+2*var(--gutter))] lg:grid-cols-[minmax(0,500fr)_minmax(0,552fr)] lg:gap-x-10 xl:gap-x-20 lg:pt-[191px]">
        <div className="contents lg:flex lg:flex-col lg:gap-6 lg:pt-[26px]">
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 id="contact-page-title" className="font-display text-[48px]/[56px] lg:text-display">
              <DisplayText>{contactHero.title}</DisplayText>
            </h1>
            <p className="text-body-lg/[27.3px]">{contactHero.text}</p>
          </div>
          <ContactForm variant="page" className="order-last gap-8 lg:order-none lg:gap-6" />
        </div>

        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Art direction: one <img> (the page's LCP), so only the matching collage downloads. */}
          <picture className="contents">
            <source media="(min-width: 1024px)" srcSet={desktopSrcSet} sizes="657px" />
            {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" is in collageProps (decorative) */}
            <img
              {...collageProps}
              className="-m-[30px] aspect-[806/728] h-auto w-[calc(100%+60px)] max-w-none lg:-mx-[9%] lg:-my-[9%] lg:aspect-[1314/1088] lg:w-[119%]"
            />
          </picture>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
            <h2 className="text-body-lg/[27.3px] font-extrabold lg:w-[246px] lg:py-2 lg:text-h5">{contactHero.infoTitle}</h2>
            <ul className="flex flex-col gap-3 lg:gap-4 lg:py-2">
              {info.map((i) => (
                <li key={i.label} className="flex items-center gap-4 text-body font-bold">
                  {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                  <img loading="lazy" src={i.icon} alt={i.label} width={24} height={24} />
                  {i.href ? (
                    <a href={i.href} className="-my-1 inline-block py-1 hover:underline">
                      {i.value}
                    </a>
                  ) : (
                    i.value
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Desktop: the Figma shape (1921×1398, convex bottom) from y = −42, centred; mobile: a flat
 * yellow block 1390 px tall. Both carry the dotted pattern at 7 %.
 */
function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1390px] overflow-hidden lg:-top-[42px] lg:h-[1398px]">
      <div
        className="absolute inset-0 bg-honey-card lg:left-1/2 lg:w-[1921px] lg:-translate-x-1/2 lg:bg-transparent lg:[mask:url(/svg/generated/contact/bg-shape.svg)_center/100%_100%_no-repeat]"
      >
        <div className="absolute inset-0 hidden bg-honey-card lg:block" />
        <div className="absolute inset-0 bg-[url(/images/shared/pattern-dots-2.webp)] bg-[length:100%_auto] bg-top opacity-[0.07]" />
      </div>
    </div>
  );
}

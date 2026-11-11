import Image from "next/image";
import { ContactForm } from "@/components/forms/ContactForm";
import { img } from "@/content/images";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * "Liên hệ với Pansy" block that sits in the footer on every page except Contact.
 * Desktop (≥1024): yellow card 1128×581, radius 32, faint diagonal pattern, form + photo,
 * mascot, melons and corner flower (Figma "Contact Us" 2515:8462).
 * Mobile: no card; title, photo and form stacked on the orange background
 * (Figma "Contact us - Mobile" 164:5770).
 */
export function ContactSection() {
  const photo = img("shared/contact-farmers");
  return (
    <section aria-labelledby="contact-title" className="container-site">
      <div className="relative">
        <div className="relative isolate overflow-hidden lg:rounded-xl lg:bg-honey-card lg:px-[58px] lg:py-[60px]">
          {/* Faint dotted pattern, 9% opacity */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden bg-[url(/images/shared/pattern-dots.webp)] bg-cover opacity-[0.09] lg:block"
          />
          {/* Yellow flower clipped by the top-right corner */}
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
          <img loading="lazy"
            src="/svg/decor/contact-corner-flower.svg"
            alt=""
            aria-hidden="true"
            width={175}
            height={174}
            className="absolute top-[-42px] right-[-36px] -z-10 hidden lg:block"
          />

          <div className="mx-auto flex max-w-[560px] flex-col gap-[25px] lg:max-w-none lg:flex-row lg:justify-between lg:gap-[29px]">
            <div className="flex flex-col gap-[25px] lg:w-[422px] lg:shrink-0">
              <div className="flex flex-col gap-4">
                <h2
                  id="contact-title"
                  className="font-display text-ot-title tracking-[0.02em] lg:text-ot-subheading"
                >
                  <DisplayText>Liên hệ với Pansy</DisplayText>
                </h2>
                <p className="text-body font-bold">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn.
                  <br />
                  Hãy để lại thông tin và chúng tôi sẽ phản hồi sớm nhất.
                </p>
              </div>
              {/* On mobile the photo sits between the intro and the form */}
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt="Nông dân Soleil Farm thu hoạch dưa lưới"
                sizes="(min-width: 1024px) 493px, 100vw"
                className="aspect-[343/300] w-full rounded-sm object-cover lg:hidden"
              />
              <ContactForm />
            </div>
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt="Nông dân Soleil Farm thu hoạch dưa lưới"
              sizes="493px"
              className="hidden h-[461px] w-[493px] min-w-0 shrink rounded-xl object-cover lg:block"
            />
          </div>
        </div>

        {/* Mascot overlapping the bottom-left corner, melons over the photo corner */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/mascot/contact-mascot.svg"
          alt=""
          aria-hidden="true"
          width={124}
          height={114}
          className="absolute top-[485px] -left-[51px] hidden lg:block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/decor/melons-small.svg"
          alt=""
          aria-hidden="true"
          width={190}
          height={111}
          className="absolute top-[445px] right-[23px] hidden lg:block"
        />
      </div>
    </section>
  );
}

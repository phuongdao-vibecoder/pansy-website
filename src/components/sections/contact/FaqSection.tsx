"use client";

import { useId, useState } from "react";
import { faq } from "@/content/contact";
import { cn } from "@/lib/cn";

/**
 * "CÂU HỎI THƯỜNG GẶP" card in the footer slot of the Liên hệ page (Figma "FAQ" 406:18023:
 * white, r28, padding 64/129; mobile "Frame 55": r16, padding 36/16). The green mascot sits on
 * the top edge. Accordion (Figma component "FAQ" 2174:6942, closed/open variants): question
 * row with a red flower arrow, answer 8 px below. One item open at a time; all start closed
 * as in the design.
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return (
    <section aria-labelledby={`${id}-title`} className="container-site relative mt-[87px] lg:mt-[161px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img loading="lazy"
        src="/svg/generated/contact/faq-illustration.svg"
        alt=""
        aria-hidden="true"
        width={204}
        height={115}
        className="absolute top-[-58px] right-[calc(var(--gutter)+17px)] w-[110px] lg:top-[-111px] lg:right-auto lg:left-[calc(var(--gutter)+20px)] lg:w-[204px]"
      />
      <div className="relative rounded-sm bg-white px-4 py-9 text-ink lg:rounded-[28px] lg:px-[129px] lg:py-16">
        <div className="flex flex-col gap-10 lg:gap-16">
          <div className="flex flex-col gap-8 text-center">
            <p className="text-subtitle font-bold text-eyebrow">{faq.eyebrow}</p>
            <h2 id={`${id}-title`} className="text-h5 font-extrabold lg:text-h3">
              {faq.title[0]}
              <br />
              {faq.title[1]}
            </h2>
          </div>
          <ul className="flex flex-col">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.question} className="border-t-[0.5px] border-ink py-4 first:pt-4 lg:py-6">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-a${i}`}
                      id={`${id}-q${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 rounded-xs text-left text-body font-bold outline-none focus-visible:ring-3 focus-visible:ring-green-400 lg:min-h-12 lg:text-body-lg"
                    >
                      {item.question}
                      {/* eslint-disable-next-line @next/next/no-img-element -- Figma vector */}
                      <img loading="lazy"
                        src="/svg/generated/contact/faq-arrow.svg"
                        alt=""
                        width={48}
                        height={48}
                        className={cn("size-10 shrink-0 transition-transform duration-200 lg:size-12", isOpen && "rotate-180")}
                      />
                    </button>
                  </h3>
                  <div
                    id={`${id}-a${i}`}
                    role="region"
                    aria-labelledby={`${id}-q${i}`}
                    hidden={!isOpen}
                    className="mt-2 pr-14 text-body whitespace-pre-line lg:pr-16"
                  >
                    {item.answer}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

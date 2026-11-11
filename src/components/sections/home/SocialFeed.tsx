import Image from "next/image";
import { img } from "@/content/images";
import { externalLinkProps, socialLinks, tiktokUrl } from "@/content/site";

/**
 * "Theo dõi @Pansymelon" (Figma "Social" 2515:9668; desktop frame 2384:22865).
 * In Figma the 10 video thumbnails (with play counts) are one flattened image,
 * so it is shown as a single picture. On mobile Figma shows a one-video carousel;
 * that needs the individual thumbnails, which do not exist in the file, so mobile
 * shows the same grid, full width.
 */
/** Figma order is TikTok, Facebook, Instagram; Instagram is removed (no URL). */
const icons = ["tiktok", "facebook"] as const;

export function SocialFeed() {
  const grid = img("home/social-grid");
  return (
    <section aria-labelledby="social-title" className="container-site relative mt-[120px] text-white lg:mt-[208px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img loading="lazy" src="/svg/decor/social-flower-solid.svg" alt="" aria-hidden="true" width={238} height={217} className="absolute top-[31px] left-[calc(var(--gutter)-96px)] hidden lg:block" />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
      <img loading="lazy" src="/svg/decor/social-flower-outline.svg" alt="" aria-hidden="true" width={189} height={187} className="absolute top-[508px] right-[calc(var(--gutter)-120px)] hidden lg:block" />

      <h2 id="social-title" className="text-center text-h4 font-extrabold lg:text-h2">
        Theo dõi <span className="text-yellow-500">@Pansymelon</span>
      </h2>

      <a href={tiktokUrl} {...externalLinkProps} className="relative mx-auto mt-6 block max-w-[1168px] lg:mt-[30px]" aria-label="Xem video trên TikTok @Pansymelon (mở trong tab mới)">
        <Image src={grid.src} width={grid.width} height={grid.height} alt="10 video công thức dưa lưới trên TikTok @Pansymelon" sizes="(min-width: 1200px) 1168px, 100vw" className="h-auto w-full" />
      </a>

      <ul className="mt-8 flex justify-center gap-8 lg:mt-[38px]">
        {icons.map((name) => {
          const link = socialLinks.find((s) => s.icon === name)!;
          return (
            <li key={name}>
              <a href={link.href} {...externalLinkProps} aria-label={`${link.label} (mở trong tab mới)`} className="block transition-transform hover:scale-110">
                {/* eslint-disable-next-line @next/next/no-img-element -- white vector icon */}
                <img loading="lazy" src={`/svg/icons/social-plain/${name}.svg`} alt="" width={40} height={40} className="h-10 w-auto" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

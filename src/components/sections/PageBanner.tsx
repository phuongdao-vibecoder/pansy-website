import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { img, type ImageKey } from "@/content/images";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Inner-page banner: full-bleed photo with the title block on the left.
 * - Sản phẩm (Figma "Frame 6707"): 600 px, orange flowers, slogan band at the bottom (default).
 * - Thực đơn (Figma "Frame 289" 406:38137 / 2174:5854): breadcrumb, 600 px desktop with the
 *   band just below; 532 px mobile with the band at the bottom.
 * - Công thức (Figma "Frame 289" 406:38416 / 406:38805): breadcrumb, dark gradient, no band.
 */
export type Crumb = { label: string; href?: string };

export function PageBanner({
  image,
  mobileImage,
  children,
  imagePosition = "center",
  desktopImagePosition = "center",
  breadcrumb,
  flowers = true,
  marquee = "bottom",
  overlayClassName,
  className = "h-[600px]",
  contentClassName = "pt-[424px] lg:pt-[250px]",
}: {
  image: ImageKey;
  /** Separate picture below 1024 px. */
  mobileImage?: ImageKey;
  /** Title block (eyebrow + title). */
  children: ReactNode;
  /** CSS object-position for small screens, where the photo is cropped. */
  imagePosition?: string;
  desktopImagePosition?: string;
  breadcrumb?: Crumb[];
  flowers?: boolean;
  /** Slogan band: inside at the bottom, at the bottom on mobile only and below on desktop, or none. */
  marquee?: "bottom" | "mobile-bottom" | "none";
  /** Extra layer over the photo (e.g. a gradient). */
  overlayClassName?: string;
  /** Height classes of the banner. */
  className?: string;
  /** Top padding of the title block. */
  contentClassName?: string;
}) {
  const photo = img(image);
  const photoMobile = mobileImage ? img(mobileImage) : null;
  return (
    <>
      <section className={cn("relative isolate overflow-hidden", className)}>
        {photoMobile && (
          <Image
            src={photoMobile.src}
            width={photoMobile.width}
            height={photoMobile.height}
            alt=""
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 -z-10 size-full object-cover lg:hidden"
            style={{ objectPosition: imagePosition }}
          />
        )}
        <Image
          src={photo.src}
          width={photo.width}
          height={photo.height}
          alt=""
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className={cn(
            "absolute inset-0 -z-10 size-full object-cover object-(--pos-m) lg:object-(--pos-d)",
            photoMobile && "hidden lg:block",
          )}
          style={{ "--pos-m": imagePosition, "--pos-d": desktopImagePosition } as CSSProperties}
        />
        {overlayClassName && <div aria-hidden="true" className={cn("absolute inset-0 -z-10", overlayClassName)} />}
        {flowers && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
            <img
              src="/svg/generated/products/banner-flower-large.svg"
              alt=""
              aria-hidden="true"
              width={207}
              height={207}
              className="absolute top-[256px] left-[-36px] w-[122px] lg:top-[62px] lg:left-[calc(50%-791px)] lg:w-[207px]"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
            <img
              src="/svg/generated/products/banner-flower-small.svg"
              alt=""
              aria-hidden="true"
              width={62}
              height={62}
              className="absolute top-[299px] left-[calc(50%-638px)] hidden lg:block"
            />
          </>
        )}
        <div className={cn("container-site relative", contentClassName)}>
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          {children}
        </div>
        {marquee === "bottom" && <Marquee className="absolute inset-x-0 bottom-0 bg-yellow-500" />}
        {marquee === "mobile-bottom" && <Marquee className="absolute inset-x-0 bottom-0 bg-yellow-500 lg:hidden" />}
      </section>
      {marquee === "mobile-bottom" && <Marquee className="hidden bg-yellow-500 lg:block" />}
    </>
  );
}

/** "TRANG CHỦ > THỰC ĐƠN > …" (Nunito Bold 14, white, uppercase, 13 px gaps). */
function Breadcrumb({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "TRANG CHỦ", href: routes.home }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-[13px] text-subtitle font-bold text-white uppercase">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-[13px]">
            {i > 0 && <span aria-hidden="true">&gt;</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="-my-1 inline-block py-1 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

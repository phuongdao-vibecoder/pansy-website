import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { img } from "@/content/images";
import { recipes, type Recipe } from "@/content/recipes";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * "Gợi ý từ căn bếp Pansy" (Figma "Menu" 2515:9557; mobile "Frame 147" 406:20511).
 * Sits on the orange melon background, above the contact card.
 * Card: 1128×399, radius 32, cream, hard 6 px shadow; photo left, text right (padding 48).
 * Mobile: photo on top, text below (343 wide, radius 24). Arrows and dots under the card.
 * Used on Home and the product detail pages.
 */
function RecipeSlide({ recipe, cream }: { recipe: Recipe; cream: boolean }) {
  const photo = img(recipe.image);
  return (
    <article className={cn("mx-[3px] flex h-full flex-col overflow-hidden rounded-lg shadow-hard-sm lg:mx-0 lg:mr-2 lg:h-[399px] lg:flex-row lg:rounded-xl", cream ? "bg-green-500 text-white" : "bg-sunorange-bg text-ink")}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt=""
        sizes="(min-width: 1024px) 564px, 100vw"
        className="aspect-[343/222] w-full object-cover lg:aspect-auto lg:h-full lg:w-1/2"
      />
      <div className="flex flex-1 flex-col items-start gap-6 p-5 lg:p-12">
        <div className="flex flex-col gap-4">
          <div className={cn("flex flex-col gap-2", cream ? "text-yellow-500" : "text-sunorange-500")}>
            <h3 className="text-body-lg font-extrabold lg:text-h3">{recipe.title}</h3>
            {recipe.tagline && <p className="text-subtitle font-bold uppercase lg:text-body">{recipe.tagline}</p>}
          </div>
          <p className="text-body">{recipe.summary}</p>
          <dl className="flex flex-col gap-1 text-body">
            {recipe.facts.map((f) => (
              <div key={f.label}>
                <dt className="inline font-extrabold">{f.label}: </dt>
                <dd className="inline">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Button href={routes.recipe(recipe.slug)} variant={cream ? "white" : "orange"} size="sm" className={cn("gap-2", cream && "text-eyebrow")}>
          Xem công thức
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </article>
  );
}

/**
 * tone "orange": on the orange melon background (Home).
 * tone "cream": on cream (product detail pages) — dark green heading, green card.
 */
export function RecipeCarousel({ tone = "orange", className }: { tone?: "orange" | "cream"; className?: string }) {
  const cream = tone === "cream";
  return (
    <section aria-labelledby="recipes-title" className={cn("container-site relative", cream ? "text-ink" : "text-white", className)}>
      {cream && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative vector
        <img loading="lazy" src="/svg/generated/detail/recipes-flower.svg" alt="" aria-hidden="true" width={370} height={339} className="absolute top-12 right-[-150px] -z-10 hidden lg:block" />
      )}
      <div className="mx-auto flex max-w-[680px] flex-col gap-4 text-center lg:gap-6">
        <p className={cn("text-subtitle font-bold uppercase", cream && "text-eyebrow")}>Tươi ngon mỗi ngày, đơn giản từ Pansy</p>
        <div className="flex flex-col gap-4">
          <h2 id="recipes-title" className="text-h4 font-extrabold lg:text-h2">
            Gợi ý từ căn bếp <span className={cream ? undefined : "text-yellow-500"}>Pansy</span>
          </h2>
          <p className="text-body font-semibold lg:text-body-lg lg:leading-[27.3px]">
            Dưa lưới không chỉ để ăn tươi – mà còn có thể trở thành nguyên liệu cho những món ngon đầy sáng tạo,
            nhẹ nhàng và tốt cho sức khỏe.
          </p>
        </div>
      </div>

      <div className="relative mt-10 lg:mt-16">
        <Carousel
          label="Công thức từ Pansy"
          arrowColor="green"
          arrowSize="large"
          dots
          dotColor={cream ? "green" : "yellow"}
          inactiveDotClassName={cream ? "bg-green-300" : "bg-white"}
          className="lg:mx-0"
          trackClassName="pb-2"
          arrowsClassName="max-lg:top-auto max-lg:bottom-0 max-lg:translate-y-0 max-lg:justify-end max-lg:gap-1 lg:-mx-7 lg:top-[200px]"
        >
          {recipes.map((r) => (
            <RecipeSlide key={r.slug} recipe={r} cream={cream} />
          ))}
        </Carousel>
        {/* Green mascot peeking over the bottom-right of the card */}
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative vector */}
        <img loading="lazy"
          src="/svg/mascot/recipe-mascot.svg"
          alt=""
          aria-hidden="true"
          width={179}
          height={100}
          className="pointer-events-none absolute right-6 bottom-[54px] w-[108px] lg:right-[37px] lg:bottom-[40px] lg:w-[179px]"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Button href={routes.menu} variant="green" size="md">
          Xem tất cả
        </Button>
      </div>
    </section>
  );
}

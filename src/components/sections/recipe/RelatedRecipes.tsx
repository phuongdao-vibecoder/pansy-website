import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RecipeFacts } from "@/components/sections/menu/RecipeCard";
import { Button } from "@/components/ui/Button";
import { img } from "@/content/images";
import { relatedRecipes } from "@/content/menu";
import { routes } from "@/content/site";

/** "Khám phá công thức khác" (Figma "Tin tức" 406:38560: two 552-wide cards + "Xem tất cả"). */
export function RelatedRecipes({ current }: { current: string }) {
  const items = relatedRecipes.items.filter((r) => r.slug !== current).concat(relatedRecipes.items.filter((r) => r.slug === current)).slice(0, 2);
  return (
    <section aria-labelledby="related-title" className="section-gap">
      <Reveal className="container-site flex flex-col items-center gap-12">
        <div className="flex flex-col gap-6 text-center">
          <p className="text-subtitle font-bold text-eyebrow">{relatedRecipes.eyebrow}</p>
          <h2 id="related-title" className="text-h4 font-extrabold lg:text-h2">
            {relatedRecipes.title}
          </h2>
        </div>
        <ul className="grid w-full gap-12 md:grid-cols-2 md:gap-6">
          {items.map((r) => {
            const photo = img(r.image);
            return (
              <li key={r.slug} className="group relative flex flex-col gap-4">
                <Image src={photo.src} width={photo.width} height={photo.height} alt="" sizes="(min-width: 768px) 552px, 100vw" className="aspect-[343/250] w-full rounded-sm object-cover md:aspect-[552/300]" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg/[27.3px] font-extrabold lg:text-h5">
                    <Link href={routes.recipe(r.slug)} className="after:absolute after:inset-0 hover:underline">
                      {r.title}
                    </Link>
                  </h3>
                  <RecipeFacts facts={r.facts} />
                </div>
              </li>
            );
          })}
        </ul>
        <Button href={routes.menu} variant="green" size="md">
          Xem tất cả
        </Button>
      </Reveal>
    </section>
  );
}

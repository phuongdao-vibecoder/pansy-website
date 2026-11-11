import Image from "next/image";
import Link from "next/link";
import { img } from "@/content/images";
import type { MenuCard } from "@/content/menu";
import { routes } from "@/content/site";
import { cn } from "@/lib/cn";

/** Bold label + value lines (Figma "Frame 6861": Nunito 16, label ExtraBold, value SemiBold). */
export function RecipeFacts({ facts }: { facts: MenuCard["facts"] }) {
  return (
    <dl className="flex flex-col gap-1 text-body">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="inline font-extrabold">{f.label}: </dt>
          <dd className="inline">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Recipe card of the Thực đơn grid (Figma "Frame 6284": 360 wide, photo r16, gap 16;
 * mobile "Card": 335 wide, photo r8, gap 24). The whole card links to the recipe.
 * `featured`: the large desktop card (Figma "Frame 6772": 648×432 photo r20 + 455 text).
 */
export function RecipeCard({ card, featured = false, className }: { card: MenuCard; featured?: boolean; className?: string }) {
  const photo = img(card.image);
  return (
    <article className={cn("group relative flex flex-col gap-6 lg:gap-4", featured && "lg:flex-row lg:items-start lg:gap-6", className)}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt=""
        sizes={featured ? "(min-width: 1024px) 648px, 100vw" : "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"}
        className={cn(
          "aspect-[335/221] w-full rounded-xs object-cover transition-transform duration-300 group-hover:scale-[1.02] lg:rounded-sm",
          featured ? "lg:aspect-[648/432] lg:w-[648px] lg:shrink-0 lg:rounded-md" : "lg:aspect-[360/245]",
        )}
      />
      <div className={cn("flex flex-col gap-2", featured && "lg:gap-3")}>
        <p className="text-subtitle font-bold text-eyebrow">{card.category}</p>
        <h3 className={cn("text-body-lg/[27.3px] font-extrabold", featured ? "lg:text-h4" : "lg:text-h5")}>
          <Link href={routes.recipe(card.slug)} className="after:absolute after:inset-0 hover:underline">
            {card.title}
          </Link>
        </h3>
        <RecipeFacts facts={card.facts} />
        <p className="text-subtitle">{card.date}</p>
      </div>
    </article>
  );
}

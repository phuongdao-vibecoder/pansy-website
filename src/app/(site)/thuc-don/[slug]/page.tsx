import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageBanner } from "@/components/sections/PageBanner";
import { RecipeArticle } from "@/components/sections/recipe/RecipeArticle";
import { RelatedRecipes } from "@/components/sections/recipe/RelatedRecipes";
import { recipeDetail } from "@/content/menu";
import { getRecipe, recipeCategories, recipes } from "@/content/recipes";
import { routes } from "@/content/site";
import { DisplayText } from "@/components/ui/DisplayText";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/thuc-don/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getRecipe(slug)?.title ?? "Công thức" };
}

/**
 * Công thức (Figma "Công thức - Desktop" 406:38414, mobile 406:38803).
 * Banner with breadcrumb → recipe body → "Khám phá công thức khác" → contact + footer.
 * Only "Kem Dưa Lưới" is designed; the other sample recipes reuse its body with their own
 * title, category and photo (decision 2026-11-09: repeat the sample recipe data).
 * `params` is read inside <Suspense> (Cache Components).
 */
export default function RecipePage({ params }: PageProps<"/thuc-don/[slug]">) {
  return (
    <Suspense fallback={<main data-page-bg="light" className="min-h-dvh" aria-busy="true" />}>
      <Recipe params={params} />
    </Suspense>
  );
}

async function Recipe({ params }: { params: PageProps<"/thuc-don/[slug]">["params"] }) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  const category = recipeCategories[recipe.category].toUpperCase();

  return (
    <main data-page-bg="light" className="overflow-x-clip">
      <PageBanner
        image={recipe.image}
        breadcrumb={[{ label: "THỰC ĐƠN", href: routes.menu }, { label: category }]}
        flowers={false}
        marquee="none"
        desktopImagePosition="50% 53%"
        overlayClassName="bg-[linear-gradient(315deg,rgb(0_0_0/0)_34%,rgb(0_0_0/0.6)_100%)] lg:bg-[linear-gradient(57deg,rgb(0_0_0/0.2)_24%,rgb(0_0_0/0)_83%)]"
        className="h-[500px] lg:h-[600px]"
        contentClassName="pt-[120px] lg:pt-[236px] [&>nav]:mb-2 lg:[&>nav]:mb-5"
      >
        <h1 className="font-display text-[40px]/[52px] text-white lg:text-[81px]/[90px]"><DisplayText>{recipe.title}</DisplayText></h1>
      </PageBanner>
      <RecipeArticle detail={recipeDetail} title={recipe.title} />
      <RelatedRecipes current={recipe.slug} />
    </main>
  );
}

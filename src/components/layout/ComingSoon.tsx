import { Button } from "@/components/ui/Button";
import { routes } from "@/content/site";
import { DisplayText } from "@/components/ui/DisplayText";

/**
 * "Coming soon" page for destinations that are linked in the design
 * but have no page design (decision 2026-11-09, SITEMAP.md §5).
 * The layout here is our own; the shared header and footer are added in Phase 3.
 */
export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="container-site flex min-h-[70dvh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="text-subtitle font-bold tracking-wide text-eyebrow uppercase">
        Sắp ra mắt
      </p>
      <h1 className="font-display text-ot-subheading text-brand uppercase md:text-display">
        <DisplayText>{title}</DisplayText>
      </h1>
      <p className="max-w-[46ch] text-body">
        Nội dung trang này đang được Pansy chuẩn bị. Bạn quay lại sau nhé!
      </p>
      <Button href={routes.home} variant="green" size="md">
        Về trang chủ
      </Button>
    </main>
  );
}

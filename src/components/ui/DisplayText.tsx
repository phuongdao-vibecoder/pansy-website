import { toLatin } from "@/lib/latin";

/**
 * Nunito demo (2026-11-11): the display font is temporarily Nunito, which has every Vietnamese
 * letter, so headings show full Vietnamese. Set this back to `true` when restoring
 * October Compressed H+L Heavy (it has no Vietnamese letters).
 */
const STRIP_ACCENTS = false;

/**
 * Text in the display font. With October Compressed H+L Heavy (no Vietnamese letters) the
 * visible text uses the Latin spelling ("Dưa lưới" → "Dua luoi") and screen readers and search
 * engines get the original Vietnamese through an sr-only copy (decision 2026-11-11).
 */
export function DisplayText({ children }: { children: string }) {
  if (!STRIP_ACCENTS) return children;
  const latin = toLatin(children);
  if (latin === children) return children;
  return (
    <>
      <span aria-hidden="true">{latin}</span>
      <span className="sr-only">{children}</span>
    </>
  );
}

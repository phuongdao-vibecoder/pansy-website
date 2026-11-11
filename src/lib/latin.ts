/**
 * Vietnamese → plain Latin letters: removes tone marks and the horn/breve/circumflex
 * (ư → u, ơ → o, ă/â → a, ê → e, ô → o) and maps đ/Đ → d/D.
 * Used only for text set in the display font, which has no Vietnamese glyphs
 * (decision 2026-11-11, see PROJECT_PLAN "Phase 12 notes").
 */
export function toLatin(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .normalize("NFC");
}

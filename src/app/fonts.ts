import { Nunito } from "next/font/google";

/** Body and heading font. Figma uses weights 600 / 700 / 800. */
export const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

/*
 * Display font: October Compressed H+L Heavy (Typotheque, © 2017; file from OnlineWebFonts).
 * Commercial font: the web licence is NOT confirmed. Do not redistribute or deploy publicly
 * until Typotheque web rights are confirmed. It has no Vietnamese letters, so display text
 * goes through <DisplayText> (Latin spelling on screen, Vietnamese for screen readers).
 *
 * Removed from the build (2026-11-11, your decision before deployment): while this was declared,
 * Next.js copied the file to .next/static/media and served it publicly even though the Nunito
 * demo never uses it. The file stays at src/app/fonts/OctoberCompressedHL-Heavy.woff2.
 * To restore: uncomment the block below (and the import), then follow HANDOFF.md.
 *
 * import localFont from "next/font/local";
 *
 * export const october = localFont({
 *   src: "./fonts/OctoberCompressedHL-Heavy.woff2",
 *   weight: "850",
 *   style: "normal",
 *   variable: "--font-october",
 *   display: "swap",
 * });
 */

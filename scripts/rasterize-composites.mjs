#!/usr/bin/env node
/**
 * Rasterize SVGs generated from Figma geometry (illustrations that contain photos)
 * into 2× PNGs next to them, so scripts/optimize-images.mjs can turn them into WebP.
 *
 *   node scripts/rasterize-composites.mjs
 *
 * Input/Output: _incoming/figma-composites/generated/**.svg -> same path .png
 * (Browsers cannot load photos referenced inside an SVG used as <img>, so these
 *  composites ship as raster images.)
 */
import { createRequire } from "node:module";
import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "_incoming/figma-composites/generated");

async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (p.endsWith(".svg")) yield p;
  }
}

let n = 0;
if (existsSync(dir)) {
  for await (const svg of walk(dir)) {
    const png = svg.replace(/\.svg$/, ".png");
    if (existsSync(png) && (await stat(png)).mtimeMs >= (await stat(svg)).mtimeMs) continue;
    await sharp(svg, { density: 144, limitInputPixels: false }).png().toFile(png);
    n++;
  }
}
console.log(`rasterized ${n} composite(s)`);

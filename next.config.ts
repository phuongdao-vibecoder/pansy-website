import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Sources in public/images are WebP (see scripts/optimize-images.mjs);
    // next/image re-encodes them per browser, AVIF first.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Only optimize our own images; no query strings.
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

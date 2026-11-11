import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = { title: "Tin tức" };

// News articles have no design yet. Sample slugs are prerendered;
// the real list will come from the news content in a later phase.
export function generateStaticParams() {
  return [{ slug: "chuyen-nha-pansy" }];
}

export default function NewsArticlePage() {
  return <ComingSoon title="Tin tức" />;
}

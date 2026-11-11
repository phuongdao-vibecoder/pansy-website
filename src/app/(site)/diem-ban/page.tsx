import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { comingSoonPages } from "@/content/site";

const page = comingSoonPages.stores;

export const metadata: Metadata = { title: page.title };

export default function Page() {
  return <ComingSoon title={page.title} />;
}

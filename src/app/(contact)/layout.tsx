import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FaqSection } from "@/components/sections/contact/FaqSection";

/**
 * Contact page shell. The page already has its own form, so the footer slot
 * holds the FAQ card instead (Figma Contact-desktop 406:17957).
 */
export default function ContactLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter>
        <FaqSection />
      </SiteFooter>
    </>
  );
}

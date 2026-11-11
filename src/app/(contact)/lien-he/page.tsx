import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";

export const metadata: Metadata = { title: "Liên hệ" };

/**
 * Liên hệ (Figma "Contact-desktop" 406:17957, "Contact-Mobile" 406:17800).
 * Contact form + details on the yellow background; the FAQ card sits in the footer slot
 * (see the (contact) layout). There is no slogan band or contact card in the footer here.
 */
export default function ContactPage() {
  return (
    <main className="overflow-x-clip">
      <ContactHero />
    </main>
  );
}

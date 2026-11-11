import type { Metadata } from "next";
import { nunito } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Dưa Lưới Pansy — Chuẩn Giòn, Chuẩn Ngọt, Chuẩn Pansy",
    template: "%s | Dưa Lưới Pansy",
  },
  description:
    "Pansy là thương hiệu dưa lưới cao cấp được trồng và chăm sóc tại Soleil Farm, đạt chuẩn GlobalG.A.P.",
  // Frontend demo: keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${nunito.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available so scroll-reveal styles only apply when they can finish. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

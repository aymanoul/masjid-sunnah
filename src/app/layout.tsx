import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource/prata/400.css";
import "@fontsource/amiri/400.css";
import "./fallbacks.generated.css"; // Ersatzschrift pro Gewicht (gemessen), verhindert Layoutsprung beim Schriftwechsel
import "./fonts.generated.css"; // kleine Teilmengen, nach den Fontsource-Dateien, damit sie Vorrang haben
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { asset, siteUrl } from "@/lib/base";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Masjid As-Sunnah Ratingen", template: "%s · Masjid As-Sunnah Ratingen" },
  description: "Masjid As-Sunnah in Ratingen: Gebetszeiten, Unterricht und Neubau-Projekt.",
  icons: {
    icon: [
      { url: asset("/icons/favicon.ico"), sizes: "any" },
      { url: asset("/icons/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/icons/favicon-16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: asset("/icons/apple-touch-icon.png"),
  },
  applicationName: "Masjid As-Sunnah",
  appleWebApp: { capable: true, title: "Masjid As-Sunnah", statusBarStyle: "black-translucent" },
  // Standardwerte für Seiten ohne eigene Metadaten (404, Styleguide). Alle anderen setzen pageMeta().
  openGraph: { type: "website", locale: "de_DE", siteName: "Masjid As-Sunnah Ratingen", images: [ogImage] },
  robots: process.env.NEXT_PUBLIC_NOINDEX ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = { themeColor: "#212242", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

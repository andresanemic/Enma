import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // lore/routing: title.absolute para landing; template para páginas internas
  title: {
    absolute: "Enma — Energía y Manufactura Sustentable",
    template: "%s · Enma",
  },
  description:
    "Empresa chilena de ingeniería energética y manufactura avanzada operando desde la Región de Aysén. Consultoría, simulaciones CFD, prototipado y formulación de proyectos para el sector público y privado.",
  metadataBase: new URL("https://enmachile.com"),
  keywords: ["energía renovable", "Aysén", "Patagonia", "ingeniería energética", "simulaciones CFD", "manufactura sustentable", "huella de carbono"],
  authors: [{ name: "Enma SPA", url: "https://enmachile.com" }],
  openGraph: {
    locale: "es_CL",
    type: "website",
    siteName: "Enma",
    title: "Enma — Energía y Manufactura Sustentable",
    description:
      "Soluciones de ingeniería energética y manufactura avanzada desde la Patagonia chilena. Puerto Cisnes, Región de Aysén.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enma — Energía y Manufactura Sustentable",
    description: "Ingeniería energética y manufactura avanzada desde la Patagonia chilena.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${manrope.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}

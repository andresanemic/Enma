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
  // lore/routing: title.absolute para que la homepage ignore el template del layout
  title: { absolute: "Enma — Energía y Manufactura Sustentable" },
  description:
    "Soluciones socio-técnicas a la medida para problemas reales de energía, reciclaje y calefacción, hechas desde la Patagonia chilena.",
  metadataBase: new URL("https://enmachile.com"),
  openGraph: {
    locale: "es_CL",
    type: "website",
    siteName: "Enma",
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

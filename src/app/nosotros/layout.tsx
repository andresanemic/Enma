import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros · Enma",
  description:
    "Conoce a Bruno Ortega y Patricio Campos, los ingenieros fundadores de Enma. Una empresa de base científico-tecnológica operando desde Puerto Cisnes, Región de Aysén, en la Patagonia chilena.",
  openGraph: {
    title: "Nosotros · Enma",
    description:
      "Dos ingenieros, un territorio. Enma nació en la Patagonia para resolver problemas reales de energía y manufactura con herramientas computacionales avanzadas.",
    url: "https://enmachile.com/nosotros",
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

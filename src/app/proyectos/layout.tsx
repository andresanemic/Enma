import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos · Enma",
  description:
    "Tres casos de ingeniería aplicada desde el territorio: taller de upcycling en Puerto Cisnes, turbina eólica de baja escala financiada por ANID, y túnel de viento con simulaciones CFD.",
  openGraph: {
    title: "Proyectos · Enma",
    description:
      "Ingeniería desde el territorio. Proyectos reales de energía, reciclaje y validación tecnológica en la Región de Aysén.",
    url: "https://enmachile.com/proyectos",
  },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

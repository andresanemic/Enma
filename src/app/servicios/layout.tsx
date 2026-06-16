import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios · Enma",
  description:
    "Seis líneas de servicio: consultoría y estudios energéticos, desarrollo de prototipos, simulaciones CFD, formulación de proyectos para fondos públicos, cuantificación de huella de carbono y charlas de difusión.",
  openGraph: {
    title: "Servicios · Enma",
    description:
      "De la consultoría estratégica al prototipado físico. Enma ofrece soluciones completas de ingeniería energética y ambiental para empresas, municipalidades y sector público.",
    url: "https://enmachile.com/servicios",
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

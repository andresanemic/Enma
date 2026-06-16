import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Notas e Ideas · Enma",
  description:
    "Columnas y reflexiones de Bruno Ortega y Patricio Campos sobre energía renovable, pertenencia territorial y tecnología aplicada desde la Patagonia chilena.",
  openGraph: {
    title: "Blog · Enma",
    description:
      "Ideas y perspectivas desde la Patagonia. Los fundadores de Enma escriben sobre energía, territorio y sustentabilidad.",
    url: "https://enmachile.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

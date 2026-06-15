import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  return (
    <footer className="bg-teal" role="contentinfo">
      {/* Top divider */}
      <div className="h-px bg-cream/10" />

      <div className="px-6 md:px-14 lg:px-24 py-14 md:py-16">
        <div className="grid md:grid-cols-[auto_1fr_auto] gap-10 md:gap-16 items-start">

          {/* Logo + tagline */}
          <div>
            <Image
              src="/logos/logo-blanco.webp"
              alt="Enma"
              width={100}
              height={32}
              className="h-8 w-auto mb-5"
            />
            <p className="text-cream/40 font-body text-xs leading-relaxed max-w-[200px]">
              Energía y Manufactura Sustentable desde la Patagonia.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3 md:justify-center md:pt-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/50 hover:text-cream text-sm font-body tracking-wide transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contact */}
          <div className="text-right">
            <a
              href="mailto:contacto@enmachile.com"
              className="block text-cream/60 hover:text-cream font-body text-sm mb-2 transition-colors duration-200"
            >
              contacto@enmachile.com
            </a>
            <a
              href="https://wa.me/56993377835"
              className="block text-cream/60 hover:text-cream font-body text-sm mb-2 transition-colors duration-200"
            >
              +56 9 9337 7835
            </a>
            <p className="text-cream/30 font-body text-xs mt-3">
              enmachile.com
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-8 border-t border-cream/8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/25 font-body text-[11px] tracking-wide">
            © {new Date().getFullYear()} Enma SPA · Puerto Cisnes, Aysén, Chile
          </p>
          <p className="text-cream/20 font-body text-[11px] tracking-[0.15em] uppercase">
            ENergía · MAnufactura
          </p>
        </div>
      </div>
    </footer>
  );
}

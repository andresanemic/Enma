"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      footerRef.current?.querySelectorAll(".footer-col") ?? [],
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0,
        duration: 0.7, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-green-dark relative overflow-hidden" role="contentinfo">
      {/* Organic ring pattern — top right, very faint */}
      <svg
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "min(50vw, 480px)", opacity: 0.035 }}
        viewBox="0 0 400 320"
        preserveAspectRatio="xMaxYMin slice"
        aria-hidden="true"
        fill="none"
      >
        {[55, 110, 168, 226, 284, 340].map((r, i) => (
          <circle
            key={i}
            cx="400"
            cy="0"
            r={r}
            stroke="#F7DFBA"
            strokeWidth="1"
            opacity={0.55 - i * 0.07}
          />
        ))}
      </svg>

      {/* Top divider */}
      <div className="h-px bg-cream/[0.06]" />

      <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-16 pb-10 md:pt-20 md:pb-12">

        {/* Main columns */}
        <div className="grid sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16 lg:gap-20 mb-14">

          {/* Col 1: Brand */}
          <div className="footer-col sm:col-span-2 md:col-span-1" style={{ opacity: 0 }}>
            <Image
              src="/logos/logo-blanco.webp"
              alt="Enma"
              width={100}
              height={32}
              className="h-7 w-auto mb-6 opacity-85"
            />
            <p className="text-cream/35 font-body text-sm leading-[1.8] max-w-[280px] mb-8">
              Diseñamos soluciones sustentables de energía y manufactura para la Patagonia y el mundo.
            </p>
            <a
              href="mailto:contacto@enmachile.com"
              className="inline-flex items-center gap-2 text-green text-sm font-body transition-colors duration-200 hover:text-cream group"
            >
              contacto@enmachile.com
              <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                →
              </span>
            </a>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col" style={{ opacity: 0 }}>
            <p className="text-cream/20 text-[10px] tracking-[0.24em] uppercase font-body mb-5">
              Sitio
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-cream/50 hover:text-cream text-sm font-body tracking-wide transition-colors duration-200 relative group w-fit"
                >
                  {link.label}
                  {/* scaleX: compositor pure — per lore/animation.md */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-0.5 h-px w-full bg-cream/30 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div className="footer-col" style={{ opacity: 0 }}>
            <p className="text-cream/20 text-[10px] tracking-[0.24em] uppercase font-body mb-5">
              Contacto
            </p>
            <div className="flex flex-col gap-3.5">
              <a
                href="mailto:contacto@enmachile.com"
                className="text-cream/50 hover:text-cream font-body text-sm transition-colors duration-200"
              >
                contacto@enmachile.com
              </a>
              <a
                href="https://wa.me/56993377835"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 hover:text-cream font-body text-sm transition-colors duration-200"
              >
                +56 9 9337 7835
              </a>
              <div className="mt-2">
                <p className="text-cream/20 font-body text-xs leading-[1.65]">
                  Puerto Cisnes
                </p>
                <p className="text-cream/20 font-body text-xs leading-[1.65]">
                  Región de Aysén, Chile
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-cream/[0.07] pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-cream/20 font-body text-[11px] tracking-wide">
            © {new Date().getFullYear()} Enma SPA · Puerto Cisnes, Aysén, Chile
          </p>
          <p className="text-cream/15 font-body text-[10px] tracking-[0.22em] uppercase">
            ENergía · MAnufactura
          </p>
        </div>
      </div>
    </footer>
  );
}

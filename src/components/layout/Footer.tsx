"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const NAV_PAGES = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

const NAV_CONTACT = [
  { href: "mailto:contacto@enmachile.com", label: "contacto@enmachile.com", external: false },
  { href: "https://wa.me/56993377835", label: "+56 9 9337 7835", external: true },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // FOUC guard: initial opacity:0 set inline on every .ft-anim element.
  // gsap.fromTo (never gsap.from) confirms that state — lore/animation.md
  useGSAP(() => {
    const els = footerRef.current?.querySelectorAll(".ft-anim") ?? [];
    if (!els.length) return;
    gsap.fromTo(
      els,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%", // safe on both desktop & mobile — lore/animation.md
        },
      }
    );
  }, { scope: footerRef });

  const year = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      className="relative z-[100] overflow-hidden bg-green-dark text-cream"
      role="contentinfo"
    >
      {/* ── Animated dots strip (CSS-only — no GSAP, GPU-composited) ── */}
      <div
        className="relative overflow-hidden bg-green-dark"
        style={{ height: "120px" }}
        aria-hidden="true"
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            width: "200%",
            height: "70px",
            opacity: 0.68,
            backgroundImage: [
              "radial-gradient(circle, rgb(247 223 186 / 0.52) 1.5px, transparent 2px)",
              "radial-gradient(circle, rgb(247 223 186 / 0.28) 1px, transparent 1.5px)",
              "radial-gradient(circle, rgb(254 169 79 / 0.32) 1.2px, transparent 1.8px)",
            ].join(", "),
            backgroundPosition: "0 8px, 24px 22px, 48px 14px",
            backgroundSize: "72px 38px, 110px 44px, 160px 52px",
            animation: "footerDotsMove 18s linear infinite",
          }}
        />
      </div>

      {/* ── Inner container — responsive widths via .footer-inner in globals.css ── */}
      <div className="footer-inner">

        {/* ── Top grid: H2 + 3 nav columns ── */}
        <div className="footer-top-grid">

          {/* Col 1: editorial H2 */}
          <h2
            className="ft-anim footer-h2 m-0 text-cream font-display"
            style={{
              opacity: 0,
              maxWidth: "580px",
              fontSize: "clamp(30px, 3.5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              lineHeight: 1.08,
            }}
          >
            Diseñamos soluciones sustentables en energía y manufactura desde la Patagonia.
          </h2>

          {/* Col 2: navegación */}
          <nav
            aria-label="Navegación del footer"
            className="ft-anim flex flex-col items-start"
            style={{ opacity: 0, gap: "clamp(12px, 1.35vw, 20px)" }}
          >
            {NAV_PAGES.map((link) => (
              <Link key={link.href} href={link.href} className="footer-nav-link font-body">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Col 3: contacto */}
          <nav
            aria-label="Contacto"
            className="ft-anim flex flex-col items-start"
            style={{ opacity: 0, gap: "clamp(12px, 1.35vw, 20px)" }}
          >
            {NAV_CONTACT.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="footer-nav-link font-body"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Col 4: ubicación */}
          <div
            className="ft-anim flex flex-col items-start"
            style={{ opacity: 0, gap: "clamp(12px, 1.35vw, 20px)" }}
          >
            {["Coyhaique", "Región de Aysén", "Chile"].map((line) => (
              <span key={line} className="footer-nav-link font-body cursor-default">
                {line}
              </span>
            ))}
          </div>

        </div>{/* /.footer-top-grid */}

        {/* ── Brand row ── */}
        <div
          className="ft-anim w-full"
          style={{ opacity: 0, marginTop: "clamp(18px, 3vw, 46px)" }}
        >
          <Link
            href="/"
            aria-label="Enma — página de inicio"
            className="flex items-center w-full text-cream no-underline"
          >
            {/* Circular brand mark with isotipo */}
            <span className="footer-mark" aria-hidden="true">
              <Image
                src="/isotipos/isotipo-verde.webp"
                alt=""
                fill
                sizes="(max-width:560px) 12vw, 6.1vw"
                className="object-contain"
                style={{ padding: "18%" }}
              />
            </span>

            {/* Oversized wordmark */}
            <span className="footer-wordmark font-display text-cream">
              Enma
            </span>
          </Link>
        </div>

        {/* ── Legal line ── */}
        <div
          className="ft-anim flex flex-wrap justify-start"
          style={{
            opacity: 0,
            gap: "8px 18px",
            marginTop: "clamp(14px, 1.4vw, 24px)",
          }}
        >
          <p className="m-0 text-cream/40 font-body text-[9px] leading-[1.35]">
            © {year} Enma SPA. Todos los derechos reservados.
          </p>
          <span className="text-cream/40 font-body text-[9px] leading-[1.35]">
            Coyhaique, Región de Aysén, Chile
          </span>
          <span className="text-cream/30 font-body text-[9px] leading-[1.35] tracking-[0.2em] uppercase">
            ENergía · MAnufactura
          </span>
        </div>

      </div>{/* /.footer-inner */}
    </footer>
  );
}

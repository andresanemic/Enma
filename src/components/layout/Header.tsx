"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lore/animation: gsap.fromTo, estado inicial en style inline
  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }
    );
  }, { scope: headerRef });

  // Mobile menu open/close — lore/animation: no setState en medio de tween GSAP
  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      // lore/scroll: restaurar con '' no con 'auto' para evitar scrollbar flash
      document.body.style.overflow = "";
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 lg:px-16 py-5 transition-all duration-500 ${
          scrolled
            ? "bg-teal/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-transparent"
        }`}
      >
        <Link href="/" aria-label="Enma — inicio">
          <Image
            src="/logos/logo-blanco.webp"
            alt="Enma"
            width={112}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/75 hover:text-cream text-sm tracking-wide font-body transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:contacto@enmachile.com"
            className="text-teal bg-cream/90 hover:bg-cream px-5 py-2 rounded-full text-sm font-medium font-body transition-all duration-300"
          >
            Hablemos →
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-6 h-[1.5px] bg-cream origin-center transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-cream origin-center transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-40 bg-teal flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Subtle circuit decoration */}
        <div className="absolute inset-0 opacity-[0.06]">
          <svg viewBox="0 0 400 600" className="w-full h-full" aria-hidden="true">
            <path d="M 400 60 H 280 Q 240 60 240 100 V 300 Q 240 340 200 340 H 0" stroke="white" strokeWidth="2" fill="none" />
            <path d="M 400 100 H 300 Q 260 100 260 140 V 320 Q 260 360 220 360 H 0" stroke="white" strokeWidth="2" fill="none" />
            <path d="M 400 140 H 320 Q 280 140 280 180 V 340 Q 280 380 240 380 H 0" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <nav className="flex flex-col items-center gap-8 relative z-10">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="text-cream text-3xl font-display font-light tracking-wide hover:text-orange transition-colors duration-200"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 text-center">
          <p className="text-cream/40 text-xs tracking-widest uppercase font-body">
            contacto@enmachile.com
          </p>
        </div>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lore/animation INC-001: bifurcar por ruta para evitar FOUC en páginas no-home.
  // pathname===null es fallback SSR → tratar como home para evitar flash de re-hydration.
  useEffect(() => {
    if (!headerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    if (pathname === "/" || pathname === null) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }
      );
    } else {
      gsap.set(headerRef.current, { opacity: 1, y: 0 });
    }
  }, [pathname]);

  // lore/animation: GSAP stagger en links del overlay — no CSS transition-delay
  useEffect(() => {
    if (!menuOpen) return;
    const links = overlayLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    gsap.fromTo(
      links,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out", delay: 0.1 }
    );
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      // Reset link positions for next open before unmounting the open state
      const links = overlayLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
      gsap.set(links, { opacity: 0, y: 32 });
      // lore/scroll: '' no 'auto' para evitar scrollbar flash de ~15px
      document.body.style.overflow = "";
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        style={{ opacity: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "px-6 md:px-10 lg:px-16 py-3 bg-teal/95 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "px-6 md:px-10 lg:px-16 py-5 bg-transparent"
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
              className="relative text-cream/75 hover:text-cream text-sm tracking-wide font-body transition-colors duration-200 group"
            >
              {link.label}
              {/* navbar.md §4.1: underline animado — scaleX vs width (compositor puro, sin layout) */}
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-0.5 h-px w-full bg-cream/50 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
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

      {/* Mobile fullscreen overlay — navbar.md §3.3 */}
      <div
        className={`fixed inset-0 z-40 bg-teal flex flex-col items-center justify-center gap-10 transition-opacity duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Decorative circuit lines */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg viewBox="0 0 400 600" className="w-full h-full">
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
              ref={(el) => { overlayLinksRef.current[i] = el; }}
              onClick={toggleMenu}
              style={{ opacity: 0 }}
              className="text-cream text-3xl font-display font-light tracking-wide hover:text-orange transition-colors duration-200"
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

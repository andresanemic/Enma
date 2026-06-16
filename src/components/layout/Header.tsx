"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = [
  { href: "/nosotros",  label: "Nosotros"  },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/blog",      label: "Blog"      },
];

export default function Header() {
  const pathname    = usePathname();
  const [menuOpen, setMenuOpen]   = useState(false);
  const headerRef        = useRef<HTMLElement>(null);
  const drawerLinksRef   = useRef<(HTMLAnchorElement | null)[]>([]);
  const hasAnimated      = useRef(false);

  // lore/animation INC-001: bifurcar por ruta para evitar FOUC en páginas no-home.
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

  // Siempre estilo Hero: pill glassmorphism, fondo transparente
  const homeUnscrolled = true;

  // GSAP stagger para los links del drawer al abrir
  useEffect(() => {
    if (!menuOpen) return;
    const links = drawerLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    gsap.fromTo(
      links,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out", delay: 0.15 }
    );
  }, [menuOpen]);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    const links = drawerLinksRef.current.filter(Boolean) as HTMLAnchorElement[];
    gsap.set(links, { opacity: 0, y: 28 });
    // lore/scroll: '' no 'auto' para evitar scrollbar flash de ~15px
    document.body.style.overflow = "";
    setMenuOpen(false);
  };

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu());

  return (
    <>
      <header
        ref={headerRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 px-4 sm:px-6 md:px-10 py-5 bg-transparent"
      >
        {/* Logo — blanco sobre video (home) o sobre teal (scrolled/inner) */}
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

        {/* ── Desktop nav ── */}
        {homeUnscrolled ? (
          // Pill glassmorphism — motionsites.md §nav
          <nav
            className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md rounded-full pl-6 pr-1 py-1 shadow-sm border border-white/60"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm px-3 py-2 text-teal/80 hover:text-teal font-body font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:contacto@enmachile.com"
              className="ml-2 bg-teal hover:bg-teal/85 text-cream text-sm font-medium font-body px-5 py-2.5 rounded-full transition-colors duration-200"
            >
              Hablemos →
            </a>
          </nav>
        ) : (
          // Nav estándar — links sobre fondo teal o página interna
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-cream/75 hover:text-cream text-sm tracking-wide font-body transition-colors duration-200 group"
              >
                {link.label}
                {/* navbar.md §4.1: underline animado — scaleX (compositor puro) */}
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
        )}

        {/* ── Hamburger ── */}
        {homeUnscrolled ? (
          // Botón pill glass para home sin scroll — motionsites.md §nav mobile
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-white/60 text-teal transition-all duration-300 hover:bg-white/90"
          >
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-current origin-center transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[4px]"
              }`}
            />
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-current origin-center transition-all duration-300 ${
                menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[4px]"
              }`}
            />
          </button>
        ) : (
          // Hamburger estándar sobre fondo teal
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
        )}
      </header>

      {/* ── Mobile: overlay backdrop — cierra al hacer tap fuera del drawer ── */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* ── Mobile: drawer lateral derecho — motionsites.md §mobile drawer ── */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-[45] w-[85%] max-w-sm bg-cream/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-8">
          {/* Links — stagger GSAP al abrir */}
          <nav className="flex flex-col gap-0" aria-label="Menú móvil">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { drawerLinksRef.current[i] = el; }}
                onClick={closeMenu}
                style={{ opacity: 0 }}
                className="text-teal text-2xl font-display font-light py-4 border-b border-teal/10 hover:text-orange transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="mailto:contacto@enmachile.com"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-teal hover:bg-teal/90 text-cream text-sm font-medium font-body px-6 py-3 rounded-full transition-colors duration-300"
            >
              Hablemos de tu proyecto →
            </a>
          </div>

          {/* Footer del drawer */}
          <p className="mt-auto text-teal/30 text-[10px] tracking-widest uppercase font-body">
            contacto@enmachile.com
          </p>
        </div>
      </div>
    </>
  );
}

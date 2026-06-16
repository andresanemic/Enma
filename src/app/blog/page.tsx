"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";

// Paleta por artículo — consistente con la identidad Enma
const CARD_THEMES = [
  { bg: "#205358", text: "#F7DFBA", accent: "#FEA94F", dot: "#F7DFBA" },
  { bg: "#304B3D", text: "#F7DFBA", accent: "#FEA94F", dot: "#FEA94F" },
  { bg: "#F8EDDD", text: "#205358", accent: "#F1541C", dot: "#205358" },
];

function ArticleCover({
  num,
  category,
  theme,
  size = "normal",
}: {
  num: string;
  category: string;
  theme: (typeof CARD_THEMES)[number];
  size?: "normal" | "large";
}) {
  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{ background: theme.bg }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${theme.dot}18 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      {/* Giant number */}
      <div
        className="absolute bottom-0 left-0 font-display font-extralight leading-none select-none"
        style={{
          fontSize: size === "large" ? "clamp(7rem, 20vw, 16rem)" : "clamp(5rem, 12vw, 10rem)",
          color: theme.dot,
          opacity: 0.08,
          lineHeight: 0.85,
        }}
        aria-hidden="true"
      >
        {num}
      </div>
      {/* Category pill */}
      <div className="absolute top-6 left-6 z-10">
        <span
          className="font-body text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border"
          style={{ borderColor: `${theme.accent}50`, color: theme.accent }}
        >
          {category}
        </span>
      </div>
      {/* Decorative arc */}
      <svg
        className="absolute bottom-0 right-0 opacity-[0.07]"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="80" stroke={theme.text} strokeWidth="1.5" />
        <circle cx="200" cy="200" r="120" stroke={theme.text} strokeWidth="1" />
        <circle cx="200" cy="200" r="160" stroke={theme.text} strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export default function BlogPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-line") ?? [],
      { y: "108%", filter: "blur(10px)" },
      { y: "0%", filter: "blur(0px)", duration: 1.0, ease: "power3.out", stagger: 0.12, delay: 0.4 }
    );
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-fade") ?? [],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.08, delay: 1.0 }
    );
  }, { scope: heroRef });

  useGSAP(() => {
    gsap.fromTo(gridRef.current?.querySelectorAll(".card-reveal") ?? [],
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
      }
    );
  }, { scope: gridRef });

  return (
    <>
      <Header />
      <main>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative bg-ink min-h-[52svh] flex flex-col justify-end overflow-hidden pb-16 md:pb-20">
          {/* Decorative "NOTAS" */}
          <div
            className="absolute top-0 right-0 font-display font-extralight leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(6rem, 22vw, 18rem)", color: "#F7DFBA05", lineHeight: 0.88 }}
            aria-hidden="true"
          >
            NOTAS
          </div>

          <div className="relative z-10 px-6 md:px-14 lg:px-24 pt-32">
            <p className="h-fade text-cream/30 text-[11px] tracking-[0.28em] uppercase font-body mb-8" style={{ opacity: 0 }}>
              Blog · Ideas · Perspectivas desde la Patagonia
            </p>
            <h1 style={{ fontSize: "clamp(3.2rem, 8vw, 7.5rem)" }} className="font-display font-extralight text-cream leading-[0.97] tracking-[-0.03em]">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>Ideas y</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>perspectivas<span className="text-orange">.</span></span>
              </span>
            </h1>

            <div className="h-fade flex items-center justify-between border-t border-cream/10 mt-10 pt-6 gap-4" style={{ opacity: 0 }}>
              <p className="text-cream/35 font-body text-sm max-w-xs leading-relaxed">
                Nuestras columnas y reflexiones sobre energía, territorio y tecnología desde la Patagonia.
              </p>
              <span className="font-display font-light text-cream/15 text-5xl leading-none">03</span>
            </div>
          </div>
        </section>

        {/* ─── ARTICLES GRID ────────────────────────────────────── */}
        <section className="bg-cream-light py-16 md:py-24 px-6 md:px-14 lg:px-24">
          <div ref={gridRef} className="grid md:grid-cols-2 gap-5">

            {/* Card 01 — featured, full-width top */}
            <div className="card-reveal md:col-span-2" style={{ opacity: 0 }}>
              <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="group block">
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-0 rounded-2xl overflow-hidden border border-teal/10 hover:border-teal/25 transition-all duration-400 hover:-translate-y-1">
                  {/* Cover */}
                  <div className="aspect-[16/7] md:aspect-auto min-h-[260px]">
                    <ArticleCover num={BLOG_POSTS[0].num} category={BLOG_POSTS[0].category} theme={CARD_THEMES[0]} size="large" />
                  </div>
                  {/* Text */}
                  <div className="bg-teal p-8 md:p-10 flex flex-col justify-between">
                    <div>
                      <span className="font-display font-light text-cream/20 text-5xl leading-none">{BLOG_POSTS[0].num}</span>
                      <h2
                        className="font-display font-light text-cream leading-[1.1] tracking-[-0.02em] mt-5 mb-5 group-hover:text-orange transition-colors duration-300"
                        style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
                      >
                        {BLOG_POSTS[0].title}
                      </h2>
                      <p className="text-cream/50 font-body text-sm leading-[1.75]">
                        {BLOG_POSTS[0].subtitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-cream/10">
                      <div>
                        <p className="font-body font-medium text-cream text-sm">{BLOG_POSTS[0].author}</p>
                        <p className="font-body text-cream/40 text-xs tracking-wide">{BLOG_POSTS[0].role}</p>
                      </div>
                      <span className="text-orange group-hover:translate-x-1 transition-transform duration-300 text-lg">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Cards 02 & 03 — side by side */}
            {BLOG_POSTS.slice(1).map((post, i) => {
              const theme = CARD_THEMES[i + 1];
              return (
                <div key={post.slug} className="card-reveal" style={{ opacity: 0 }}>
                  <Link href={`/blog/${post.slug}`} className="group flex flex-col h-full rounded-2xl overflow-hidden border border-teal/10 hover:border-teal/25 transition-all duration-400 hover:-translate-y-1">
                    {/* Cover */}
                    <div className="aspect-[16/9] relative">
                      <ArticleCover num={post.num} category={post.category} theme={theme} />
                    </div>
                    {/* Text */}
                    <div className="flex flex-col flex-1 p-6 md:p-8 bg-white/60 backdrop-blur-sm">
                      <span className="font-display font-light text-cream/0 text-3xl leading-none text-teal/15">{post.num}</span>
                      <h2
                        className="font-display font-light text-teal leading-[1.15] tracking-[-0.02em] mt-3 mb-4 group-hover:text-orange-dark transition-colors duration-300"
                        style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-ink/50 font-body text-sm leading-[1.75] flex-1">
                        {post.subtitle}
                      </p>
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-teal/10">
                        <p className="font-body text-teal/60 text-xs tracking-wide">{post.author}</p>
                        <span className="text-teal/40 group-hover:text-orange group-hover:translate-x-1 transition-all duration-300 text-sm">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

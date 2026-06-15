"use client";

import { use, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-data";
import { notFound } from "next/navigation";

const CARD_THEMES = [
  { bg: "#205358", text: "#F7DFBA", accent: "#FEA94F", dot: "#F7DFBA" },
  { bg: "#304B3D", text: "#F7DFBA", accent: "#FEA94F", dot: "#FEA94F" },
  { bg: "#F8EDDD", text: "#205358", accent: "#F1541C", dot: "#205358" },
];

function getReadingTime(content: { type: string; text: string }[]): number {
  const words = content
    .filter((b) => b.type === "p")
    .reduce((sum, b) => sum + b.text.split(/\s+/).length, 0);
  return Math.max(1, Math.ceil(words / 200));
}

// lore/routing.md: params son Promise en Next.js 16 — usar `use(params)`
export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const postIdx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const theme = CARD_THEMES[postIdx] ?? CARD_THEMES[0];
  const nextPost = BLOG_POSTS[(postIdx + 1) % BLOG_POSTS.length];
  const readingTime = getReadingTime(post.content);

  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-line") ?? [],
      { y: "108%", filter: "blur(10px)" },
      { y: "0%", filter: "blur(0px)", duration: 1.0, ease: "power3.out", stagger: 0.11, delay: 0.4 }
    );
    gsap.fromTo(heroRef.current?.querySelectorAll(".h-fade") ?? [],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.07, delay: 1.0 }
    );
  }, { scope: heroRef });

  useGSAP(() => {
    gsap.fromTo(bodyRef.current?.querySelectorAll(".body-block") ?? [],
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.75, ease: "power2.out", stagger: 0.08,
        scrollTrigger: { trigger: bodyRef.current, start: "top 85%" }
      }
    );
  }, { scope: bodyRef });

  return (
    <>
      <Header />
      <main>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative overflow-hidden pt-32 pb-14 md:pb-20 px-6 md:px-14 lg:px-24" style={{ background: theme.bg }}>
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${theme.dot}12 1.5px, transparent 1.5px)`,
              backgroundSize: "22px 22px",
            }}
            aria-hidden="true"
          />
          {/* Giant number */}
          <div
            className="absolute bottom-0 right-6 md:right-14 font-display font-extralight leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(8rem, 20vw, 16rem)", color: theme.dot, opacity: 0.06, lineHeight: 0.85 }}
            aria-hidden="true"
          >
            {post.num}
          </div>

          <div className="relative z-10 max-w-3xl">
            <Link
              href="/blog"
              className="h-fade inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase transition-opacity duration-200"
              style={{ opacity: 0, color: `${theme.text}60` }}
            >
              <span>←</span> <span>Notas</span>
            </Link>

            <div className="h-fade flex items-center gap-3 mt-8 mb-7" style={{ opacity: 0 }}>
              <span
                className="font-body text-[10px] tracking-[0.22em] uppercase px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${theme.accent}50`, color: theme.accent }}
              >
                {post.category}
              </span>
              <span className="font-body text-[11px]" style={{ color: `${theme.text}40` }}>
                {readingTime} min de lectura
              </span>
            </div>

            <h1
              className="font-display font-light leading-[1.05] tracking-[-0.025em] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: theme.text }}
            >
              {post.title.split(". ").map((line, i, arr) => (
                <span key={i} className="block overflow-hidden pb-[0.04em]">
                  <span className="h-line block" style={{ transform: "translateY(108%)", filter: "blur(10px)" }}>
                    {line}{i < arr.length - 1 ? "." : ""}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="h-fade font-body leading-[1.7] mb-10 max-w-2xl"
              style={{ opacity: 0, color: `${theme.text}65`, fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}
            >
              {post.subtitle}
            </p>

            <div
              className="h-fade flex items-center gap-4 border-t pt-6"
              style={{ opacity: 0, borderColor: `${theme.text}15` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-sm flex-shrink-0"
                style={{ background: theme.accent, color: "#1A1A1A" }}
              >
                {post.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-body font-medium text-sm" style={{ color: theme.text }}>{post.author}</p>
                {post.role && (
                  <p className="font-body text-xs" style={{ color: `${theme.text}50` }}>{post.role}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ARTICLE BODY ─────────────────────────────────────── */}
        <article ref={bodyRef} className="bg-cream-light px-6 md:px-14 lg:px-24 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            {post.content.map((block, i) =>
              block.type === "h2" ? (
                <h2
                  key={i}
                  className="body-block font-display font-light text-teal tracking-[-0.02em] leading-[1.2] mt-12 mb-5"
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", opacity: 0 }}
                >
                  {block.text}
                </h2>
              ) : (
                <p
                  key={i}
                  className="body-block text-ink/70 font-body leading-[1.9] mb-6"
                  style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)", opacity: 0 }}
                >
                  {block.text}
                </p>
              )
            )}
          </div>
        </article>

        {/* ─── NEXT ARTICLE ─────────────────────────────────────── */}
        <section className="bg-ink py-16 md:py-20 px-6 md:px-14 lg:px-24">
          <p className="text-cream/25 font-body text-[10px] tracking-[0.28em] uppercase mb-6">Siguiente nota</p>
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex items-start md:items-center justify-between gap-6 border-t border-cream/10 pt-8"
          >
            <div>
              <span className="font-display font-light text-cream/15 text-3xl leading-none">{nextPost.num}</span>
              <h3
                className="font-display font-light text-cream leading-[1.1] tracking-[-0.02em] mt-3 group-hover:text-orange transition-colors duration-300"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
              >
                {nextPost.title}
              </h3>
            </div>
            <span className="text-cream/30 group-hover:text-orange group-hover:translate-x-2 transition-all duration-300 text-3xl flex-shrink-0">→</span>
          </Link>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="bg-teal px-6 md:px-14 lg:px-24 py-14 md:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p
              className="font-display font-light text-cream tracking-[-0.02em] leading-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
            >
              ¿Tienes un proyecto energético?<br />
              <span className="text-orange">Conversemos.</span>
            </p>
            <a
              href="mailto:contacto@enmachile.com"
              className="inline-flex items-center gap-3 bg-cream text-teal px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide hover:bg-orange hover:text-ink transition-all duration-300 flex-shrink-0 group"
            >
              Escribir →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

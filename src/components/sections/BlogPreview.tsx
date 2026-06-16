"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const trigger = { trigger: sectionRef.current, start: "top 85%" };

    gsap.fromTo(
      headerRef.current?.querySelectorAll(".fade-item") ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", stagger: 0.1, scrollTrigger: trigger }
    );

    gsap.fromTo(
      cardsRef.current?.querySelectorAll(".blog-card") ?? [],
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power2.out", stagger: 0.12, delay: 0.25, scrollTrigger: trigger }
    );

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6, scrollTrigger: trigger }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="blog-preview"
      className="bg-cream-light relative overflow-hidden"
    >
      <div className="relative z-10 px-6 md:px-14 lg:px-24 py-24 md:py-32">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p
              className="fade-item text-teal/50 text-[11px] tracking-[0.25em] uppercase font-body mb-5"
              style={{ opacity: 0 }}
            >
              Notas · Blog
            </p>
            <h2
              className="fade-item font-display font-light text-teal leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", opacity: 0 }}
            >
              Ideas desde el territorio
            </h2>
          </div>
          <p
            className="fade-item text-teal/45 font-body text-sm leading-[1.75] max-w-xs"
            style={{ opacity: 0 }}
          >
            Columnas de opinión e identidad escritas desde la Patagonia.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card group rounded-2xl overflow-hidden border border-teal/10 bg-white/60 hover:bg-white/85 hover:-translate-y-1.5 transition-all duration-300"
              style={{ opacity: 0 }}
            >
              {/* Cover image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal/85 text-cream text-[9px] tracking-[0.18em] uppercase font-body px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="p-6">
                <p className="text-teal/30 font-body text-[10px] tracking-[0.2em] uppercase mb-3">
                  {post.num}
                </p>
                <h3 className="font-display font-semibold text-teal text-[0.95rem] leading-snug mb-3 group-hover:text-green-dark transition-colors duration-200">
                  {post.title}
                </h3>
                <p
                  className="text-ink/45 font-body text-xs leading-[1.7] mb-5"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-ink/35 font-body text-[10px] tracking-wide">
                    {post.author}
                  </span>
                  <span className="text-teal text-xs font-body group-hover:translate-x-1 transition-transform duration-200">
                    Leer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-10 flex justify-end" style={{ opacity: 0 }}>
          <Link
            href="/blog"
            className="text-teal/55 hover:text-teal font-body text-sm tracking-[0.12em] uppercase border-b border-teal/20 hover:border-teal/40 pb-px transition-all duration-200"
          >
            Ver todos los artículos →
          </Link>
        </div>
      </div>
    </section>
  );
}

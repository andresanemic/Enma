"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

// Counter animates from 0 to `value` once when element enters the viewport.
// Uses IntersectionObserver (one-shot) + GSAP tween on a plain object to avoid
// innerText reflow jank. tabular-nums prevents width jitter as digits change.
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  className,
}: AnimatedCounterProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const obj = { val: 0 };
    let tween: ReturnType<typeof gsap.to> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        tween = gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: value,
            duration,
            ease: "power2.out",
            onUpdate() {
              if (el) el.textContent = prefix + obj.val.toFixed(decimals) + suffix;
            },
            onComplete() {
              // Snap to exact final value — avoids floating-point display artifact
              if (el) el.textContent = prefix + value.toFixed(decimals) + suffix;
            },
          }
        );
      },
      { threshold: 0.1, rootMargin: "-50px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span
      ref={spanRef}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {prefix}0{suffix}
    </span>
  );
}

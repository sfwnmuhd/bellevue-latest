"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type CounterProps = {
  value: number;
  className?: string;
  /** Appended once the count finishes, matching the original "50+" display. */
  suffix?: string;
};

export default function Counter({
  value,
  className,
  suffix = "+",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    // Reset from the SSR'd final figure so the count starts from zero.
    el.textContent = "0";

    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(counter.n));
        },
        onComplete: () => {
          el.textContent = `${value}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  // Server-rendered fallback shows the final figure for no-JS and crawlers.
  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {value}
      {suffix}
    </span>
  );
}

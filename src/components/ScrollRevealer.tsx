"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single global reveal pass. Any element marked `data-reveal` fades and slides
 * into place the first time it enters the viewport.
 *
 *   data-reveal="up" | "fade" | "left" | "right"   (default: "up")
 *   data-reveal-delay="0.12"                        (seconds)
 *
 * Lives in the root layout so individual sections stay free of animation
 * wiring. That layout persists across navigation, so the pass is re-run per
 * route — otherwise a new page's `data-reveal` elements would never be
 * animated, and would sit at opacity 0 forever.
 */
export default function ScrollRevealer() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const direction = el.dataset.reveal || "up";
        const delay = parseFloat(el.dataset.revealDelay || "0");

        const from: gsap.TweenVars = { opacity: 0 };
        if (direction === "up") from.y = 40;
        if (direction === "left") from.x = -40;
        if (direction === "right") from.x = 40;

        gsap.fromTo(el, from, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
        });
      });
    });

    // Refresh ScrollTrigger as images and content load
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    // Fallback safety: ensure all elements become visible even if scroll trigger is missed
    const fallbackTimer = setTimeout(() => {
      targets.forEach((el) => {
        if (getComputedStyle(el).opacity === "0") {
          gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.5 });
        }
      });
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

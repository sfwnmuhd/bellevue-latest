"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollContextValue = {
  /** Scrolls to an element selector or absolute offset, routed through Lenis. */
  scrollTo: (target: string | number) => void;
};

const ScrollContext = createContext<ScrollContextValue>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let cancelled = false;

    // Refresh triggers once fonts settle, since text reflow shifts every start/end.
    const refreshAfterFonts = () => {
      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // No inertia, but ScrollTrigger still needs to run against native scroll.
      refreshAfterFonts();
      return () => {
        cancelled = true;
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger's cached positions in sync with Lenis' virtual scroll.
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    refreshAfterFonts();

    return () => {
      cancelled = true;
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    // The navbar is sticky and sits outside the flow, so measure the pill
    // itself — anchors have to clear it or the section lands underneath.
    const nav = document.querySelector<HTMLElement>("[data-navbar]");
    const offset = -((nav?.offsetHeight ?? 0) + 32);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset });
      return;
    }
    // Reduced-motion / Lenis-disabled fallback.
    if (typeof target === "number") {
      window.scrollTo({ top: target + offset });
      return;
    }
    const el = document.querySelector(target);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY + offset,
      });
    }
  }, []);

  // Lenis keeps its own scroll position, so a route change has to be handled
  // explicitly: land on the requested anchor, or reset to the top.
  useEffect(() => {
    const { hash } = window.location;

    const frame = requestAnimationFrame(() => {
      if (hash && document.querySelector(hash)) {
        scrollTo(hash);
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, scrollTo]);

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}

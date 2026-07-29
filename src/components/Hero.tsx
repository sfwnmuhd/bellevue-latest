"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides, site } from "@/lib/site";

const HOLD = 4; // seconds each slide stays fully visible
const FADE = 1.2;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-hero-layer]");

      // Opening copy reveal — clearProps ensures elements remain 100% visible without CSS collision.
      gsap.from("[data-hero-copy] > *", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.2,
        clearProps: "all",
      });

      if (prefersReducedMotion) return;

      // Crossfade slideshow with a slow push-in on the incoming frame.
      gsap.set(layers, { opacity: 0 });
      gsap.set(layers[0], { opacity: 1 });

      const tl = gsap.timeline({ repeat: -1 });
      layers.forEach((layer, i) => {
        const next = layers[(i + 1) % layers.length];
        tl.to(layer, { opacity: 0, duration: FADE, ease: "power2.inOut" }, `+=${HOLD}`)
          .to(next, { opacity: 1, duration: FADE, ease: "power2.inOut" }, "<")
          .fromTo(
            next,
            { scale: 1.1 },
            { scale: 1, duration: HOLD + FADE * 2, ease: "none" },
            "<",
          );
      });

      // Background drifts slower than the page for depth.
      gsap.to(stackRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full h-[420px] sm:h-[520px] lg:h-[85vh] lg:min-h-[620px] lg:max-h-[850px] overflow-hidden"
    >
      {/* Background Image Slideshow - Edge to Edge, No Rounded Corners */}
      <div className="absolute inset-0">
        <div ref={stackRef} className="absolute inset-0 scale-105">
          {heroSlides.map((src, i) => (
            <div key={src} data-hero-layer className="absolute inset-0">
              <Image
                src={src}
                alt="BelleVue Architectural & Interior Design"
                fill
                preload={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      {/* Hero Content Container - Aligned to standard page shell measure & padding */}
      <div
        ref={copyRef}
        className="shell relative flex h-full flex-col justify-end text-cream pb-4 sm:pb-8 lg:pb-10 gap-3 sm:gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        {/* Left Column: Heading */}
        <div data-hero-copy className="lg:max-w-[55%]">
          <h1 className="text-[1.35rem] font-bold leading-[1.18] text-white sm:text-3xl lg:text-[3rem] xl:text-[3.5rem]">
            Bringing <span className="text-[#e4c8aa]">Luxury Aesthetics</span>
            <br className="hidden sm:block" /> in Architectural and Interior Designs
          </h1>
        </div>

        {/* Right Column: Subheading and CTA Button */}
        <div
          data-hero-copy
          className="flex flex-col items-start gap-2 sm:gap-3.5 lg:max-w-[380px] shrink-0"
        >
          <p className="text-[13px] sm:text-sm lg:text-base leading-snug sm:leading-relaxed text-cream/90">
            Bellevue simplifies the construction and completion of luxurious residential and commercial projects in India.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2 sm:px-6 sm:py-3 text-center text-xs sm:text-sm font-semibold text-white shadow-lg transition-[background-color,transform,box-shadow] duration-300 hover:bg-brand-dark hover:scale-[1.02] shrink-0"
          >
            Start Your Journey
          </a>
        </div>
      </div>
    </section>
  );
}

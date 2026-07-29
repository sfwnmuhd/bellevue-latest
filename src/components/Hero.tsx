"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroSlides, site } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

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
      className="relative w-full min-h-[480px] h-[80vh] sm:h-[560px] lg:h-[85vh] lg:min-h-[640px] lg:max-h-[850px] overflow-hidden"
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
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Hero Content Container - Aligned to standard page shell measure & padding */}
      <div
        ref={copyRef}
        className="shell relative flex h-full flex-col justify-end text-cream pb-6 sm:pb-10 lg:pb-14 gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
      >
        {/* Left Column: Heading */}
        <div data-hero-copy className="lg:max-w-[58%]">
          <h1 className="text-2xl font-bold leading-[1.16] text-white min-[480px]:text-3xl sm:text-4xl lg:text-[3.2rem] xl:text-[3.6rem]">
            Bringing <span className="text-[#e4c8aa]">Luxury Aesthetics</span>
            <br className="hidden sm:block" /> in Architectural and Interior Designs
          </h1>
        </div>

        {/* Right Column: Subheading and CTA Button */}
        <div
          data-hero-copy
          className="flex flex-col items-start gap-3 sm:gap-4 lg:max-w-[380px] shrink-0"
        >
          <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-cream/90 font-light">
            Bellevue simplifies the construction and completion of luxurious residential and commercial projects in India.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:bg-brand-dark hover:-translate-y-1 hover:shadow-[0_15px_30px_-5px_rgba(166,115,76,0.5)] shrink-0"
          >
            <span>Start Your Journey</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

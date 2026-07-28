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

      // Opening copy reveal.
      gsap.from("[data-hero-copy] > *", {
        y: 34,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        delay: 0.25,
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

      // Copy lifts and fades as the hero leaves.
      gsap.to(copyRef.current, {
        y: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Deliberately wider than both the navbar and the content shell — the
    // navbar pill floats over its top edge, as on compatto.
    <section
      ref={sectionRef}
      id="top"
      className="mx-auto w-full sm:mt-14 sm:w-[95%] sm:max-w-[1840px]"
    >
      {/* Heights mirror compatto: 450 / 500 / 800px. Full-bleed and square on
          mobile, a deeply rounded card from `sm` up. */}
      <div className="relative h-[450px] overflow-hidden sm:h-[500px] sm:rounded-hero lg:h-[800px]">
        <div ref={stackRef} className="absolute inset-0 scale-110">
          {heroSlides.map((src, i) => (
            <div key={src} data-hero-layer className="absolute inset-0">
              <Image
                src={src}
                alt=""
                fill
                preload={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Legibility scrim — deeper at the bottom where the copy sits. */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

        <div
          ref={copyRef}
          className="relative flex h-full w-full flex-col justify-end gap-6 p-6 text-cream sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:p-14"
        >
          <div data-hero-copy className="lg:max-w-[58%]">
            <h1 className="text-[1.75rem] font-bold leading-[1.15] sm:text-4xl lg:text-[3.25rem] xl:text-[3.75rem]">
              Bringing <span className="text-[#e4c8aa]">Luxury Aesthetics</span>
              <br className="hidden sm:block" /> in Architectural and Interior
              Designs
            </h1>
          </div>

          <div
            data-hero-copy
            className="flex flex-col items-start gap-4 lg:max-w-[400px]"
          >
            <p className="text-base leading-relaxed sm:text-[1.1rem]">
              Bellevue simplifies the construction and completion of luxurious
              residential and commercial projects in India.
            </p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-[250px] rounded-[10px] border border-cream bg-cream px-5 py-3 text-center font-semibold text-espresso transition-colors duration-300 hover:bg-transparent hover:text-cream"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

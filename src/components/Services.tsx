"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site";
import { ArrowRight } from "lucide-react";

/** Vertical offset added per card so the pinned stack shows a stepped edge. */
const STEP_OFFSET = 14;

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

      // Each card settles back and dims while the following one rides up over
      // it, so the stack reads as depth rather than a flat overlap.
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;

        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="our-services" className="shell py-20 lg:py-32">
      <h2
        data-reveal="up"
        className="mx-auto mb-14 max-w-[820px] text-center text-3xl font-light text-ink sm:text-4xl lg:mb-20 lg:text-[3rem]"
      >
        How We <span className="font-normal text-brand-light">Simplify</span> Your Building Experience
      </h2>

      {/* Trailing space lets the final card rest at the pin point before the
          next section pushes the whole stack away. */}
      <ol className="flex flex-col gap-6 pb-[15vh]">
        {processSteps.map((step, i) => {
          // Rows alternate sides on desktop; on mobile the image always leads.
          const flipped = i % 2 === 1;

          return (
            <li
              key={step.title}
              className="sticky"
              style={{ top: `calc(var(--stack-top) + ${i * STEP_OFFSET}px)` }}
            >
              <article
                data-stack-card
                className="group grid origin-top overflow-hidden rounded-[28px] border border-stone-300/40 bg-sand shadow-[0_25px_60px_-20px_rgba(62,45,32,0.35)] transition-shadow duration-500 lg:grid-cols-2"
              >
                <div
                  className={`relative h-[220px] sm:h-[280px] lg:h-[440px] overflow-hidden ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center p-6 sm:p-10 lg:p-14 ${
                    flipped ? "lg:order-1" : ""
                  }`}
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-lg font-semibold tabular-nums text-brand-dark shadow-sm sm:h-12 sm:w-12 sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mb-3 text-xl font-medium text-ink sm:text-2xl lg:text-[1.75rem]">
                    {step.title}
                  </h3>

                  <p className="max-w-[520px] text-sm leading-relaxed text-ink-soft sm:text-base font-light">
                    {step.body}
                  </p>

                  <Link
                    href={`/services#${step.slug}`}
                    className="group/link mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-cream/70 px-4 py-2 text-sm font-semibold text-brand-dark shadow-sm transition-all duration-300 hover:bg-white hover:text-brand hover:shadow-md hover:-translate-y-0.5"
                  >
                    <span>Learn details</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

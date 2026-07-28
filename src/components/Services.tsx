"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/site";

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
    <section ref={rootRef} id="our-services" className="shell py-14 lg:py-[60px]">
      <h2
        data-reveal="up"
        className="mx-auto mb-12 max-w-[820px] text-center text-2xl text-ink sm:text-[2.2rem] lg:mb-16 lg:text-[2.5rem]"
      >
        How We <span className="text-brand-light">Simplify</span> Your Building
        Experience
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
                className="group grid origin-top overflow-hidden rounded-card bg-sand shadow-[0_18px_50px_-30px_rgba(62,45,32,0.55)] lg:grid-cols-2"
              >
                <div
                  className={`relative h-[200px] sm:h-[260px] lg:h-[420px] ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>

                <div
                  className={`flex flex-col justify-center p-6 sm:p-10 lg:p-14 ${
                    flipped ? "lg:order-1" : ""
                  }`}
                >
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream text-lg font-semibold tabular-nums text-brand-dark sm:h-12 sm:w-12 sm:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mb-3 text-xl text-ink sm:text-2xl lg:text-[1.75rem]">
                    {step.title}
                  </h3>

                  <p className="max-w-[520px] text-sm leading-relaxed text-ink-soft sm:text-base">
                    {step.body}
                  </p>

                  <Link
                    href={`/services#${step.slug}`}
                    className="group/link mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-dark transition-colors duration-300 hover:text-brand"
                  >
                    Learn more
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    >
                      →
                    </span>
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

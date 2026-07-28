"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PHRASE = "Where Imagination Meets Reality.";
const REPEATS = 4;

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // The track holds the phrase list twice, so -50% lands on an identical frame.
      const loop = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
      });

      // Scrolling speeds the marquee up and flips it to match scroll direction.
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const boost = gsap.utils.clamp(-6, 6, velocity / 260);
          gsap.to(loop, {
            timeScale: boost === 0 ? 1 : Math.sign(boost) * Math.max(1, Math.abs(boost)),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      // Settle back to the idle drift when scrolling stops.
      let idle: ReturnType<typeof setTimeout>;
      const onScroll = () => {
        clearTimeout(idle);
        idle = setTimeout(() => {
          gsap.to(loop, { timeScale: 1, duration: 0.8, overwrite: true });
        }, 200);
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        clearTimeout(idle);
        window.removeEventListener("scroll", onScroll);
        trigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden bg-cream py-8 lg:py-10"
      aria-hidden
    >
      <div ref={trackRef} className="flex w-max items-center flex-nowrap">
        {Array.from({ length: REPEATS * 2 }).map((_, i) => (
          <div
            key={i}
            className="mr-10 flex items-center gap-4 whitespace-nowrap text-[2rem] text-sand-deep opacity-60 sm:mr-16 sm:gap-6 sm:text-[3rem] lg:mr-[100px] lg:gap-8 lg:text-[4rem]"
          >
            <Image
              src="/images/000.png"
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 object-contain brightness-0 opacity-70 sm:h-12 sm:w-12 lg:h-16 lg:w-16"
            />
            <span>{PHRASE}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

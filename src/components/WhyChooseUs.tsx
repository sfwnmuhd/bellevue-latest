import Image from "next/image";
import { chooseCards } from "@/lib/site";
import {
  Layers,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Compass,
} from "lucide-react";

/** Shared glassmorphic styling base for Bento Grid tiles */
const CARD_BASE =
  "group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-stone-300/50 bg-white/40 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:border-brand-light/60 hover:bg-white/75 hover:shadow-[0_30px_60px_-15px_rgba(62,45,32,0.12)] shadow-[0_16px_45px_rgba(0,0,0,0.05)]";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-transparent py-20 sm:py-28 lg:py-32">
      {/* Subtle ambient lighting accents for depth on transparent bg */}
      <div className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-light/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 -z-10 h-64 w-64 rounded-full bg-sand-deep/20 blur-[80px] sm:h-80 sm:w-80 sm:blur-[100px]" />

      <div className="shell">
        <div className="mb-10 text-center sm:mb-14 lg:mb-16" data-reveal="up">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-dark">
            <Sparkles className="h-3.5 w-3.5 text-brand" />
            The BelleVue Advantage
          </span>
          <h2 className="text-3xl font-light text-ink sm:text-4xl lg:text-[3.2rem] lg:leading-tight">
            Why <span className="font-normal text-brand-light">Choose</span> BelleVue
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-ink-soft sm:text-base font-light">
            Delivering architectural excellence through seamless execution, uncompromised quality, and total creative freedom.
          </p>
        </div>

        {/* Asymmetrical 3-Column Desktop Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[35fr_35fr_30fr] lg:grid-rows-[minmax(250px,auto)_minmax(280px,auto)] lg:gap-6">
          {chooseCards.map((card, i) => {
            const reveal = {
              "data-reveal": "up",
              "data-reveal-delay": `${i * 0.08}`,
            } as const;

            // Tile 3: Superior Quality (Wide Image Card - Row 2, Col 1-2)
            if (card.variant === "image") {
              return (
                <div
                  key={card.title}
                  {...reveal}
                  className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] border border-stone-300/40 p-6 sm:p-8 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_35px_70px_rgba(0,0,0,0.3)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                    card.span ?? "sm:col-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-2"
                  } lg:min-h-[280px]`}
                >
                  <Image
                    src={card.image!}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-[50%_60%] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

                  {/* Floating Badge */}
                  <div className="relative self-start">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      <Award className="h-4 w-4 text-brand-light" />
                      <span>Uncompromised Standard</span>
                    </div>
                  </div>

                  <div className="relative mt-8 text-white sm:mt-0">
                    <h3 className="mb-2 text-xl font-medium sm:mb-2.5 sm:text-2xl lg:text-[1.75rem]">
                      {card.title}
                    </h3>
                    <p className="max-w-[540px] text-xs leading-relaxed text-white/90 sm:text-sm font-light">
                      {card.body}
                    </p>
                  </div>
                </div>
              );
            }

            // Tile 4: Dark Luxury Bento Card (Tall Column 3 - Spans Rows 1 & 2)
            if (card.variant === "dark") {
              return (
                <div
                  key={card.title}
                  {...reveal}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-espresso via-brand-dark to-brand-deeper p-6 sm:p-8 text-white shadow-[0_25px_60px_rgba(62,45,32,0.35)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:shadow-[0_35px_75px_rgba(62,45,32,0.45)] ${
                    card.span ?? "sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2"
                  } min-h-[320px] lg:pb-9 lg:pt-9`}
                >
                  {/* Decorative background glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-light/20 blur-2xl transition-all duration-500 group-hover:bg-brand-light/35" />

                  <div>
                    <div className="mb-5 flex items-center justify-between sm:mb-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-md">
                        <Compass className="h-5.5 w-5.5" />
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide uppercase text-white/80 backdrop-blur-md">
                        Vendor Agnostic
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-medium sm:mb-3 sm:text-2xl">{card.title}</h3>
                    <p className="text-xs leading-relaxed text-white/85 sm:text-sm font-light">
                      {card.body}
                    </p>
                  </div>

                  {card.secondary && (
                    <div className="relative mt-6 border-t border-white/15 pt-5 sm:mt-8 sm:pt-6">
                      <h4 className="mb-1.5 text-base font-medium text-white sm:mb-2 sm:text-lg">
                        {card.secondary.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-white/80 sm:text-sm font-light">
                        {card.secondary.body}
                      </p>

                      <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 px-2.5 py-1 rounded-md text-white/90">
                          <CheckCircle2 className="h-3 w-3 text-brand-light" />
                          Custom Joinery
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] bg-white/10 px-2.5 py-1 rounded-md text-white/90">
                          <CheckCircle2 className="h-3 w-3 text-brand-light" />
                          Global Sourcing
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Light Bento Tiles (Tile 1: End-to-End Solutions, Tile 2: After-Sales Support)
            const isAfterSales = card.title.toLowerCase().includes("after-sales");

            return (
              <div
                key={card.title}
                {...reveal}
                className={`${CARD_BASE} ${card.span ?? ""} min-h-[220px] sm:min-h-[240px]`}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between sm:mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      {isAfterSales ? (
                        <ShieldCheck className="h-5.5 w-5.5" />
                      ) : (
                        <Layers className="h-5.5 w-5.5" />
                      )}
                    </div>

                    <span className="rounded-full bg-sand-deep/40 px-3 py-1 text-[11px] font-medium tracking-wide uppercase text-ink-soft">
                      {isAfterSales ? "Warranty & Care" : "Full-Cycle"}
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-medium text-ink sm:mb-2.5 sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-soft sm:text-sm font-light">
                    {card.body}
                  </p>
                </div>

                {/* Card-specific bottom details */}
                {isAfterSales ? (
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-stone-200/50 pt-3.5 sm:mt-6 sm:pt-4">
                    {["30 Day", "60 Day", "90 Day"].map((milestone) => (
                      <span
                        key={milestone}
                        className="inline-flex items-center gap-1 rounded-lg bg-sand/80 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                      >
                        <CheckCircle2 className="h-3 w-3 text-brand" />
                        {milestone}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="relative mt-4 pt-2 sm:mt-6">
                    <Image
                      src="/images/000.png"
                      alt=""
                      aria-hidden
                      width={120}
                      height={120}
                      className="pointer-events-none absolute -bottom-6 -right-4 h-20 w-20 object-contain opacity-20 transition-opacity duration-300 group-hover:opacity-30 sm:h-24 sm:w-24"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { chooseCards } from "@/lib/site";

/** Shared by every tile so the bento keeps one corner radius and lift. */
const CARD_BASE =
  "group relative flex flex-col overflow-hidden rounded-card transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-cream-soft py-14 lg:py-[60px]">
      <div className="shell">
        <h2
          data-reveal="up"
          className="mb-8 text-2xl text-ink sm:text-[2.2rem] lg:mb-12 lg:text-[3rem]"
        >
          Why <span className="text-brand-light">Choose</span> BelleVue
        </h2>

        {/* Columns run ~35/35/30 and both rows are pinned, so the two light
            tiles, the image tile and the full-height column all line up. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[35fr_35fr_30fr] lg:grid-rows-[minmax(256px,auto)_minmax(284px,auto)] lg:gap-[18px]">
          {chooseCards.map((card, i) => {
            const reveal = {
              "data-reveal": "up",
              "data-reveal-delay": `${i * 0.08}`,
            } as const;

            if (card.variant === "image") {
              return (
                <div
                  key={card.title}
                  {...reveal}
                  className={`${CARD_BASE} ${card.span ?? ""} min-h-[240px] justify-end`}
                >
                  <Image
                    src={card.image!}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 1000px"
                    className="object-cover object-[50%_60%] transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/25" />
                  <div className="relative px-6 pb-8 text-center text-white sm:px-10 sm:pb-10">
                    <h3 className="mb-2.5 text-xl sm:text-2xl lg:text-[1.75rem]">
                      {card.title}
                    </h3>
                    <p className="mx-auto max-w-[560px] text-[13px] leading-relaxed sm:text-[15px]">
                      {card.body}
                    </p>
                  </div>
                </div>
              );
            }

            if (card.variant === "dark") {
              return (
                <div
                  key={card.title}
                  {...reveal}
                  className={`${CARD_BASE} ${card.span ?? ""} min-h-[320px] justify-between bg-[radial-gradient(circle_at_top,var(--color-brand-dark),var(--color-brand-deeper)_70%)] p-6 text-white sm:p-8 lg:pb-10 lg:pt-14`}
                >
                  <div className="text-center">
                    <h3 className="mb-3 text-xl sm:text-2xl">{card.title}</h3>
                    <p className="text-[13px] leading-relaxed text-white/85 sm:text-[15px]">
                      {card.body}
                    </p>
                  </div>

                  {card.secondary && (
                    <div className="mt-10 text-left">
                      <h3 className="mb-2.5 text-lg sm:text-xl">
                        {card.secondary.title}
                      </h3>
                      <p className="text-[13px] leading-relaxed text-white/85 sm:text-[15px]">
                        {card.secondary.body}
                      </p>
                    </div>
                  )}
                </div>
              );
            }

            // Light tiles: one leads with copy over a clipped brand mark, the
            // other sits beneath a soft orb.
            const leadsWithMotif = card.motif === "orb";

            return (
              <div
                key={card.title}
                {...reveal}
                className={`${CARD_BASE} ${card.span ?? ""} min-h-[220px] bg-sand p-6 text-center sm:p-8 ${leadsWithMotif ? "justify-end" : "justify-start"
                  }`}
              >
                {card.motif === "orb" && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-14 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-espresso),transparent_65%)] opacity-45 blur-2xl"
                  />
                )}

                <div className="relative">
                  <h3 className="mb-2.5 text-lg text-ink sm:text-xl">
                    {card.title}
                  </h3>
                  <p className="mx-auto max-w-[380px] text-[13px] leading-relaxed text-ink-soft sm:text-[15px]">
                    {card.body}
                  </p>
                </div>

                {card.motif === "mark" && (
                  <Image
                    src="/images/000.png"
                    alt=""
                    aria-hidden
                    width={160}
                    height={160}
                    className="pointer-events-none absolute -bottom-10 left-1/2 h-36 w-36 -translate-x-1/2 object-contain opacity-90"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

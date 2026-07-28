import Image from "next/image";
import Counter from "./Counter";
import { stats } from "@/lib/site";

export default function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="shell flex flex-wrap items-stretch justify-center gap-5 py-10 sm:gap-[30px] sm:py-12 lg:flex-nowrap lg:py-[50px]"
    >
      {/* Stats */}
      <div
        data-reveal="left"
        className="flex w-full flex-col rounded-card bg-gradient-to-br from-brand-light to-brand-dark p-6 text-white shadow-[0_18px_40px_-24px_rgba(92,68,48,0.6)] sm:p-7 lg:w-[450px] lg:shrink-0"
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase leading-relaxed tracking-[0.14em] opacity-80">
            Our Company
            <br />
            In Numbers
          </p>
          <Image
            src="/images/000.png"
            alt=""
            width={80}
            height={80}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20"
          />
        </div>

        {/* Stacked when the card is narrow (mobile and the final 450px column),
            side by side while it stretches full width on tablets. */}
        <div className="mt-8 flex flex-1 flex-col justify-end gap-6 sm:mt-10 sm:flex-row sm:items-end sm:gap-10 lg:flex-col lg:items-stretch lg:gap-6">
          <div>
            <Counter
              value={stats[0].value}
              className="block text-[2.25rem] font-semibold leading-none tabular-nums sm:text-5xl"
            />
            <p className="mt-1.5 text-sm opacity-90">{stats[0].label}</p>
          </div>

          <div className="h-px w-full bg-white/25 sm:h-14 sm:w-px lg:h-px lg:w-full" />

          <div>
            <Counter
              value={stats[1].value}
              className="block text-2xl font-semibold leading-none tabular-nums sm:text-[28px]"
            />
            <p className="mt-1.5 text-sm opacity-90">{stats[1].label}</p>
          </div>
        </div>
      </div>

      {/* Copy + image */}
      <div
        data-reveal="right"
        data-reveal-delay="0.1"
        className="flex w-full flex-col overflow-hidden rounded-card bg-sand lg:max-w-[900px] lg:flex-row lg:gap-[30px]"
      >
        <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
          <h2 className="mb-5 text-2xl text-[#2f2f2f] sm:text-[28px]">
            <span className="font-bold text-brand-dark">Who</span> We Are
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            At Bellevue, we craft timeless spaces that seamlessly blend design,
            innovation, and purpose.
          </p>
          <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
            As a leading architectural and interior design studio, our passion
            lies in transforming visions into elegant, functional realities.
            From concept to completion, we deliver personalized design solutions
            that reflect both aesthetic excellence and everyday livability.
          </p>
        </div>

        <div className="relative hidden min-h-[300px] flex-1 lg:block">
          <Image
            src="/images/who-we-are.jpg"
            alt="The BelleVue team reviewing design drawings"
            fill
            sizes="(max-width: 1024px) 100vw, 450px"
            className="rounded-card object-cover"
          />
        </div>
      </div>
    </section>
  );
}

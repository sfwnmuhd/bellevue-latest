import Image from "next/image";
import Counter from "./Counter";
import { stats } from "@/lib/site";

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 sm:py-28 lg:py-32 bg-cream-soft/40 overflow-hidden">
      <div className="shell flex flex-col gap-12 sm:gap-16">
        {/* Section Header: Eyebrow + Title + Paragraph */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div data-reveal="up" className="max-w-2xl flex flex-col gap-3.5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span>About BelleVue</span>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-ink sm:text-4xl lg:text-5xl leading-[1.15]">
              Transforming Architectural Visions into <span className="font-normal text-brand-light">Timeless Realities</span>
            </h2>
          </div>
          <p data-reveal="up" data-reveal-delay="0.1" className="max-w-md text-sm sm:text-base leading-relaxed text-ink-soft font-light">
            At Bellevue, we blend luxury aesthetics, structural innovation, and functional purpose to create extraordinary residential and commercial environments.
          </p>
        </div>

        {/* Asymmetrical 3-Column Architectural Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Brand Story & Values Card (5 cols) */}
          <div
            data-reveal="left"
            className="lg:col-span-5 flex flex-col justify-between rounded-[32px] bg-espresso text-cream p-8 sm:p-10 shadow-[0_25px_60px_rgba(62,45,32,0.25)] relative overflow-hidden group border border-white/10"
          >
            {/* Background subtle geometric accent */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-brand/15 blur-3xl group-hover:bg-brand/25 transition-all duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="inline-block">
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-cream/90 text-xs font-medium tracking-wide border border-white/10">
                  EST. 2022 • INDIA
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium leading-snug text-white">
                From Vision to Reality, Without Compromise.
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-cream/80 font-light">
                We combine timeless aesthetics,meticulous planning, and flawless execution to create spaces that are as enduring as they are extraordinary
              </p>
            </div>

            {/* Key feature pills */}
            <div className="relative z-10 flex flex-wrap gap-x-5 gap-y-2.5 pt-6 mt-6 border-t border-white/10 text-xs font-medium text-cream/90">
              <div className="flex items-center gap-2">
                <span className="text-brand-light">✦</span> Turnkey solution
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-light">✦</span> Zero Restraints
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-light">✦</span> Bespoke Designs
              </div>
              <div className="flex items-center gap-2">
                <span className="text-brand-light">✦</span> 1 year of free Service
              </div>
            </div>
          </div>

          {/* Column 2: Architectural Feature Image (4 cols) */}
          <div
            data-reveal="up"
            data-reveal-delay="0.1"
            className="lg:col-span-4 min-h-[360px] lg:min-h-full relative rounded-[32px] overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-stone-200/60"
          >
            <Image
              src="/images/who-we-are.jpg"
              alt="BelleVue Architectural Team at Work"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white">
              <p className="text-xs uppercase tracking-widest text-brand-light font-semibold">Studio Focus</p>
              <p className="text-sm font-medium mt-0.5 text-white/90">Precision Joinery & Modern Spaces</p>
            </div>
          </div>

          {/* Column 3: Live Stats & Metrics Stack (3 cols) */}
          <div
            data-reveal="right"
            data-reveal-delay="0.2"
            className="lg:col-span-3 flex flex-col min-[480px]:flex-row lg:flex-col gap-4 sm:gap-5 justify-between"
          >
            {/* Stat Box 1 */}
            <div className="flex-1 flex flex-col justify-between rounded-[28px] bg-sand/90 border border-brand/10 p-6 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-wider text-brand-dark">Track Record</span>
                <span className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">✓</span>
              </div>
              <div className="mt-6">
                <Counter
                  value={stats[0].value}
                  className="block text-4xl sm:text-5xl font-bold tracking-tight text-espresso"
                />
                <p className="mt-2 text-sm font-medium text-ink-soft">{stats[0].label}</p>
              </div>
            </div>

            {/* Stat Box 2 */}
            <div className="flex-1 flex flex-col justify-between rounded-[28px] bg-gradient-to-br from-brand to-brand-dark text-white p-6 sm:p-7 shadow-[0_16px_40px_rgba(166,115,76,0.25)] hover:shadow-[0_20px_50px_rgba(166,115,76,0.35)] transition-all hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold tracking-wider text-white/80">Experience</span>
                <Image
                  src="/images/000.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-8 w-8 object-contain opacity-90 brightness-200"
                />
              </div>
              <div className="mt-6">
                <Counter
                  value={stats[1].value}
                  className="block text-4xl sm:text-5xl font-bold tracking-tight text-white"
                />
                <p className="mt-2 text-sm font-medium text-white/90">{stats[1].label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

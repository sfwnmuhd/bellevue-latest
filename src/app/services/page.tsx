import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import CallToAction from "@/components/CallToAction";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services — BelleVue",
  description:
    "How BelleVue takes a project from first conversation to handover: understanding your vision, site study, design proposal, execution, and after-sales support.",
};

export default function ServicesPage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="shell pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16">
        {/* Breadcrumb pill */}
        <div className="mb-6 inline-flex items-center rounded-full border border-[#e5ded4] bg-[#fdfbf7] px-3.5 py-1 text-xs text-[#736557]">
          <span>Home</span>
          <span className="mx-1.5 opacity-40">/</span>
          <span className="font-medium text-[#222]">Our Services</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-normal leading-tight text-[#222222] sm:text-4xl lg:text-[2.75rem]">
              Transforming Spaces with{" "}
              <span className="font-semibold text-[#a6734c]">Elegance</span> &amp;{" "}
              <span className="font-semibold text-[#a6734c]">Functionality</span>
            </h1>
          </div>
          <div className="lg:col-span-6 lg:pt-1">
            <p className="text-sm leading-relaxed text-[#5c5248] sm:text-base">
              BelleVue provides comprehensive, end-to-end architectural and interior design
              services for residential and commercial projects across India. From initial vision
              and site analysis to transparent proposals, meticulous execution, and dedicated
              after-sales care, we make your journey seamless.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Process Stages (Alternating Warm Cards) */}
      <section className="shell mb-16 space-y-12 lg:mb-24 lg:space-y-16">
        {processSteps.map((step, i) => {
          const flipped = i % 2 === 1;

          return (
            <div
              key={step.slug}
              id={step.slug}
              className="scroll-mt-[120px] overflow-hidden rounded-3xl border border-[#efebe2] bg-[#fdfbf7] p-6 shadow-sm sm:p-10 lg:p-12"
            >
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                {/* Image Box */}
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#efebe2] lg:col-span-5 ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Content Box */}
                <div
                  className={`flex flex-col justify-center lg:col-span-7 ${
                    flipped ? "lg:order-1" : ""
                  }`}
                >
                  {/* Step Pill Badge */}
                  <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#f4ece1] px-4 py-1.5 text-xs font-semibold text-[#4a3a2c]">
                    <span className="h-2 w-2 rounded-full bg-[#a6734c]" />
                    <span>Stage {String(i + 1).padStart(2, "0")}</span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-4 text-2xl font-light text-[#222222] sm:text-3xl lg:text-[2.25rem]">
                    {step.title}
                  </h2>

                  {/* Description Paragraphs */}
                  <div className="space-y-3 text-xs leading-relaxed text-[#5c5248] sm:text-sm lg:text-[15px]">
                    {step.detail.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Callout Quote Box */}
                  <div className="mt-6 border-l-2 border-[#a6734c] pl-4 py-1 text-xs italic text-[#5c4a3a] sm:text-sm">
                    &ldquo;{step.body}&rdquo;
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Dark Bronze Commitment Feature Banner */}
      <section className="shell mb-16 lg:mb-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
          {/* Left Dark Box */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#3e2d20] p-8 text-white sm:p-10 lg:col-span-6 lg:p-12">
            <div>
              <h2 className="mb-4 text-2xl font-light text-white sm:text-3xl lg:text-4xl">
                Our <span className="font-medium text-[#d9c3b0]">Commitment</span>
              </h2>
              <h3 className="mb-6 text-base font-normal leading-snug text-[#e5ded4] sm:text-lg lg:text-xl">
                Guaranteed Quality, Transparent Costing &amp; Single-Point Supervision
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#c7bcae] sm:text-sm lg:text-[15px]">
              We manage every phase under one roof—ensuring your budget, timeline, and architectural
              standards are held without compromise. From first consultation to 30/60/90 day post-handover
              walkthroughs, BelleVue stands by your space.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative aspect-[4/3] w-full min-h-[300px] overflow-hidden rounded-3xl lg:col-span-6 lg:min-h-[400px]">
            <Image
              src="/images/bespoke-designs.jpg"
              alt="BelleVue bespoke architectural design"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Scrolling Marquee & CTA */}
      <Marquee />
      <CallToAction />
    </>
  );
}

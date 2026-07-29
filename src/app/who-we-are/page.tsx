import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import CallToAction from "@/components/CallToAction";
import ValuesCarousel from "@/components/ValuesCarousel";
import { differences, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "Who We Are — BelleVue",
  description:
    "BelleVue is an architectural and interior design studio crafting timeless residential and commercial spaces.",
};

export default function WhoWeArePage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="shell pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16">
        {/* Breadcrumb pill */}
        <div className="mb-6 inline-flex items-center rounded-full border border-[#e5ded4] bg-[#fdfbf7] px-3.5 py-1 text-xs text-[#736557]">
          <span>Home</span>
          <span className="mx-1.5 opacity-40">/</span>
          <span className="font-medium text-[#222]">About BelleVue</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-6">
            <h1 className="text-3xl font-normal leading-tight text-[#222222] sm:text-4xl lg:text-[2.75rem]">
              Your <span className="font-semibold text-[#a6734c]">Partner</span>{" "}
              in Crafting Extraordinary Spaces
            </h1>
          </div>
          <div className="lg:col-span-6 lg:pt-1">
            <p className="text-sm leading-relaxed text-[#5c5248] sm:text-base">
              In the world of contract furnishings and architectural design, BelleVue
              aims to stand out by simplifying the intricate process of furnishing
              high-end spaces across India and beyond. From picturesque coastal retreats
              to bustling metropolises, our tailored services cater to discerning clients
              seeking uncompromising quality and style.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Meet our Founder */}
      <section className="shell mb-16 lg:mb-24">
        <div className="overflow-hidden rounded-3xl bg-[#fdfbf7] border border-[#efebe2] p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Portrait Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#efebe2] lg:col-span-5">
              <Image
                src="/images/founder.png"
                alt="Panos - Founder of BelleVue"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            {/* Right Biography & Quote */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <h2 className="mb-4 text-2xl font-light text-[#222222] sm:text-3xl lg:text-[2.25rem]">
                Meet <span className="font-semibold text-[#a6734c]">our Founder</span>
              </h2>

              <div className="space-y-4 text-xs leading-relaxed text-[#5c5248] sm:text-sm lg:text-[15px]">
                <p>
                  Ajaaz, the visionary founder of BelleVue, has been immersed in the world
                  of architecture and interior design since childhood. Growing up around the
                  field, he gained invaluable hands-on experience and a deep understanding of the
                  industry&apos;s challenges and opportunities.
                </p>
                <p>
                  Through his work, Ajaaz identified a significant gap in the market – a lack of transparency,
                  organization, flexibility, and genuine commitment to customer satisfaction. Driven by a desire to
                  bridge this gap and redefine the industry&apos;s standards, he set out to create a company that
                  would prioritize functional designs, exceptional craftsmanship, and customer-centric solutions.
                </p>
              </div>

              {/* Quote Block */}
              <div className="mt-6 border-t border-[#e8e0d5] pt-6 sm:mt-8">
                <div className="mb-2 text-4xl leading-none text-[#a6734c] font-serif">“</div>
                <blockquote className="text-sm font-medium leading-relaxed text-[#2b231d] sm:text-base">
                  BelleVue&apos;s story began with a bold vision – to redefine the furniture and architectural
                  design industry through uncompromised craftsmanship.
                </blockquote>

                {/* Author Pill */}
                <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-2xl bg-[#f4ece1] px-4 py-2 text-xs font-medium text-[#4a3a2c] sm:rounded-full">
                  <span className="h-2 w-2 rounded-full bg-[#a6734c]" />
                  <span>Ajaaz C A</span>
                  <span className="opacity-40">•</span>
                  <span className="text-[#6b5a4b] font-normal">Founder of BelleVue</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Values We Abide By */}
      <section className="shell mb-16 lg:mb-24">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-light text-[#222222] sm:text-3xl lg:text-[2.25rem]">
            <span className="font-semibold text-[#a6734c]">Values</span> We Abide By
          </h2>
        </div>

        <ValuesCarousel items={values} />
      </section>

      {/* 4. Our Mission Split Banner */}
      <section className="shell mb-16 lg:mb-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 lg:items-stretch">
          {/* Left Dark Box */}
          <div className="flex flex-col justify-between rounded-3xl bg-[#3e2d20] p-8 text-white sm:p-10 lg:col-span-6 lg:p-12">
            <div>
              <h2 className="mb-4 text-2xl font-light text-white sm:text-3xl lg:text-4xl">
                Our <span className="font-medium text-[#d9c3b0]">Mission</span>
              </h2>
              <h3 className="mb-6 text-base font-normal leading-snug text-[#e5ded4] sm:text-lg lg:text-xl">
                Simplifying The Complex Process Of Furnishing High-End Hotels & Luxury Residences
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-[#c7bcae] sm:text-sm lg:text-[15px]">
              By streamlining the complex process of furnishing high-end spaces, we ensure that our clients
              can focus on their vision while we handle every detail. Our end-to-end solutions, tailored to
              individual needs and preferences, are the foundation upon which our company is built.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative aspect-[4/3] w-full min-h-[300px] overflow-hidden rounded-3xl lg:col-span-6 lg:min-h-[400px]">
            <Image
              src="/images/mission-lounge.png"
              alt="Luxurious lounge interior"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. The BelleVue Difference */}
      <section className="shell mb-16 lg:mb-24">
        <div className="mb-10 text-center sm:mb-12">
          {/* Decorative watermark / motif icon */}
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ece1] text-[#a6734c]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <h2 className="text-2xl font-light text-[#222222] sm:text-3xl lg:text-[2.25rem]">
            The BelleVue <span className="font-semibold text-[#a6734c]">Difference</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[640px] text-xs text-[#6b5a4b] sm:text-sm">
            In an industry where quality and service often come at a premium, we aim to distinguish ourselves through our unique approach
          </p>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid gap-4 min-[480px]:grid-cols-2 sm:gap-5 lg:gap-6">
          {differences.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-[#f4f0e8] p-6 sm:p-8 transition-transform hover:-translate-y-0.5"
            >
              <h3 className="mb-3 text-lg font-semibold text-[#2b231d] sm:text-xl">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#5c5248] sm:text-sm">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Scrolling Marquee & CTA */}
      <Marquee />
      <CallToAction />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import CallToAction from "@/components/CallToAction";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Projects — BelleVue",
  description:
    "Explore extraordinary spaces crafted by BelleVue across high-end hotels, luxury resorts, and private residences.",
};

export default function OurProjectsPage() {
  return (
    <>
      {/* 1. Hero Header */}
      <section className="shell pt-28 pb-10 text-center sm:pt-32 lg:pt-36 lg:pb-14">
        {/* Breadcrumb pill */}
        <div className="mb-6 inline-flex items-center rounded-full border border-[#e5ded4] bg-[#fdfbf7] px-4 py-1 text-xs text-[#736557]">
          <span>Home</span>
          <span className="mx-1.5 opacity-40">/</span>
          <span className="font-medium text-[#222]">Our Projects</span>
        </div>

        {/* Stacked Heading */}
        <h1 className="text-3xl font-light tracking-tight text-[#222222] sm:text-4xl lg:text-[3.25rem] lg:leading-tight">
          <span className="block font-normal text-[#a6734c]">Extraordinary Spaces</span>
          <span className="block font-semibold">We Have Crafted</span>
        </h1>
      </section>

      {/* 2. Projects Grid */}
      <section className="shell mb-16 lg:mb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-[#efebe2] bg-[#fdfbf7] p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5"
            >
              {/* Image Container with Inset Client Badge */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#efebe2]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Client Logo Inset Badge */}
                <div className="absolute bottom-4 left-4 rounded-xl border border-black/5 bg-white/95 px-4 py-2.5 shadow-md backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#a6734c] text-[10px] font-bold text-white">
                      {project.client[0]}
                    </span>
                    <div>
                      <p className="text-xs font-bold tracking-wider text-[#222222]">
                        {project.client}
                      </p>
                      <p className="text-[10px] text-[#736557]">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="mt-5 flex flex-wrap items-end justify-between gap-3 px-2 pb-1 sm:flex-nowrap sm:gap-4">
                <div className="flex-1">
                  <h2 className="mb-3 text-xl font-semibold text-[#222222] sm:text-2xl">
                    {project.title}
                  </h2>

                  {/* Tags Badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e5ded4] bg-[#f7f3ec] px-3 py-1 text-xs text-[#5c5248]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Arrow Circle Button */}
                <button
                  type="button"
                  aria-label={`View ${project.title}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f4ece1] text-[#222222] transition-colors group-hover:bg-[#a6734c] group-hover:text-white"
                >
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Scrolling Marquee & CTA */}
      <Marquee />
      <CallToAction />
    </>
  );
}

import Image from "next/image";
import { site } from "@/lib/site";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="shell my-16 sm:my-24 lg:my-32">
      <div className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-espresso px-6 py-16 text-center text-white shadow-[0_25px_60px_rgba(62,45,32,0.3)] sm:px-12 sm:py-20 lg:px-20 lg:py-24">
        {/* Background Image with Luxury Dark Gradient Overlay */}
        <Image
          src="/images/2.jpg"
          alt="BelleVue Luxury Architectural Interior"
          fill
          sizes="(max-width: 1280px) 100vw, 1440px"
          className="object-cover object-center opacity-30 transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-espresso/90 to-black/85" />

        {/* Decorative Glowing Ambient Orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-light/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sand-deep/20 blur-3xl" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center max-w-3xl">
          {/* Eyebrow Tag */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream/90 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-brand-light" />
            Start Your Transformation
          </span>

          {/* Heading */}
          <h2 className="mb-5 text-3xl font-light text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            Your Vision, <span className="font-normal text-brand-light">Our Expertise</span>
          </h2>

          {/* Secondary Text */}
          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-cream/85 sm:text-base lg:text-lg font-light">
            Ready to elevate your residential or commercial environment? Partner with BelleVue for bespoke architectural design, uncompromised craftsmanship, and complete turnkey execution across India.
          </p>

          {/* Prominent Elevated CTA Button */}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-sand px-8 py-4 text-sm font-semibold text-espresso shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-ink hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] sm:px-10 sm:py-4.5 sm:text-base"
          >
            <span>Transform Your Space</span>
            <ArrowUpRight className="h-5 w-5 text-brand-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

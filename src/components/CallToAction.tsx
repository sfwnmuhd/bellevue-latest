import { site } from "@/lib/site";

export default function CallToAction() {
  return (
    <section className="shell my-12 lg:my-16">
      <div className="flex flex-col items-center justify-center rounded-3xl bg-[#3e2d20] px-6 py-12 text-center text-white sm:px-12 sm:py-16 lg:px-20">
        <h2 className="mb-4 text-2xl font-light text-white sm:text-3xl lg:text-4xl">
          Your Vision, <span className="font-medium text-[#d9c3b0]">Our Expertise</span>
        </h2>
        <p className="mx-auto mb-8 max-w-[620px] text-xs leading-relaxed text-[#c7bcae] sm:text-sm lg:text-[15px]">
          Ready to transform your space? Contact BelleVue today to schedule a consultation. Our team is ready to bring your vision to life, creating a space that reflects your unique style and leaves a lasting impression.
        </p>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[#f4ece1] px-8 py-3.5 text-xs font-semibold text-[#3e2d20] shadow-sm transition-all hover:bg-white hover:shadow-md sm:text-sm"
        >
          Transform Your Space
        </a>
      </div>
    </section>
  );
}

import Image from "next/image";

type Props = {
  title: React.ReactNode;
  subtitle: string;
  image: string;
};

/**
 * Shorter sibling of the home page hero, sharing its measure and radius so
 * inner pages sit on the same vertical lines.
 */
export default function PageHeader({ title, subtitle, image }: Props) {
  return (
    <section className="mx-auto w-full sm:mt-14 sm:w-[95%] sm:max-w-[1840px]">
      <div className="relative h-[380px] overflow-hidden sm:h-[440px] sm:rounded-hero lg:h-[540px]">
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="relative flex h-full flex-col justify-end gap-4 p-6 text-cream sm:p-10 lg:p-14">
          <h1
            data-reveal="up"
            className="max-w-[900px] text-[1.75rem] font-bold leading-[1.15] sm:text-4xl lg:text-[3.25rem]"
          >
            {title}
          </h1>
          <p
            data-reveal="up"
            data-reveal-delay="0.1"
            className="max-w-[640px] text-base leading-relaxed sm:text-[1.1rem]"
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

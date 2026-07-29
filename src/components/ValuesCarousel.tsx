"use client";

import { useRef } from "react";
import { Value } from "@/lib/site";

interface ValuesCarouselProps {
  items: Value[];
}

export default function ValuesCarousel({ items }: ValuesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 pt-1 no-scrollbar sm:gap-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div
            key={item.title || index}
            className="w-[85vw] max-w-[280px] shrink-0 rounded-2xl bg-[#f4f0e8] p-6 transition-transform hover:-translate-y-1 sm:w-[340px] sm:max-w-none sm:p-8"
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

      {/* Navigation Arrow Buttons centered below the carousel matching mockup */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => scroll("left")}
          aria-label="Previous value"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6cbbe] bg-transparent text-[#5c4a3a] transition-colors hover:bg-[#a6734c] hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          aria-label="Next value"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6cbbe] bg-transparent text-[#5c4a3a] transition-colors hover:bg-[#a6734c] hover:text-white"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

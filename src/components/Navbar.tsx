"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { navLinks, site } from "@/lib/site";
import SiteLink from "./SiteLink";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 100);
  });

  // Close the mobile panel once the viewport is wide enough to show the links.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    // `h-0` keeps the bar out of the flow so it floats over the hero's top edge
    // the way compatto's does, while `sticky` still pins it during scroll.
    <header className="absolute top-0 left-0 right-0 z-50 h-0">
      <motion.nav
        data-navbar
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative mx-auto mt-0 w-full rounded-none border-b border-black/10 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:mt-5 sm:w-[95%] sm:max-w-[1440px] sm:rounded-[40px] sm:border-b-0 ${
          scrolled
            ? "bg-white/85 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-white shadow-[0_5px_15px_rgba(0,0,0,0.05)]"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 lg:px-16">
          <SiteLink
            href="/"
            className="text-xl font-medium tracking-wide text-[#070707] sm:text-2xl"
          >
            {site.name}
          </SiteLink>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <SiteLink
                  href={link.href}
                  className="relative text-[17px] font-light text-ink-soft transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-brand after:transition-[width] after:duration-300 hover:text-brand hover:after:w-full lg:text-[19px]"
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex rounded-[10px] border border-brand bg-brand px-4 py-2.5 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-white hover:text-brand sm:px-6 sm:py-3.5 sm:text-sm"
            >
              Contact us
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/15 bg-white p-2 text-ink shadow-xs transition-colors hover:bg-black/5 md:hidden"
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 h-0.5 w-5 rounded bg-current"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[7px] h-0.5 w-5 rounded bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-[14px] h-0.5 w-5 rounded bg-current"
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col gap-1 border-t border-black/5 px-5 py-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <SiteLink
                      href={link.href}
                      onNavigate={() => setOpen(false)}
                      className="block py-2 text-base text-ink-soft transition-colors hover:text-brand"
                    >
                      {link.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

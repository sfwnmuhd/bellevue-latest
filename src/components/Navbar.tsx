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
    setScrolled(latest > 50);
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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:top-6 sm:px-6 pointer-events-none">
      <motion.nav
        data-navbar
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative w-full border transition-[max-width,background-color,box-shadow,backdrop-filter] duration-300 ease-out ${
          open
            ? "rounded-2xl sm:rounded-3xl bg-white border-black/10 shadow-xl max-w-full sm:max-w-5xl"
            : "rounded-full " + (scrolled
                ? "max-w-4xl sm:max-w-5xl bg-white/95 border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md"
                : "max-w-[1440px] bg-white border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm")
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? "px-3.5 py-2 sm:px-7 sm:py-2.5" : "px-4 py-2.5 sm:px-10 sm:py-3.5"
        }`}>
          {/* Left: Company Logo */}
          <SiteLink
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
          >
            <span>{site.name}</span>
          </SiteLink>

          {/* Middle: Navigation Links */}
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <SiteLink
                  href={link.href}
                  className="text-sm font-medium text-slate-800 transition-colors duration-200 hover:text-brand"
                >
                  {link.label}
                </SiteLink>
              </li>
            ))}
          </ul>

          {/* Right: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all duration-300 hover:bg-brand-dark hover:shadow-md sm:px-6 sm:py-2.5 sm:text-sm"
            >
              Contact us
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-gray-50 text-slate-800 transition-colors hover:bg-gray-100 md:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <motion.span
                  animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 top-0 h-0.5 w-4 rounded bg-current"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-[5px] h-0.5 w-4 rounded bg-current"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 top-[10px] h-0.5 w-4 rounded bg-current"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown Drawer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-black/10 px-5 py-4 md:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <SiteLink
                      href={link.href}
                      onNavigate={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-brand"
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

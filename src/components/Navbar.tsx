"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/site";
import SiteLink from "./SiteLink";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
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
    <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4 sm:top-5 sm:px-6 pointer-events-none">
      <motion.nav
        data-navbar
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative w-full border transition-[max-width,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${open
          ? "rounded-2xl sm:rounded-3xl bg-white/98 border-black/10 shadow-2xl max-w-full sm:max-w-5xl backdrop-blur-xl"
          : "rounded-full " +
          (scrolled
            ? "max-w-4xl sm:max-w-5xl bg-white/90 border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-md"
            : "max-w-[1440px] bg-white/85 border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-md hover:bg-white/95")
          }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "px-4 py-2 sm:px-7 sm:py-2.5" : "px-5 py-3 sm:px-8 sm:py-3.5"
            }`}
        >
          {/* Left: Brand / Logo */}
          <SiteLink
            href="/"
            className="group flex items-center gap-1.5 text-lg font-bold tracking-tight text-slate-900 sm:text-xl transition-transform duration-200 "
          >
            <span>{site.name}</span>
            {/* <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand transition-transform duration-300 group-hover:scale-150" /> */}
          </SiteLink>

          {/* Middle: Desktop Navigation Links */}
          <ul className="hidden items-center gap-1.5 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.label}>
                  <SiteLink
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-xs font-semibold sm:text-sm transition-all duration-200 ${isActive
                      ? "text-brand bg-brand/10 font-bold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80"
                      }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-brand/10 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </SiteLink>
                </li>
              );
            })}
          </ul>

          {/* Right: CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(166,115,76,0.45)] active:translate-y-0 sm:px-6 sm:py-2.5 sm:text-sm shrink-0"
            >
              <span>Contact us</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 md:hidden"
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
              className="overflow-hidden border-t border-black/10 px-5 py-4 md:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.label}>
                      <SiteLink
                        href={link.href}
                        onNavigate={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${isActive
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-slate-800 hover:bg-slate-100 hover:text-brand"
                          }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-brand" />
                        )}
                      </SiteLink>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Architecture Made Simple</span>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}


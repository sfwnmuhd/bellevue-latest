"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerMenu, site } from "@/lib/site";
import SiteLink from "./SiteLink";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // No backend yet — this only acknowledges the submission locally.
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-medium text-ink">Stay Inspired with BelleVue</p>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2.5 sm:flex-row sm:items-center"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-full border border-black/15 bg-white/80 px-4 py-2.5 text-sm outline-none transition-all focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/20 sm:max-w-[240px]"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="w-fit rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-brand-dark hover:shadow-lg"
        >
          Subscribe
        </motion.button>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="mt-2.5 text-xs text-brand-dark font-medium"
          >
            Thanks — we&apos;ll be in touch.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="shell mb-10 lg:mb-16">
      <div className="flex flex-col justify-between gap-12 rounded-[32px] bg-sand border border-stone-300/40 px-6 py-12 text-sm shadow-[0_20px_50px_rgba(0,0,0,0.06)] sm:px-10 sm:py-16 lg:min-h-[420px] lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl sm:text-[32px] font-semibold text-ink">{site.name}</h2>
            <p className="mt-1 tracking-wide text-xs uppercase text-[#a48b70] font-semibold">
              ARCHITECTURE M A D E SIMPLE
            </p>
            <NewsletterForm />
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-ink">Menu</h3>
            <ul className="space-y-3">
              {footerMenu.map((item) => (
                <li key={item.label}>
                  <SiteLink
                    href={item.href}
                    className="text-[#333] transition-colors duration-300 hover:text-brand font-light"
                  >
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-ink">Contact Information</h3>
            <ul className="space-y-3.5 font-light">
              <li className="flex items-center gap-2.5 text-[#333]">
                <MapPin className="h-4 w-4 shrink-0 text-brand" />
                <span>{site.location}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-[#333] transition-colors duration-300 hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-[#333] transition-colors duration-300 hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" />
                  <span>{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-6 border-t border-black/10 pt-6 text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} {site.name}. All rights reserved. |
          Designed &amp; Developed by Safwan
        </p>
      </div>
    </footer>
  );
}

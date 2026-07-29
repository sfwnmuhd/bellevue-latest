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
    <div className="mt-5">
      <p className="mb-2.5">Stay Inspired with BelleVue</p>
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
          className="w-full sm:max-w-[240px] rounded-md border border-black/15 bg-white/70 px-3 py-2.5 text-sm outline-none transition-[border-color,box-shadow] focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/20"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-fit rounded-md bg-[#a48b70] px-4 py-2.5 text-sm text-white transition-colors duration-300 hover:bg-brand-dark"
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
            className="mt-2 text-xs text-brand-dark"
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
    <footer className="shell mb-6 lg:mb-10">
      <div className="flex flex-col justify-between gap-10 rounded-[20px] bg-sand px-6 py-10 text-sm sm:px-10 lg:min-h-[400px] lg:rounded-[25px] lg:px-20 lg:py-20">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-2xl sm:text-[32px]">{site.name}</h2>
          <p className="mt-1 tracking-wide">
            ARCHITECTURE <span className="text-[#a48b70]">M A D E</span> SIMPLE
          </p>
          <NewsletterForm />
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Menu</h3>
          <ul className="space-y-2.5">
            {footerMenu.map((item) => (
              <li key={item.label}>
                <SiteLink
                  href={item.href}
                  className="text-[#333] transition-colors duration-300 hover:text-[#a48b70]"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Contact Information</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-[#333]">
              <MapPin className="h-4 w-4 shrink-0 text-[#a48b70]" />
              <span>{site.location}</span>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-[#333] transition-colors duration-300 hover:text-[#a48b70]"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#a48b70]" />
                <span>{site.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-[#333] transition-colors duration-300 hover:text-[#a48b70]"
              >
                <Mail className="h-4 w-4 shrink-0 text-[#a48b70]" />
                <span>{site.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

        <p className="mt-5 text-center text-xs text-[#999] sm:text-sm">
          © {new Date().getFullYear()} {site.name}. All rights reserved. |
          Designed &amp; Developed by Safwan
        </p>
      </div>
    </footer>
  );
}

"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { CtaButton } from "./cta-button";
import { fadeUp, stagger } from "./motion";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-maroon-deep text-cream">
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-6xl px-6 py-20 sm:py-24"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-10 border-b border-cream/10 pb-14 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s work together
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/70">
              Mortgage administration, bookkeeping, and executive support — handled
              carefully, so you can get on with the rest of the business.
            </p>
          </div>
          <CtaButton label="Get in Touch" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-10 pt-12 sm:gap-12 lg:flex-row lg:justify-between"
        >
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream font-display text-sm font-bold text-maroon-deep">
                {site.initials}
              </span>
              <span className="font-display text-lg font-semibold">{site.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-cream/60">{site.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <h3 className="text-[0.65rem] font-semibold tracking-[0.25em] text-tile/80 uppercase">
                Explore
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/70">
                <li>
                  <a href="#top" className="transition hover:text-cream">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#what-i-do" className="transition hover:text-cream">
                    What I do
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[0.65rem] font-semibold tracking-[0.25em] text-tile/80 uppercase">
                Contact
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-cream/70">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 transition hover:text-cream"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {site.email}
                  </a>
                </li>
                <li className="flex flex-wrap gap-x-3 gap-y-1 text-cream/50">
                  {site.disciplines.map((discipline) => (
                    <span key={discipline}>{discipline}</span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-14 border-t border-cream/10 pt-8 text-xs text-cream/45"
        >
          © {year} {site.name}. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
}

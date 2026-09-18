"use client";

import { motion } from "framer-motion";
import { trustedBy } from "@/lib/site";
import { fadeUp, stagger } from "./motion";

export function TrustedBy() {
  return (
    <section className="bg-band py-14 text-cream sm:py-16" aria-label="Trusted by">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6"
      >
        <motion.p
          variants={fadeUp}
          className="text-[0.7rem] font-semibold tracking-[0.35em] text-cream/70 uppercase"
        >
          Trusted by
        </motion.p>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {trustedBy.map((client) => (
            <motion.li
              key={client.name}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="text-center"
            >
              <span className="block font-display text-xl font-semibold text-cream/85 transition-colors hover:text-cream sm:text-2xl">
                {client.name}
              </span>
              <span className="mt-1 block text-[0.65rem] tracking-[0.2em] text-cream/50 uppercase">
                {client.detail}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

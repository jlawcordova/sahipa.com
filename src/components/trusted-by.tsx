"use client";

import Image from "next/image";
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

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:gap-x-12">
          {trustedBy.map((client) => (
            <motion.li
              key={client.name}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-20 w-40 items-center justify-center rounded-2xl bg-cream/95 px-5 py-3 shadow-sm sm:h-24 sm:w-48">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={320}
                  height={320}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="mt-2 block text-[0.65rem] tracking-[0.2em] text-cream/60 uppercase">
                {client.detail}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

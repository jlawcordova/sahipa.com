"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/site";
import { CtaButton } from "./cta-button";
import { easeOutExpo, fadeUp, stagger } from "./motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden bg-maroon text-cream"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative grid lg:min-h-[100svh] lg:grid-cols-[1.28fr_0.72fr]">
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-between gap-16 px-6 py-8 sm:px-10 lg:px-16 lg:py-12"
        >
          <motion.header variants={fadeUp} className="flex items-center justify-between">
            <a href="#top" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream font-display text-sm font-bold text-maroon-deep">
                {site.initials}
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">
                {site.name}
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="hidden text-sm text-cream/70 transition hover:text-cream sm:inline"
            >
              {site.email}
            </a>
          </motion.header>

          <div className="max-w-xl lg:max-w-2xl">
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              {site.role}
            </motion.h1>

            <motion.ul
              variants={stagger(0.06, 0.15)}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-cream/85"
            >
              {site.disciplines.map((discipline, index) => (
                <motion.li
                  key={discipline}
                  variants={fadeUp}
                  className="flex items-center gap-x-4"
                >
                  {index > 0 && (
                    <span aria-hidden className="text-cream/40">
                      &middot;
                    </span>
                  )}
                  {discipline}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
            >
              {site.intro}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <CtaButton />
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-2 text-sm text-cream/60 sm:flex-row sm:items-center sm:gap-16"
          >
            <span>{site.name}</span>
            <span>{site.tagline}</span>
          </motion.div>
        </motion.div>

        <div className="relative hidden overflow-hidden bg-panel lg:block lg:min-h-full">
          <motion.div
            className="absolute inset-0"
            style={reduceMotion ? undefined : { y: portraitY, scale: portraitScale }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo }}
          >
            <Image
              src="/hero.webp"
              alt={`${site.name}, ${site.role}`}
              fill
              /* The panel is hidden below lg. Lazy loading keeps phones from
                 downloading a portrait they never see; `sizes` keeps the
                 desktop variant right. */
              loading="lazy"
              sizes="(max-width: 1024px) 1px, 40vw"
              className="object-cover object-[50%_46%]"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_10%,rgba(139,25,25,0.35),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-panel to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-maroon/80 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-panel/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}

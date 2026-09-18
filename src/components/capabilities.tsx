"use client";

import { motion } from "framer-motion";
import {
  Calculator,
  CalendarDays,
  Home,
  MessageCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { capabilities, type Capability } from "@/lib/site";
import { easeOutExpo, fadeUp, stagger } from "./motion";

const icons: Record<Capability["icon"], LucideIcon> = {
  calculator: Calculator,
  home: Home,
  message: MessageCircle,
  zap: Zap,
  calendar: CalendarDays,
};

const tones: Record<Capability["tone"], string> = {
  deep: "bg-card-deep",
  red: "bg-card-red",
  teal: "bg-card-teal",
};

const spans: Record<Capability["span"], string> = {
  third: "lg:col-span-2",
  half: "lg:col-span-3",
};

export function Capabilities() {
  return (
    <section id="what-i-do" className="bg-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[0.7rem] font-semibold tracking-[0.35em] text-tile/80 uppercase"
          >
            Capabilities
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl"
          >
            What I do
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base leading-relaxed text-cream/70"
          >
            From financial foundations to operational flow, I help organizations move
            with clarity, speed, and precision.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6"
        >
          {capabilities.map((capability) => {
            const Icon = icons[capability.icon];

            return (
              <motion.li
                key={capability.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className={`flex flex-col rounded-2xl border border-white/5 p-7 shadow-lg shadow-black/20 sm:p-8 ${tones[capability.tone]} ${spans[capability.span]}`}
              >
                <span className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-tile text-maroon-deep">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="font-display text-xl leading-snug font-bold sm:text-2xl">
                  {capability.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/75">
                  {capability.body}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

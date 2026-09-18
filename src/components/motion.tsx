"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

type RevealProps<T extends ElementType> = {
  as?: T;
  delay?: number;
  amount?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/** Fades + lifts its children into view once, the first time they are scrolled to. */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  amount = 0.3,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = motion[(as ?? "div") as "div"];

  return (
    <Tag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: easeOutExpo, delay },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

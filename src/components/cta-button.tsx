"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContact } from "./contact-modal";

type Props = {
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function CtaButton({
  label = "Get in Touch",
  variant = "solid",
  className = "",
}: Props) {
  const { open } = useContact();

  const styles =
    variant === "solid"
      ? "bg-cream text-maroon-deep hover:bg-tile"
      : "border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5";

  return (
    <motion.button
      type="button"
      onClick={open}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-colors ${styles} ${className}`}
    >
      {label}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </motion.button>
  );
}

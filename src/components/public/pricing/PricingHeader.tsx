"use client";

import React from "react";
import { motion } from "motion/react";

interface PricingHeaderProps {
  isYearly: boolean;
  onToggleYearly: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export function PricingHeader({ isYearly, onToggleYearly }: PricingHeaderProps) {
  return (
    <div className="relative text-center max-w-3xl mx-auto py-8 sm:py-12">
      {/* Subtle background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-x-0 -top-10 left-1/2 -translate-x-1/2 h-64 w-[36rem] max-w-full bg-indigo-500/[0.08] blur-3xl rounded-full -z-10"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance bg-gradient-to-br from-indigo-600 via-foreground to-cyan-600 dark:from-indigo-400 dark:via-foreground dark:to-cyan-400 bg-clip-text text-transparent"
        >
          Flexible Plans Tailored For Every Stage of Business
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-5 text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-xl mx-auto"
        >
          Transparent pricing in Bangladeshi Taka (৳). No hidden setup fees or surprise surcharges.
        </motion.p>

        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="mt-9 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-1 p-1.5 rounded-full border border-border bg-muted/50 backdrop-blur-sm shadow-sm"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => isYearly && onToggleYearly()}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                !isYearly
                  ? "bg-card text-foreground shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly Billing
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={onToggleYearly}
              aria-label="Toggle annual billing"
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ${
                isYearly ? "bg-indigo-600" : "bg-foreground/20"
              }`}
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
                style={{ marginLeft: isYearly ? "1.5rem" : "0.25rem" }}
              />
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => !isYearly && onToggleYearly()}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isYearly
                  ? "bg-card text-foreground shadow-sm border border-border/60"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual Billing
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm">
                Save 20%
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
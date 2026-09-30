"use client";

import React from "react";
import { MotionConfig, motion, type Variants } from "motion/react";
import { Check } from "lucide-react";

interface PricingHeaderProps {
  isYearly: boolean;
  onToggleYearly: () => void;
}

const OPTIONS = [
  { label: "Monthly", yearly: false },
  { label: "Annual", yearly: true },
] as const;

const HIGHLIGHTS = [
  "Prices in Bangladeshi Taka (৳)",
  "No hidden setup fees",
  "Core POS, payments and reporting in every plan",
];

// One quiet page-load sequence for the whole header
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function PricingHeader({ isYearly, onToggleYearly }: PricingHeaderProps) {
  return (
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <motion.header
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-20"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          Pricing
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Simple pricing that scales with your business
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Start free, then choose a plan that grows with you. Every plan
          includes core POS, payments and reporting with no hidden fees.
        </motion.p>

        {/* Billing toggle */}
        <motion.div variants={item} className="mt-10 flex justify-center">
          <div
            role="radiogroup"
            aria-label="Billing cycle"
            className="inline-flex items-center rounded-full border border-border bg-muted/50 p-1"
          >
            {OPTIONS.map((option) => {
              const active = isYearly === option.yearly;

              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => !active && onToggleYearly()}
                  className="relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-billing-pill"
                      className="absolute inset-0 rounded-full border border-border/60 bg-card shadow-sm"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {option.label}
                    {option.yearly && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Save 20%
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* What every plan includes */}
        <motion.ul
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          {HIGHLIGHTS.map((text) => (
            <li key={text} className="flex items-center gap-2">
              <Check
                className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {text}
            </li>
          ))}
        </motion.ul>
      </motion.header>
    </MotionConfig>
  );
}
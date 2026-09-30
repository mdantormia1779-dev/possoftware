"use client";

import React, { useState } from "react";
import { MotionConfig, motion } from "framer-motion";
import { LandingPricingCards } from "./LandingPricingCards";

type BillingCycle = "monthly" | "yearly";

const OPTIONS: { value: BillingCycle; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Annual" },
];

export function LandingPricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Simple, transparent pricing
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Affordable plans for growing Bangladeshi businesses
          </h2>

          {/* Billing toggle */}
          <div
            role="radiogroup"
            aria-label="Billing cycle"
            className="mt-8 inline-flex items-center rounded-full border border-border/80 bg-muted/40 p-1"
          >
            {OPTIONS.map((option) => {
              const active = billingCycle === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setBillingCycle(option.value)}
                  className="relative cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full border border-border/60 bg-background shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {option.label}
                    {option.value === "yearly" && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Save 20%
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <LandingPricingCards billingCycle={billingCycle} />
      </section>
    </MotionConfig>
  );
}
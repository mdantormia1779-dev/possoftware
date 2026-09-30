"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

interface LandingPricingCardsProps {
  billingCycle: "monthly" | "yearly";
}

interface Plan {
  name: string;
  tagline: string;
  /** Price per month when billed monthly */
  monthly: number;
  /** Price per month when billed yearly */
  yearly: number;
  /** Line shown above the feature list for plans that build on another */
  includes?: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "Single outlet retail & small shops",
    monthly: 2999,
    yearly: 2399,
    features: [
      "Offline POS & Barcode Engine",
      "1 Branch & 5 Staff Logins",
      "Up to 5,000 Products",
      "80mm Thermal Receipt Print",
    ],
    cta: "Choose Starter",
    href: "/register",
  },
  {
    name: "Business",
    tagline: "Multi-branch outlets & super shops",
    monthly: 6999,
    yearly: 5599,
    includes: "All Starter features included",
    features: [
      "3 Branches & 20 Staff Logins",
      "Stock Transfer Workflows",
      "Auto Double-Entry Accounting",
      "Staff Attendance & Payroll",
      "Unlimited Products & Invoices",
    ],
    cta: "Start 14-Day Business Trial",
    href: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "Chains & multi-company holding groups",
    monthly: 14999,
    yearly: 11999,
    includes: "Everything in Business plan",
    features: [
      "Unlimited Branches & Outlets",
      "Multi-Company Holding Setup",
      "Dedicated SLA & Account Manager",
    ],
    cta: "Contact Enterprise Team",
    href: "/contact",
  },
];

const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Two quick beats, then a pause: "lub-dub ... lub-dub"
const heartbeat = {
  animate: {
    scale: [1, 1.07, 1, 1.07, 1, 1],
    boxShadow: [
      "0 0 0 0 rgba(255,255,255,0.5)",
      "0 0 0 10px rgba(255,255,255,0)",
      "0 0 0 0 rgba(255,255,255,0)",
      "0 0 0 10px rgba(255,255,255,0)",
      "0 0 0 0 rgba(255,255,255,0)",
      "0 0 0 0 rgba(255,255,255,0)",
    ],
  },
  transition: {
    duration: 1.8,
    times: [0, 0.12, 0.24, 0.36, 0.5, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
  },
};

export function LandingPricingCards({ billingCycle }: LandingPricingCardsProps) {
  const isYearly = billingCycle === "yearly";
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={grid}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-3"
    >
      {PLANS.map((plan) => {
        const price = isYearly ? plan.yearly : plan.monthly;
        const pop = !!plan.popular;

        return (
          <motion.article
            key={plan.name}
            variants={card}
            className={`flex flex-col rounded-2xl p-6 sm:p-8 ${
              pop
                ? "border border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                : "border border-border/80 bg-card text-foreground"
            }`}
          >
            {/* Plan name */}
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              {pop && (
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
            </div>
            <p
              className={`mt-1 text-sm ${
                pop ? "text-indigo-100" : "text-muted-foreground"
              }`}
            >
              {plan.tagline}
            </p>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
              <motion.span
                key={`${plan.name}-${billingCycle}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-4xl font-extrabold tracking-tight tabular-nums"
              >
                {taka(price)}
              </motion.span>
              <span
                className={`text-sm ${
                  pop ? "text-indigo-100" : "text-muted-foreground"
                }`}
              >
                / month
              </span>
              {isYearly && (
                <span
                  className={`text-sm tabular-nums line-through ${
                    pop ? "text-indigo-200" : "text-muted-foreground/70"
                  }`}
                >
                  {taka(plan.monthly)}
                </span>
              )}
            </div>
            <p
              className={`mt-1 text-xs ${
                pop ? "text-indigo-100" : "text-muted-foreground"
              }`}
            >
              {isYearly
                ? `Billed ${taka(plan.yearly * 12)} per year`
                : "Billed monthly"}
            </p>

            {/* Features */}
            <div
              className={`mt-6 flex-1 border-t pt-6 ${
                pop ? "border-white/20" : "border-border/70"
              }`}
            >
              {plan.includes && (
                <p className="mb-4 text-sm font-semibold">{plan.includes}</p>
              )}
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        pop
                          ? "bg-white/20 text-white"
                          : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300"
                      }`}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span
                      className={pop ? "text-indigo-50" : "text-muted-foreground"}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            {(() => {
              const cta = (
                <Link
                  href={plan.href}
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
                    pop
                      ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600"
                      : "border border-border/80 text-foreground hover:bg-muted focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                  }`}
                >
                  {plan.cta}
                </Link>
              );

              return pop && !reduceMotion ? (
                <motion.div
                  className="mt-8 rounded-xl"
                  animate={heartbeat.animate}
                  transition={heartbeat.transition}
                  whileHover={{ scale: 1.03, boxShadow: "0 0 0 0 rgba(255,255,255,0)" }}
                >
                  {cta}
                </motion.div>
              ) : (
                <div className="mt-8">{cta}</div>
              );
            })()}
          </motion.article>
        );
      })}
    </motion.div>
  );
}
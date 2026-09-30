"use client";

import React from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const TRIAL_INCLUDES = [
  "Every feature unlocked for 14 days",
  "No credit card required",
  "Switch or cancel plans anytime",
  "Free onboarding support",
];

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

export function PricingCtaSection() {
  const reduceMotion = useReducedMotion();

  const primary = (
    <Link
      href="/register"
      className="block rounded-xl bg-white px-7 py-3.5 text-center text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 dark:focus-visible:ring-offset-blue-950"
    >
      Start Free Trial
    </Link>
  );

  return (
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid items-center gap-10 rounded-3xl border border-transparent bg-blue-600 p-8 text-white transition-colors duration-300 dark:border-blue-800/60 dark:bg-blue-950 sm:p-12 lg:grid-cols-5 lg:gap-14 lg:p-16"
        >
          {/* Left: message + actions */}
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              14-day free trial · No credit card required
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Start free. Upgrade when you are ready.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Try every feature for 14 days. No credit card, no commitment,
              no surprises.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {reduceMotion ? (
                primary
              ) : (
                <motion.div
                  className="rounded-xl"
                  animate={heartbeat.animate}
                  transition={heartbeat.transition}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 0 0 rgba(255,255,255,0)",
                  }}
                >
                  {primary}
                </motion.div>
              )}

              <Link
                href="/contact"
                className="rounded-xl border border-white/40 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 dark:focus-visible:ring-offset-blue-950"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right: what the trial includes */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-7 lg:col-span-2">
            <p className="text-sm font-semibold">What you get with the trial</p>
            <ul className="mt-5 space-y-3.5">
              {TRIAL_INCLUDES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-blue-50"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-blue-600"
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
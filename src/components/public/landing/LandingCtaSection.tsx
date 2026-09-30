"use client";

import React from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

const TRIAL_INCLUDES = [
  "Offline POS & barcode scanning",
  "Multi-branch stock transfers",
  "Automatic double-entry accounting",
  "Staff attendance & payroll",
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

export function LandingCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    // reducedMotion="user" turns off movement for people who ask for it
    <MotionConfig reducedMotion="user">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid items-center gap-10 rounded-3xl border border-transparent bg-indigo-600 p-8 text-white dark:border-indigo-800/60 dark:bg-indigo-950 sm:p-12 lg:grid-cols-5 lg:gap-14 lg:p-16"
        >
          {/* Left: message + actions */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to take 100% control of your business?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-indigo-100 sm:text-lg">
              Join hundreds of Bangladeshi retail stores, super shops, and
              fashion houses running seamlessly on XYZ Business OS.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {(() => {
                const primary = (
                  <Link
                    href="/register"
                    className="block rounded-xl bg-white px-7 py-3.5 text-center text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 dark:focus-visible:ring-offset-indigo-950"
                  >
                    Start Free 14-Day Trial
                  </Link>
                );

                return reduceMotion ? (
                  primary
                ) : (
                  <motion.div
                    className="rounded-xl"
                    animate={heartbeat.animate}
                    transition={heartbeat.transition}
                    whileHover={{ scale: 1.03, boxShadow: "0 0 0 0 rgba(255,255,255,0)" }}
                  >
                    {primary}
                  </motion.div>
                );
              })()}
              <Link
                href="/contact"
                className="rounded-xl border border-white/40 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-600 dark:focus-visible:ring-offset-indigo-950"
              >
                Book a Live Demo
              </Link>
            </div>
          </div>

          {/* Right: what the trial includes */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 sm:p-7 lg:col-span-2">
            <p className="text-sm font-semibold">
              Included in the 14-day Business trial
            </p>
            <ul className="mt-5 space-y-3.5">
              {TRIAL_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-indigo-50">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600"
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
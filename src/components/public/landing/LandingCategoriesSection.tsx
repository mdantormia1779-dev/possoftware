"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BUSINESS_CATEGORIES } from "./landingCategoriesData";

export function LandingCategoriesSection() {
  const reduceMotion = useReducedMotion();

  // One staggered reveal for the whole list instead of per-card effects.
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.06 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left: heading, stays in view while the list scrolls on desktop */}
        <header className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Tailored for Bangladeshi SMBs
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Specialized workflows for every industry
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
            Pick your business type and start with presets for products,
            billing and reports that fit how you already sell.
          </p>
        </header>

        {/* Right: industries as a ruled index */}
        <motion.ul
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="lg:col-span-8 grid sm:grid-cols-2 sm:gap-x-10 border-b border-border/70"
        >
          {BUSINESS_CATEGORIES.map((cat, idx) => (
            <motion.li
              key={idx}
              variants={item}
              className="group flex gap-4 border-t border-border/70 py-6"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/50 text-2xl transition-colors group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60"
              >
                {cat.icon}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-semibold text-foreground">{cat.name}</h3>
                  <span className="rounded-full border border-indigo-200/60 bg-indigo-50 px-2 py-0.5 text-[11px] font-medium text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/60 dark:text-indigo-300">
                    {cat.tag}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {cat.desc}
                </p>

                {/* <span className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  View preset features
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span> */}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
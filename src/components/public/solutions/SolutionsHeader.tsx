"use client";

import React from "react";
import { motion } from "motion/react";

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

export function SolutionsHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative text-center space-y-4 max-w-3xl mx-auto py-4"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 left-1/2 -translate-x-1/2 h-56 w-[32rem] max-w-full bg-indigo-500/[0.08] blur-3xl rounded-full -z-10" />

      <motion.span
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400"
      >
        Industry Tailored Solutions
      </motion.span>

      <motion.h1
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] text-balance bg-gradient-to-br from-indigo-600 via-foreground to-cyan-600 dark:from-indigo-400 dark:via-foreground dark:to-cyan-400 bg-clip-text text-transparent"
      >
        Engineered For Your Specific Business Type
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto"
      >
        Whether you run a fast-paced supermarket, a multi-branch fashion boutique, or an electronics store, XYZ Business OS adapts to your exact workflow.
      </motion.p>
    </motion.div>
  );
}
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Sparkles, Building, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center space-y-5"
      >
        <motion.span
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-1.5 rounded-full"
        >
          Our Mission
        </motion.span>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight leading-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text"
        >
          Empowering Bangladeshi Businesses with Modern SaaS Tech
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          We built XYZ Business OS because Bangladeshi SMBs deserve enterprise-grade software that is beautiful, fast, affordable, and works even when the internet drops.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        {[
          { icon: Sparkles, stat: "৳500M+", label: "Platform GMV Processed" },
          { icon: ShieldCheck, stat: "99.99%", label: "Uptime with Offline Engine" },
          { icon: Building, stat: "300+", label: "Retail Stores Across Bangladesh" },
        ].map(({ icon: Icon, stat, label }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-2xl border border-border bg-card text-center shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-shadow duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="mx-auto mb-4 w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center"
            >
              <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
            <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
              {stat}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2">{label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="rounded-3xl border border-border bg-gradient-to-br from-card to-card/50 p-8 sm:p-14 space-y-6 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center shrink-0"
          >
            <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Why We Built XYZ Business OS</h2>
        </div>
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p>
            For years, small and medium enterprises in Dhaka, Chittagong, Sylhet, and across Bangladesh have struggled with fragmented software: fragile desktop apps that crash, foreign cloud subscriptions that cost thousands of dollars, or manual paper ledgers.
          </p>
          <p>
            XYZ Business OS brings the power of multi-tenant cloud computing, combined with the reliability of offline IndexedDB, tailored for local payment systems (bKash, Nagad, Rocket) and localized double-entry accounting.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
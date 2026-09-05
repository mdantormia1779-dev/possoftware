import React, { RefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { LandingAppPreview } from "./LandingAppPreview";

interface LandingHeroSectionProps {
  glowRef: RefObject<HTMLDivElement | null>;
}

export function LandingHeroSection({ glowRef }: LandingHeroSectionProps) {
  return (
    <section className="relative pt-12 sm:pt-20 lg:pt-28 pb-12 lg:pb-20 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-indigo-500/25 via-cyan-500/15 to-purple-500/25 blur-[140px] -z-10 rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200/80 dark:border-indigo-800/80 bg-indigo-50/80 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-subtle-xs backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
          <span className="font-medium">
            One Unified Login — Total Business Control, Online & 100% Offline
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground max-w-5xl mx-auto leading-[1.08]"
        >
          Run Your Entire Enterprise From{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            One Unified OS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal"
        >
          POS Terminal, Multi-Branch Stock Transfers, Automated Double-Entry Accounts, HR, Payroll, and CRM — all unified in one high-performance platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start Free 14-Day Trial</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/app/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold rounded-2xl border border-border/80 bg-card hover:bg-muted text-foreground shadow-subtle-xs hover:shadow-subtle-sm transition-all"
          >
            <Play className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
            <span>Explore Live Interactive App</span>
          </Link>
        </motion.div>

        <LandingAppPreview />
      </div>
    </section>
  );
}

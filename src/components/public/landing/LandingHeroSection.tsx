import React, { RefObject } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Box,
  ClipboardList,
  CreditCard,
  ScanLine,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface LandingHeroSectionProps {
  glowRef: RefObject<HTMLDivElement | null>;
}

const AVATARS = [
  "https://i.pravatar.cc/80?img=47",
  "https://i.pravatar.cc/80?img=12",
  "https://i.pravatar.cc/80?img=32",
];

const STATS = [
  { label: "REVENUE", value: "$48,290", delta: "+12.4%", up: true, icon: TrendingUp },
  { label: "ORDERS", value: "1,284", delta: "+8.1%", up: true, icon: ClipboardList },
  { label: "INVENTORY", value: "3,912", delta: "-2.3%", up: false, icon: Box },
];

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const ORDERS = [
  { name: "Walk-in customer", id: "#10428", amount: "$126.40" },
  { name: "Amara Okafor", id: "#10427", amount: "$84.00" },
  { name: "Daniel Reyes", id: "#10426", amount: "$52.75" },
];

/* Theme-aware class tokens (light + dark) */
const card =
  "rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0d1424]";
const floatCard =
  "absolute z-20 hidden items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 shadow-lg shadow-slate-900/5 sm:flex dark:border-slate-800 dark:bg-[#0b1120] dark:shadow-black/40";
const floatIcon =
  "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400";
const floatLabel = "text-[10px] tracking-wide text-slate-500 dark:text-slate-400";
const floatValue = "text-sm font-bold text-slate-900 dark:text-white";
const delta = "text-[10px] font-medium text-teal-600 dark:text-teal-400";

export function LandingHeroSection({ glowRef }: LandingHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-20 lg:pt-24 lg:pb-24 dark:bg-[#070b14]">
      {/* Background glows */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-blue-200/50 blur-[140px] dark:bg-blue-900/30"
      />
      <div className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-[140px] dark:bg-teal-900/25" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        {/* ---------- Left: copy ---------- */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-800 dark:bg-[#0b1120] dark:text-slate-200"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
              <Sparkles className="h-3 w-3" />
            </span>
            All-in-one POS platform for modern businesses
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-[64px] dark:text-white"
          >
            Run Your Business{" "}
            <span className="text-blue-600 dark:text-blue-400">Smarter</span> with
            Powerful POS Software
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Manage sales, inventory, customers, payments and reports from one
            clean platform. POS Business OS gives modern businesses everything
            they need to sell faster and grow with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/app/dashboard"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-7 py-3.5 text-base font-medium text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#0b1120] dark:text-white dark:hover:bg-slate-900"
            >
              Explore Features
            </Link>
          </motion.div>

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            No credit card required · 14-day free trial · Cancel anytime
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-[#070b14]"
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-teal-500" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                    <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Trusted by 24,000+ businesses
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Right: dashboard preview ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[600px] px-4 sm:px-8"
        >
          {/* Dark-mode soft halo behind the window */}
          <div className="pointer-events-none absolute inset-4 -z-10 hidden rounded-3xl bg-slate-400/20 blur-[70px] dark:block" />

          {/* Floating cards */}
          <div className={`${floatCard} -left-1 top-10`}>
            <span className={floatIcon}><TrendingUp className="h-4 w-4" /></span>
            <div>
              <p className={floatLabel}>SALES TODAY</p>
              <p className={floatValue}>$12,480 <span className={delta}>+18%</span></p>
            </div>
          </div>
          <div className={`${floatCard} -right-1 top-24`}>
            <span className={floatIcon}><Box className="h-4 w-4" /></span>
            <div>
              <p className={floatLabel}>INVENTORY</p>
              <p className={floatValue}>3,912 <span className={delta}>-2%</span></p>
            </div>
          </div>
          <div className={`${floatCard} -left-4 bottom-20`}>
            <span className={floatIcon}><ClipboardList className="h-4 w-4" /></span>
            <div>
              <p className={floatLabel}>ORDERS</p>
              <p className={floatValue}>284 <span className={delta}>+7%</span></p>
            </div>
          </div>
          <div className={`${floatCard} -right-2 bottom-8`}>
            <span className={floatIcon}><CreditCard className="h-4 w-4" /></span>
            <div>
              <p className={floatLabel}>REVENUE</p>
              <p className={floatValue}>$48.2k <span className={delta}>+12%</span></p>
            </div>
          </div>

          {/* Browser window */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-[#0a101d] dark:shadow-black/50">
            <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
              </div>
              <div className="flex-1 rounded-md border border-slate-100 px-3 py-1 text-[11px] text-slate-500 dark:border-slate-800 dark:bg-[#0d1424] dark:text-slate-400">
                app.posbusinessos.com
              </div>
            </div>

            <div className="flex gap-3 bg-slate-50/60 p-3 dark:bg-transparent">
              {/* Sidebar */}
              <div className="hidden w-11 shrink-0 flex-col items-center gap-5 rounded-xl bg-slate-100/70 py-4 text-slate-400 sm:flex dark:bg-[#0d1424] dark:text-slate-500">
                <span className="h-1 w-6 rounded-full bg-blue-600" />
                <BarChart3 className="h-4 w-4" />
                <ScanLine className="h-4 w-4" />
                <Box className="h-4 w-4" />
                <Users className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-start justify-between px-1 pt-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Good morning, Elena</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Your business is doing well today</p>
                  </div>
                  <span className="rounded-md bg-blue-600 px-3 py-1.5 text-[11px] font-medium text-white">
                    New Sale
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {STATS.map(({ label, value, delta: d, up, icon: Icon }) => (
                    <div key={label} className={`${card} p-3`}>
                      <div className="flex items-center justify-between text-[10px] tracking-wide text-slate-500 dark:text-slate-400">
                        {label}
                        <Icon className="h-3 w-3 text-blue-500 dark:text-blue-400" />
                      </div>
                      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">{value}</p>
                      <p className={`text-[10px] ${up ? "text-teal-600 dark:text-teal-400" : "text-rose-500 dark:text-teal-500"}`}>{d}</p>
                    </div>
                  ))}
                </div>

                <div className={`${card} p-4`}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">Revenue this week</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Last 7 days</p>
                  </div>
                  <div className="mt-4 flex h-24 items-end justify-between gap-2">
                    {[45, 62, 50, 78, 66, 90, 72].map((h, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full max-w-[22px] rounded-t bg-gradient-to-t from-blue-200 to-blue-500/80 dark:from-blue-950 dark:to-blue-500"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[9px] text-slate-400 dark:text-blue-400/80">{DAYS[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${card} p-4`}>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">Recent orders</p>
                  <ul className="mt-3 space-y-3">
                    {ORDERS.map((o) => (
                      <li key={o.id} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-400 dark:bg-slate-800/70 dark:text-slate-400">
                          <ClipboardList className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-medium text-slate-800 dark:text-slate-100">{o.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">{o.id}</p>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-900 dark:text-white">{o.amount}</span>
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[9px] font-medium text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                          Paid
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
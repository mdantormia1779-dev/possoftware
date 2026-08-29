"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  WifiOff,
  CheckCircle2,
  Boxes,
  Receipt,
  BookOpen,
  Users,
  Megaphone,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Smartphone,
  CreditCard,
  Building,
  Layers,
  ChevronRight,
  Play,
  ShoppingCart,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const BUSINESS_CATEGORIES = [
  { name: "Retail & Super Shop", icon: "🛒", desc: "Fast barcode POS & inventory" },
  { name: "Fashion & Lifestyle", icon: "👗", desc: "Size/color variants & transfers" },
  { name: "Gadget & Electronics", icon: "📱", desc: "IMEI, warranty & serial tracker" },
  { name: "Pharmacy & Health", icon: "💊", desc: "Batch & expiry date alerts" },
  { name: "Grocery & Mart", icon: "🍎", desc: "Weighing scale & quick search" },
  { name: "Restaurant & Cafe", icon: "☕", desc: "Table orders & split bills" },
];

const FEATURES_GRID = [
  {
    icon: WifiOff,
    title: "100% Offline-First POS",
    desc: "Internet drop? Keep ringing sales seamlessly. Dexie.js + IndexedDB automatically syncs all bills once connectivity returns.",
    highlight: "Zero Downtime",
  },
  {
    icon: Boxes,
    title: "Multi-Branch Stock Transfers",
    desc: "Manage stock across multiple outlets with structured approval pipelines: Draft → Pending → In Transit → Received.",
    highlight: "Multi-Branch",
  },
  {
    icon: BookOpen,
    title: "Automated Double-Entry Accounting",
    desc: "Sales, purchases, and payroll automatically create debit & credit journal entries. Real-time P&L, Balance Sheet & Trial Balance.",
    highlight: "Auto-Journal",
  },
  {
    icon: Users,
    title: "HR, Attendance & Payroll",
    desc: "Daily check-in logs, commission calculations linked to cashier POS sales, and automated payslip generation in BDT (৳).",
    highlight: "Complete HR",
  },
  {
    icon: Megaphone,
    title: "SMS & WhatsApp CRM",
    desc: "Broadcast promo campaigns, loyalty points tracking, and automated festive SMS discounts for Eid, Puja, and seasonal sales.",
    highlight: "Growth Engine",
  },
  {
    icon: BarChart3,
    title: "Executive Business Reports",
    desc: "360-degree analytics answering: 'How much did I sell today?', 'What is my gross profit?', and 'Which branch is winning?'.",
    highlight: "Actionable Insights",
  },
];

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-20 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-indigo-500/20 via-cyan-500/15 to-purple-500/20 blur-[130px] -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Bengali Subtitle Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs animate-in fade-in duration-500">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>“একটা Login, পুরো Business Control — Online ও Offline, দুই অবস্থায়ই।”</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            Run Your Entire Business From <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">One Powerful Platform</span>
          </h1>

          {/* Supporting Pitch */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            POS, Inventory, Accounting, HR, Payroll ও CRM — সবকিছু এক জায়গায়। Internet না থাকলেও POS বন্ধ হবে না। Built for Bangladeshi forward-thinking businesses.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/app/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl border border-border bg-card hover:bg-muted text-foreground shadow-xs transition-colors"
            >
              <Play className="h-4 w-4 text-indigo-600 fill-indigo-600" />
              <span>Explore Live Interactive App</span>
            </Link>
          </div>

          {/* Live Mock Dashboard & POS Interactive Preview */}
          <div className="pt-10 max-w-6xl mx-auto">
            <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md shadow-2xl p-2 sm:p-4 overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/80 pb-3 px-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-muted-foreground ml-2">app.xyzbusiness.os/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Offline POS Ready
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">BDT (৳)</span>
                </div>
              </div>

              {/* Realistic Mock UI Preview */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                {/* Metric 1 */}
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Today&apos;s Sales (Banani + Dhanmondi)</span>
                  <div className="text-2xl font-bold text-foreground mt-1">{formatCurrency(130700)}</div>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> +18.4% vs yesterday
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Gross Profit Today</span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(54200)}</div>
                  <span className="text-[11px] text-muted-foreground mt-1">41.5% margin</span>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Total In-Stock Valuation</span>
                  <div className="text-2xl font-bold text-foreground mt-1">{formatCurrency(2960000)}</div>
                  <span className="text-[11px] text-muted-foreground mt-1">Across 3 active branches</span>
                </div>

                {/* Metric 4 */}
                <div className="p-4 rounded-xl bg-card border border-border">
                  <span className="text-xs text-muted-foreground">Customer Due Outstanding</span>
                  <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{formatCurrency(74500)}</div>
                  <span className="text-[11px] text-muted-foreground mt-1">Auto-reminders enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Supported Bangladesh Business Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Tailored For Bangladeshi SMBs
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            Custom Workflows For Every Industry
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BUSINESS_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-border bg-card hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md text-center space-y-2 group"
            >
              <div className="text-3xl mb-1 transform group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-xs font-bold text-foreground">{cat.name}</h3>
              <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Core Feature Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Enterprise Architecture
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-foreground">
            17 Integrated Modules In One Unified OS
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            No more maintaining separate apps for POS, Excel for Inventory, Tally for Accounts, and paper registers for Attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_GRID.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {feat.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feat.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-border flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Learn more</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Offline POS Deep Dive Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-semibold">
                <WifiOff className="h-3.5 w-3.5" />
                <span>The #1 Differentiator for Bangladesh</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Internet Outage? Your POS Never Stops.
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                In Bangladesh, broadband and mobile data dips are unpredictable. XYZ Business OS runs a high-speed IndexedDB engine directly in the cashier’s browser.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Instant barcode scan and bill generation with 0 server latency.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Thermal receipts print offline with client-generated invoice IDs.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Auto-sync outbox uploads pending transactions when internet returns.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link
                  href="/app/pos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-neutral-100 shadow-lg transition-transform active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4 text-indigo-600" />
                  <span>Try POS Terminal Demo</span>
                </Link>
              </div>
            </div>

            {/* Offline Simulation Card */}
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-bold text-amber-300">Offline Outbox Status</span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">Dexie.js v4.0</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg bg-black/30 flex justify-between items-center">
                  <span>INV-202602-8812 (bKash ৳5,460)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Synced</span>
                </div>
                <div className="p-3 rounded-lg bg-black/30 flex justify-between items-center">
                  <span>INV-202602-8813 (Due ৳11,550)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Synced</span>
                </div>
                <div className="p-3 rounded-lg bg-black/30 flex justify-between items-center">
                  <span>INV-202602-8814 (Cash ৳4,515)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-2xl sm:text-4xl font-extrabold text-foreground">
            Affordable Plans For Growing Bangladeshi Businesses
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Starter</h3>
              <p className="text-xs text-muted-foreground mt-1">Single outlet retail & small shops</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-foreground">৳2,999</span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Offline POS & Barcode</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 1 Branch & 5 Staff</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Up to 5,000 Products</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Thermal Receipt Print</li>
              </ul>
            </div>
            <Link href="/register" className="w-full text-center py-2.5 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground">
              Choose Starter
            </Link>
          </div>

          {/* Business (Popular) */}
          <div className="p-6 rounded-2xl border-2 border-indigo-600 bg-card relative shadow-xl flex flex-col justify-between">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Business</h3>
              <p className="text-xs text-muted-foreground mt-1">Multi-branch outlets & super shops</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-foreground">৳6,999</span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> All Starter Features</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 3 Branches & 20 Staff</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Stock Transfer Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Auto Double-Entry Accounting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> HR, Attendance & Payroll</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlimited Products</li>
              </ul>
            </div>
            <Link href="/register" className="w-full text-center py-2.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              Start Business Plan
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Enterprise</h3>
              <p className="text-xs text-muted-foreground mt-1">Chains & multi-company groups</p>
              <div className="my-6">
                <span className="text-3xl font-extrabold text-foreground">৳14,999</span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Everything in Business</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlimited Branches & Staff</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Multi-Company Holding Support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> REST API & Webhook Access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Dedicated Account Manager</li>
              </ul>
            </div>
            <Link href="/contact" className="w-full text-center py-2.5 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground">
              Contact Enterprise
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Bottom Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Take 100% Control of Your Business?
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto">
            Join hundreds of Bangladeshi retail stores, super shops, and fashion houses running on XYZ Business OS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-neutral-100 shadow-lg transition-transform active:scale-95"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10"
            >
              Book a Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

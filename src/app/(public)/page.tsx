"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Sparkles,
  ArrowRight,
  WifiOff,
  Wifi,
  CheckCircle2,
  Boxes,
  BookOpen,
  Users,
  Megaphone,
  BarChart3,
  TrendingUp,
  ChevronRight,
  Play,
  ShoppingCart,
  ChevronDown,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// --- DATA DEFINITIONS ---

const BUSINESS_CATEGORIES = [
  {
    name: "Retail & Super Shop",
    icon: "🛒",
    desc: "Fast barcode scanning, weighing scale integration & low-stock alerts",
    tag: "High Volume",
    border: "hover:border-blue-500/40",
  },
  {
    name: "Fashion & Lifestyle",
    icon: "👗",
    desc: "Color, size, fabric variants & inter-branch transfer matrix",
    tag: "Variant Matrix",
    border: "hover:border-purple-500/40",
  },
  {
    name: "Gadget & Electronics",
    icon: "📱",
    desc: "IMEI, warranty tracking, serial number history & technician logs",
    tag: "IMEI Tracking",
    border: "hover:border-cyan-500/40",
  },
  {
    name: "Pharmacy & Healthcare",
    icon: "💊",
    desc: "Batch expiration tracking, physician records & DGDA drug listings",
    tag: "Batch & Expiry",
    border: "hover:border-emerald-500/40",
  },
  {
    name: "Grocery & Mart",
    icon: "🍎",
    desc: "Per-gram weighing, wholesale bundle pricing & expiry clearance",
    tag: "Weighing Scale",
    border: "hover:border-amber-500/40",
  },
  {
    name: "Restaurant & Cafe",
    icon: "☕",
    desc: "Kitchen Order Ticket (KOT), floor table layouts & split billings",
    tag: "Table & KOT",
    border: "hover:border-rose-500/40",
  },
];

const BENTO_MODULES = [
  {
    icon: WifiOff,
    title: "100% Offline-First POS Engine",
    badge: "Dexie.js + IndexedDB",
    desc: "Broadband down? Keep scanning barcodes and issuing receipts without interruption. All queued bills auto-sync with zero data loss once reconnected.",
    colSpan: "lg:col-span-2",
    accent: "text-amber-500 dark:text-amber-400",
    bgAccent: "bg-amber-500/10",
  },
  {
    icon: Boxes,
    title: "Multi-Branch Stock Matrix",
    badge: "Transfer Pipeline",
    desc: "Centralized warehouse control with dispatch, in-transit tracking, and receiving audits between Banani, Dhanmondi, and Chittagong.",
    colSpan: "lg:col-span-1",
    accent: "text-indigo-500 dark:text-indigo-400",
    bgAccent: "bg-indigo-500/10",
  },
  {
    icon: BookOpen,
    title: "Automated Double-Entry Ledger",
    badge: "Auto Journal",
    desc: "Every cash sale, bKash transfer, supplier bill, and payroll automatically posts debits and credits. Real-time P&L, Balance Sheet & Mushak-6.3.",
    colSpan: "lg:col-span-1",
    accent: "text-emerald-500 dark:text-emerald-400",
    bgAccent: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Staff Commissions & Payroll",
    badge: "Attendance & KPI",
    desc: "Biometric and pin attendance logs with automated percentage commissions tied directly to POS terminal sales per cashier.",
    colSpan: "lg:col-span-2",
    accent: "text-purple-500 dark:text-purple-400",
    bgAccent: "bg-purple-500/10",
  },
  {
    icon: Megaphone,
    title: "Customer 360 & Loyalty CRM",
    badge: "SMS & Points",
    desc: "Lifetime customer valuation, reward points accumulation, festive Eid/Puja discount SMS broadcasting, and authorized credit terms.",
    colSpan: "lg:col-span-2",
    accent: "text-cyan-500 dark:text-cyan-400",
    bgAccent: "bg-cyan-500/10",
  },
  {
    icon: BarChart3,
    title: "Executive Business Intelligence",
    badge: "Real-Time Velocity",
    desc: "Live gross profit calculation, hourly velocity charts, shrinkage detection, and comparative branch revenue scorecards.",
    colSpan: "lg:col-span-1",
    accent: "text-rose-500 dark:text-rose-400",
    bgAccent: "bg-rose-500/10",
  },
];

const FAQS = [
  {
    q: "Will the POS stop working if the internet goes down?",
    a: "Not at all. XYZ Business OS is engineered with a 100% offline-first architecture using Dexie.js and client IndexedDB. Cashiers can scan barcodes, generate receipts, and print 80mm thermal bills with zero internet. All queued sales automatically synchronize with the cloud once connectivity is restored.",
  },
  {
    q: "Do I need separate software licenses for multiple branches?",
    a: "No. A single central company account lets you manage multiple outlets across Dhaka, Chittagong, Sylhet, or any city. Track individualized branch inventory, user permissions, cash drawers, and inter-branch stock transfer pipelines from one unified interface.",
  },
  {
    q: "How are bKash, Nagad, Card, and Bank payments reconciled?",
    a: "During checkout, cashiers can split tender across Cash, bKash, Nagad, Card, and Bank with one tap. Automated double-entry journal vouchers immediately record debit and credit postings to respective asset and revenue accounts in real time.",
  },
  {
    q: "Does the system support NBR VAT Mushak-6.3 invoices?",
    a: "Yes. Official Bangladesh National Board of Revenue (NBR) compliant Mushak-6.3 tax invoices, BIN tracking, and customizable 80mm thermal receipts are built-in natively.",
  },
  {
    q: "Is my business data preserved after the 14-day trial?",
    a: "Absolutely. All your products, customer records, branches, and historical sales data remain fully encrypted and secure. You can upgrade to any tier at any time without downtime or data migration.",
  },
];

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [activeHeroTab, setActiveHeroTab] = useState<"pos" | "dashboard" | "inventory" | "accounting">("pos");
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [offlineQueueCount, setOfflineQueueCount] = useState(2);

  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // GSAP Ambient Glow animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          rotation: 360,
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSimulateSale = () => {
    if (isOfflineSimulated) {
      setOfflineQueueCount((prev) => prev + 1);
    }
  };

  const handleToggleOffline = () => {
    setIsOfflineSimulated((prev) => !prev);
  };

  return (
    <div ref={heroRef} className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION WITH GSAP & FRAMER MOTION                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-12 sm:pt-20 lg:pt-28 pb-12 lg:pb-20 overflow-hidden">
        {/* Ambient Gradient Glows managed by GSAP */}
        <div
          ref={glowRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] sm:h-[500px] bg-gradient-to-tr from-indigo-500/25 via-cyan-500/15 to-purple-500/25 blur-[140px] -z-10 rounded-full pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* English Tagline Pill */}
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

          {/* Main Headline */}
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

          {/* Supporting Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal"
          >
            POS Terminal, Multi-Branch Stock Transfers, Automated Double-Entry Accounts, HR, Payroll, and CRM — all unified in one high-performance platform.
          </motion.p>

          {/* Action CTAs */}
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

          {/* --------------------------------------------------------- */}
          {/* INTERACTIVE MOCK APP PREVIEW WITH TABS                     */}
          {/* --------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="pt-8 max-w-6xl mx-auto"
          >
            <div className="relative rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl p-2 sm:p-4 overflow-hidden">
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/80 pb-3.5 px-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-muted-foreground ml-2">
                    app.xyzbusiness.os/{activeHeroTab}
                  </span>
                </div>

                {/* Switcher Tab Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold">
                  <button
                    onClick={() => setActiveHeroTab("pos")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeHeroTab === "pos"
                        ? "bg-indigo-600 text-white shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🛒 Offline POS
                  </button>
                  <button
                    onClick={() => setActiveHeroTab("dashboard")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeHeroTab === "dashboard"
                        ? "bg-indigo-600 text-white shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    📊 Live Analytics
                  </button>
                  <button
                    onClick={() => setActiveHeroTab("inventory")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeHeroTab === "inventory"
                        ? "bg-indigo-600 text-white shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    📦 Stock Transfers
                  </button>
                  <button
                    onClick={() => setActiveHeroTab("accounting")}
                    className={`px-3 py-1 rounded-xl transition-all ${
                      activeHeroTab === "accounting"
                        ? "bg-indigo-600 text-white shadow-xs font-bold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    ⚖️ Double-Entry
                  </button>
                </div>
              </div>

              {/* Dynamic Tab Body */}
              <div className="p-3 sm:p-6 text-left">
                <AnimatePresence mode="wait">
                  {activeHeroTab === "pos" && (
                    <motion.div
                      key="pos-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                    >
                      {/* Left: Product SKU Grid Preview */}
                      <div className="lg:col-span-2 p-4 rounded-2xl bg-muted/20 border border-border/60 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                            <ShoppingCart className="h-3.5 w-3.5 text-indigo-500" />
                            <span>Quick POS Catalog (Banani Flagship)</span>
                          </span>
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                            Scanner Active [Ready]
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {[
                            { name: "Executive Silk Panjabi", price: 4850, sku: "PAN-001", stock: 24 },
                            { name: "Slim Fit Oxford Shirt", price: 2150, sku: "SHT-014", stock: 45 },
                            { name: "Premium Polo Navy", price: 1450, sku: "POL-009", stock: 82 },
                            { name: "Formal Chino Trousers", price: 2650, sku: "TRO-021", stock: 18 },
                            { name: "Genuine Leather Belt", price: 1850, sku: "ACC-004", stock: 30 },
                            { name: "Embroidered Kurti", price: 3250, sku: "KUR-011", stock: 12 },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-card border border-border/80 shadow-subtle-xs hover:border-indigo-400 transition-colors"
                            >
                              <span className="text-[10px] font-mono text-muted-foreground block">{item.sku}</span>
                              <span className="text-xs font-bold text-foreground block truncate">{item.name}</span>
                              <div className="flex justify-between items-center mt-2">
                                <strong className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                                  {formatCurrency(item.price)}
                                </strong>
                                <span className="text-[10px] text-muted-foreground">{item.stock} in stock</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: POS Live Cart & Split Payment */}
                      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-border/80 pb-2">
                            <span className="text-xs font-bold text-foreground">Current Order #8824</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                              3 Items
                            </span>
                          </div>
                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex justify-between text-muted-foreground">
                              <span>Silk Panjabi (x1)</span>
                              <span>৳4,850</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>Oxford Shirt (x2)</span>
                              <span>৳4,300</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span>VAT Mushak-6.3 (5%)</span>
                              <span>৳457.50</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border/80 space-y-2">
                          <div className="flex justify-between items-center font-mono">
                            <span className="text-xs font-sans font-bold text-foreground">Net Payable:</span>
                            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">৳9,607.50</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] font-bold font-mono">
                            <div className="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-center border border-pink-200 dark:border-pink-800">
                              bKash: ৳5,000
                            </div>
                            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-center border border-emerald-200 dark:border-emerald-800">
                              Cash: ৳4,607.50
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === "dashboard" && (
                    <motion.div
                      key="dash-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Today&apos;s Sales</span>
                        <div className="text-2xl font-black text-foreground mt-1 font-mono">{formatCurrency(130700)}</div>
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
                          <TrendingUp className="h-3 w-3" /> +18.4% vs yesterday
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Gross Profit</span>
                        <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{formatCurrency(54200)}</div>
                        <span className="text-[11px] text-muted-foreground mt-1 font-mono">41.5% profit margin</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">In-Stock Valuation</span>
                        <div className="text-2xl font-black text-foreground mt-1 font-mono">{formatCurrency(2960000)}</div>
                        <span className="text-[11px] text-muted-foreground mt-1">3 branch outlets</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-subtle-xs">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Customer Due Ledger</span>
                        <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 font-mono">{formatCurrency(74500)}</div>
                        <span className="text-[11px] text-muted-foreground mt-1">Authorized credit terms</span>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === "inventory" && (
                    <motion.div
                      key="inv-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-card border border-border/80 space-y-3 font-mono text-xs"
                    >
                      <div className="flex justify-between items-center border-b border-border/80 pb-2 font-sans font-bold">
                        <span>Inter-Branch Stock Transfer Pipeline</span>
                        <span className="text-indigo-600 dark:text-indigo-400">TR-2026-089</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center pt-2">
                        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
                          <span className="text-[10px] font-sans text-muted-foreground block">Source Warehouse</span>
                          <strong className="text-foreground">Central Hub (Tejgaon)</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                          <span className="text-[10px] font-sans text-muted-foreground block">Transfer Status</span>
                          <strong className="text-amber-600">In Transit (Courier)</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
                          <span className="text-[10px] font-sans text-muted-foreground block">Destination Outlet</span>
                          <strong className="text-foreground">Dhanmondi Branch</strong>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeHeroTab === "accounting" && (
                    <motion.div
                      key="acc-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl bg-card border border-border/80 space-y-3 text-xs font-mono"
                    >
                      <div className="flex justify-between items-center border-b border-border/80 pb-2 font-sans font-bold">
                        <span>Real-Time Liquid Asset Balances</span>
                        <span className="text-emerald-600 font-bold">Auto-Reconciled</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-muted/30 border border-border/60">
                          <span className="text-[10px] text-muted-foreground font-sans block">Cash Drawer Till (All Outlets)</span>
                          <strong className="text-base text-foreground font-black">৳48,500.00</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200/60 dark:border-pink-800/60">
                          <span className="text-[10px] text-pink-900 dark:text-pink-300 font-sans block">bKash Merchant Reserve</span>
                          <strong className="text-base text-pink-700 dark:text-pink-300 font-black">৳142,350.00</strong>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60">
                          <span className="text-[10px] text-blue-900 dark:text-blue-300 font-sans block">City Bank Corporate A/C</span>
                          <strong className="text-base text-blue-700 dark:text-blue-300 font-black">৳850,000.00</strong>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SUPPORTED BANGLADESH BUSINESS CATEGORIES (FRAMER MOTION)   */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Tailored For Bangladeshi SMBs
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Specialized Workflows For Every Industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUSINESS_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`p-5 rounded-3xl border border-border/80 bg-card shadow-subtle-xs hover:shadow-subtle-md transition-all ${cat.border} flex flex-col justify-between space-y-3`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl p-2 rounded-2xl bg-muted/30">{cat.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground pt-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>View preset features</span>
                <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE 100% OFFLINE-FIRST SIMULATOR DEEP DIVE         */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-6 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl border border-indigo-900/50"
        >
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold backdrop-blur-md">
                <WifiOff className="h-3.5 w-3.5" />
                <span>The #1 Competitive Edge for Bangladesh</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Internet Outage? Your POS Never Stops.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                In Bangladesh, broadband and mobile data dips are unpredictable. XYZ Business OS embeds an ultra-fast Dexie.js IndexedDB engine directly into the client browser.
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-200">
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

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleToggleOffline}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                    isOfflineSimulated
                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      : "bg-white hover:bg-neutral-100 text-indigo-950"
                  }`}
                >
                  {isOfflineSimulated ? (
                    <>
                      <Wifi className="h-3.5 w-3.5" /> Reconnect Internet
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3.5 w-3.5" /> Simulate Internet Drop
                    </>
                  )}
                </button>
                <Link
                  href="/app/pos"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                >
                  <span>Launch POS Terminal</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Live Interactive Simulation Widget */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      isOfflineSimulated ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"
                    }`}
                  />
                  <span className="text-xs font-black">
                    {isOfflineSimulated ? "OFFLINE BUFFER MODE" : "CLOUD REAL-TIME SYNCED"}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">Dexie.js v4.0.11</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                  <span>INV-202602-8812 (bKash ৳5,460)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    Synced to Cloud
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex justify-between items-center">
                  <span>INV-202602-8813 (Cash ৳3,820)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    Synced to Cloud
                  </span>
                </div>
                {isOfflineSimulated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 flex justify-between items-center"
                  >
                    <span>INV-202602-8814 (Cash ৳4,515)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-200">
                      Buffered in Local DB ({offlineQueueCount} queued)
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSimulateSale}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-center border border-white/10 transition-colors"
                >
                  ⚡ Simulate Cashier Bill Print ({isOfflineSimulated ? "Buffered Locally" : "Cloud Saved"})
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. ENTERPRISE BENTO MODULE GRID (FRAMER MOTION)               */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-12"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Enterprise Architecture
          </h2>
          <p className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            17 Integrated Modules In One Unified OS
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            No more maintaining separate apps for POS, Excel for Inventory, Tally for Accounts, and paper registers for Attendance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {BENTO_MODULES.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className={`${mod.colSpan} rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-subtle-xs hover:shadow-subtle-md transition-all flex flex-col justify-between space-y-4`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl ${mod.bgAccent} ${mod.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/60">
                      {mod.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">{mod.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{mod.desc}</p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Explore module workflow</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. PRICING TEASER WITH TOGGLE                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
            Affordable Plans For Growing Bangladeshi Businesses
          </p>

          {/* Monthly / Yearly Toggle */}
          <div className="pt-3 flex items-center justify-center gap-3 text-xs font-bold">
            <span className={billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6 rounded-full bg-indigo-600 p-1 flex items-center transition-colors cursor-pointer"
            >
              <div
                className={`h-4 w-4 rounded-full bg-white transition-transform ${
                  billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={billingCycle === "yearly" ? "text-foreground flex items-center gap-1" : "text-muted-foreground flex items-center gap-1"}>
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Starter</h3>
              <p className="text-xs text-muted-foreground mt-1">Single outlet retail & small shops</p>
              <div className="my-6">
                <span className="text-3xl font-black text-foreground font-mono">
                  {billingCycle === "yearly" ? "৳2,399" : "৳2,999"}
                </span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Offline POS & Barcode Engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 1 Branch & 5 Staff Logins</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Up to 5,000 Products</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 80mm Thermal Receipt Print</li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-3 text-xs font-bold rounded-2xl border border-border/80 hover:bg-muted text-foreground transition-colors"
            >
              Choose Starter
            </Link>
          </div>

          {/* Business (Popular) */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-600 bg-card relative shadow-xl shadow-indigo-500/10 flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Business</h3>
              <p className="text-xs text-muted-foreground mt-1">Multi-branch outlets & super shops</p>
              <div className="my-6">
                <span className="text-3xl font-black text-foreground font-mono">
                  {billingCycle === "yearly" ? "৳5,599" : "৳6,999"}
                </span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> All Starter Features Included</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 3 Branches & 20 Staff Logins</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Stock Transfer Workflows</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Auto Double-Entry Accounting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Staff Attendance & Payroll</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Unlimited Products & Invoices</li>
              </ul>
            </div>
            <Link
              href="/register"
              className="w-full text-center py-3 text-xs font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-colors"
            >
              Start 14-Day Business Trial
            </Link>
          </div>

          {/* Enterprise */}
          <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">Enterprise</h3>
              <p className="text-xs text-muted-foreground mt-1">Chains & multi-company holding groups</p>
              <div className="my-6">
                <span className="text-3xl font-black text-foreground font-mono">
                  {billingCycle === "yearly" ? "৳11,999" : "৳14,999"}
                </span>
                <span className="text-xs text-muted-foreground"> / month</span>
              </div>
              <ul className="space-y-3 text-xs text-muted-foreground mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Everything in Business Plan</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Unlimited Branches & Outlets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Multi-Company Holding Setup</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Dedicated SLA & Account Manager</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="w-full text-center py-3 text-xs font-bold rounded-2xl border border-border/80 hover:bg-muted text-foreground transition-colors"
            >
              Contact Enterprise Team
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. INTERACTIVE FAQ ACCORDION (FRAMER MOTION)                  */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Frequently Asked Questions
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Common Inquiries From Business Owners
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-subtle-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm text-foreground hover:bg-muted/30 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-5 pt-0 text-xs leading-relaxed text-muted-foreground border-t border-border/40">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. BOTTOM BANNER CTA                                          */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl shadow-indigo-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
            Ready to Take 100% Control of Your Business?
          </h2>
          <p className="text-xs sm:text-base text-indigo-100 max-w-xl mx-auto">
            Join hundreds of Bangladeshi retail stores, super shops, and fashion houses running seamlessly on XYZ Business OS.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-neutral-100 shadow-lg transition-transform active:scale-95"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-2xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Book a Live Demo
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

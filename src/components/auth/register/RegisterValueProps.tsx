"use client";

import React from "react";
import { motion } from "framer-motion";
import { WifiOff, Store, ShieldCheck } from "lucide-react";

export function RegisterValueProps() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 pr-4"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-subtle-xs">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
          14-Day Full Feature Trial • No Credit Card
        </div>

        <h1 className="text-3xl xl:text-4xl font-black text-foreground tracking-tight leading-tight">
          The Next-Gen Business OS for Bangladesh.
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Online &amp; offline POS, automated double-entry accounting, multi-branch inventory, and NBR VAT compliance in one unified system.
        </p>
      </div>

      <div className="space-y-3.5 p-5 rounded-3xl bg-card/60 dark:bg-card/40 border border-border/80 backdrop-blur-md shadow-subtle-sm">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <WifiOff className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">100% Offline-First POS</h4>
            <p className="text-[11px] text-muted-foreground">Keep ringing sales during internet drops; auto-syncs to cloud seamlessly.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Store className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Multi-Branch &amp; Warehouse</h4>
            <p className="text-[11px] text-muted-foreground">Live stock transfers between Dhaka, Chattogram and regional retail hubs.</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">NBR 5% VAT &amp; Fiscal Invoices</h4>
            <p className="text-[11px] text-muted-foreground">Automatic Mushak 6.3 calculation with instant thermal barcode receipts.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3.5 pt-2">
        <div className="flex -space-x-2 overflow-hidden">
          {["bg-indigo-600", "bg-emerald-600", "bg-purple-600", "bg-cyan-600"].map((bg, i) => (
            <div
              key={i}
              className={`inline-block h-8 w-8 rounded-full ring-2 ring-background ${bg} flex items-center justify-center text-[10px] font-bold text-white shadow-subtle-xs`}
            >
              {["RA", "BD", "MH", "SK"][i]}
            </div>
          ))}
        </div>
        <div className="text-xs">
          <div className="font-bold text-foreground flex items-center gap-1">
            <span>★ ★ ★ ★ ★</span>
            <span className="text-[11px] text-muted-foreground ml-1">4.9 / 5</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Trusted by 1,200+ merchants across Bangladesh
          </p>
        </div>
      </div>
    </motion.div>
  );
}

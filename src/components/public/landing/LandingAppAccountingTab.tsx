import React from "react";
import { motion } from "framer-motion";

export function LandingAppAccountingTab() {
  return (
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
  );
}

import React from "react";
import { motion } from "framer-motion";

export function LandingAppInventoryTab() {
  return (
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
  );
}

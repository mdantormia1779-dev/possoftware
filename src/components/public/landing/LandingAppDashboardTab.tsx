import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function LandingAppDashboardTab() {
  return (
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
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingAppPosTab } from "./LandingAppPosTab";
import { LandingAppDashboardTab } from "./LandingAppDashboardTab";
import { LandingAppInventoryTab } from "./LandingAppInventoryTab";
import { LandingAppAccountingTab } from "./LandingAppAccountingTab";

type TabKey = "pos" | "dashboard" | "inventory" | "accounting";

const TABS: { key: TabKey; label: string }[] = [
  { key: "pos", label: "🛒 Offline POS" },
  { key: "dashboard", label: "📊 Live Analytics" },
  { key: "inventory", label: "📦 Stock Transfers" },
  { key: "accounting", label: "⚖️ Double-Entry" },
];

export function LandingAppPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("pos");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      className="pt-8 max-w-6xl mx-auto"
    >
      <div className="relative rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl p-2 sm:p-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border/80 pb-3.5 px-3 gap-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-muted-foreground ml-2">
              app.xyzbusiness.os/{activeTab}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/40 border border-border/60 text-xs font-semibold">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1 rounded-xl transition-all ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 sm:p-6 text-left">
          <AnimatePresence mode="wait">
            {activeTab === "pos" && <LandingAppPosTab key="pos" />}
            {activeTab === "dashboard" && <LandingAppDashboardTab key="dash" />}
            {activeTab === "inventory" && <LandingAppInventoryTab key="inv" />}
            {activeTab === "accounting" && <LandingAppAccountingTab key="acc" />}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

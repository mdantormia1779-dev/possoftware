import React from "react";
import { motion } from "framer-motion";

interface LandingOfflineWidgetProps {
  isOffline: boolean;
  queueCount: number;
  onSimulateSale: () => void;
}

export function LandingOfflineWidget({
  isOffline,
  queueCount,
  onSimulateSale,
}: LandingOfflineWidgetProps) {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              isOffline ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"
            }`}
          />
          <span className="text-xs font-black">
            {isOffline ? "OFFLINE BUFFER MODE" : "CLOUD REAL-TIME SYNCED"}
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
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30 flex justify-between items-center"
          >
            <span>INV-202602-8814 (Cash ৳4,515)</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-200">
              Buffered in Local DB ({queueCount} queued)
            </span>
          </motion.div>
        )}
      </div>

      <div className="pt-2">
        <button
          onClick={onSimulateSale}
          className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-center border border-white/10 transition-colors"
        >
          ⚡ Simulate Cashier Bill Print ({isOffline ? "Buffered Locally" : "Cloud Saved"})
        </button>
      </div>
    </div>
  );
}

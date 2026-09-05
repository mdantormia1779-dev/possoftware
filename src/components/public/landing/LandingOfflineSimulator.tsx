import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { WifiOff, Wifi, CheckCircle2, ArrowRight } from "lucide-react";
import { LandingOfflineWidget } from "./LandingOfflineWidget";

export function LandingOfflineSimulator() {
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(2);

  const handleSimulateSale = () => {
    if (isOfflineSimulated) {
      setOfflineQueueCount((prev) => prev + 1);
    }
  };

  return (
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
                onClick={() => setIsOfflineSimulated((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                  isOfflineSimulated
                    ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                    : "bg-white hover:bg-neutral-100 text-indigo-950"
                }`}
              >
                {isOfflineSimulated ? (
                  <><Wifi className="h-3.5 w-3.5" /> Reconnect Internet</>
                ) : (
                  <><WifiOff className="h-3.5 w-3.5" /> Simulate Internet Drop</>
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

          <LandingOfflineWidget
            isOffline={isOfflineSimulated}
            queueCount={offlineQueueCount}
            onSimulateSale={handleSimulateSale}
          />
        </div>
      </motion.div>
    </section>
  );
}

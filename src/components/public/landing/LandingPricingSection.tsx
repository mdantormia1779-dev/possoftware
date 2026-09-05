import React, { useState } from "react";
import { motion } from "framer-motion";
import { LandingPricingCards } from "./LandingPricingCards";

export function LandingPricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
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

      <LandingPricingCards billingCycle={billingCycle} />
    </section>
  );
}

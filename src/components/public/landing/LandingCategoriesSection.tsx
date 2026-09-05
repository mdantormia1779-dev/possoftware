import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BUSINESS_CATEGORIES } from "./landingCategoriesData";

export function LandingCategoriesSection() {
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
  );
}

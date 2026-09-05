import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { BENTO_MODULES } from "./landingBentoData";

export function LandingBentoSection() {
  return (
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
  );
}

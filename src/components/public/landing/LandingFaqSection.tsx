import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./landingFaqData";

export function LandingFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-3 mb-10"
      >
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Frequently Asked Questions
        </h2>
        <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Common Inquiries From Business Owners
        </p>
      </motion.div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-subtle-xs"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm text-foreground hover:bg-muted/30 transition-colors"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                  openFaq === idx ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-5 pt-0 text-xs leading-relaxed text-muted-foreground border-t border-border/40">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

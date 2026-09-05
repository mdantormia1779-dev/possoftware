import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function LandingCtaSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl shadow-indigo-500/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto">
          Ready to Take 100% Control of Your Business?
        </h2>
        <p className="text-xs sm:text-base text-indigo-100 max-w-xl mx-auto">
          Join hundreds of Bangladeshi retail stores, super shops, and fashion houses running seamlessly on XYZ Business OS.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/register"
            className="px-8 py-3.5 rounded-2xl bg-white text-indigo-950 font-bold text-sm hover:bg-neutral-100 shadow-lg transition-transform active:scale-95"
          >
            Start Free 14-Day Trial
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3.5 rounded-2xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
          >
            Book a Live Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

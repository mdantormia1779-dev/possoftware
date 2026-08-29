import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, Building, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Empowering Bangladeshi Businesses with Modern SaaS Tech
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          We built XYZ Business OS because Bangladeshi SMBs deserve enterprise-grade software that is beautiful, fast, affordable, and works even when the internet drops.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">৳500M+</div>
          <div className="text-xs text-muted-foreground mt-1">Platform GMV Processed</div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">99.99%</div>
          <div className="text-xs text-muted-foreground mt-1">Uptime with Offline Engine</div>
        </div>
        <div className="p-6 rounded-2xl border border-border bg-card">
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">300+</div>
          <div className="text-xs text-muted-foreground mt-1">Retail Stores Across Bangladesh</div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12 space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Why We Built XYZ Business OS</h2>
        <div className="space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <p>
            For years, small and medium enterprises in Dhaka, Chittagong, Sylhet, and across Bangladesh have struggled with fragmented software: fragile desktop apps that crash, foreign cloud subscriptions that cost thousands of dollars, or manual paper ledgers.
          </p>
          <p>
            XYZ Business OS brings the power of multi-tenant cloud computing, combined with the reliability of offline IndexedDB, tailored for local payment systems (bKash, Nagad, Rocket) and localized double-entry accounting.
          </p>
        </div>
      </div>
    </div>
  );
}

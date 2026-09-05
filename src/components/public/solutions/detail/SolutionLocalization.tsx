import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { SolutionData } from "./solutionTypes";

export function SolutionLocalization({ solution }: { solution: SolutionData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Bangladesh Ready
        </span>
        <h3 className="text-2xl font-extrabold text-foreground">
          Tailored For Local Tax, Payment & Supply Realities
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Generic international ERPs lack local mobile banking, NBR VAT challan Mushak forms, and offline tolerance.
          XYZ Business OS is purpose-built for how commerce happens in Dhaka, Chittagong, Sylhet, and across Bangladesh.
        </p>
        <ul className="space-y-3 pt-2">
          {solution.bdBenefits.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground font-medium">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-8 rounded-3xl border border-border bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg">
            ৳
          </div>
          <div>
            <h4 className="font-bold text-base">Ready to modernize your operations?</h4>
            <p className="text-xs text-indigo-200">Set up your branch and products in less than 15 minutes.</p>
          </div>
        </div>
        <p className="text-xs text-indigo-100/80 leading-relaxed">
          Join hundreds of retail, grocery, fashion, and restaurant enterprises thriving with XYZ Business OS. Full onboarding and data migration support from Excel included.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/register"
            className="px-5 py-3 rounded-xl bg-white text-indigo-950 font-bold text-xs text-center hover:bg-indigo-50 transition-colors"
          >
            Get Started Free
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-xl bg-white/10 text-white font-semibold text-xs text-center hover:bg-white/20 transition-colors"
          >
            Request Custom Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

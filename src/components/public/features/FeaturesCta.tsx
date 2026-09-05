import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturesCta() {
  return (
    <div className="text-center pt-8">
      <Link
        href="/register"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-transform active:scale-95"
      >
        <span>Get Started with All 17 Modules</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

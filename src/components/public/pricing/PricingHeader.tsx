"use client";

import React from "react";

interface PricingHeaderProps {
  isYearly: boolean;
  onToggleYearly: () => void;
}

export function PricingHeader({ isYearly, onToggleYearly }: PricingHeaderProps) {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
        Flexible Plans Tailored For Every Stage of Business
      </h1>
      <p className="text-base text-muted-foreground">
        Transparent pricing in Bangladeshi Taka (৳). No hidden setup fees or surprise surcharges.
      </p>

      <div className="pt-4 flex items-center justify-center gap-3">
        <span className={`text-xs font-semibold ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
          Monthly Billing
        </span>
        <button
          type="button"
          onClick={onToggleYearly}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isYearly ? "bg-indigo-600" : "bg-muted"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isYearly ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
          Annual Billing
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Save 20%
          </span>
        </span>
      </div>
    </div>
  );
}

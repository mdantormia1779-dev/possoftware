"use client";

import React from "react";
import { PaymentMethodConfig } from "@/services/subscription.service";

interface CheckoutPaymentMethodsProps {
  methods: PaymentMethodConfig[];
  selectedMethodId: string;
  onSelect: (id: string) => void;
}

export function CheckoutPaymentMethods({
  methods,
  selectedMethodId,
  onSelect,
}: CheckoutPaymentMethodsProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
        1. Select Super-Admin Verified Payment Channel
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {methods.map((method) => {
          const isSelected = method.id === selectedMethodId;
          const isBkash = method.method === "BKASH";
          const isNagad = method.method === "NAGAD";
          const isRocket = method.method === "ROCKET";

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-600/30 shadow-xs"
                  : "border-border hover:border-border/90 bg-card hover:bg-muted/40"
              }`}
            >
              <div
                className={`h-7 w-fit px-2 rounded-lg text-white font-black text-[11px] flex items-center justify-center shadow-2xs mb-2 ${
                  isBkash ? "bg-[#D12053]" : isNagad ? "bg-[#F7941D]" : isRocket ? "bg-[#8C3494]" : "bg-indigo-600"
                }`}
              >
                {method.method}
              </div>
              <div className="font-extrabold text-xs text-foreground truncate">{method.name}</div>
              <div className="text-[10px] text-muted-foreground font-semibold">{method.accountType}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

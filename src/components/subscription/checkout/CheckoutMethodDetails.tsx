"use client";

import React, { useState } from "react";
import { Copy, Check, Info } from "lucide-react";
import { PaymentMethodConfig } from "@/services/subscription.service";

export function CheckoutMethodDetails({ method }: { method?: PaymentMethodConfig }) {
  const [copied, setCopied] = useState(false);

  if (!method) return null;

  const copyAccount = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(method.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-5 rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 dark:border-indigo-900/40 pb-3">
        <div>
          <span className="text-xs font-bold text-foreground">{method.name} ({method.accountType})</span>
          <p className="text-[11px] text-muted-foreground">Send exact package amount to this official account</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-card border border-border/80 font-mono font-bold text-sm text-foreground">
            {method.accountNumber}
          </div>
          <button
            type="button"
            onClick={copyAccount}
            className="p-1.5 rounded-xl bg-card hover:bg-muted border border-border/80 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Copy Number"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {method.bankName && (
        <div className="p-3 rounded-2xl bg-card border border-border/70 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-muted-foreground block">Bank Name</span>
            <span className="font-bold text-foreground">{method.bankName}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground block">Branch</span>
            <span className="font-bold text-foreground">{method.branchName || "Main Branch"}</span>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground block">Routing Number</span>
            <span className="font-mono font-bold text-foreground">{method.routingNumber || "N/A"}</span>
          </div>
        </div>
      )}

      {method.instructions && (
        <div className="p-3 rounded-2xl bg-card/80 border border-border/60 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <Info className="h-3.5 w-3.5 text-indigo-600" />
            <span>How to pay via {method.name}:</span>
          </div>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed pl-5 font-medium text-[11px]">
            {method.instructions}
          </p>
        </div>
      )}
    </div>
  );
}

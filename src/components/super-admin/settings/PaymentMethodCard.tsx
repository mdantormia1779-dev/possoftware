"use client";

import React from "react";
import { Edit2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaymentMethodCardProps {
  method: any;
  onEdit: (m: any) => void;
}

export function PaymentMethodCard({ method, onEdit }: PaymentMethodCardProps) {
  const isBkash = method.method === "BKASH";
  const isNagad = method.method === "NAGAD";
  const isRocket = method.method === "ROCKET";

  return (
    <div className="p-4 rounded-2xl border border-border bg-card shadow-subtle-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-7 px-2.5 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-2xs ${
              isBkash ? "bg-[#D12053]" : isNagad ? "bg-[#F7941D]" : isRocket ? "bg-[#8C3494]" : "bg-indigo-600"
            }`}
          >
            {method.method}
          </div>
          <span className="font-extrabold text-sm text-foreground">{method.name}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            method.isActive
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {method.isActive ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {method.isActive ? "Active" : "Disabled"}
        </span>
      </div>

      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/70 space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Account / Wallet No:</span>
          <span className="font-mono font-bold text-foreground">{method.accountNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground font-medium">Account Type:</span>
          <span className="font-semibold text-purple-600 dark:text-purple-400">{method.accountType}</span>
        </div>
        {method.bankName && (
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">Bank:</span>
            <span className="font-bold text-foreground">{method.bankName}</span>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-1">
        <Button type="button" variant="outline" size="sm" onClick={() => onEdit(method)} className="text-xs">
          <Edit2 className="h-3.5 w-3.5 mr-1.5" />
          <span>Edit Details</span>
        </Button>
      </div>
    </div>
  );
}

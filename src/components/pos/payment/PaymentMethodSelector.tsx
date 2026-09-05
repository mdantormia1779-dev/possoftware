import React from "react";
import { PaymentMethod } from "@/types";
import { Banknote, Smartphone, CreditCard, AlertCircle } from "lucide-react";

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
}

export function PaymentMethodSelector({
  paymentMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
        Select Payment Method
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onSelectMethod("cash")}
          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs ${
            paymentMethod === "cash"
              ? "border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary/20 shadow-subtle-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <Banknote className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Cash Taka</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("bkash")}
          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs ${
            paymentMethod === "bkash"
              ? "border-pink-600 bg-pink-50/70 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold ring-1 ring-pink-600/30 shadow-subtle-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <Smartphone className="h-4 w-4 text-pink-600 shrink-0" />
          <span>bKash QR</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("nagad")}
          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs ${
            paymentMethod === "nagad"
              ? "border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold ring-1 ring-amber-600/30 shadow-subtle-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <Smartphone className="h-4 w-4 text-amber-600 shrink-0" />
          <span>Nagad / Rocket</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("card")}
          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs ${
            paymentMethod === "card"
              ? "border-primary bg-primary/5 text-primary font-bold ring-1 ring-primary/20 shadow-subtle-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <CreditCard className="h-4 w-4 text-primary shrink-0" />
          <span>POS Card</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("due")}
          className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all col-span-2 text-xs ${
            paymentMethod === "due"
              ? "border-destructive bg-destructive/10 text-destructive font-bold ring-1 ring-destructive/30 shadow-subtle-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
          <span>Customer Due Account (Credit Sale)</span>
        </button>
      </div>
    </div>
  );
}

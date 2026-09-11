import React from "react";
import { PaymentMethod } from "@/types";
import { RiMoneyDollarCircleFill, RiSmartphoneFill, RiBankCardFill, RiErrorWarningFill, RiQrCodeLine } from "react-icons/ri";

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
          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs cursor-pointer ${
            paymentMethod === "cash"
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/30 shadow-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <RiMoneyDollarCircleFill className="h-5 w-5 text-emerald-600 shrink-0" />
          <span>Cash Taka</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("bkash")}
          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs cursor-pointer ${
            paymentMethod === "bkash"
              ? "border-pink-600 bg-pink-50/70 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold ring-1 ring-pink-600/30 shadow-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <RiQrCodeLine className="h-5 w-5 text-pink-600 shrink-0" />
          <span>bKash QR</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("nagad")}
          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs cursor-pointer ${
            paymentMethod === "nagad"
              ? "border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold ring-1 ring-amber-600/30 shadow-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <RiSmartphoneFill className="h-5 w-5 text-amber-600 shrink-0" />
          <span>Nagad / Rocket</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("card")}
          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs cursor-pointer ${
            paymentMethod === "card"
              ? "border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold ring-1 ring-indigo-600/30 shadow-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <RiBankCardFill className="h-5 w-5 text-indigo-600 shrink-0" />
          <span>POS Card</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectMethod("due")}
          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all col-span-2 text-xs cursor-pointer ${
            paymentMethod === "due"
              ? "border-destructive bg-destructive/10 text-destructive font-bold ring-1 ring-destructive/30 shadow-xs"
              : "border-border bg-card hover:bg-muted/40 text-foreground"
          }`}
        >
          <RiErrorWarningFill className="h-5 w-5 text-rose-600 shrink-0" />
          <span>Customer Due Account (Credit Ledger Sale)</span>
        </button>
      </div>
    </div>
  );
}

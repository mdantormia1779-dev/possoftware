"use client";

import React from "react";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CheckoutFormProps {
  senderNumber: string;
  onSenderNumberChange: (val: string) => void;
  transactionId: string;
  onTransactionIdChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  submitting: boolean;
  errorMsg: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function CheckoutForm({
  senderNumber,
  onSenderNumberChange,
  transactionId,
  onTransactionIdChange,
  notes,
  onNotesChange,
  submitting,
  errorMsg,
  onSubmit,
}: CheckoutFormProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-4 text-xs">
      <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
        2. Submit Transaction Proof for Super-Admin Verification
      </label>

      {errorMsg && (
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="font-bold text-foreground block mb-1">Your Sender Mobile / Account No</label>
          <input
            type="text"
            required
            value={senderNumber}
            onChange={(e) => onSenderNumberChange(e.target.value)}
            placeholder="e.g. 01712345678"
            className="w-full h-10 px-3.5 rounded-xl border border-border bg-background font-mono"
          />
        </div>

        <div>
          <label className="font-bold text-foreground block mb-1">
            Transaction ID (TrxID) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={transactionId}
            onChange={(e) => onTransactionIdChange(e.target.value)}
            placeholder="e.g. 9K28XLPQ99"
            className="w-full h-10 px-3.5 rounded-xl border border-border bg-background font-mono font-bold uppercase"
          />
        </div>
      </div>

      <div>
        <label className="font-bold text-foreground block mb-1">Payment Notes / Reference (Optional)</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="e.g. Upgrading from Business to Enterprise"
          className="w-full h-9 px-3 rounded-xl border border-border bg-background"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 font-extrabold shadow-md shadow-indigo-600/25 h-11 text-xs"
        >
          <ShieldCheck className="h-4 w-4 mr-2" />
          <span>{submitting ? "Verifying Transaction..." : "Submit Payment for Instant Verification"}</span>
        </Button>
      </div>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface BillingInvoiceRowProps {
  invoice: any;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

export function BillingInvoiceRow({ invoice, onApprove, onReject }: BillingInvoiceRowProps) {
  const [loading, setLoading] = useState(false);
  const isPending = invoice.status === "PENDING";
  const isPaid = invoice.status === "PAID";

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onApprove(invoice.id);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await onReject(invoice.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="p-3.5 font-mono text-purple-600 font-bold">{invoice.invoiceNumber}</td>
      <td className="p-3.5 font-bold text-foreground">
        <div>{invoice.organization?.name || "Unknown Tenant"}</div>
        <div className="text-[10px] text-muted-foreground">{invoice.organization?.phone || invoice.senderNumber || ""}</div>
      </td>
      <td className="p-3.5 font-bold uppercase text-[10px] text-purple-600">{invoice.planTier || "ENTERPRISE"}</td>
      <td className="p-3.5 font-bold font-mono text-foreground">{formatCurrency(invoice.amount)}</td>
      <td className="p-3.5">
        <div className="font-semibold text-foreground">{invoice.paymentMethod}</div>
        <div className="font-mono text-[10px] text-muted-foreground truncate max-w-[120px]">
          Trx: {invoice.transactionId || "N/A"}
        </div>
      </td>
      <td className="p-3.5 text-muted-foreground">{formatDate(invoice.createdAt)}</td>
      <td className="p-3.5 text-right">
        {isPending ? (
          <div className="flex items-center justify-end gap-1.5">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs transition-all disabled:opacity-50 cursor-pointer"
              title="Approve payment & activate plan"
            >
              <Check className="h-3 w-3" />
              <span>Approve</span>
            </button>
            <button
              onClick={handleReject}
              disabled={loading}
              className="flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 dark:bg-rose-950 dark:text-rose-300 transition-all disabled:opacity-50 cursor-pointer"
              title="Reject payment"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isPaid
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
            }`}
          >
            {isPaid ? "Active / Settled" : "Rejected"}
          </span>
        )}
      </td>
    </tr>
  );
}

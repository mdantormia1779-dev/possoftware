"use client";

import React from "react";
import { BillingInvoiceRow } from "./BillingInvoiceRow";

interface BillingInvoiceTableProps {
  invoices: any[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
}

export function BillingInvoiceTable({ invoices, onApprove, onReject }: BillingInvoiceTableProps) {
  if (invoices.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground text-xs font-medium">
        No subscription invoices or payment verification requests found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            <th className="p-3.5 font-semibold text-foreground">Invoice #</th>
            <th className="p-3.5 font-semibold text-foreground">Tenant Organization</th>
            <th className="p-3.5 font-semibold text-foreground">Plan Tier</th>
            <th className="p-3.5 font-semibold text-foreground">Amount</th>
            <th className="p-3.5 font-semibold text-foreground">Method / TrxID</th>
            <th className="p-3.5 font-semibold text-foreground">Date</th>
            <th className="p-3.5 text-right font-semibold text-foreground">Status / Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {invoices.map((inv) => (
            <BillingInvoiceRow key={inv.id} invoice={inv} onApprove={onApprove} onReject={onReject} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

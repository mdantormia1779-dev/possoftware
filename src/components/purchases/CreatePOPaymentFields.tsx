import React from "react";

interface CreatePOPaymentFieldsProps {
  paidAmount: number;
  setPaidAmount: (p: number) => void;
  batchNo: string;
  setBatchNo: (b: string) => void;
}

export function CreatePOPaymentFields({
  paidAmount,
  setPaidAmount,
  batchNo,
  setBatchNo,
}: CreatePOPaymentFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Upfront Paid (৳)</label>
        <input
          type="number"
          min={0}
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono"
        />
      </div>
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Batch / Lot No.</label>
        <input
          type="text"
          value={batchNo}
          onChange={(e) => setBatchNo(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono"
        />
      </div>
    </div>
  );
}

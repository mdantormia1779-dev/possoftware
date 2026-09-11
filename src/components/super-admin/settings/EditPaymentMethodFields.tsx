"use client";

import React from "react";

interface EditPaymentMethodFieldsProps {
  formData: any;
  onChange: (updated: any) => void;
}

export function EditPaymentMethodFields({ formData, onChange }: EditPaymentMethodFieldsProps) {
  return (
    <div className="space-y-4 text-xs">
      <div>
        <label className="font-bold text-foreground block mb-1">Account Number / Wallet ID</label>
        <input
          type="text"
          required
          value={formData.accountNumber || ""}
          onChange={(e) => onChange({ ...formData, accountNumber: e.target.value })}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono font-bold"
        />
      </div>

      <div>
        <label className="font-bold text-foreground block mb-1">Account Type</label>
        <select
          value={formData.accountType || "Merchant"}
          onChange={(e) => onChange({ ...formData, accountType: e.target.value })}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-medium"
        >
          <option value="Merchant">Merchant (Payment)</option>
          <option value="Personal">Personal (Send Money)</option>
          <option value="Agent">Agent (Cash Out)</option>
          <option value="Corporate">Corporate Bank A/C</option>
        </select>
      </div>

      {formData.method === "BANK" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-foreground block mb-1">Bank Name</label>
            <input
              type="text"
              value={formData.bankName || ""}
              onChange={(e) => onChange({ ...formData, bankName: e.target.value })}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            />
          </div>
          <div>
            <label className="font-bold text-foreground block mb-1">Branch & Routing</label>
            <input
              type="text"
              value={formData.branchName || ""}
              placeholder="Branch / Routing"
              onChange={(e) => onChange({ ...formData, branchName: e.target.value })}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            />
          </div>
        </div>
      )}

      <div>
        <label className="font-bold text-foreground block mb-1">Customer Payment Instructions</label>
        <textarea
          rows={3}
          value={formData.instructions || ""}
          onChange={(e) => onChange({ ...formData, instructions: e.target.value })}
          className="w-full p-2.5 rounded-xl border border-border bg-background leading-relaxed"
          placeholder="Step-by-step instructions shown on the checkout page"
        />
      </div>
    </div>
  );
}

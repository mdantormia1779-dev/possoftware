import React from "react";
import { AccountType } from "@/lib/types";
import { NewAccountData } from "./AddAccountModal";

interface AddAccountFormFieldsProps {
  newAcc: NewAccountData;
  setNewAcc: React.Dispatch<React.SetStateAction<NewAccountData>>;
}

export function AddAccountFormFields({
  newAcc,
  setNewAcc,
}: AddAccountFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Account Code</label>
          <input
            type="text"
            required
            placeholder="e.g. 5070"
            value={newAcc.code}
            onChange={(e) => setNewAcc((prev) => ({ ...prev, code: e.target.value }))}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Account Type</label>
          <select
            value={newAcc.type}
            onChange={(e) => setNewAcc((prev) => ({ ...prev, type: e.target.value as AccountType }))}
            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="asset">Asset</option>
            <option value="liability">Liability</option>
            <option value="equity">Equity</option>
            <option value="revenue">Revenue</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Account Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Generator Fuel & Maintenance"
          value={newAcc.name}
          onChange={(e) => setNewAcc((prev) => ({ ...prev, name: e.target.value }))}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Opening Balance (৳)</label>
        <input
          type="number"
          value={newAcc.balance}
          onChange={(e) => setNewAcc((prev) => ({ ...prev, balance: parseFloat(e.target.value) || 0 }))}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Description / Notes</label>
        <input
          type="text"
          placeholder="e.g. Outlets backup power generator expenses"
          value={newAcc.description}
          onChange={(e) => setNewAcc((prev) => ({ ...prev, description: e.target.value }))}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>
    </>
  );
}

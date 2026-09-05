import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { QuickAddCustomerForm } from "./QuickAddCustomerForm";

interface PaymentCustomerSelectorProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer | null) => void;
  onAddCustomer: (name: string, phone: string) => void;
}

export function PaymentCustomerSelector({
  customers,
  selectedCustomer,
  onSelectCustomer,
  onAddCustomer,
}: PaymentCustomerSelectorProps) {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
          Customer
        </label>
        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <UserPlus className="h-3.5 w-3.5" />
          {showAdd ? "Select Existing" : "Add New"}
        </button>
      </div>

      {showAdd ? (
        <QuickAddCustomerForm
          onSave={(name, phone) => {
            onAddCustomer(name, phone);
            setShowAdd(false);
          }}
        />
      ) : (
        <select
          value={selectedCustomer?.id || ""}
          onChange={(e) => {
            const found = customers.find((c) => c.id === e.target.value) || null;
            onSelectCustomer(found);
          }}
          className="w-full h-10 px-3 rounded-lg border border-border bg-card text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        >
          <option value="">Walk-in Customer (General)</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.phone}) - {c.loyaltyPoints} Pts{" "}
              {c.dueBalance > 0 ? `[Due: ${formatCurrency(c.dueBalance)}]` : ""}
            </option>
          ))}
        </select>
      )}

      {selectedCustomer && (
        <div className="text-[11px] text-muted-foreground flex justify-between bg-muted/30 p-2.5 rounded-lg border border-border">
          <span>
            Loyalty Points: <strong className="text-foreground font-mono">{selectedCustomer.loyaltyPoints}</strong>
          </span>
          <span>
            Due Balance:{" "}
            <strong className={`font-mono ${selectedCustomer.dueBalance > 0 ? "text-rose-600" : "text-emerald-600"}`}>
              {formatCurrency(selectedCustomer.dueBalance)}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}

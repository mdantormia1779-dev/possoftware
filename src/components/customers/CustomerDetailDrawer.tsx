import React from "react";
import { X, MapPin, Mail } from "lucide-react";
import { Customer } from "@/types";
import { Button } from "@/components/ui/Button";
import { CustomerStatsGrid } from "./CustomerStatsGrid";

interface CustomerDetailDrawerProps {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerDetailDrawer({
  customer,
  onClose,
}: CustomerDetailDrawerProps) {
  if (!customer) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-card border-l border-border p-6 flex flex-col justify-between shadow-subtle-lg overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
        <div className="space-y-4">
          <div className="flex justify-between items-start border-b border-border pb-3">
            <div>
              <h3 className="text-lg font-bold text-foreground">{customer.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {customer.phone}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <CustomerStatsGrid customer={customer} />

          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{customer.address || "No address recorded"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{customer.email || "No email on file"}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            variant="primary"
            size="sm"
            className="w-full shadow-subtle-xs"
            onClick={onClose}
          >
            Close Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

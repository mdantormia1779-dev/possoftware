import React from "react";
import { AccountType } from "@/lib/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddAccountFormFields } from "./AddAccountFormFields";

export interface NewAccountData {
  code: string;
  name: string;
  type: AccountType;
  balance: number;
  description: string;
}

interface AddAccountModalProps {
  show: boolean;
  onClose: () => void;
  newAcc: NewAccountData;
  setNewAcc: React.Dispatch<React.SetStateAction<NewAccountData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddAccountModal({
  show,
  onClose,
  newAcc,
  setNewAcc,
  onSubmit,
}: AddAccountModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Add General Ledger Account</h3>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <AddAccountFormFields newAcc={newAcc} setNewAcc={setNewAcc} />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

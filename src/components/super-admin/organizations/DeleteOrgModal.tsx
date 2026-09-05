"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Organization } from "@/lib/types";

interface DeleteOrgModalProps {
  isOpen: boolean;
  org: Organization | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteOrgModal({
  isOpen,
  org,
  onClose,
  onConfirm,
}: DeleteOrgModalProps) {
  if (!isOpen || !org) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-rose-200 dark:border-rose-900 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="h-10 w-10 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-foreground">Delete Company &amp; Purge All Data</h3>
            <span className="text-[11px] text-rose-600 font-bold">Irreversible Super Admin Action</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Are you sure you want to completely delete <strong className="text-foreground">{org.name}</strong>?
          This will immediately and permanently delete:
        </p>

        <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
          <li>All branches and warehouses of this company</li>
          <li>All catalog products, SKUs, and inventory stock</li>
          <li>All POS transactions, receipts, and sales records</li>
          <li>All customer ledger records and dues</li>
          <li>All employees, attendance, and payroll records</li>
        </ul>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
          >
            Permanently Delete Everything
          </Button>
        </div>
      </div>
    </div>
  );
}

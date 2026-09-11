"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlanData } from "./planTypes";

interface DeletePlanModalProps {
  isOpen: boolean;
  plan: PlanData | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeletePlanModal({ isOpen, plan, onClose, onConfirm }: DeletePlanModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const handleDelete = async () => {
    if (!plan.id) return;
    setLoading(true);
    try {
      await onConfirm(plan.id);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-rose-200 dark:border-rose-900 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl">
        <div className="flex items-center gap-3 text-rose-600">
          <div className="h-10 w-10 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-foreground">Delete Subscription Plan</h3>
            <span className="text-[11px] text-rose-600 font-bold">Irreversible Action</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Are you sure you want to permanently delete the <strong className="text-foreground">{plan.name}</strong> tier?
          Existing organizations subscribed to this plan should be reassigned before deleting.
        </p>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
            disabled={loading}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
          >
            {loading ? "Deleting..." : "Delete Plan"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Layers, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlanData } from "./planTypes";
import { PlanFormFields } from "./PlanFormFields";

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PlanData) => Promise<void>;
}

const initialData: PlanData = {
  name: "",
  tier: "STARTER",
  monthlyPrice: 2999,
  maxBranches: 1,
  maxStaff: 5,
  features: ["1 Branch", "5 Staff Accounts", "Standard POS"],
};

export function CreatePlanModal({ isOpen, onClose, onSave }: CreatePlanModalProps) {
  const [data, setData] = useState<PlanData>(initialData);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(data);
      setData(initialData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-base text-foreground">Create Subscription Tier</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <PlanFormFields data={data} onChange={setData} />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? "Creating..." : "Save Plan Tier"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

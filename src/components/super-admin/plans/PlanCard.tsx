"use client";

import React from "react";
import { CheckCircle2, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { PlanData } from "./planTypes";

interface PlanCardProps {
  plan: PlanData;
  onEdit: (plan: PlanData) => void;
  onDelete: (plan: PlanData) => void;
}

export function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const feats: string[] = Array.isArray(plan.features)
    ? plan.features
    : typeof plan.features === "string" && plan.features.startsWith("[")
    ? JSON.parse(plan.features || "[]")
    : typeof plan.features === "string" && plan.features
    ? plan.features.split(",").map((s) => s.trim())
    : [`${plan.maxBranches || 1} Branches`, `${plan.maxStaff || 5} Staff`];

  return (
    <div className="p-6 rounded-3xl border border-border bg-card shadow-xs space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            {plan.tier || "Active Tier"}
          </span>
        </div>

        <div className="text-3xl font-extrabold text-foreground">
          {formatCurrency(plan.monthlyPrice)}
          <span className="text-xs font-normal text-muted-foreground"> / mo</span>
        </div>

        <ul className="space-y-2 text-xs text-muted-foreground pt-2">
          {feats.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(plan)}>
          <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 border-rose-200 dark:border-rose-900"
          onClick={() => onDelete(plan)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { RiVipCrownFill, RiRocket2Fill, RiSparklingFill, RiCheckboxCircleFill, RiBuildingLine, RiTeamLine } from "react-icons/ri";
import { TbPencil, TbTrash } from "react-icons/tb";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { PlanData } from "./planTypes";

interface PlanCardProps {
  plan: PlanData;
  onEdit: (plan: PlanData) => void;
  onDelete: (plan: PlanData) => void;
}

export function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const isEnterprise = plan.tier === "ENTERPRISE";
  const isBusiness = plan.tier === "BUSINESS";

  const feats: string[] = Array.isArray(plan.features)
    ? plan.features
    : typeof plan.features === "string" && plan.features.startsWith("[")
    ? JSON.parse(plan.features || "[]")
    : typeof plan.features === "string" && plan.features
    ? plan.features.split(",").map((s) => s.trim())
    : [`${plan.maxBranches || 1} Branches`, `${plan.maxStaff || 5} Staff`];

  return (
    <div className={`p-6 rounded-3xl border bg-card shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between ${
      isBusiness ? "border-purple-500/40 ring-1 ring-purple-500/20" : "border-border"
    }`}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {isEnterprise ? (
              <RiVipCrownFill className="h-5 w-5 text-amber-500" />
            ) : isBusiness ? (
              <RiRocket2Fill className="h-5 w-5 text-purple-600" />
            ) : (
              <RiSparklingFill className="h-5 w-5 text-emerald-500" />
            )}
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-purple-100/80 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300">
            {plan.tier}
          </span>
        </div>

        <div className="text-3xl font-black text-foreground">
          {formatCurrency(plan.monthlyPrice)}
          <span className="text-xs font-normal text-muted-foreground"> / month</span>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/60 text-foreground font-medium">
            <RiBuildingLine className="h-3.5 w-3.5 text-purple-600" />
            <span>{plan.maxBranches} Branches</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/60 text-foreground font-medium">
            <RiTeamLine className="h-3.5 w-3.5 text-indigo-600" />
            <span>{plan.maxStaff} Staff</span>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-muted-foreground pt-2">
          {feats.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <RiCheckboxCircleFill className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-border flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1 font-semibold" onClick={() => onEdit(plan)}>
          <TbPencil className="h-3.5 w-3.5 mr-1 text-purple-600" /> Edit Plan
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 border-rose-200 dark:border-rose-900/60"
          onClick={() => onDelete(plan)}
        >
          <TbTrash className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}

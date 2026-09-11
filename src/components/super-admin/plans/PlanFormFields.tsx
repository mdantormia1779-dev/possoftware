"use client";

import React from "react";
import { PlanData } from "./planTypes";

interface PlanFormFieldsProps {
  data: PlanData;
  onChange: (updated: PlanData) => void;
}

const inputClass = "w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20";

export function PlanFormFields({ data, onChange }: PlanFormFieldsProps) {
  const feats = Array.isArray(data.features)
    ? data.features.join(", ")
    : typeof data.features === "string" && data.features.startsWith("[")
    ? JSON.parse(data.features || "[]").join(", ")
    : (data.features as string) || "";

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold mb-1">Plan Display Name</label>
        <input type="text" value={data.name} onChange={(e) => onChange({ ...data, name: e.target.value })} placeholder="e.g. Pro Enterprise" className={inputClass} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1">Tier</label>
          <select value={data.tier} onChange={(e) => onChange({ ...data, tier: e.target.value as any })} className={inputClass}>
            <option value="STARTER">Starter</option>
            <option value="BUSINESS">Business</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="TRIAL">Trial</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Monthly Price (৳)</label>
          <input type="number" value={data.monthlyPrice} onChange={(e) => onChange({ ...data, monthlyPrice: Number(e.target.value) })} className={inputClass} required min={0} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1">Max Branches</label>
          <input type="number" value={data.maxBranches} onChange={(e) => onChange({ ...data, maxBranches: Number(e.target.value) })} className={inputClass} min={1} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Max Staff</label>
          <input type="number" value={data.maxStaff} onChange={(e) => onChange({ ...data, maxStaff: Number(e.target.value) })} className={inputClass} min={1} />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1">Features (comma separated)</label>
        <input type="text" value={feats} onChange={(e) => onChange({ ...data, features: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="3 Branches, 20 Staff Accounts" className={inputClass} />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { PlanData } from "./planTypes";

interface PlanFormFieldsProps {
  data: PlanData;
  onChange: (updated: PlanData) => void;
}

export function PlanFormFields({ data, onChange }: PlanFormFieldsProps) {
  const featuresText = Array.isArray(data.features)
    ? data.features.join(", ")
    : typeof data.features === "string" && data.features.startsWith("[")
    ? JSON.parse(data.features || "[]").join(", ")
    : (data.features as string) || "";

  const handleFeaturesChange = (val: string) => {
    const list = val.split(",").map((s) => s.trim()).filter(Boolean);
    onChange({ ...data, features: list });
  };

  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">Plan Display Name</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="e.g. Pro Enterprise"
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Subscription Tier</label>
          <select
            value={data.tier}
            onChange={(e) => onChange({ ...data, tier: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="STARTER">Starter</option>
            <option value="BUSINESS">Business</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="TRIAL">Trial</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Monthly Price (৳)</label>
          <input
            type="number"
            value={data.monthlyPrice}
            onChange={(e) => onChange({ ...data, monthlyPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            required
            min={0}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Max Branches</label>
          <input
            type="number"
            value={data.maxBranches}
            onChange={(e) => onChange({ ...data, maxBranches: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            min={1}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Max Staff Accounts</label>
          <input
            type="number"
            value={data.maxStaff}
            onChange={(e) => onChange({ ...data, maxStaff: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            min={1}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">Features (comma separated)</label>
        <input
          type="text"
          value={featuresText}
          onChange={(e) => handleFeaturesChange(e.target.value)}
          placeholder="3 Branches, 20 Staff Accounts, Full POS & Accounting"
          className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </div>
    </div>
  );
}

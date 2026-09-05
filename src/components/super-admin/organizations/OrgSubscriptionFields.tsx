"use client";

import React from "react";
import { PlanTier, SubscriptionStatus } from "@/lib/types";
import { OrgFormData } from "./OrgFormFields";

interface OrgSubscriptionFieldsProps {
  data: OrgFormData;
  update: (key: keyof OrgFormData, val: any) => void;
}

export function OrgSubscriptionFields({ data, update }: OrgSubscriptionFieldsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Subscription Plan Tier</label>
        <select
          value={data.plan}
          onChange={(e) => update("plan", e.target.value as PlanTier)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="starter">Starter Plan</option>
          <option value="business">Business Plan</option>
          <option value="enterprise">Enterprise Plan</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Status</label>
        <select
          value={data.status}
          onChange={(e) => update("status", e.target.value as SubscriptionStatus)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="cancelled">Suspended</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Max Outlets</label>
        <input
          type="number"
          min="1"
          value={data.maxBranches}
          onChange={(e) => update("maxBranches", Number(e.target.value))}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Max Staff Users</label>
        <input
          type="number"
          min="1"
          value={data.maxStaff}
          onChange={(e) => update("maxStaff", Number(e.target.value))}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </>
  );
}

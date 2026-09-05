"use client";

import React from "react";
import { PlanTier, SubscriptionStatus } from "@/lib/types";
import { OrgSubscriptionFields } from "./OrgSubscriptionFields";

export interface OrgFormData {
  name: string;
  type: string;
  city: string;
  email: string;
  phone: string;
  plan: PlanTier;
  status: SubscriptionStatus;
  maxBranches: number;
  maxStaff: number;
}

interface OrgFormFieldsProps {
  data: OrgFormData;
  onChange: (data: OrgFormData) => void;
}

export function OrgFormFields({ data, onChange }: OrgFormFieldsProps) {
  const update = (key: keyof OrgFormData, val: any) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="space-y-1.5 sm:col-span-2">
        <label className="font-bold text-foreground">Company Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Apex Footwear Ltd"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Industry / Business Type</label>
        <select
          value={data.type}
          onChange={(e) => update("type", e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Fashion & Retail">Fashion &amp; Retail</option>
          <option value="Grocery & Supermarket">Grocery &amp; Supermarket</option>
          <option value="Electronics & Gadgets">Electronics &amp; Gadgets</option>
          <option value="Restaurant & Cafe">Restaurant &amp; Cafe</option>
          <option value="Pharmacy & Healthcare">Pharmacy &amp; Healthcare</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">City</label>
        <input
          type="text"
          placeholder="Dhaka, Chittagong, Sylhet..."
          value={data.city}
          onChange={(e) => update("city", e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Admin Email</label>
        <input
          type="email"
          placeholder="admin@company.com"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-bold text-foreground">Phone Number</label>
        <input
          type="text"
          placeholder="+8801700000000"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <OrgSubscriptionFields data={data} update={update} />
    </div>
  );
}

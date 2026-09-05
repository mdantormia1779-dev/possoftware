"use client";

import React, { useState, useEffect } from "react";
import { Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Organization } from "@/lib/types";
import { OrgFormData, OrgFormFields } from "./OrgFormFields";

interface EditOrgModalProps {
  isOpen: boolean;
  org: Organization | null;
  onClose: () => void;
  onSave: (updated: Organization) => void;
}

export function EditOrgModal({ isOpen, org, onClose, onSave }: EditOrgModalProps) {
  const [data, setData] = useState<OrgFormData | null>(null);

  useEffect(() => {
    if (org) {
      setData({
        name: org.name,
        type: org.businessType,
        city: org.address?.split(",")[0] || "Dhaka",
        email: org.email || "",
        phone: org.phone || "",
        plan: org.subscriptionPlan,
        status: org.subscriptionStatus,
        maxBranches: org.maxBranches,
        maxStaff: org.maxStaff,
      });
    }
  }, [org]);

  if (!isOpen || !org || !data) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...org,
      name: data.name,
      businessType: data.type,
      email: data.email,
      phone: data.phone,
      address: data.city + ", Bangladesh",
      subscriptionPlan: data.plan,
      subscriptionStatus: data.status,
      maxBranches: Number(data.maxBranches),
      maxStaff: Number(data.maxStaff),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-base text-foreground">Configure: {org.name}</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <OrgFormFields data={data} onChange={setData} />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="bg-purple-600 hover:bg-purple-700">
              Update Configuration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

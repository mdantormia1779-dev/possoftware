"use client";

import React, { useState } from "react";
import { Building2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { OrgFormData, OrgFormFields } from "./OrgFormFields";

interface CreateOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: OrgFormData) => void;
}

const initialData: OrgFormData = {
  name: "",
  type: "Fashion & Retail",
  city: "Dhaka",
  email: "",
  phone: "",
  plan: "business",
  status: "active",
  maxBranches: 5,
  maxStaff: 15,
};

export function CreateOrgModal({ isOpen, onClose, onSave }: CreateOrgModalProps) {
  const [data, setData] = useState<OrgFormData>(initialData);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(data);
    setData(initialData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-base text-foreground">Create New Tenant Company</h3>
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
              Provision Tenant Organization
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

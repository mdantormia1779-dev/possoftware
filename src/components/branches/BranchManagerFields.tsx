import React from "react";
import { BranchFormData } from "./AddBranchFormFields";

interface BranchManagerFieldsProps {
  form: BranchFormData;
  update: (key: keyof BranchFormData, value: string) => void;
}

export function BranchManagerFields({ form, update }: BranchManagerFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Branch Manager Name</label>
        <input
          type="text"
          placeholder="e.g. Asif Mahmud"
          value={form.managerName}
          onChange={(e) => update("managerName", e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Manager Phone</label>
        <input
          type="text"
          placeholder="+880 1819-xxxxxx"
          value={form.managerPhone}
          onChange={(e) => update("managerPhone", e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}

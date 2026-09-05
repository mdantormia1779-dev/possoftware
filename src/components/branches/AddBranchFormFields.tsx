import React from "react";
import { BranchManagerFields } from "./BranchManagerFields";

export interface BranchFormData {
  name: string;
  code: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  managerName: string;
  managerPhone: string;
}

interface AddBranchFormFieldsProps {
  form: BranchFormData;
  setForm: React.Dispatch<React.SetStateAction<BranchFormData>>;
}

export function AddBranchFormFields({ form, setForm }: AddBranchFormFieldsProps) {
  const update = (key: keyof BranchFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Branch Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Uttara Sector 7 Outlet"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Branch Code</label>
          <input
            type="text"
            required
            placeholder="BR-UTT-04"
            value={form.code}
            onChange={(e) => update("code", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card font-mono uppercase text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Phone Number</label>
          <input
            type="text"
            placeholder="+880 1711-xxxxxx"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">City</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Physical Address</label>
        <input
          type="text"
          placeholder="Plot 12, Road 4, Sector 7, Uttara, Dhaka"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <BranchManagerFields form={form} update={update} />
    </>
  );
}

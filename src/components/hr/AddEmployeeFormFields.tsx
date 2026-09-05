import React from "react";
import { Branch } from "@/types";
import { EmployeeSalaryFields } from "./EmployeeSalaryFields";

export interface NewEmployeeForm {
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  branchId: string;
  baseSalary: number;
  commissionRate: number;
  bankAccountNo: string;
}

interface AddEmployeeFormFieldsProps {
  formData: NewEmployeeForm;
  setFormData: (val: any) => void;
  branches: Branch[];
}

export function AddEmployeeFormFields({
  formData,
  setFormData,
  branches,
}: AddEmployeeFormFieldsProps) {
  const update = (key: keyof NewEmployeeForm, val: any) =>
    setFormData((prev: any) => ({ ...prev, [key]: val }));

  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Full Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Asif Mahmud"
          value={formData.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Designation</label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Cashier"
            value={formData.designation}
            onChange={(e) => update("designation", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Branch Outlet</label>
          <select
            value={formData.branchId}
            onChange={(e) => update("branchId", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {branches.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Phone</label>
          <input
            type="text"
            required
            placeholder="+880 1711-xxxxxx"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Email</label>
          <input
            type="email"
            placeholder="staff@company.com"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <EmployeeSalaryFields formData={formData} update={update} />
    </div>
  );
}

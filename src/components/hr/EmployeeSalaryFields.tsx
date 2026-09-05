import React from "react";
import { NewEmployeeForm } from "./AddEmployeeFormFields";

interface EmployeeSalaryFieldsProps {
  formData: NewEmployeeForm;
  update: (key: keyof NewEmployeeForm, val: any) => void;
}

export function EmployeeSalaryFields({
  formData,
  update,
}: EmployeeSalaryFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Base Salary (৳)</label>
          <input
            type="number"
            required
            value={formData.baseSalary}
            onChange={(e) => update("baseSalary", parseFloat(e.target.value) || 0)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card font-bold font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Commission (%)</label>
          <input
            type="number"
            step="0.1"
            value={formData.commissionRate}
            onChange={(e) => update("commissionRate", parseFloat(e.target.value) || 0)}
            className="w-full h-10 px-3 rounded-xl border border-border bg-card font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-foreground">Disbursement Bank A/C or bKash</label>
        <input
          type="text"
          placeholder="e.g. bKash Personal: 01711-xxxxxx"
          value={formData.bankAccountNo}
          onChange={(e) => update("bankAccountNo", e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </>
  );
}

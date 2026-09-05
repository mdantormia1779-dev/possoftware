import React from "react";
import { Employee } from "@/types";

interface EmployeeProfileTabProps {
  emp: Employee;
}

export function EmployeeProfileTab({ emp }: EmployeeProfileTabProps) {
  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Contact Phone</span>
          <p className="font-mono text-sm font-semibold text-foreground">{emp.phone}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Email Address</span>
          <p className="text-sm font-semibold text-foreground">{emp.email || "staff@company.com"}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Assigned Outlet</span>
          <p className="text-sm font-semibold text-foreground">{emp.branchName}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Disbursement Account</span>
          <p className="text-sm font-mono font-semibold text-foreground">
            {emp.bankAccountNo || "bKash: 01711-xxxxxx"}
          </p>
        </div>
      </div>
    </div>
  );
}

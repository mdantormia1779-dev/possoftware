import React from "react";
import { Employee } from "@/types";
import { EmployeeCard } from "./EmployeeCard";

interface EmployeeGridProps {
  employees: Employee[];
  onSelectEmp: (emp: Employee) => void;
}

export function EmployeeGrid({ employees, onSelectEmp }: EmployeeGridProps) {
  if (employees.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl border border-border bg-card text-muted-foreground text-xs">
        No staff members found matching search criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {employees.map((emp) => (
        <EmployeeCard key={emp.id} emp={emp} onSelectEmp={onSelectEmp} />
      ))}
    </div>
  );
}

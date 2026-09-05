import React from "react";
import { Building2, Phone, Eye } from "lucide-react";
import { Employee } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface EmployeeCardProps {
  emp: Employee;
  onSelectEmp: (emp: Employee) => void;
}

export function EmployeeCard({ emp, onSelectEmp }: EmployeeCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-subtle-xs hover:shadow-subtle-sm hover:border-indigo-400 transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <img
            src={
              emp.photoUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
            }
            alt={emp.name}
            className="h-11 w-11 rounded-xl object-cover border border-border shrink-0"
          />
          <div className="truncate">
            <h3 className="text-sm font-bold text-foreground truncate">{emp.name}</h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block truncate">
              {emp.designation}
            </span>
            <span className="text-[10px] text-muted-foreground font-mono block">
              {emp.employeeId}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{emp.branchName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="font-mono text-[11px]">{emp.phone}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border text-xs">
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border font-mono">
            <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider font-sans">
              Base Salary
            </span>
            <strong className="text-foreground text-xs font-bold">
              {formatCurrency(emp.baseSalary)}
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/30 border border-border font-mono">
            <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider font-sans">
              Commission
            </span>
            <strong className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              {emp.commissionRate}%
            </strong>
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectEmp(emp)}
          className="w-full text-xs font-bold gap-1.5"
        >
          <Eye className="h-3.5 w-3.5" /> View Profile 360
        </Button>
      </div>
    </div>
  );
}

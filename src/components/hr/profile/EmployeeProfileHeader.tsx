import React from "react";
import { X } from "lucide-react";
import { Employee } from "@/types";
import { formatDate } from "@/lib/utils";

interface EmployeeProfileHeaderProps {
  emp: Employee;
  onClose: () => void;
}

export function EmployeeProfileHeader({ emp, onClose }: EmployeeProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-border">
      <div className="flex items-center gap-3.5">
        <img
          src={emp.photoUrl}
          alt={emp.name}
          className="h-14 w-14 rounded-2xl object-cover border border-border shadow-xs"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-lg text-foreground">{emp.name}</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
              Active
            </span>
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {emp.designation} • {emp.department}
          </p>
          <p className="text-[11px] text-muted-foreground font-mono">
            ID: {emp.employeeId} | Joined: {formatDate(emp.joiningDate)}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}

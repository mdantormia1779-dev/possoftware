import React from "react";
import Link from "next/link";
import { Users, CalendarCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HrHeaderProps {
  onAddClick: () => void;
}

export function HrHeader({ onAddClick }: HrHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Staff Directory &amp; HR Operations</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Employee profiles, base salaries, outlet assignments, and sales commission incentives
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/app/attendance"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
        >
          <CalendarCheck className="h-3.5 w-3.5" />
          <span>Daily Attendance</span>
        </Link>
        <Button
          variant="primary"
          size="sm"
          onClick={onAddClick}
          className="shadow-sm font-bold"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Employee
        </Button>
      </div>
    </div>
  );
}

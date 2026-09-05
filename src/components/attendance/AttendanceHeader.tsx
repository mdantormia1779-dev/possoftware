import React from "react";
import Link from "next/link";
import { CalendarCheck, ArrowLeft, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AttendanceHeaderProps {
  onCheckInClick: () => void;
}

export function AttendanceHeader({ onCheckInClick }: AttendanceHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CalendarCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Daily Attendance Dashboard</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track check-in times, late arrivals, absences, and leave approvals across outlets
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={onCheckInClick}>
        <UserCheck className="h-4 w-4 mr-1" /> Quick Check In / Out
      </Button>
    </div>
  );
}

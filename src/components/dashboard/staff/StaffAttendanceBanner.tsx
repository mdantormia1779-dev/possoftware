"use client";

import React from "react";
import { Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTenant } from "@/lib/context/TenantContext";

interface StaffAttendanceBannerProps {
  branchName: string;
  isClockedIn: boolean;
  onToggleClock: () => void;
}

export function StaffAttendanceBanner({
  branchName,
  isClockedIn,
  onToggleClock,
}: StaffAttendanceBannerProps) {
  const { currentUser } = useTenant();
  const staffName = currentUser?.name || "Kamrul Hassan";
  const staffEmail = currentUser?.email || "staff@rahmanfashion.com.bd";

  return (
    <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-200/80 dark:border-purple-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-700 dark:text-purple-300">
            <Users className="h-4 w-4" />
          </span>
          <h2 className="text-base sm:text-lg font-black text-foreground">
            Store Floor Staff • {branchName}
          </h2>
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
              isClockedIn
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isClockedIn ? "● Shift Active (Clocked In)" : "○ Off Duty"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Associate: <span className="font-semibold text-foreground">{staffName}</span> ({staffEmail}) &bull; Morning Retail &bull; Dept: Apparel
        </p>
      </div>

      <Button
        onClick={onToggleClock}
        variant={isClockedIn ? "outline" : "primary"}
        className="text-xs font-bold shrink-0"
      >
        <Clock className="h-3.5 w-3.5 mr-1.5" />
        <span>{isClockedIn ? "Clock Out" : "Clock In to Shift"}</span>
      </Button>
    </div>
  );
}

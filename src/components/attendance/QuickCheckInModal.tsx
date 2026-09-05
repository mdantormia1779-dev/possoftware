import React from "react";
import { Employee, AttendanceStatus } from "@/lib/types";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface CheckInData {
  employeeId: string;
  status: AttendanceStatus;
  notes: string;
}

interface QuickCheckInModalProps {
  show: boolean;
  onClose: () => void;
  employees: Employee[];
  checkInData: CheckInData;
  setCheckInData: React.Dispatch<React.SetStateAction<CheckInData>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function QuickCheckInModal({
  show,
  onClose,
  employees,
  checkInData,
  setCheckInData,
  onSubmit,
}: QuickCheckInModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Manual Attendance Entry</h3>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Select Employee</label>
            <select
              value={checkInData.employeeId}
              onChange={(e) => setCheckInData({ ...checkInData, employeeId: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-border bg-background"
            >
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name} ({e.employeeId}) - {e.branchName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Attendance Status</label>
            <select
              value={checkInData.status}
              onChange={(e) =>
                setCheckInData({ ...checkInData, status: e.target.value as AttendanceStatus })
              }
              className="w-full h-9 px-3 rounded-lg border border-border bg-background uppercase font-bold"
            >
              <option value="present">Present (On Time)</option>
              <option value="late">Late Arrival</option>
              <option value="absent">Absent</option>
              <option value="on_leave">Casual / Sick Leave</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Remarks / Note</label>
            <input
              type="text"
              placeholder="e.g. Field assignment or traffic delay"
              value={checkInData.notes}
              onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
              className="w-full h-9 px-3 rounded-lg border border-border bg-background"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Record Attendance
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

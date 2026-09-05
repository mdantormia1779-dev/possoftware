import React, { useState } from "react";
import { Printer } from "lucide-react";
import { Employee } from "@/types";
import { Button } from "@/components/ui/Button";
import { EmployeeProfileHeader } from "./EmployeeProfileHeader";
import { EmployeeProfileTabsBar, EmployeeProfileTab as TabType } from "./EmployeeProfileTabsBar";
import { EmployeeProfileTab } from "./EmployeeProfileTab";
import { EmployeeAttendanceTab } from "./EmployeeAttendanceTab";
import { EmployeeLeaveTab } from "./EmployeeLeaveTab";
import { EmployeePayrollTab } from "./EmployeePayrollTab";
import { EmployeeCommissionsTab } from "./EmployeeCommissionsTab";

interface EmployeeProfileDrawerProps {
  emp: Employee | null;
  onClose: () => void;
}

export function EmployeeProfileDrawer({ emp, onClose }: EmployeeProfileDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  if (!emp) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <EmployeeProfileHeader emp={emp} onClose={onClose} />

        <EmployeeProfileTabsBar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" && <EmployeeProfileTab emp={emp} />}
        {activeTab === "attendance" && <EmployeeAttendanceTab />}
        {activeTab === "leave" && <EmployeeLeaveTab />}
        {activeTab === "payroll" && <EmployeePayrollTab emp={emp} />}
        {activeTab === "commissions" && <EmployeeCommissionsTab emp={emp} />}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="gap-1.5 text-xs font-bold"
          >
            <Printer className="h-4 w-4" /> Print Full Employee Dossier
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onClose}
            className="font-bold text-xs"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

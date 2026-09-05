"use client";

import React from "react";
import { storageService } from "@/lib/services/storage";
import { CommissionsHeader } from "@/components/commissions/CommissionsHeader";
import { CommissionsKpis } from "@/components/commissions/CommissionsKpis";
import { CommissionsTable } from "@/components/commissions/CommissionsTable";

export default function CommissionsPage() {
  const employees = storageService.getEmployees();

  const totalCommissionsEarned = employees.reduce((sum, emp) => {
    return sum + (emp.baseSalary * emp.commissionRate * 1.5) / 100;
  }, 0);

  const activeStaffCount = employees.filter((e) => e.commissionRate > 0).length;

  return (
    <div className="space-y-6">
      <CommissionsHeader />

      <CommissionsKpis
        totalCommissionsEarned={totalCommissionsEarned}
        activeStaffCount={activeStaffCount}
      />

      <CommissionsTable employees={employees} />
    </div>
  );
}

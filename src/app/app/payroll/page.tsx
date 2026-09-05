"use client";

import React from "react";
import { usePayroll } from "@/components/payroll/usePayroll";
import { PayrollHeader } from "@/components/payroll/PayrollHeader";
import { PayrollRunCards } from "@/components/payroll/PayrollRunCards";
import { PayrollItemsTable } from "@/components/payroll/PayrollItemsTable";
import { PayrollPayslipModal } from "@/components/payroll/PayrollPayslipModal";

export default function PayrollPage() {
  const {
    currentOrg,
    payrollRuns,
    selectedRun,
    setSelectedRun,
    activePayslipItem,
    setActivePayslipItem,
    handleGenerateNewMonthPayroll,
  } = usePayroll();

  return (
    <div className="space-y-6">
      <PayrollHeader onCalculateNextMonth={handleGenerateNewMonthPayroll} />

      <PayrollRunCards
        payrollRuns={payrollRuns}
        selectedRun={selectedRun}
        onSelectRun={setSelectedRun}
      />

      {selectedRun && (
        <PayrollItemsTable
          selectedRun={selectedRun}
          onViewPayslip={setActivePayslipItem}
        />
      )}

      <PayrollPayslipModal
        item={activePayslipItem}
        run={selectedRun}
        currentOrg={currentOrg}
        onClose={() => setActivePayslipItem(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { PayrollRun, PayrollItem } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CreditCard,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Printer,
  Download,
  Calendar,
  Sparkles,
  X,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function PayrollPage() {
  const { currentOrg } = useTenant();
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(() => storageService.getPayrollRuns());
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(payrollRuns[0] || null);
  const [activePayslipItem, setActivePayslipItem] = useState<PayrollItem | null>(null);

  const employees = storageService.getEmployees();

  const handleGenerateNewMonthPayroll = () => {
    const items: PayrollItem[] = employees.map((emp) => {
      const commission = Math.round(emp.baseSalary * (emp.commissionRate / 100) * 1.5);
      const deductions = 0;
      const net = emp.baseSalary + commission - deductions;
      return {
        id: `pi-${Date.now()}-${emp.id}`,
        employeeId: emp.id,
        employeeName: emp.name,
        designation: emp.designation,
        branchName: emp.branchName,
        baseSalary: emp.baseSalary,
        deductions,
        commission,
        netSalary: net,
        isPaid: true,
      };
    });

    const totalAmount = items.reduce((sum, i) => sum + i.netSalary, 0);

    const newRun: PayrollRun = {
      id: `pr-${Date.now()}`,
      organizationId: currentOrg.id,
      monthYear: "March 2026",
      totalAmount,
      status: "approved",
      processedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      items,
    };

    storageService.addPayrollRun(newRun);
    setPayrollRuns(storageService.getPayrollRuns());
    setSelectedRun(newRun);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Payroll Processing & Payslips</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Monthly salary calculations, commissions, tax deductions, and printable employee payslips
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={handleGenerateNewMonthPayroll}>
          <Sparkles className="h-4 w-4 mr-1.5" /> Calculate Next Month Payroll
        </Button>
      </div>

      {/* Payroll Run Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {payrollRuns.map((run) => (
          <div
            key={run.id}
            onClick={() => setSelectedRun(run)}
            className={`p-5 rounded-2xl border bg-card shadow-xs cursor-pointer transition-all ${
              selectedRun?.id === run.id
                ? "border-indigo-600 ring-2 ring-indigo-500/20"
                : "border-border hover:border-indigo-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground">{run.monthYear}</h3>
                <span className="text-xs text-muted-foreground">{run.items.length} Employees</span>
              </div>
              <StatusBadge status={run.status} />
            </div>
            <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-3">
              {formatCurrency(run.totalAmount)}
            </div>
            <span className="text-[10px] text-muted-foreground block mt-1">
              Disbursed from Ledger 1040 (City Bank)
            </span>
          </div>
        ))}
      </div>

      {/* Selected Month Payroll Items Table */}
      {selectedRun && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs space-y-4 p-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Disbursement Breakdown — {selectedRun.monthYear}
              </h3>
              <p className="text-xs text-muted-foreground">
                Auto-calculated sales commissions & bank net pay
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-foreground">
                Total Salary Expense: {formatCurrency(selectedRun.totalAmount)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="p-3 font-semibold text-foreground">Employee</th>
                  <th className="p-3 font-semibold text-foreground">Designation</th>
                  <th className="p-3 font-semibold text-foreground">Branch</th>
                  <th className="p-3 font-semibold text-foreground">Base Salary (৳)</th>
                  <th className="p-3 font-semibold text-foreground">Sales Commission (৳)</th>
                  <th className="p-3 font-semibold text-foreground">Deductions (৳)</th>
                  <th className="p-3 font-semibold text-foreground">Net Salary (৳)</th>
                  <th className="p-3 text-right font-semibold text-foreground">Payslip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {selectedRun.items.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-bold text-foreground">{item.employeeName}</td>
                    <td className="p-3 text-muted-foreground">{item.designation}</td>
                    <td className="p-3 text-muted-foreground">{item.branchName}</td>
                    <td className="p-3 font-mono">{formatCurrency(item.baseSalary)}</td>
                    <td className="p-3 font-mono text-emerald-600 font-semibold">+{formatCurrency(item.commission)}</td>
                    <td className="p-3 font-mono text-muted-foreground">-{formatCurrency(item.deductions)}</td>
                    <td className="p-3 font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(item.netSalary)}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setActivePayslipItem(item)}
                        className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground"
                      >
                        <FileCheck className="h-3.5 w-3.5 inline mr-1" /> View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payslip Modal */}
      {activePayslipItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-indigo-600" />
                <h3 className="font-bold text-base text-foreground">Official Salary Payslip</h3>
              </div>
              <button onClick={() => setActivePayslipItem(null)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl border border-border bg-muted/20 space-y-4 text-xs">
              <div className="text-center border-b border-border pb-3">
                <h4 className="text-base font-extrabold text-foreground uppercase">{currentOrg.name}</h4>
                <p className="text-muted-foreground text-[10px]">{currentOrg.address}</p>
                <span className="inline-block mt-1 font-bold text-indigo-600 text-xs uppercase">
                  Payslip for {selectedRun?.monthYear}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Employee Name</span>
                  <strong className="text-foreground">{activePayslipItem.employeeName}</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Designation</span>
                  <strong className="text-foreground">{activePayslipItem.designation}</strong>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="flex justify-between">
                  <span>Base Monthly Salary:</span>
                  <span className="font-mono">{formatCurrency(activePayslipItem.baseSalary)}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Sales Performance Commission:</span>
                  <span className="font-mono font-semibold">+{formatCurrency(activePayslipItem.commission)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Unpaid Leave / Tax Deductions:</span>
                  <span className="font-mono">-{formatCurrency(activePayslipItem.deductions)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border">
                  <span>NET SALARY DISBURSED:</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                    {formatCurrency(activePayslipItem.netSalary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setActivePayslipItem(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-1.5" /> Print Payslip
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

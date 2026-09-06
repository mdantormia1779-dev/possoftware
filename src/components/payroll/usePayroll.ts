import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { hrService } from "@/services/hr.service";
import { PayrollRun, PayrollItem } from "@/lib/types";

export function usePayroll() {
  const { currentOrg } = useTenant();
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>(() => storageService.getPayrollRuns());
  const [selectedRun, setSelectedRun] = useState<PayrollRun | null>(payrollRuns[0] || null);
  const [activePayslipItem, setActivePayslipItem] = useState<PayrollItem | null>(null);

  useEffect(() => {
    hrService.getPayrollRuns(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setPayrollRuns(res.data);
        setSelectedRun(res.data[0]);
      }
    });
  }, [currentOrg?.id]);

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
      organizationId: currentOrg?.id || "org-1",
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
    hrService.runPayroll("March 2026", items, currentOrg?.id).catch(() => {});
  };

  return {
    currentOrg,
    payrollRuns,
    selectedRun,
    setSelectedRun,
    activePayslipItem,
    setActivePayslipItem,
    handleGenerateNewMonthPayroll,
  };
}

import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { hrService } from "@/services/hr.service";
import { Employee } from "@/types";
import { NewEmployeeForm } from "./AddEmployeeFormFields";

export function useHrState() {
  const { branches, currentOrg } = useTenant();
  const [employees, setEmployees] = useState<Employee[]>(() => storageService.getEmployees());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);

  useEffect(() => {
    hrService.getEmployees(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setEmployees(res.data);
      }
    });
  }, [currentOrg?.id]);

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEmployee = (data: NewEmployeeForm) => {
    const branch = branches.find((b) => b.id === data.branchId);

    const created: Employee = {
      id: `emp-${Date.now()}`,
      organizationId: currentOrg?.id || "org-1",
      branchId: data.branchId,
      branchName: branch?.name || "Main Outlet",
      employeeId: `EMP-00${employees.length + 1}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      designation: data.designation,
      department: data.department,
      joiningDate: new Date().toISOString().split("T")[0],
      baseSalary: Number(data.baseSalary) || 20000,
      commissionRate: Number(data.commissionRate) || 0,
      status: "active",
      bankAccountNo: data.bankAccountNo,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    };

    storageService.addEmployee(created);
    setEmployees((prev) => [created, ...prev]);
    hrService.createEmployee(created, currentOrg?.id, data.branchId).catch(() => {});
    setShowAddModal(false);
  };

  return {
    branches,
    employees: filteredEmployees,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    selectedEmp,
    setSelectedEmp,
    handleAddEmployee,
  };
}

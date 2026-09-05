"use client";

import React from "react";
import { HrHeader } from "@/components/hr/HrHeader";
import { HrSearch } from "@/components/hr/HrSearch";
import { EmployeeGrid } from "@/components/hr/EmployeeGrid";
import { AddEmployeeModal } from "@/components/hr/AddEmployeeModal";
import { EmployeeProfileDrawer } from "@/components/hr/profile/EmployeeProfileDrawer";
import { useHrState } from "@/components/hr/useHrState";

export default function HrEmployeesPage() {
  const {
    branches,
    employees,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    selectedEmp,
    setSelectedEmp,
    handleAddEmployee,
  } = useHrState();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <HrHeader onAddClick={() => setShowAddModal(true)} />
      <HrSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <EmployeeGrid employees={employees} onSelectEmp={setSelectedEmp} />
      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        branches={branches}
        onAdd={handleAddEmployee}
      />
      <EmployeeProfileDrawer
        emp={selectedEmp}
        onClose={() => setSelectedEmp(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Employee } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Plus,
  Phone,
  Building2,
  CalendarCheck,
  Search,
  X,
  CreditCard,
  Percent,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HrEmployeesPage() {
  const { branches, currentOrg } = useTenant();
  const [employees, setEmployees] = useState<Employee[]>(() =>
    storageService.getEmployees()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "Sales Advisor",
    department: "Sales",
    branchId: branches[0]?.id || "br-1",
    baseSalary: 20000,
    commissionRate: 1.0,
    bankAccountNo: "",
  });

  const filteredEmployees = employees.filter((e) => {
    return (
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.phone) return;

    const branch = branches.find((b) => b.id === newEmp.branchId);

    const created: Employee = {
      id: `emp-${Date.now()}`,
      organizationId: currentOrg.id,
      branchId: newEmp.branchId,
      branchName: branch?.name || "Main Outlet",
      employeeId: `EMP-00${employees.length + 1}`,
      name: newEmp.name,
      email: newEmp.email,
      phone: newEmp.phone,
      designation: newEmp.designation,
      department: newEmp.department,
      joiningDate: new Date().toISOString().split("T")[0],
      baseSalary: Number(newEmp.baseSalary) || 20000,
      commissionRate: Number(newEmp.commissionRate) || 0,
      status: "active",
      bankAccountNo: newEmp.bankAccountNo,
      photoUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    };

    storageService.addEmployee(created);
    setEmployees(storageService.getEmployees());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Staff Directory &amp; Payroll Operations</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Employee profiles, base salaries, outlet assignments, and sales commission incentives
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/attendance"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Attendance</span>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="shadow-sm shadow-indigo-500/25"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Employee
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search employee by name, designation, or ID (e.g. EMP-001)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-subtle-xs hover:shadow-subtle-md hover:border-indigo-400 dark:hover:border-indigo-600 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <img
                  src={
                    emp.photoUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  }
                  alt={emp.name}
                  className="h-12 w-12 rounded-2xl object-cover border border-border/80 shadow-subtle-xs shrink-0"
                />
                <div className="truncate">
                  <h3 className="text-sm font-bold text-foreground truncate">
                    {emp.name}
                  </h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block truncate">
                    {emp.designation}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono block">
                    {emp.employeeId}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground pt-1 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{emp.branchName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span className="font-mono text-[11px]">{emp.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border/70 text-xs">
                <div className="p-2.5 rounded-2xl bg-muted/20 border border-border/60 shadow-subtle-xs font-mono">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider font-sans">
                    Base Salary
                  </span>
                  <strong className="text-foreground text-xs">
                    {formatCurrency(emp.baseSalary)}
                  </strong>
                </div>
                <div className="p-2.5 rounded-2xl bg-muted/20 border border-border/60 shadow-subtle-xs font-mono">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider font-sans">
                    Commission
                  </span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-xs">
                    {emp.commissionRate}%
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 w-full block text-center border border-emerald-200/60 dark:border-emerald-800/60">
                Active Staff
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
            <div className="flex justify-between items-center pb-3 border-b border-border/80">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Add New Employee
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asif Mahmud"
                  value={newEmp.name}
                  onChange={(e) =>
                    setNewEmp({ ...newEmp, name: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Cashier"
                    value={newEmp.designation}
                    onChange={(e) =>
                      setNewEmp({ ...newEmp, designation: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Branch Outlet
                  </label>
                  <select
                    value={newEmp.branchId}
                    onChange={(e) =>
                      setNewEmp({ ...newEmp, branchId: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1711-xxxxxx"
                    value={newEmp.phone}
                    onChange={(e) =>
                      setNewEmp({ ...newEmp, phone: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="staff@company.com"
                    value={newEmp.email}
                    onChange={(e) =>
                      setNewEmp({ ...newEmp, email: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Base Salary (৳)
                  </label>
                  <input
                    type="number"
                    required
                    value={newEmp.baseSalary}
                    onChange={(e) =>
                      setNewEmp({
                        ...newEmp,
                        baseSalary: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-bold font-mono text-indigo-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Commission (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newEmp.commissionRate}
                    onChange={(e) =>
                      setNewEmp({
                        ...newEmp,
                        commissionRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">
                  Disbursement Bank A/C or bKash
                </label>
                <input
                  type="text"
                  placeholder="e.g. bKash Personal: 01711-xxxxxx"
                  value={newEmp.bankAccountNo}
                  onChange={(e) =>
                    setNewEmp({ ...newEmp, bankAccountNo: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/80">
                <Button
                  variant="outline"
                  size="xs"
                  type="button"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="xs" type="submit">
                  Save Employee
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

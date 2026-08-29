"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Employee } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Users,
  Plus,
  Phone,
  Mail,
  Building2,
  Calendar,
  CreditCard,
  Percent,
  CalendarCheck,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HrEmployeesPage() {
  const { branches, currentOrg } = useTenant();
  const [employees, setEmployees] = useState<Employee[]>(() => storageService.getEmployees());
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
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    };

    storageService.addEmployee(created);
    setEmployees(storageService.getEmployees());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Staff Directory & Human Resources</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Employee profiles, base salaries, outlet assignments, and sales commission rates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/attendance"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            <CalendarCheck className="h-4 w-4" />
            <span>Daily Attendance</span>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add New Employee
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employee by name, designation, or ID (e.g. EMP-001)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEmployees.map((emp) => (
          <div
            key={emp.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={emp.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"}
                  alt={emp.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-indigo-500/30"
                />
                <div>
                  <h3 className="text-sm font-bold text-foreground">{emp.name}</h3>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">
                    {emp.designation}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">{emp.employeeId}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{emp.branchName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{emp.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border text-xs">
                <div className="p-2 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Base Salary</span>
                  <strong className="text-foreground">{formatCurrency(emp.baseSalary)}</strong>
                </div>
                <div className="p-2 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Commission</span>
                  <strong className="text-emerald-600">{emp.commissionRate}%</strong>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 w-full block text-center">
                Active Staff
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add New Employee</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asif Mahmud"
                  value={newEmp.name}
                  onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Designation</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Cashier"
                    value={newEmp.designation}
                    onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Branch Outlet</label>
                  <select
                    value={newEmp.branchId}
                    onChange={(e) => setNewEmp({ ...newEmp, branchId: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
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
                  <label className="font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1711-xxxxxx"
                    value={newEmp.phone}
                    onChange={(e) => setNewEmp({ ...newEmp, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="staff@company.com"
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Base Monthly Salary (৳)</label>
                  <input
                    type="number"
                    required
                    value={newEmp.baseSalary}
                    onChange={(e) => setNewEmp({ ...newEmp, baseSalary: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-bold text-indigo-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newEmp.commissionRate}
                    onChange={(e) => setNewEmp({ ...newEmp, commissionRate: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Disbursement Bank A/C or bKash</label>
                <input
                  type="text"
                  placeholder="e.g. bKash Personal: 01711-xxxxxx"
                  value={newEmp.bankAccountNo}
                  onChange={(e) => setNewEmp({ ...newEmp, bankAccountNo: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
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

"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Branch } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import {
  Building2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Users,
  TrendingUp,
  Boxes,
  CheckCircle2,
  X,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function BranchesPage() {
  const { branches, setCurrentBranch, currentBranch, currentOrg } = useTenant();
  const [branchList, setBranchList] = useState<Branch[]>(branches);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newBranch, setNewBranch] = useState({
    name: "",
    code: "",
    phone: "",
    email: "",
    address: "",
    city: "Dhaka",
    managerName: "",
    managerPhone: "",
  });

  const handleAddBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.code) return;

    const created: Branch = {
      id: `br-${Date.now()}`,
      organizationId: currentOrg.id,
      name: newBranch.name,
      code: newBranch.code.toUpperCase(),
      phone: newBranch.phone,
      email: newBranch.email,
      address: newBranch.address,
      city: newBranch.city,
      isMainBranch: false,
      managerName: newBranch.managerName,
      managerPhone: newBranch.managerPhone,
      employeeCount: 4,
      totalSalesToday: 0,
      totalStockValue: 0,
      isActive: true,
    };

    storageService.addBranch(created);
    setBranchList(storageService.getBranches());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Multi-Branch Directory</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your retail outlets, showroom floors, and regional inventory hubs
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add New Branch Outlet
        </Button>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branchList.map((branch) => {
          const isSelected = currentBranch.id === branch.id;

          return (
            <div
              key={branch.id}
              className={`rounded-3xl border p-6 bg-card shadow-xs transition-all flex flex-col justify-between ${
                isSelected
                  ? "border-indigo-600 ring-2 ring-indigo-500/20 shadow-md"
                  : "border-border hover:border-indigo-300 dark:hover:border-indigo-700"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-foreground">{branch.name}</h3>
                      {branch.isMainBranch && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                          HQ
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{branch.code}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Active
                  </span>
                </div>

                {/* Location & Contact */}
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">{branch.address}, {branch.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>{branch.phone || "No phone"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>Manager: {branch.managerName || "Unassigned"}</span>
                  </div>
                </div>

                {/* Financial KPI Badges */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
                  <div className="p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">Today&apos;s Sales</span>
                    <strong className="text-foreground">{formatCurrency(branch.totalSalesToday || 0)}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[10px] text-muted-foreground block">Stock Value</span>
                    <strong className="text-foreground">{formatCurrency(branch.totalStockValue || 0)}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                {isSelected ? (
                  <div className="w-full py-2 text-center text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    ✓ Currently Active Workspace
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setCurrentBranch(branch)}
                  >
                    Switch Workspace to This Branch
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Branch Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add New Outlet Branch</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddBranch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Branch Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttara Sector 7 Outlet"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Branch Code</label>
                  <input
                    type="text"
                    required
                    placeholder="BR-UTT-04"
                    value={newBranch.code}
                    onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+880 1711-xxxxxx"
                    value={newBranch.phone}
                    onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">City</label>
                  <input
                    type="text"
                    value={newBranch.city}
                    onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Physical Address</label>
                <input
                  type="text"
                  placeholder="Plot 12, Road 4, Sector 7, Uttara, Dhaka"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Branch Manager Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Asif Mahmud"
                    value={newBranch.managerName}
                    onChange={(e) => setNewBranch({ ...newBranch, managerName: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Manager Phone</label>
                  <input
                    type="text"
                    placeholder="+880 1819-xxxxxx"
                    value={newBranch.managerPhone}
                    onChange={(e) => setNewBranch({ ...newBranch, managerPhone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Branch
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

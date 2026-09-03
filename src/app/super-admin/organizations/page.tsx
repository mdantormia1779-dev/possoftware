"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Organization, PlanTier, SubscriptionStatus } from "@/lib/types";
import { formatCurrency, formatDate, generateUUID } from "@/lib/utils";
import {
  Building2,
  Search,
  ArrowLeft,
  Plus,
  Shield,
  Trash2,
  Edit3,
  ExternalLink,
  Power,
  RotateCcw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function SuperAdminOrganizationsPage() {
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();

  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState("Fashion & Retail");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCity, setFormCity] = useState("Dhaka");
  const [formPlan, setFormPlan] = useState<PlanTier>("business");
  const [formStatus, setFormStatus] = useState<SubscriptionStatus>("active");
  const [formMaxBranches, setFormMaxBranches] = useState(5);
  const [formMaxStaff, setFormMaxStaff] = useState(15);

  // Filtered organizations
  const filteredOrgs = orgs.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.email && o.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.phone && o.phone.includes(searchQuery));

    const matchesPlan = planFilter === "all" || o.subscriptionPlan === planFilter;
    const matchesStatus = statusFilter === "all" || o.subscriptionStatus === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Action: Take Full Control / Impersonate Company
  const handleTakeControl = (org: Organization) => {
    setCurrentOrg(org);
    const branches = storageService.getBranches().filter((b) => b.organizationId === org.id);
    if (branches.length > 0) {
      setCurrentBranch(branches[0]);
    }
    // Super Admin assumes executive owner privileges
    setCurrentRole("company_owner");
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", "company_owner");
      localStorage.setItem("super_admin_controlling", org.id);
      localStorage.setItem("super_admin_controlling_name", org.name);
    }
    router.push("/app/dashboard");
  };

  // Action: Toggle Suspend / Active status
  const handleToggleStatus = (org: Organization) => {
    const newStatus: SubscriptionStatus = org.subscriptionStatus === "active" ? "cancelled" : "active";
    const updated: Organization = {
      ...org,
      subscriptionStatus: newStatus,
    };
    storageService.updateOrganization(updated);
    setOrgs(storageService.getOrganizations());
  };

  // Action: Purge Test Data
  const handlePurgeData = (org: Organization) => {
    if (confirm(`Are you sure you want to wipe all transactions for "${org.name}"? This cannot be undone.`)) {
      storageService.purgeOrganizationData(org.id);
      alert(`Transactions data purged successfully for ${org.name}`);
    }
  };

  // Open Edit Modal
  const openEditModal = (org: Organization) => {
    setSelectedOrg(org);
    setFormName(org.name);
    setFormType(org.businessType);
    setFormEmail(org.email || "");
    setFormPhone(org.phone || "");
    setFormCity(org.address?.split(",")[0] || "Dhaka");
    setFormPlan(org.subscriptionPlan);
    setFormStatus(org.subscriptionStatus);
    setFormMaxBranches(org.maxBranches);
    setFormMaxStaff(org.maxStaff);
    setIsEditModalOpen(true);
  };

  // Save Edit Modal
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;

    const updated: Organization = {
      ...selectedOrg,
      name: formName,
      businessType: formType,
      email: formEmail,
      phone: formPhone,
      address: formCity + ", Bangladesh",
      subscriptionPlan: formPlan,
      subscriptionStatus: formStatus,
      maxBranches: Number(formMaxBranches),
      maxStaff: Number(formMaxStaff),
    };

    storageService.updateOrganization(updated);
    setOrgs(storageService.getOrganizations());
    setIsEditModalOpen(false);
    setSelectedOrg(null);
  };

  // Open Create Modal
  const openCreateModal = () => {
    setFormName("");
    setFormType("Fashion & Retail");
    setFormEmail("");
    setFormPhone("");
    setFormCity("Dhaka");
    setFormPlan("business");
    setFormStatus("active");
    setFormMaxBranches(5);
    setFormMaxStaff(15);
    setIsCreateModalOpen(true);
  };

  // Save New Organization
  const handleCreateOrg = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrgId = generateUUID();
    const newOrg: Organization = {
      id: newOrgId,
      name: formName,
      slug: formName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      businessType: formType,
      email: formEmail,
      phone: formPhone,
      address: formCity + ", Bangladesh",
      currency: "BDT",
      currencySymbol: "৳",
      taxNumber: "BIN-" + Math.floor(100000000 + Math.random() * 900000000),
      subscriptionPlan: formPlan,
      subscriptionStatus: formStatus,
      subscriptionEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      maxBranches: Number(formMaxBranches),
      maxStaff: Number(formMaxStaff),
      maxProducts: 5000,
      createdAt: new Date().toISOString(),
    };

    storageService.addOrganization(newOrg);

    // Create initial main branch for this new tenant
    storageService.addBranch({
      id: generateUUID(),
      organizationId: newOrgId,
      name: `${formName} Main Branch`,
      code: "MAIN",
      phone: formPhone || "01700-000000",
      email: formEmail || "branch@pos.com",
      city: formCity || "Dhaka",
      address: "Commercial Outlet, " + (formCity || "Dhaka"),
      isMainBranch: true,
      employeeCount: 3,
      isActive: true,
    });

    setOrgs(storageService.getOrganizations());
    setIsCreateModalOpen(false);
  };

  // Open Delete Modal
  const openDeleteModal = (org: Organization) => {
    setSelectedOrg(org);
    setIsDeleteModalOpen(true);
  };

  // Confirm Permanent Deletion (Delete Everything)
  const handleConfirmDelete = () => {
    if (!selectedOrg) return;

    storageService.deleteOrganization(selectedOrg.id);
    setOrgs(storageService.getOrganizations());
    setIsDeleteModalOpen(false);
    setSelectedOrg(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/80">
        <div className="flex items-center gap-3">
          <Link
            href="/super-admin"
            className="p-2 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span>Tenant Companies &amp; Full Control</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage, impersonate, configure plans, or permanently delete any organization on the platform
            </p>
          </div>
        </div>

        <Button
          onClick={openCreateModal}
          variant="primary"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/25 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Company</span>
        </Button>
      </div>

      {/* Summary Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Total Tenants
          </span>
          <div className="text-2xl font-black text-foreground font-mono">{orgs.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Active SaaS Database</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Active Paid
          </span>
          <div className="text-2xl font-black text-emerald-600 font-mono">
            {orgs.filter((o) => o.subscriptionStatus === "active").length}
          </div>
          <span className="text-[10px] text-muted-foreground">Good standing</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Suspended / Overdue
          </span>
          <div className="text-2xl font-black text-rose-600 font-mono">
            {orgs.filter((o) => o.subscriptionStatus === "cancelled" || o.subscriptionStatus === "past_due" || o.subscriptionStatus === "expired").length}
          </div>
          <span className="text-[10px] text-rose-600 font-semibold">Action needed</span>
        </div>

        <div className="p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs space-y-1">
          <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            Control Privileges
          </span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">
            Super Admin
          </div>
          <span className="text-[10px] text-purple-600 font-semibold">Root Access Active</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search company name, industry, email or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="all">All Plans</option>
            <option value="starter">Starter Plan</option>
            <option value="business">Business Plan</option>
            <option value="enterprise">Enterprise Plan</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-border/80 bg-background text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="cancelled">Suspended</option>
            <option value="expired">Expired</option>
            <option value="past_due">Past Due</option>
            <option value="trial">Trial</option>
          </select>
        </div>
      </div>

      {/* Organizations Table with Full Control Actions */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-4">Organization &amp; Details</th>
                <th className="p-4">Industry &amp; City</th>
                <th className="p-4">Plan &amp; Limits</th>
                <th className="p-4">Status</th>
                <th className="p-4">Valid Until</th>
                <th className="p-4 text-right">Super Admin Control Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {filteredOrgs.map((org) => {
                const isSuspended = org.subscriptionStatus === "cancelled" || org.subscriptionStatus === "past_due";

                return (
                  <tr key={org.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center font-black text-sm shrink-0">
                          {org.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                            <span>{org.name}</span>
                            {org.taxNumber && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground font-mono">
                                BIN
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-muted-foreground font-mono block">
                            {org.email || "No email"} • {org.phone || "No phone"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="font-medium text-foreground">{org.businessType}</span>
                      <span className="text-[10px] text-muted-foreground block">{org.address || "Dhaka"}</span>
                    </td>

                    <td className="p-4">
                      <span className="font-black text-xs uppercase text-purple-600 dark:text-purple-400 font-mono">
                        {org.subscriptionPlan}
                      </span>
                      <span className="text-[10px] text-muted-foreground block">
                        {org.maxBranches} Branches • {org.maxStaff} Staff
                      </span>
                    </td>

                    <td className="p-4">
                      <StatusBadge status={org.subscriptionStatus} />
                    </td>

                    <td className="p-4 text-muted-foreground font-mono">
                      {formatDate(org.subscriptionEndsAt || new Date().toISOString())}
                    </td>

                    {/* Full Control Action Buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Take Control / Enter Tenant */}
                        <button
                          onClick={() => handleTakeControl(org)}
                          className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95"
                          title={`Take full owner control of ${org.name}`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Enter &amp; Control</span>
                        </button>

                        {/* Edit Company */}
                        <button
                          onClick={() => openEditModal(org)}
                          className="p-1.5 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit Company Configuration"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>

                        {/* Toggle Suspend / Active */}
                        <button
                          onClick={() => handleToggleStatus(org)}
                          className={`p-1.5 rounded-xl border transition-colors ${
                            isSuspended
                              ? "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                              : "border-amber-300 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                          }`}
                          title={isSuspended ? "Reactivate Company" : "Suspend Company"}
                        >
                          <Power className="h-4 w-4" />
                        </button>

                        {/* Purge Test Data */}
                        <button
                          onClick={() => handlePurgeData(org)}
                          className="p-1.5 rounded-xl border border-border/80 hover:bg-amber-50 text-muted-foreground hover:text-amber-600 transition-colors"
                          title="Purge Sales & Test Transactions"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>

                        {/* Delete Everything */}
                        <button
                          onClick={() => openDeleteModal(org)}
                          className="p-1.5 rounded-xl border border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 transition-colors"
                          title="Delete Company and All Data Permanently"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrgs.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground text-xs">
                    No organizations match your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create New Company */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-base text-foreground">Create New Tenant Company</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrg} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-foreground">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Footwear Ltd"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Industry / Business Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Fashion & Retail">Fashion &amp; Retail</option>
                    <option value="Grocery & Supermarket">Grocery &amp; Supermarket</option>
                    <option value="Electronics & Gadgets">Electronics &amp; Gadgets</option>
                    <option value="Restaurant & Cafe">Restaurant &amp; Cafe</option>
                    <option value="Pharmacy & Healthcare">Pharmacy &amp; Healthcare</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">City</label>
                  <input
                    type="text"
                    placeholder="Dhaka, Chittagong, Sylhet..."
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Admin Email</label>
                  <input
                    type="email"
                    placeholder="admin@company.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+8801700000000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subscription Plan Tier</label>
                  <select
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value as PlanTier)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="starter">Starter (৳2,999/mo)</option>
                    <option value="business">Business (৳6,999/mo)</option>
                    <option value="enterprise">Enterprise (৳14,999/mo)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Initial Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as SubscriptionStatus)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="trial">Trial</option>
                    <option value="cancelled">Suspended</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Max Outlets Allowed</label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxBranches}
                    onChange={(e) => setFormMaxBranches(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Max Staff Users</label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxStaff}
                    onChange={(e) => setFormMaxStaff(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="bg-purple-600 hover:bg-purple-700">
                  Provision Tenant Organization
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Company Configuration */}
      {isEditModalOpen && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-base text-foreground">Configure: {selectedOrg.name}</h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="font-bold text-foreground">Company Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Industry</label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">City</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Phone</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subscription Plan Tier</label>
                  <select
                    value={formPlan}
                    onChange={(e) => setFormPlan(e.target.value as PlanTier)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="starter">Starter Plan</option>
                    <option value="business">Business Plan</option>
                    <option value="enterprise">Enterprise Plan</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Subscription Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as SubscriptionStatus)}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="cancelled">Suspended</option>
                    <option value="expired">Expired</option>
                    <option value="past_due">Past Due</option>
                    <option value="trial">Trial</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Max Outlets Allowed</label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxBranches}
                    onChange={(e) => setFormMaxBranches(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-foreground">Max Staff Users</label>
                  <input
                    type="number"
                    min="1"
                    value={formMaxStaff}
                    onChange={(e) => setFormMaxStaff(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="bg-purple-600 hover:bg-purple-700">
                  Update Configuration
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Organization & Purge Everything */}
      {isDeleteModalOpen && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-card border border-rose-200 dark:border-rose-900 rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="h-10 w-10 rounded-2xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-foreground">Delete Company &amp; Purge All Data</h3>
                <span className="text-[11px] text-rose-600 font-bold">Irreversible Super Admin Action</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to completely delete <strong className="text-foreground">{selectedOrg.name}</strong>?
              This will immediately and permanently delete:
            </p>

            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
              <li>All branches and warehouses of this company</li>
              <li>All catalog products, SKUs, and inventory stock</li>
              <li>All POS transactions, receipts, and sales records</li>
              <li>All customer ledger records and dues</li>
              <li>All employees, attendance, and payroll records</li>
            </ul>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/60">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirmDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Permanently Delete Everything
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

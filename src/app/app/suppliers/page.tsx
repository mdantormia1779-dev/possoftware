"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Supplier } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Building2, Plus, Phone, Mail, MapPin, Search, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SuppliersPage() {
  const { currentOrg } = useTenant();
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => storageService.getSuppliers());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newSupp, setNewSupp] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    address: "",
    balanceDue: 0,
  });

  const filteredSuppliers = suppliers.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.companyName && s.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupp.name || !newSupp.phone) return;

    const created: Supplier = {
      id: `supp-${Date.now()}`,
      organizationId: currentOrg.id,
      name: newSupp.name,
      companyName: newSupp.companyName,
      phone: newSupp.phone,
      email: newSupp.email,
      address: newSupp.address,
      balanceDue: Number(newSupp.balanceDue) || 0,
      totalPurchased: 0,
    };

    storageService.addSupplier(created);
    setSuppliers(storageService.getSuppliers());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Building2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Supplier Master Directory</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage vendors, textile mills, wholesalers, and outstanding payable balances
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add New Supplier
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search suppliers by contact person or company name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSuppliers.map((supp) => (
          <div
            key={supp.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-bold text-foreground">{supp.name}</h3>
                {supp.companyName && (
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">
                    {supp.companyName}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{supp.phone}</span>
                </div>
                {supp.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{supp.email}</span>
                  </div>
                )}
                {supp.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{supp.address}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border text-xs">
                <div className="p-2.5 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Total Purchased</span>
                  <strong className="text-foreground">{formatCurrency(supp.totalPurchased)}</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Current Due</span>
                  <strong className={supp.balanceDue > 0 ? "text-rose-600" : "text-emerald-600"}>
                    {formatCurrency(supp.balanceDue)}
                  </strong>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/app/purchases"
                className="inline-flex items-center justify-center w-full py-2 rounded-xl text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground"
              >
                View Purchase Orders
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add New Vendor / Supplier</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSupplier} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Supplier / Contact Person Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengal Textile Mills"
                  value={newSupp.name}
                  onChange={(e) => setNewSupp({ ...newSupp, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Company / Group Name</label>
                <input
                  type="text"
                  placeholder="e.g. Bengal Group Ltd."
                  value={newSupp.companyName}
                  onChange={(e) => setNewSupp({ ...newSupp, companyName: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1711-xxxxxx"
                    value={newSupp.phone}
                    onChange={(e) => setNewSupp({ ...newSupp, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="orders@supplier.com"
                    value={newSupp.email}
                    onChange={(e) => setNewSupp({ ...newSupp, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Factory / Office Address</label>
                <input
                  type="text"
                  placeholder="Tejgaon I/A, Dhaka"
                  value={newSupp.address}
                  onChange={(e) => setNewSupp({ ...newSupp, address: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Supplier
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Customer } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Contact,
  Plus,
  Phone,
  Mail,
  MapPin,
  Gift,
  AlertCircle,
  Search,
  CheckCircle2,
  X,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CustomersPage() {
  const { currentOrg } = useTenant();
  const [customers, setCustomers] = useState<Customer[]>(() => storageService.getCustomers());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustDetail, setSelectedCustDetail] = useState<Customer | null>(null);

  const [newCust, setNewCust] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    creditLimit: 25000,
  });

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCust.name || !newCust.phone) return;

    const created: Customer = {
      id: `cust-${Date.now()}`,
      organizationId: currentOrg.id,
      name: newCust.name,
      phone: newCust.phone,
      email: newCust.email,
      address: newCust.address,
      loyaltyPoints: 50, // bonus on signup
      dueBalance: 0,
      creditLimit: Number(newCust.creditLimit) || 25000,
      totalSpent: 0,
      ordersCount: 0,
    };

    storageService.addCustomer(created);
    setCustomers(storageService.getCustomers());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Contact className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Customer 360 & Credit Ledger</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Profiles, loyalty reward balances, lifetime spend, and credit terms
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/loyalty"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
          >
            <Gift className="h-4 w-4" />
            <span>Loyalty Points Hub</span>
          </Link>
          <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-1" /> Add New Customer
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search customers by name, Bangladeshi phone number (017...), or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Customer Name</th>
                <th className="p-3.5 font-semibold text-foreground">Mobile Phone</th>
                <th className="p-3.5 font-semibold text-foreground">Address</th>
                <th className="p-3.5 font-semibold text-foreground">Loyalty Points</th>
                <th className="p-3.5 font-semibold text-foreground">Orders</th>
                <th className="p-3.5 font-semibold text-foreground">Lifetime Spent</th>
                <th className="p-3.5 font-semibold text-foreground">Due Balance</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-foreground">{cust.name}</span>
                    {cust.email && <span className="text-[10px] text-muted-foreground block">{cust.email}</span>}
                  </td>
                  <td className="p-3.5 font-mono text-muted-foreground">{cust.phone}</td>
                  <td className="p-3.5 text-muted-foreground max-w-[160px] truncate">{cust.address || "-"}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      <Gift className="h-3 w-3" /> {cust.loyaltyPoints} Pts
                    </span>
                  </td>
                  <td className="p-3.5 text-muted-foreground font-semibold">{cust.ordersCount} bills</td>
                  <td className="p-3.5 font-bold text-foreground">{formatCurrency(cust.totalSpent)}</td>
                  <td className="p-3.5">
                    {cust.dueBalance > 0 ? (
                      <span className="text-rose-600 font-bold">{formatCurrency(cust.dueBalance)}</span>
                    ) : (
                      <span className="text-emerald-600 font-medium">Clear (৳0)</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedCustDetail(cust)}
                      className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground"
                    >
                      360 Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer 360 Detail Drawer */}
      {selectedCustDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-card border-l border-border p-6 flex flex-col justify-between shadow-2xl overflow-y-auto space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-border pb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedCustDetail.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{selectedCustDetail.phone}</p>
                </div>
                <button onClick={() => setSelectedCustDetail(null)} className="p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Lifetime Purchases</span>
                  <strong className="text-foreground text-sm">{formatCurrency(selectedCustDetail.totalSpent)}</strong>
                </div>
                <div className="p-3 rounded-xl bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block">Available Loyalty Points</span>
                  <strong className="text-indigo-600 text-sm">{selectedCustDetail.loyaltyPoints} Points</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credit Limit Authorized:</span>
                  <strong className="text-foreground">{formatCurrency(selectedCustDetail.creditLimit)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Outstanding Due Balance:</span>
                  <strong className={selectedCustDetail.dueBalance > 0 ? "text-rose-600 font-bold" : "text-emerald-600"}>
                    {formatCurrency(selectedCustDetail.dueBalance)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Transaction:</span>
                  <span className="text-foreground">{formatDate(selectedCustDetail.lastPurchaseDate)}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{selectedCustDetail.address || "No address recorded"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span>{selectedCustDetail.email || "No email on file"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button variant="primary" size="sm" className="w-full" onClick={() => setSelectedCustDetail(null)}>
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Add New Customer</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={newCust.name}
                  onChange={(e) => setNewCust({ ...newCust, name: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Mobile Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1711-xxxxxx"
                    value={newCust.phone}
                    onChange={(e) => setNewCust({ ...newCust, phone: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="tanvir@gmail.com"
                    value={newCust.email}
                    onChange={(e) => setNewCust({ ...newCust, email: e.target.value })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Delivery / Home Address</label>
                <input
                  type="text"
                  placeholder="Road 11, Banani, Dhaka"
                  value={newCust.address}
                  onChange={(e) => setNewCust({ ...newCust, address: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Credit Limit (৳)</label>
                <input
                  type="number"
                  value={newCust.creditLimit}
                  onChange={(e) => setNewCust({ ...newCust, creditLimit: parseFloat(e.target.value) || 0 })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background font-bold text-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Customer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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
  Mail,
  MapPin,
  Gift,
  Search,
  X,
  CreditCard,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CustomersPage() {
  const { currentOrg } = useTenant();
  const [customers, setCustomers] = useState<Customer[]>(() =>
    storageService.getCustomers()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustDetail, setSelectedCustDetail] =
    useState<Customer | null>(null);

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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Contact className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Customer 360 &amp; Credit Terms</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Profiles, loyalty reward balances, lifetime spend, and authorized credit limits
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/loyalty"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-subtle-xs hover:bg-indigo-100 transition-colors"
          >
            <Gift className="h-3.5 w-3.5" />
            <span>Loyalty Hub</span>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="shadow-sm shadow-indigo-500/25"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Customer
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search customers by name, phone (017...), or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs"
          />
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Mobile Phone</th>
                <th className="p-3.5">Address</th>
                <th className="p-3.5">Loyalty Points</th>
                <th className="p-3.5">Orders</th>
                <th className="p-3.5">Lifetime Spent</th>
                <th className="p-3.5">Due Balance</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3.5">
                    <span className="font-bold text-foreground">
                      {cust.name}
                    </span>
                    {cust.email && (
                      <span className="text-[10px] text-muted-foreground block font-mono">
                        {cust.email}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-mono text-muted-foreground font-semibold">
                    {cust.phone}
                  </td>
                  <td className="p-3.5 text-muted-foreground max-w-[160px] truncate">
                    {cust.address || "-"}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                      <Gift className="h-3 w-3" /> {cust.loyaltyPoints} Pts
                    </span>
                  </td>
                  <td className="p-3.5 text-muted-foreground font-mono font-semibold">
                    {cust.ordersCount} bills
                  </td>
                  <td className="p-3.5 font-black text-foreground font-mono">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="p-3.5 font-mono">
                    {cust.dueBalance > 0 ? (
                      <span className="text-rose-600 dark:text-rose-400 font-black">
                        {formatCurrency(cust.dueBalance)}
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Clear (৳0)
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setSelectedCustDetail(cust)}
                      className="text-[11px]"
                    >
                      360 Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer 360 Detail Drawer */}
      {selectedCustDetail && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-card border-l border-border/80 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto space-y-6 animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-border/80 pb-3">
                <div>
                  <h3 className="text-lg font-black text-foreground">
                    {selectedCustDetail.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    {selectedCustDetail.phone}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCustDetail(null)}
                  className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 shadow-subtle-xs">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
                    Lifetime Purchases
                  </span>
                  <strong className="text-foreground text-sm font-black font-mono">
                    {formatCurrency(selectedCustDetail.totalSpent)}
                  </strong>
                </div>
                <div className="p-3.5 rounded-2xl bg-muted/20 border border-border/60 shadow-subtle-xs">
                  <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">
                    Reward Points
                  </span>
                  <strong className="text-indigo-600 dark:text-indigo-400 text-sm font-black font-mono">
                    {selectedCustDetail.loyaltyPoints} Points
                  </strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-border/80 bg-card space-y-2 text-xs font-mono shadow-subtle-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-sans">
                    Credit Limit Authorized:
                  </span>
                  <strong className="text-foreground font-bold">
                    {formatCurrency(selectedCustDetail.creditLimit)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-sans">
                    Outstanding Due Balance:
                  </span>
                  <strong
                    className={
                      selectedCustDetail.dueBalance > 0
                        ? "text-rose-600 dark:text-rose-400 font-black"
                        : "text-emerald-600 dark:text-emerald-400 font-bold"
                    }
                  >
                    {formatCurrency(selectedCustDetail.dueBalance)}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground font-sans">
                    Last Transaction:
                  </span>
                  <span className="text-foreground font-bold">
                    {formatDate(selectedCustDetail.lastPurchaseDate)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                  <span>
                    {selectedCustDetail.address || "No address recorded"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                  <span>{selectedCustDetail.email || "No email on file"}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/80">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setSelectedCustDetail(null)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-border/80 bg-card shadow-2xl p-6 space-y-4 animate-fade-slide">
            <div className="flex justify-between items-center pb-3 border-b border-border/80">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Add New Customer
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Ahmed"
                  value={newCust.name}
                  onChange={(e) =>
                    setNewCust({ ...newCust, name: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-foreground">
                    Mobile Phone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+880 1711-xxxxxx"
                    value={newCust.phone}
                    onChange={(e) =>
                      setNewCust({ ...newCust, phone: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-mono text-foreground"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-foreground">Email</label>
                  <input
                    type="email"
                    placeholder="tanvir@gmail.com"
                    value={newCust.email}
                    onChange={(e) =>
                      setNewCust({ ...newCust, email: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">
                  Delivery / Home Address
                </label>
                <input
                  type="text"
                  placeholder="Road 11, Banani, Dhaka"
                  value={newCust.address}
                  onChange={(e) =>
                    setNewCust({ ...newCust, address: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-foreground">
                  Credit Limit (৳)
                </label>
                <input
                  type="number"
                  value={newCust.creditLimit}
                  onChange={(e) =>
                    setNewCust({
                      ...newCust,
                      creditLimit: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card font-bold font-mono text-indigo-600"
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

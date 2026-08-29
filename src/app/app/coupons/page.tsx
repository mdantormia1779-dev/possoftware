"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Coupon } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Tag, Plus, ArrowLeft, Percent, Sparkles, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CouponsPage() {
  const { currentOrg } = useTenant();
  const [coupons, setCoupons] = useState<Coupon[]>(() => storageService.getCoupons());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    minPurchase: 2000,
    usageLimit: 100,
    expiresAt: "2026-12-31",
  });

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code) return;

    const created: Coupon = {
      id: `cp-${Date.now()}`,
      organizationId: currentOrg.id,
      code: newCoupon.code.toUpperCase(),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue) || 10,
      minPurchase: Number(newCoupon.minPurchase) || 0,
      usageLimit: Number(newCoupon.usageLimit) || 100,
      timesUsed: 0,
      expiresAt: newCoupon.expiresAt,
      isActive: true,
    };

    storageService.addCoupon(created);
    setCoupons(storageService.getCoupons());
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/customers" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Tag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Promo Codes & Coupons</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create and manage checkout discount codes with minimum spend limits and expiry dates
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus className="h-4 w-4 mr-1" /> Create Promo Coupon
        </Button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-base tracking-wider px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {coupon.code}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Active
                </span>
              </div>

              <div className="text-2xl font-extrabold text-foreground">
                {coupon.discountType === "percentage" ? `${coupon.discountValue}% OFF` : `${formatCurrency(coupon.discountValue)} OFF`}
              </div>

              <div className="space-y-1 text-xs text-muted-foreground">
                <div>Min Purchase: <strong>{formatCurrency(coupon.minPurchase)}</strong></div>
                <div>Times Redeemed: <strong>{coupon.timesUsed} / {coupon.usageLimit}</strong></div>
                <div>Expires: <strong>{formatDate(coupon.expiresAt)}</strong></div>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
              <span className="text-[10px] text-muted-foreground">POS Ready</span>
              <span className="text-emerald-600 font-bold">Enabled</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Create New Promo Code</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BOISHAKH1433"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Discount Type</label>
                  <select
                    value={newCoupon.discountType}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (৳)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={newCoupon.discountValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background font-bold text-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Minimum Purchase (৳)</label>
                  <input
                    type="number"
                    value={newCoupon.minPurchase}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minPurchase: parseFloat(e.target.value) || 0 })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Usage Limit</label>
                  <input
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: parseInt(e.target.value) || 100 })}
                    className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Coupon
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

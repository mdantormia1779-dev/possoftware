"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Coupon } from "@/lib/types";
import { CouponsHeader } from "@/components/coupons/CouponsHeader";
import { CouponGrid } from "@/components/coupons/CouponGrid";
import { CreateCouponModal, NewCouponForm } from "@/components/coupons/CreateCouponModal";

export default function CouponsPage() {
  const { currentOrg } = useTenant();
  const [coupons, setCoupons] = useState<Coupon[]>(() => storageService.getCoupons());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCoupon, setNewCoupon] = useState<NewCouponForm>({
    code: "",
    discountType: "percentage",
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
      <CouponsHeader onAddCouponClick={() => setShowAddModal(true)} />

      <CouponGrid coupons={coupons} />

      <CreateCouponModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newCoupon={newCoupon}
        setNewCoupon={setNewCoupon}
        onSubmit={handleAddCoupon}
      />
    </div>
  );
}

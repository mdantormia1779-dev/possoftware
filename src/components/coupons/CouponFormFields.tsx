import React from "react";
import { NewCouponForm } from "./CreateCouponModal";

interface CouponFormFieldsProps {
  newCoupon: NewCouponForm;
  setNewCoupon: React.Dispatch<React.SetStateAction<NewCouponForm>>;
}

export function CouponFormFields({ newCoupon, setNewCoupon }: CouponFormFieldsProps) {
  return (
    <>
      <div className="space-y-1">
        <label className="font-semibold text-foreground">Coupon Code (Uppercase)</label>
        <input
          type="text"
          required
          placeholder="e.g. BOISHAKH1433"
          value={newCoupon.code}
          onChange={(e) =>
            setNewCoupon((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))
          }
          className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono font-bold uppercase"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Discount Type</label>
          <select
            value={newCoupon.discountType}
            onChange={(e) =>
              setNewCoupon((prev) => ({ ...prev, discountType: e.target.value as any }))
            }
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
            onChange={(e) =>
              setNewCoupon((prev) => ({
                ...prev,
                discountValue: parseFloat(e.target.value) || 0,
              }))
            }
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
            onChange={(e) =>
              setNewCoupon((prev) => ({
                ...prev,
                minPurchase: parseFloat(e.target.value) || 0,
              }))
            }
            className="w-full h-9 px-3 rounded-lg border border-border bg-background"
          />
        </div>
        <div className="space-y-1">
          <label className="font-semibold text-foreground">Usage Limit</label>
          <input
            type="number"
            value={newCoupon.usageLimit}
            onChange={(e) =>
              setNewCoupon((prev) => ({
                ...prev,
                usageLimit: parseInt(e.target.value) || 100,
              }))
            }
            className="w-full h-9 px-3 rounded-lg border border-border bg-background"
          />
        </div>
      </div>
    </>
  );
}

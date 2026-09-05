import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CouponFormFields } from "./CouponFormFields";

export interface NewCouponForm {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase: number;
  usageLimit: number;
  expiresAt: string;
}

interface CreateCouponModalProps {
  show: boolean;
  onClose: () => void;
  newCoupon: NewCouponForm;
  setNewCoupon: React.Dispatch<React.SetStateAction<NewCouponForm>>;
  onSubmit: (e: React.FormEvent) => void;
}

export function CreateCouponModal({
  show,
  onClose,
  newCoupon,
  setNewCoupon,
  onSubmit,
}: CreateCouponModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Create New Promo Code</h3>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 text-xs">
          <CouponFormFields newCoupon={newCoupon} setNewCoupon={setNewCoupon} />

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Coupon
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

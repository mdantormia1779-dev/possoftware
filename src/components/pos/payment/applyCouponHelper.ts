import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";

interface ApplyCouponParams {
  code: string;
  subtotal: number;
  onSuccess: (discount: number) => void;
  onError: (err: string) => void;
}

export function applyCouponHelper({
  code,
  subtotal,
  onSuccess,
  onError,
}: ApplyCouponParams) {
  onError("");
  const coupons = storageService.getCoupons();
  const found = coupons.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
  );
  if (!found) {
    onError("Invalid or expired coupon code");
    return;
  }
  if (subtotal < found.minPurchase) {
    onError(`Minimum purchase of ${formatCurrency(found.minPurchase)} required`);
    return;
  }
  const discount =
    found.discountType === "percentage"
      ? (subtotal * found.discountValue) / 100
      : found.discountValue;
  onSuccess(discount);
}

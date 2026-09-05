import React from "react";
import { Coupon } from "@/lib/types";
import { CouponCard } from "./CouponCard";

interface CouponGridProps {
  coupons: Coupon[];
}

export function CouponGrid({ coupons }: CouponGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
}

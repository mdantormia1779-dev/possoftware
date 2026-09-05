import React from "react";
import Link from "next/link";
import { Tag, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CouponsHeaderProps {
  onAddCouponClick: () => void;
}

export function CouponsHeader({ onAddCouponClick }: CouponsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/customers" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Tag className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Promo Codes &amp; Coupons</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and manage checkout discount codes with minimum spend limits and expiry dates
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={onAddCouponClick}>
        <Plus className="h-4 w-4 mr-1" /> Create Promo Coupon
      </Button>
    </div>
  );
}

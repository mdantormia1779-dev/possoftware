import React from "react";
import { RbacPermissionToggle } from "./RbacPermissionToggle";

interface RbacSettingsTabProps {
  permissions: {
    cashierDiscount: boolean;
    cashierPriceOverride: boolean;
    cashierViewProfit: boolean;
    cashierVoidBill: boolean;
  };
  setPermissions: (val: any) => void;
}

export function RbacSettingsTab({
  permissions,
  setPermissions,
}: RbacSettingsTabProps) {
  const setPerm = (key: string, val: boolean) =>
    setPermissions({ ...permissions, [key]: val });

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">Role-Based Access Control (RBAC)</h3>
        <p className="text-xs text-muted-foreground">
          Granular permission boundaries for Cashiers, Branch Managers, and Accountants
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Cashier &amp; Sales Counter Restrictions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <RbacPermissionToggle
            label="Allow Item-Level Discounts"
            description="Cashiers can enter up to 10% instant discount at checkout"
            checked={permissions.cashierDiscount}
            onChange={(v) => setPerm("cashierDiscount", v)}
          />
          <RbacPermissionToggle
            label="Allow Price Override"
            description="Cashier can change the product selling price directly on screen"
            checked={permissions.cashierPriceOverride}
            onChange={(v) => setPerm("cashierPriceOverride", v)}
          />
          <RbacPermissionToggle
            label="View Gross Profit & Purchase Cost"
            description="Exposes item wholesale purchase cost to sales counter staff"
            checked={permissions.cashierViewProfit}
            onChange={(v) => setPerm("cashierViewProfit", v)}
          />
          <RbacPermissionToggle
            label="Void Completed Bills Without OTP"
            description="Allows deleting or refunding sales without manager authorization"
            checked={permissions.cashierVoidBill}
            onChange={(v) => setPerm("cashierVoidBill", v)}
          />
        </div>
      </div>
    </div>
  );
}

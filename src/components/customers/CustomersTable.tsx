import React from "react";
import { Customer } from "@/types";
import { CustomersTableRow } from "./CustomersTableRow";

interface CustomersTableProps {
  customers: Customer[];
  onSelectDetail: (cust: Customer) => void;
}

export function CustomersTable({
  customers,
  onSelectDetail,
}: CustomersTableProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider h-11">
              <th className="px-4 py-3">Customer Name</th>
              <th className="px-4 py-3">Mobile Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Loyalty Points</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">Lifetime Spent</th>
              <th className="px-4 py-3">Due Balance</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-muted-foreground">
                  No customers found matching search criteria.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <CustomersTableRow
                  key={cust.id}
                  cust={cust}
                  onSelectDetail={onSelectDetail}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

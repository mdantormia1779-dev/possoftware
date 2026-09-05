import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export interface LiquidAccountItem {
  name: string;
  number: string;
  balance: number;
  type: string;
}

interface LiquidTreasuryCardProps {
  accounts: LiquidAccountItem[];
}

export function LiquidTreasuryCard({ accounts }: LiquidTreasuryCardProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Liquid Treasury Balances
          </h3>
          <p className="text-xs text-muted-foreground">Current available funds across institutions</p>
        </div>
        <Link
          href="/app/accounting/banks"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>Manage Banks</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-3">
        {accounts.map((account, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm">
                {account.type === "Bank" ? "🏦" : account.type === "MFS" ? "📱" : "💵"}
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">{account.name}</div>
                <div className="text-[10px] text-muted-foreground font-mono">{account.number}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono font-black text-sm text-foreground">
                {formatCurrency(account.balance)}
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Live Synced
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

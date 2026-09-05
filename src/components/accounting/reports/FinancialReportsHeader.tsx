import React from "react";
import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FinancialReportsHeaderProps {
  orgName: string;
  activeTab: "pnl" | "balance_sheet" | "trial_balance";
  setActiveTab: (tab: "pnl" | "balance_sheet" | "trial_balance") => void;
  onPrint: () => void;
}

export function FinancialReportsHeader({
  orgName,
  activeTab,
  setActiveTab,
  onPrint,
}: FinancialReportsHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <Link href="/app/accounting" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Standard Financial Statements</h1>
            <p className="text-xs text-muted-foreground">Certified Profit &amp; Loss and Balance Sheet for {orgName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-1.5" /> Print Statement
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-3 no-print text-xs">
        <button
          onClick={() => setActiveTab("pnl")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "pnl"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Profit &amp; Loss Statement
        </button>
        <button
          onClick={() => setActiveTab("balance_sheet")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "balance_sheet"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Balance Sheet
        </button>
        <button
          onClick={() => setActiveTab("trial_balance")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "trial_balance"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Trial Balance
        </button>
      </div>
    </>
  );
}

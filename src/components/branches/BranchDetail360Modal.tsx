import React, { useState } from "react";
import { Store, X, Printer } from "lucide-react";
import { Branch, Sale, Product, Category, StockTransfer } from "@/types";
import { Button } from "@/components/ui/Button";
import { BranchOverviewTab } from "./tabs/BranchOverviewTab";
import { BranchSalesTab } from "./tabs/BranchSalesTab";
import { BranchInventoryTab } from "./tabs/BranchInventoryTab";
import { BranchEmployeesTab } from "./tabs/BranchEmployeesTab";
import { BranchTransfersTab } from "./tabs/BranchTransfersTab";
import { BranchReportsTab } from "./tabs/BranchReportsTab";
import { BranchDetailTabsBar, BranchTabType } from "./BranchDetailTabsBar";

interface BranchDetail360ModalProps {
  branch: Branch | null;
  onClose: () => void;
  sales: Sale[];
  products: Product[];
  categories: Category[];
  transfers: StockTransfer[];
}

export function BranchDetail360Modal({
  branch,
  onClose,
  sales,
  products,
  categories,
  transfers,
}: BranchDetail360ModalProps) {
  const [activeTab, setActiveTab] = useState<BranchTabType>("overview");

  if (!branch) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-card border border-border rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-black">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-foreground">{branch.name}</h3>
                <span className="text-xs font-mono text-muted-foreground">({branch.code})</span>
              </div>
              <p className="text-xs text-muted-foreground">{branch.address}, {branch.city}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <BranchDetailTabsBar activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && <BranchOverviewTab branch={branch} />}
        {activeTab === "sales" && <BranchSalesTab branchName={branch.name} sales={sales} />}
        {activeTab === "inventory" && <BranchInventoryTab products={products} categories={categories} selectedBranch={branch} />}
        {activeTab === "employees" && <BranchEmployeesTab />}
        {activeTab === "transfers" && <BranchTransfersTab branchName={branch.name} transfers={transfers} />}
        {activeTab === "reports" && <BranchReportsTab />}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 text-xs font-bold">
            <Printer className="h-4 w-4" /> Print Branch Audit Report
          </Button>
          <Button variant="primary" size="sm" onClick={onClose} className="font-bold text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

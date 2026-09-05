"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Branch } from "@/types";
import { BranchHeader } from "@/components/branches/BranchHeader";
import { BranchCard } from "@/components/branches/BranchCard";
import { AddBranchModal } from "@/components/branches/AddBranchModal";
import { BranchDetail360Modal } from "@/components/branches/BranchDetail360Modal";
import { BranchFormData } from "@/components/branches/AddBranchFormFields";

export default function BranchesPage() {
  const { branches, setCurrentBranch, currentBranch, currentOrg } = useTenant();
  const [branchList, setBranchList] = useState<Branch[]>(branches);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const categories = storageService.getCategories();
  const transfers = storageService.getTransfers();

  const handleAddBranch = (form: BranchFormData) => {
    const created: Branch = {
      id: `br-${Date.now()}`,
      organizationId: currentOrg.id,
      name: form.name,
      code: form.code.toUpperCase(),
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      isMainBranch: false,
      managerName: form.managerName,
      managerPhone: form.managerPhone,
      employeeCount: 4,
      totalSalesToday: 0,
      totalStockValue: 0,
      isActive: true,
    };

    storageService.addBranch(created);
    setBranchList(storageService.getBranches());
    setShowAddModal(false);
  };

  const branchSales = selectedBranch
    ? sales.filter((s) => s.branchId === selectedBranch.id || selectedBranch.isMainBranch).slice(0, 5)
    : [];

  const branchTransfers = transfers.filter(
    (t) =>
      selectedBranch &&
      (t.sourceBranchName.includes(selectedBranch.name) || t.destinationBranchName.includes(selectedBranch.name))
  );

  return (
    <div className="space-y-6">
      <BranchHeader onAddClick={() => setShowAddModal(true)} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {branchList.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            isCurrent={currentBranch.id === branch.id}
            onSelectDetails={setSelectedBranch}
            onSwitchWorkspace={setCurrentBranch}
          />
        ))}
      </div>

      <BranchDetail360Modal
        branch={selectedBranch}
        onClose={() => setSelectedBranch(null)}
        sales={branchSales}
        products={products}
        categories={categories}
        transfers={branchTransfers}
      />

      <AddBranchModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddBranch}
      />
    </div>
  );
}

import { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Supplier } from "@/types";

export function useSuppliers() {
  const { currentOrg } = useTenant();
  const [suppliers, setSuppliers] = useState<Supplier[]>(() =>
    storageService.getSuppliers()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.companyName && s.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSupplier = (data: {
    name: string;
    companyName: string;
    phone: string;
    email: string;
    address: string;
    balanceDue: number;
  }) => {
    const created: Supplier = {
      id: `supp-${Date.now()}`,
      organizationId: currentOrg.id,
      name: data.name,
      companyName: data.companyName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      balanceDue: Number(data.balanceDue) || 0,
      totalPurchased: 0,
    };

    storageService.addSupplier(created);
    setSuppliers(storageService.getSuppliers());
  };

  return {
    suppliers: filteredSuppliers,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    handleAddSupplier,
  };
}

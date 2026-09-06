import { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { supplierService } from "@/services/supplier.service";
import { Supplier } from "@/types";

export function useSuppliers() {
  const { currentOrg } = useTenant();
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => storageService.getSuppliers());
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    supplierService.getSuppliers(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setSuppliers(res.data);
      }
    });
  }, [currentOrg?.id]);

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
      organizationId: currentOrg?.id || "org-1",
      name: data.name,
      companyName: data.companyName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      balanceDue: Number(data.balanceDue) || 0,
      totalPurchased: 0,
    };

    storageService.addSupplier(created);
    setSuppliers((prev) => [created, ...prev]);
    supplierService.createSupplier(created, currentOrg?.id).catch(() => {});
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

import { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Customer } from "@/types";

export function useCustomers() {
  const { currentOrg } = useTenant();
  const [customers, setCustomers] = useState<Customer[]>(() =>
    storageService.getCustomers()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustDetail, setSelectedCustDetail] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddCustomer = (data: {
    name: string;
    phone: string;
    email: string;
    address: string;
    creditLimit: number;
  }) => {
    const created: Customer = {
      id: `cust-${Date.now()}`,
      organizationId: currentOrg.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      loyaltyPoints: 50,
      dueBalance: 0,
      creditLimit: Number(data.creditLimit) || 25000,
      totalSpent: 0,
      ordersCount: 0,
    };

    storageService.addCustomer(created);
    setCustomers(storageService.getCustomers());
  };

  return {
    customers: filteredCustomers,
    searchQuery,
    setSearchQuery,
    showAddModal,
    setShowAddModal,
    selectedCustDetail,
    setSelectedCustDetail,
    handleAddCustomer,
  };
}

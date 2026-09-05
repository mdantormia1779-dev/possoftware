"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Organization, SubscriptionStatus } from "@/lib/types";
import { OrgFormData } from "./OrgFormFields";
import {
  buildNewOrg,
  buildMainBranch,
  takeControlTenant,
  filterOrgs,
  purgeOrgData,
} from "./orgActions";

export function useOrgManagement() {
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();

  const [orgs, setOrgs] = useState<Organization[]>(() => storageService.getOrganizations());
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const filteredOrgs = filterOrgs(orgs, searchQuery, planFilter, statusFilter);

  const handleToggleStatus = (org: Organization) => {
    const newStatus: SubscriptionStatus = org.subscriptionStatus === "active" ? "cancelled" : "active";
    storageService.updateOrganization({ ...org, subscriptionStatus: newStatus });
    setOrgs(storageService.getOrganizations());
  };

  const handleCreateOrg = (data: OrgFormData) => {
    const newOrg = buildNewOrg(data);
    storageService.addOrganization(newOrg);
    storageService.addBranch(buildMainBranch(newOrg.id, data));
    setOrgs(storageService.getOrganizations());
    setIsCreateOpen(false);
  };

  const handleSaveEdit = (updated: Organization) => {
    storageService.updateOrganization(updated);
    setOrgs(storageService.getOrganizations());
    setIsEditOpen(false);
    setSelectedOrg(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedOrg) return;
    storageService.deleteOrganization(selectedOrg.id);
    setOrgs(storageService.getOrganizations());
    setIsDeleteOpen(false);
    setSelectedOrg(null);
  };

  return {
    orgs,
    filteredOrgs,
    searchQuery,
    setSearchQuery,
    planFilter,
    setPlanFilter,
    statusFilter,
    setStatusFilter,
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedOrg,
    setSelectedOrg,
    handleTakeControl: (org: Organization) =>
      takeControlTenant(org, setCurrentOrg, setCurrentBranch, setCurrentRole, router),
    handleToggleStatus,
    handlePurgeData: purgeOrgData,
    handleCreateOrg,
    handleSaveEdit,
    handleConfirmDelete,
    openEdit: (org: Organization) => {
      setSelectedOrg(org);
      setIsEditOpen(true);
    },
    openDelete: (org: Organization) => {
      setSelectedOrg(org);
      setIsDeleteOpen(true);
    },
  };
}

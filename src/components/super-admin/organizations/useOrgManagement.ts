"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { superAdminService } from "@/services/superAdmin.service";
import { Organization } from "@/lib/types";
import { OrgFormData } from "./OrgFormFields";
import { useOrgModals } from "./useOrgModals";
import {
  takeControlTenant,
  filterOrgs,
  purgeOrgData,
} from "./orgActions";

export function useOrgManagement() {
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();
  const modals = useOrgModals();

  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchOrgs = useCallback(async () => {
    try {
      const res = await superAdminService.getOrganizations();
      if (res.success && res.data) setOrgs(res.data);
    } catch {}
  }, []);

  useEffect(() => {
    fetchOrgs();
  }, [fetchOrgs]);

  const filteredOrgs = filterOrgs(orgs, searchQuery, planFilter, statusFilter);

  const handleToggleStatus = async (org: Organization) => {
    const isLive = org.subscriptionStatus === "ACTIVE" || org.subscriptionStatus === "active";
    const newStatus = isLive ? "CANCELLED" : "ACTIVE";
    await superAdminService.updateOrganization({ id: org.id, subscriptionStatus: newStatus });
    fetchOrgs();
  };

  const handleCreateOrg = (_data: OrgFormData) => {
    fetchOrgs();
    modals.setIsCreateOpen(false);
  };

  const handleSaveEdit = async (updated: Organization) => {
    await superAdminService.updateOrganization({
      id: updated.id,
      subscriptionPlan: updated.subscriptionPlan,
      subscriptionStatus: updated.subscriptionStatus,
      maxBranches: updated.maxBranches,
      maxStaff: updated.maxStaff,
    });
    fetchOrgs();
    modals.closeModals();
  };

  return {
    ...modals,
    orgs,
    filteredOrgs,
    searchQuery,
    setSearchQuery,
    planFilter,
    setPlanFilter,
    statusFilter,
    setStatusFilter,
    handleTakeControl: (org: Organization) =>
      takeControlTenant(org, setCurrentOrg, setCurrentBranch, setCurrentRole, router),
    handleToggleStatus,
    handlePurgeData: purgeOrgData,
    handleCreateOrg,
    handleSaveEdit,
    handleConfirmDelete: modals.closeModals,
  };
}

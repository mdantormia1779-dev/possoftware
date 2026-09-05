"use client";

import React from "react";
import { useOrgManagement } from "@/components/super-admin/organizations/useOrgManagement";
import { OrgHeader } from "@/components/super-admin/organizations/OrgHeader";
import { OrgSummaryStats } from "@/components/super-admin/organizations/OrgSummaryStats";
import { OrgFilterBar } from "@/components/super-admin/organizations/OrgFilterBar";
import { OrgTable } from "@/components/super-admin/organizations/OrgTable";
import { CreateOrgModal } from "@/components/super-admin/organizations/CreateOrgModal";
import { EditOrgModal } from "@/components/super-admin/organizations/EditOrgModal";
import { DeleteOrgModal } from "@/components/super-admin/organizations/DeleteOrgModal";

export default function SuperAdminOrganizationsPage() {
  const m = useOrgManagement();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <OrgHeader onAddNew={() => m.setIsCreateOpen(true)} />
      <OrgSummaryStats orgs={m.orgs} />
      <OrgFilterBar
        searchQuery={m.searchQuery}
        onSearchChange={m.setSearchQuery}
        planFilter={m.planFilter}
        onPlanChange={m.setPlanFilter}
        statusFilter={m.statusFilter}
        onStatusChange={m.setStatusFilter}
      />
      <OrgTable
        orgs={m.filteredOrgs}
        onTakeControl={m.handleTakeControl}
        onEdit={m.openEdit}
        onToggleStatus={m.handleToggleStatus}
        onPurgeData={m.handlePurgeData}
        onDelete={m.openDelete}
      />

      <CreateOrgModal
        isOpen={m.isCreateOpen}
        onClose={() => m.setIsCreateOpen(false)}
        onSave={m.handleCreateOrg}
      />

      <EditOrgModal
        isOpen={m.isEditOpen}
        org={m.selectedOrg}
        onClose={() => {
          m.setIsEditOpen(false);
          m.setSelectedOrg(null);
        }}
        onSave={m.handleSaveEdit}
      />

      <DeleteOrgModal
        isOpen={m.isDeleteOpen}
        org={m.selectedOrg}
        onClose={() => {
          m.setIsDeleteOpen(false);
          m.setSelectedOrg(null);
        }}
        onConfirm={m.handleConfirmDelete}
      />
    </div>
  );
}

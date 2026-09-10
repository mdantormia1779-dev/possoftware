"use client";

import { useState } from "react";
import { Organization } from "@/lib/types";

export function useOrgModals() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const openEdit = (org: Organization) => {
    setSelectedOrg(org);
    setIsEditOpen(true);
  };

  const openDelete = (org: Organization) => {
    setSelectedOrg(org);
    setIsDeleteOpen(true);
  };

  const closeModals = () => {
    setIsCreateOpen(false);
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setSelectedOrg(null);
  };

  return {
    isCreateOpen,
    setIsCreateOpen,
    isEditOpen,
    setIsEditOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedOrg,
    setSelectedOrg,
    openEdit,
    openDelete,
    closeModals,
  };
}

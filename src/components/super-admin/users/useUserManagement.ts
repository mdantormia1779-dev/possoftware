"use client";

import { useState, useEffect, useCallback } from "react";
import { PlatformUser } from "./userTypes";
import { superAdminService } from "@/services/superAdmin.service";

export function useUserManagement() {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await superAdminService.getUsers();
      if (res.success && res.data) setUsers(res.data);
    } catch {}
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q) ||
      u.phone.includes(search);
    const matchRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleUserStatus = async (id: string) => {
    const target = users.find((u) => u.id === id);
    if (!target) return;
    const newActive = target.status !== "active";
    await superAdminService.updateUserStatus(id, newActive);
    fetchUsers();
  };

  const handleCreateUser = () => {
    fetchUsers();
    setShowInviteModal(false);
  };

  const handleImpersonate = (user: PlatformUser) => {
    alert(
      `Impersonating ${user.name} (${user.role}) under tenant ${user.organization}... Redirecting to app workspace.`
    );
  };

  return {
    users,
    filteredUsers,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    showInviteModal,
    setShowInviteModal,
    toggleUserStatus,
    handleCreateUser,
    handleImpersonate,
  };
}

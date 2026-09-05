"use client";

import { useState } from "react";
import { PlatformUser } from "./userTypes";
import { INITIAL_USERS } from "./mockUsers";

export function useUserManagement() {
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organization.toLowerCase().includes(q) ||
      u.phone.includes(search);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u))
    );
  };

  const handleCreateUser = (newUser: {
    name: string;
    email: string;
    role: PlatformUser["role"];
    org: string;
  }) => {
    const created: PlatformUser = {
      id: `usr-${Date.now().toString().slice(-3)}`,
      name: newUser.name,
      email: newUser.email,
      phone: "+880 1700-998877",
      role: newUser.role,
      organization: newUser.org,
      organizationId: "org-01",
      status: "active",
      lastLogin: "Never",
      twoFactorEnabled: false,
    };
    setUsers([created, ...users]);
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

"use client";

import React from "react";
import { useUserManagement } from "@/components/super-admin/users/useUserManagement";
import { UserHeader } from "@/components/super-admin/users/UserHeader";
import { UserKpis } from "@/components/super-admin/users/UserKpis";
import { UserFilterBar } from "@/components/super-admin/users/UserFilterBar";
import { UserTable } from "@/components/super-admin/users/UserTable";
import { AddUserModal } from "@/components/super-admin/users/AddUserModal";

export default function SuperAdminUsersPage() {
  const m = useUserManagement();

  return (
    <div className="space-y-6">
      <UserHeader onAddUser={() => m.setShowInviteModal(true)} />
      <UserKpis users={m.users} />
      <UserFilterBar
        search={m.search}
        onSearchChange={m.setSearch}
        roleFilter={m.roleFilter}
        onRoleFilterChange={m.setRoleFilter}
        statusFilter={m.statusFilter}
        onStatusFilterChange={m.setStatusFilter}
      />
      <UserTable
        users={m.filteredUsers}
        onToggleStatus={m.toggleUserStatus}
        onImpersonate={m.handleImpersonate}
      />
      <AddUserModal
        isOpen={m.showInviteModal}
        onClose={() => m.setShowInviteModal(false)}
        onAddUser={m.handleCreateUser}
      />
    </div>
  );
}

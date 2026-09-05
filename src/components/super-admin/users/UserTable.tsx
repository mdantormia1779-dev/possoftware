"use client";

import React from "react";
import { PlatformUser } from "./userTypes";
import { UserTableRow } from "./UserTableRow";

interface UserTableProps {
  users: PlatformUser[];
  onToggleStatus: (id: string) => void;
  onImpersonate: (user: PlatformUser) => void;
}

export function UserTable({ users, onToggleStatus, onImpersonate }: UserTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-subtle-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40 font-bold text-muted-foreground uppercase text-[10px] tracking-wider">
              <th className="p-3.5">User Details</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Organization</th>
              <th className="p-3.5">Last Login</th>
              <th className="p-3.5">2FA</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No users matching criteria.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <UserTableRow
                  key={u.id}
                  user={u}
                  onToggleStatus={onToggleStatus}
                  onImpersonate={onImpersonate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

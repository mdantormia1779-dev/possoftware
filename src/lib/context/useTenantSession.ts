"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { User, UserRole } from "../types";
import { getDefaultUserForRole } from "./defaultPersonas";

export function useTenantSession() {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [currentRole, setCurrentRoleState] = useState<UserRole>("company_owner");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("xyz_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        setCurrentUserState(u);
        if (u.role) setCurrentRoleState(u.role);
      } catch {}
    } else {
      const savedRole = localStorage.getItem("xyz_user_role") as UserRole;
      if (savedRole && ["company_owner", "branch_manager", "accountant", "cashier", "staff", "super_admin"].includes(savedRole)) {
        setCurrentRoleState(savedRole);
      }
    }
  }, []);

  const setCurrentRole = useCallback((role: UserRole) => {
    setCurrentRoleState(role);
    if (typeof window !== "undefined") localStorage.setItem("xyz_user_role", role);
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("xyz_user", JSON.stringify(user));
        if (user.role) localStorage.setItem("xyz_user_role", user.role);
      } else {
        localStorage.removeItem("xyz_user");
      }
    }
  }, []);

  const activeUser = useMemo(() => {
    return currentUser || getDefaultUserForRole(currentRole);
  }, [currentUser, currentRole]);

  return {
    currentUser: activeUser,
    setCurrentUser,
    currentRole,
    setCurrentRole,
  };
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { UserRole } from "@/lib/types";
import { authService } from "@/services/auth.service";

export function useLoginForm() {
  const router = useRouter();
  const { setCurrentRole, setCurrentUser, setCurrentOrg, setCurrentBranch } = useTenant();

  const [emailOrPhone, setEmailOrPhone] = useState("owner@rahmanfashion.com.bd");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleLoading, setActiveRoleLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const idVal = emailOrPhone.trim();
    if (!idVal) return setErrorMessage("Please enter your email or phone number.");
    if (!password) return setErrorMessage("Please enter your password.");

    setIsLoading(true);
    try {
      const res = await authService.login({ emailOrPhone: idVal, password });
      if (!res.success || !res.data) {
        setErrorMessage(res.error || "Invalid email/phone or password");
        setIsLoading(false);
        return;
      }

      const { user, organization, branch } = res.data;
      setCurrentUser(user);
      if (user.role) setCurrentRole(user.role as UserRole);
      if (organization) setCurrentOrg(organization);
      if (branch) setCurrentBranch(branch);

      const target = user.role === "super_admin" ? "/super-admin" : "/app/dashboard";
      router.push(target);
    } catch {
      setErrorMessage("Network error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickRoleLogin = async (role: UserRole, email: string, targetRoute: string) => {
    setEmailOrPhone(email);
    setPassword("password123");
    setActiveRoleLoading(role);
    setErrorMessage(null);

    try {
      const res = await authService.login({ emailOrPhone: email, password: "password123" });
      if (res.success && res.data) {
        const { user, organization, branch } = res.data;
        setCurrentUser(user);
        if (user.role) setCurrentRole(user.role as UserRole);
        if (organization) setCurrentOrg(organization);
        if (branch) setCurrentBranch(branch);
      } else {
        setCurrentRole(role);
      }
      router.push(targetRoute);
    } catch {
      setCurrentRole(role);
      router.push(targetRoute);
    } finally {
      setActiveRoleLoading(null);
    }
  };

  return {
    emailOrPhone,
    setEmailOrPhone,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    isLoading,
    activeRoleLoading,
    errorMessage,
    setErrorMessage,
    handleLogin,
    handleQuickRoleLogin,
  };
}


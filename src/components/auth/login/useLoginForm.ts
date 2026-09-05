"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { UserRole } from "@/lib/types";

export function useLoginForm() {
  const router = useRouter();
  const { setCurrentRole } = useTenant();

  const [emailOrPhone, setEmailOrPhone] = useState("owner@rahmanfashion.com.bd");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRoleLoading, setActiveRoleLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!emailOrPhone.trim()) {
      setErrorMessage("Please enter your email or phone number.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);

    const lower = emailOrPhone.toLowerCase();
    let detectedRole: UserRole = "company_owner";
    let target = "/app/dashboard";

    if (lower.includes("cashier")) {
      detectedRole = "cashier";
    } else if (lower.includes("manager")) {
      detectedRole = "branch_manager";
    } else if (lower.includes("accountant")) {
      detectedRole = "accountant";
    } else if (lower.includes("staff")) {
      detectedRole = "staff";
    } else if (lower.includes("admin")) {
      detectedRole = "super_admin";
      target = "/super-admin";
    }

    setCurrentRole(detectedRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", detectedRole);
    }

    setTimeout(() => {
      setIsLoading(false);
      router.push(target);
    }, 450);
  };

  const handleQuickRoleLogin = (role: UserRole, email: string, targetRoute: string) => {
    setEmailOrPhone(email);
    setPassword("password123");
    setActiveRoleLoading(role);
    setCurrentRole(role);
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", role);
    }
    setTimeout(() => {
      router.push(targetRoute);
    }, 400);
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

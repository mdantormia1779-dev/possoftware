"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { superAdminService, SuperAdminAnalytics } from "@/services/superAdmin.service";
import { Organization } from "@/lib/types";

export function useSuperAdminDashboard() {
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();

  const [analytics, setAnalytics] = useState<SuperAdminAnalytics | null>(null);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [analyticsRes, orgsRes] = await Promise.all([
        superAdminService.getAnalytics(),
        superAdminService.getOrganizations(),
      ]);

      if (analyticsRes.success && analyticsRes.data) {
        setAnalytics(analyticsRes.data);
      }
      if (orgsRes.success && orgsRes.data) {
        setOrgs(orgsRes.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load real super-admin data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleTakeControl = (org: Organization) => {
    setCurrentOrg(org);
    if ((org as any).branches?.length > 0) {
      setCurrentBranch((org as any).branches[0]);
    }
    setCurrentRole("company_owner");
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", "company_owner");
      localStorage.setItem("super_admin_controlling", org.id);
      localStorage.setItem("super_admin_controlling_name", org.name);
    }
    router.push("/app/dashboard");
  };

  return {
    analytics,
    orgs,
    isLoading,
    error,
    refresh: fetchDashboardData,
    handleTakeControl,
  };
}

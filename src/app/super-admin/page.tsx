"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { Organization } from "@/lib/types";
import { SuperAdminHeader } from "@/components/super-admin/SuperAdminHeader";
import { SuperAdminKpis } from "@/components/super-admin/SuperAdminKpis";
import { SuperAdminMrrChart } from "@/components/super-admin/SuperAdminMrrChart";
import { SuperAdminPlanMix } from "@/components/super-admin/SuperAdminPlanMix";
import { SuperAdminTenantTable } from "@/components/super-admin/SuperAdminTenantTable";

export default function SuperAdminDashboardPage() {
  const router = useRouter();
  const { setCurrentOrg, setCurrentBranch, setCurrentRole } = useTenant();
  const orgs = storageService.getOrganizations();

  const handleTakeControl = (org: Organization) => {
    setCurrentOrg(org);
    const branches = storageService.getBranches().filter((b) => b.organizationId === org.id);
    if (branches.length > 0) {
      setCurrentBranch(branches[0]);
    }
    setCurrentRole("company_owner");
    if (typeof window !== "undefined") {
      localStorage.setItem("xyz_user_role", "company_owner");
      localStorage.setItem("super_admin_controlling", org.id);
      localStorage.setItem("super_admin_controlling_name", org.name);
    }
    router.push("/app/dashboard");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SuperAdminHeader />

      <SuperAdminKpis tenantsCount={orgs.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <SuperAdminMrrChart />
        <SuperAdminPlanMix />
      </div>

      <SuperAdminTenantTable
        orgs={orgs}
        onTakeControl={handleTakeControl}
      />
    </div>
  );
}

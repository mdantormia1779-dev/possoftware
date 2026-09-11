"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiCopperCoinLine, RiSparkling2Fill } from "react-icons/ri";
import { TbArrowLeft, TbPlus } from "react-icons/tb";
import { Button } from "@/components/ui/Button";
import { superAdminService } from "@/services/superAdmin.service";
import { PlanData } from "@/components/super-admin/plans/planTypes";
import { PlanCard } from "@/components/super-admin/plans/PlanCard";
import { CreatePlanModal } from "@/components/super-admin/plans/CreatePlanModal";
import { EditPlanModal } from "@/components/super-admin/plans/EditPlanModal";
import { DeletePlanModal } from "@/components/super-admin/plans/DeletePlanModal";

const DEFAULT_PLANS: PlanData[] = [
  { id: "1", name: "Starter", tier: "STARTER", monthlyPrice: 2999, maxBranches: 1, maxStaff: 5, features: ["1 Branch", "5 Staff Accounts", "5,000 Products"] },
  { id: "2", name: "Business", tier: "BUSINESS", monthlyPrice: 6999, maxBranches: 3, maxStaff: 20, features: ["3 Branches", "20 Staff Accounts", "Full POS & Accounting"] },
  { id: "3", name: "Enterprise", tier: "ENTERPRISE", monthlyPrice: 14999, maxBranches: 10, maxStaff: 100, features: ["Unlimited Branches", "Dedicated Support", "Custom Domain"] },
];

export default function SuperAdminPlansPage() {
  const [plans, setPlans] = useState<PlanData[]>(DEFAULT_PLANS);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanData | null>(null);
  const [deletingPlan, setDeletingPlan] = useState<PlanData | null>(null);

  const fetchPlans = () => {
    superAdminService.getPlans().then((res) => {
      if (res.success && res.data && res.data.length > 0) setPlans(res.data);
    });
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleCreate = async (data: PlanData) => {
    const res = await superAdminService.createPlan(data);
    if (res.success && res.data) setPlans((prev) => [...prev, res.data]);
    else fetchPlans();
  };

  const handleUpdate = async (data: PlanData) => {
    const res = await superAdminService.updatePlan(data);
    if (res.success && res.data) {
      setPlans((prev) => prev.map((p) => (p.id === data.id ? res.data : p)));
    } else fetchPlans();
  };

  const handleDelete = async (id: string) => {
    await superAdminService.deletePlan(id);
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
            <TbArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600">
                <RiCopperCoinLine className="h-6 w-6" />
              </div>
              <span>SaaS Subscription Plans &amp; Tiers</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Production billing packages, branch quotas, and features configured in PostgreSQL
            </p>
          </div>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} className="bg-purple-600 hover:bg-purple-700 font-bold shadow-md shadow-purple-600/20">
          <TbPlus className="h-4 w-4 mr-1.5" />
          <span>New Plan Tier</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <PlanCard key={plan.id || idx} plan={plan} onEdit={setEditingPlan} onDelete={setDeletingPlan} />
        ))}
      </div>

      <CreatePlanModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onSave={handleCreate} />
      <EditPlanModal isOpen={!!editingPlan} plan={editingPlan} onClose={() => setEditingPlan(null)} onSave={handleUpdate} />
      <DeletePlanModal isOpen={!!deletingPlan} plan={deletingPlan} onClose={() => setDeletingPlan(null)} onConfirm={handleDelete} />
    </div>
  );
}

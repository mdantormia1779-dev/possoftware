"use client";

import React, { useState, useEffect } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { marketingService } from "@/services/marketing.service";
import { Campaign } from "@/lib/types";
import { CampaignsHeader } from "@/components/campaigns/CampaignsHeader";
import { CampaignGrid } from "@/components/campaigns/CampaignGrid";
import { CreateCampaignModal, NewCampaignForm } from "@/components/campaigns/CreateCampaignModal";

export default function MarketingCampaignsPage() {
  const { currentOrg } = useTenant();
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => storageService.getCampaigns());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newCamp, setNewCamp] = useState<NewCampaignForm>({
    title: "",
    channel: "sms",
    targetAudience: "All Registered Customers",
    message: "",
  });

  useEffect(() => {
    marketingService.getCampaigns(currentOrg?.id).then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setCampaigns(res.data);
      }
    });
  }, [currentOrg?.id]);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCamp.title || !newCamp.message) return;

    const created: Campaign = {
      id: `cmp-${Date.now()}`,
      organizationId: currentOrg?.id || "org-1",
      title: newCamp.title,
      channel: newCamp.channel,
      targetAudience: newCamp.targetAudience,
      message: newCamp.message,
      recipientCount: 650,
      sentCount: 650,
      status: "sent",
      scheduledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    storageService.addCampaign(created);
    setCampaigns((prev) => [created, ...prev]);
    marketingService.createCampaign(created, currentOrg?.id).catch(() => {});
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <CampaignsHeader onNewCampaignClick={() => setShowAddModal(true)} />
      <CampaignGrid campaigns={campaigns} />
      <CreateCampaignModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newCamp={newCamp}
        setNewCamp={setNewCamp}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}

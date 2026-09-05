import React from "react";
import { Campaign } from "@/lib/types";
import { CampaignCard } from "./CampaignCard";

interface CampaignGridProps {
  campaigns: Campaign[];
}

export function CampaignGrid({ campaigns }: CampaignGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map((camp) => (
        <CampaignCard key={camp.id} camp={camp} />
      ))}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Megaphone, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CampaignsHeaderProps {
  onNewCampaignClick: () => void;
}

export function CampaignsHeader({ onNewCampaignClick }: CampaignsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link href="/app/customers" className="p-2 rounded-lg border border-border hover:bg-muted">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Broadcast Marketing Campaigns</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Launch bulk SMS and WhatsApp festive promotions (৳0.35/SMS) directly to customer cohorts
          </p>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={onNewCampaignClick}>
        <Send className="h-4 w-4 mr-1" /> Launch New Campaign
      </Button>
    </div>
  );
}

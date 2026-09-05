import React from "react";
import { Campaign } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";

interface CampaignCardProps {
  camp: Campaign;
}

export function CampaignCard({ camp }: CampaignCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">{camp.title}</h3>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              Audience: {camp.targetAudience}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-muted text-foreground">
              {camp.channel}
            </span>
            <StatusBadge status={camp.status} />
          </div>
        </div>

        {/* Message Box */}
        <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs leading-relaxed text-foreground font-sans">
          &ldquo;{camp.message}&rdquo;
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-card border border-border">
            <span className="text-[10px] text-muted-foreground block">Recipients Reached</span>
            <strong className="text-foreground">{camp.recipientCount} Customers</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-card border border-border">
            <span className="text-[10px] text-muted-foreground block">Broadcast Date</span>
            <strong className="text-foreground">{formatDate(camp.createdAt)}</strong>
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-between items-center text-xs text-muted-foreground">
        <span>Channel Delivery: 99.4%</span>
        <span className="text-emerald-600 font-semibold flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
        </span>
      </div>
    </div>
  );
}

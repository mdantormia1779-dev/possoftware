import React from "react";
import { Button } from "@/components/ui/Button";

interface IntegrationCardProps {
  initials: string;
  avatarBg: string;
  title: string;
  description: string;
  status: "Connected" | "Active" | "Not Linked";
  buttonText: string;
}

export function IntegrationCard({
  initials,
  avatarBg,
  title,
  description,
  status,
  buttonText,
}: IntegrationCardProps) {
  const isConnected = status === "Connected" || status === "Active";

  return (
    <div className="p-4 rounded-2xl border border-border bg-card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-8 w-8 rounded-lg ${avatarBg} text-white font-black text-xs flex items-center justify-center`}>
            {initials}
          </div>
          <div>
            <h4 className="font-bold text-foreground">{title}</h4>
            <p className="text-[10px] text-muted-foreground">{description}</p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
            isConnected
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {status}
        </span>
      </div>
      <Button type="button" variant="outline" size="sm" className="w-full text-xs">
        {buttonText}
      </Button>
    </div>
  );
}

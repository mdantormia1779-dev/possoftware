"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface OrgHeaderProps {
  onAddNew: () => void;
}

export function OrgHeader({ onAddNew }: OrgHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-border/80">
      <div className="flex items-center gap-3">
        <Link
          href="/super-admin"
          className="p-2 rounded-xl border border-border/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <span>Tenant Companies &amp; Full Control</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage, impersonate, configure plans, or permanently delete any organization on the platform
          </p>
        </div>
      </div>

      <Button
        onClick={onAddNew}
        variant="primary"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/25 shrink-0"
      >
        <Plus className="h-4 w-4" />
        <span>Add New Company</span>
      </Button>
    </div>
  );
}

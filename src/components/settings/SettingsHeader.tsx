import React from "react";
import { Settings, CheckCircle2 } from "lucide-react";

interface SettingsHeaderProps {
  savedToast: boolean;
}

export function SettingsHeader({ savedToast }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Company &amp; System Settings</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Manage your organization identity, NBR VAT compliance, POS hardware, user permissions, and integrations
        </p>
      </div>

      {savedToast && (
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </div>
  );
}

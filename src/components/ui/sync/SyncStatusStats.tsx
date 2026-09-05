import React from "react";
import { RefreshCw, Database } from "lucide-react";

interface SyncStatusStatsProps {
  queueCount: number;
  isSyncing: boolean;
}

export function SyncStatusStats({ queueCount, isSyncing }: SyncStatusStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5 text-center">
      <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Pending Queue
        </div>
        <div className="text-xl font-black text-foreground mt-1 font-mono">
          {queueCount}
        </div>
      </div>
      <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Sync Engine
        </div>
        <div className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1 flex items-center justify-center gap-1">
          {isSyncing ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Syncing...
            </>
          ) : (
            "Ready"
          )}
        </div>
      </div>
      <div className="p-3.5 rounded-2xl border border-border/70 bg-card shadow-subtle-xs">
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Local Store
        </div>
        <div className="text-xs sm:text-sm font-bold text-foreground mt-1 flex items-center justify-center gap-1">
          <Database className="h-3.5 w-3.5 text-indigo-500" /> Dexie.js
        </div>
      </div>
    </div>
  );
}

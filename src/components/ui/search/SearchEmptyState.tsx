import React from "react";
import { Command } from "lucide-react";

export function SearchEmptyState() {
  return (
    <div className="py-8 text-center text-xs sm:text-sm text-muted-foreground space-y-3">
      <div className="flex justify-center">
        <div className="p-3 rounded-2xl bg-muted/60 text-muted-foreground border border-border/40">
          <Command className="h-6 w-6" />
        </div>
      </div>
      <p className="font-medium text-foreground">
        Type anything to search across XYZ Business OS
      </p>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
          Panjabi
        </span>
        <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
          INV-2026
        </span>
        <span className="px-2.5 py-1 text-xs rounded-lg bg-muted border border-border/60 font-mono">
          01711
        </span>
      </div>
    </div>
  );
}

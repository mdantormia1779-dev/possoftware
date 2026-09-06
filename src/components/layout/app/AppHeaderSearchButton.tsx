import React from "react";
import { Search } from "lucide-react";

export function AppHeaderSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex-1 min-w-0 max-w-xs xl:max-w-md mx-2 sm:mx-3 hidden md:block">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-muted-foreground bg-muted/40 hover:bg-muted/70 border border-border/70 rounded-xl transition-all group shadow-subtle-xs"
      >
        <span className="flex items-center gap-2 truncate">
          <Search className="h-3.5 w-3.5 group-hover:text-foreground transition-colors shrink-0" />
          <span className="truncate">Search products, customers...</span>
        </span>
        <kbd className="px-1.5 py-0.5 rounded-md bg-card border border-border/80 text-[10px] font-mono text-muted-foreground shadow-2xs shrink-0">
          ⌘K
        </kbd>
      </button>
    </div>
  );
}

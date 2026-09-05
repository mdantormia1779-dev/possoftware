import React from "react";
import { Sparkles } from "lucide-react";

interface RegisterHeaderProps {
  onFillDemo: () => void;
}

export function RegisterHeader({ onFillDemo }: RegisterHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-5 border-b border-border/70 mb-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-500/25">
          X
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
            Create Business Account
          </h2>
          <p className="text-xs text-muted-foreground">
            Get started with your free 14-day full trial
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onFillDemo}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 transition-all active:scale-95 shadow-subtle-xs"
        title="Prefill realistic data for testing"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
        <span className="hidden sm:inline">Fill Demo</span>
      </button>
    </div>
  );
}

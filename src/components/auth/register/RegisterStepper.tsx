import React from "react";
import { CheckCircle2 } from "lucide-react";

interface RegisterStepperProps {
  step: 1 | 2;
  onSelectStep1: () => void;
  onSelectStep2: () => void;
}

export function RegisterStepper({
  step,
  onSelectStep1,
  onSelectStep2,
}: RegisterStepperProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <button
        type="button"
        onClick={onSelectStep1}
        className={`relative flex items-center gap-2.5 p-2.5 rounded-2xl transition-all text-left ${
          step === 1
            ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60"
            : "bg-muted/30 border border-transparent opacity-80 hover:opacity-100"
        }`}
      >
        <div
          className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
            step === 1
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
              : "bg-muted text-muted-foreground"
          }`}
        >
          1
        </div>
        <div className="truncate">
          <div className="text-[11px] font-bold text-foreground leading-tight">Business Profile</div>
          <div className="text-[10px] text-muted-foreground">Shop name &amp; category</div>
        </div>
        {step === 2 && (
          <CheckCircle2 className="h-4 w-4 text-emerald-500 absolute right-2.5 top-3" />
        )}
      </button>

      <button
        type="button"
        onClick={onSelectStep2}
        className={`relative flex items-center gap-2.5 p-2.5 rounded-2xl transition-all text-left ${
          step === 2
            ? "bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60"
            : "bg-muted/30 border border-transparent opacity-80 hover:opacity-100"
        }`}
      >
        <div
          className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
            step === 2
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
              : "bg-muted text-muted-foreground"
          }`}
        >
          2
        </div>
        <div className="truncate">
          <div className="text-[11px] font-bold text-foreground leading-tight">Owner &amp; Security</div>
          <div className="text-[10px] text-muted-foreground">Credentials &amp; contact</div>
        </div>
      </button>
    </div>
  );
}

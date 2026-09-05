import React from "react";
import { Check } from "lucide-react";
import { IMPORT_STEPS } from "./importData";

interface ImportStepperProps {
  currentStep: number;
}

export function ImportStepper({ currentStep }: ImportStepperProps) {
  return (
    <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs">
      <div className="flex items-center justify-between">
        {IMPORT_STEPS.map((step) => (
          <div key={step.num} className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= step.num
                  ? "bg-indigo-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.num ? <Check className="h-3.5 w-3.5" /> : step.num}
            </div>
            <span className="text-xs font-medium text-foreground hidden sm:inline">
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

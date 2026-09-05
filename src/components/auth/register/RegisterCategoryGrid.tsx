import React from "react";
import { Check } from "lucide-react";
import { BUSINESS_CATEGORIES } from "./registerData";

interface RegisterCategoryGridProps {
  businessType: string;
  setBusinessType: (v: string) => void;
}

export function RegisterCategoryGrid({
  businessType,
  setBusinessType,
}: RegisterCategoryGridProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-foreground flex items-center justify-between">
        <span>Business Category *</span>
        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Configures POS features</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {BUSINESS_CATEGORIES.map((cat) => {
          const isSelected = businessType === cat.name;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setBusinessType(cat.name)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-foreground ring-2 ring-indigo-500/20 shadow-subtle-xs"
                  : "border-border/80 bg-card hover:border-indigo-300 dark:hover:border-indigo-800 text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{cat.icon}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div className="text-[11px] font-bold mt-1 text-foreground truncate">{cat.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

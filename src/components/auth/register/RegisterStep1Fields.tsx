"use client";

import React from "react";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RegisterCategoryGrid } from "./RegisterCategoryGrid";
import { RegisterBranchCityFields } from "./RegisterBranchCityFields";

interface Step1Props {
  companyName: string;
  setCompanyName: (v: string) => void;
  businessType: string;
  setBusinessType: (v: string) => void;
  branchName: string;
  setBranchName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  errors: { [key: string]: string };
  clearError: (field: string) => void;
  onNext: (e: React.FormEvent) => void;
}

export function RegisterStep1Fields({
  companyName,
  setCompanyName,
  businessType,
  setBusinessType,
  branchName,
  setBranchName,
  city,
  setCity,
  errors,
  clearError,
  onNext,
}: Step1Props) {
  return (
    <form onSubmit={onNext} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground flex items-center justify-between">
          <span>Company / Shop Name *</span>
          <span className="text-[10px] text-muted-foreground font-normal">e.g. Bengal Threads</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            required
            placeholder="Your registered business or shop name"
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
              if (errors.companyName) clearError("companyName");
            }}
            className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
              errors.companyName ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
            }`}
          />
        </div>
        {errors.companyName && <p className="text-[11px] text-rose-500 font-medium">{errors.companyName}</p>}
      </div>

      <RegisterCategoryGrid
        businessType={businessType}
        setBusinessType={setBusinessType}
      />

      <RegisterBranchCityFields
        branchName={branchName}
        setBranchName={setBranchName}
        city={city}
        setCity={setCity}
        error={errors.branchName}
        onClearError={() => clearError("branchName")}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full h-11 font-bold shadow-md shadow-indigo-500/20 text-xs flex items-center justify-center gap-2"
        >
          <span>Continue to Owner Details</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}

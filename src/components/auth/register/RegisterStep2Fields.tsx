"use client";

import React from "react";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RegisterContactFields } from "./RegisterContactFields";
import { RegisterPasswordField } from "./RegisterPasswordField";

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  passwordStrength: number;
  isLoading: boolean;
  errors: { [key: string]: string };
  clearError: (field: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RegisterStep2Fields({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  passwordStrength,
  isLoading,
  errors,
  clearError,
  onBack,
  onSubmit,
}: Step2Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <RegisterContactFields
        ownerName={formData.ownerName}
        setOwnerName={(v) => setFormData({ ...formData, ownerName: v })}
        email={formData.email}
        setEmail={(v) => setFormData({ ...formData, email: v })}
        phone={formData.phone}
        setPhone={(v) => setFormData({ ...formData, phone: v })}
        errors={errors}
        clearError={clearError}
      />

      <RegisterPasswordField
        password={formData.password}
        setPassword={(pwd) => setFormData({ ...formData, password: pwd })}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        passwordStrength={passwordStrength}
        error={errors.password}
        onClearError={() => clearError("password")}
      />

      <div className="flex items-start gap-2 pt-1">
        <input
          type="checkbox"
          id="terms"
          checked={formData.termsAccepted}
          onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
          className="mt-0.5 h-4 w-4 rounded border-border text-indigo-600 accent-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor="terms" className="text-[11px] text-muted-foreground select-none cursor-pointer leading-tight">
          I agree to the <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Terms of Service</span> and <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Privacy Policy</span>.
        </label>
      </div>
      {errors.terms && <p className="text-[11px] text-rose-500 font-medium">{errors.terms}</p>}

      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={onBack}
          className="h-11 px-4 rounded-xl border border-border/80 hover:bg-muted/60 text-xs font-bold text-foreground transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1 h-11 font-bold shadow-md shadow-indigo-500/25 text-xs flex items-center justify-center gap-2"
        >
          <Zap className="h-4 w-4 fill-white/30" />
          <span>Create Account &amp; Launch OS</span>
        </Button>
      </div>
    </form>
  );
}

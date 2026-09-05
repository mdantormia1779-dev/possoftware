"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTenant } from "@/lib/context/TenantContext";
import {
  computePasswordStrength,
  validateRegisterStep1,
  validateRegisterStep2,
  runWorkspaceSetupSimulation,
} from "./registerUtils";
import { INITIAL_REGISTER_DATA, DEMO_REGISTER_DATA } from "./registerData";

export function useRegisterForm() {
  const router = useRouter();
  const { currentOrg, setCurrentOrg, setCurrentRole, currentBranch, setCurrentBranch } = useTenant();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState(INITIAL_REGISTER_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setupPhase, setSetupPhase] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const passwordStrength = useMemo(
    () => computePasswordStrength(formData.password),
    [formData.password]
  );

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFillDemo = () => {
    setFormData(DEMO_REGISTER_DATA);
    setErrors({});
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const errs = validateRegisterStep1(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRegisterStep2(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsLoading(true);
    runWorkspaceSetupSimulation(
      formData,
      setSetupPhase,
      setIsLoading,
      { currentOrg, setCurrentOrg, currentBranch, setCurrentBranch, setCurrentRole },
      router
    );
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    isLoading,
    setupPhase,
    errors,
    clearError,
    passwordStrength,
    handleFillDemo,
    validateStep1: () => Object.keys(validateRegisterStep1(formData)).length === 0,
    handleNextStep,
    handleSubmit,
  };
}

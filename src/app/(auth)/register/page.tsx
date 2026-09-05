"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegisterForm } from "@/components/auth/register/useRegisterForm";
import { RegisterValueProps } from "@/components/auth/register/RegisterValueProps";
import { RegisterHeader } from "@/components/auth/register/RegisterHeader";
import { RegisterStepper } from "@/components/auth/register/RegisterStepper";
import { RegisterStep1Fields } from "@/components/auth/register/RegisterStep1Fields";
import { RegisterStep2Fields } from "@/components/auth/register/RegisterStep2Fields";
import { RegisterProgressOverlay } from "@/components/auth/register/RegisterProgressOverlay";
import { RegisterFooter } from "@/components/auth/register/RegisterFooter";

export default function RegisterPage() {
  const form = useRegisterForm();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        <RegisterValueProps />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-7 w-full max-w-xl mx-auto"
        >
          <div className="relative rounded-3xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8">
            <RegisterHeader onFillDemo={form.handleFillDemo} />

            <RegisterStepper
              step={form.step}
              onSelectStep1={() => form.setStep(1)}
              onSelectStep2={() => {
                if (form.validateStep1()) form.setStep(2);
              }}
            />

            <AnimatePresence mode="wait">
              {form.step === 1 && (
                <RegisterStep1Fields
                  companyName={form.formData.companyName}
                  setCompanyName={(v) => form.setFormData({ ...form.formData, companyName: v })}
                  businessType={form.formData.businessType}
                  setBusinessType={(v) => form.setFormData({ ...form.formData, businessType: v })}
                  branchName={form.formData.branchName}
                  setBranchName={(v) => form.setFormData({ ...form.formData, branchName: v })}
                  city={form.formData.city}
                  setCity={(v) => form.setFormData({ ...form.formData, city: v })}
                  errors={form.errors}
                  clearError={form.clearError}
                  onNext={form.handleNextStep}
                />
              )}

              {form.step === 2 && (
                <RegisterStep2Fields
                  formData={form.formData}
                  setFormData={form.setFormData}
                  showPassword={form.showPassword}
                  setShowPassword={form.setShowPassword}
                  passwordStrength={form.passwordStrength}
                  isLoading={form.isLoading}
                  errors={form.errors}
                  clearError={form.clearError}
                  onBack={() => form.setStep(1)}
                  onSubmit={form.handleSubmit}
                />
              )}
            </AnimatePresence>

            <RegisterProgressOverlay
              isLoading={form.isLoading}
              setupPhase={form.setupPhase}
            />

            <RegisterFooter />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Store,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  WifiOff,
  Layers,
  Check,
  Zap,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTenant } from "@/lib/context/TenantContext";

// Business categories with metadata for visual selector
const BUSINESS_CATEGORIES = [
  {
    id: "fashion",
    name: "Fashion & Lifestyle",
    icon: "👗",
    desc: "Apparel, footwear, variant & size matrix",
  },
  {
    id: "retail",
    name: "Grocery & Super Shop",
    icon: "🛒",
    desc: "Barcode scanner, weighing scales & batch expiry",
  },
  {
    id: "electronics",
    name: "Gadgets & Electronics",
    icon: "📱",
    desc: "IMEI, serial tracking & warranty tickets",
  },
  {
    id: "pharmacy",
    name: "Pharmacy & Healthcare",
    icon: "💊",
    desc: "DGDA drugs list, batch control & expiries",
  },
  {
    id: "restaurant",
    name: "Restaurant & Cafe",
    icon: "☕",
    desc: "KDS kitchen display, tables & split bills",
  },
  {
    id: "wholesale",
    name: "Wholesale & Distribution",
    icon: "📦",
    desc: "Tiered credit terms, bulk lot pricing & challans",
  },
];

const POPULAR_CITIES = [
  "Dhaka (Banani/Gulshan)",
  "Dhaka (Dhanmondi)",
  "Dhaka (Uttara)",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
];

export default function RegisterPage() {
  const router = useRouter();
  const { currentOrg, setCurrentOrg, setCurrentRole, currentBranch, setCurrentBranch } = useTenant();

  // Step 1: Business Info, Step 2: Owner & Security
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "Fashion & Lifestyle",
    branchName: "Main Branch",
    city: "Dhaka (Banani/Gulshan)",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    termsAccepted: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setupPhase, setSetupPhase] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return 0;
    let score = 1; // has characters
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8 && (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd))) score += 1;
    if (pwd.length >= 10 && /[^A-Za-z0-9]/.test(pwd)) score += 1;
    return Math.min(score, 4);
  }, [formData.password]);

  const strengthLabels = ["Very Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  // Quick fill demo data for hassle-free evaluation
  const handleFillDemo = () => {
    setFormData({
      companyName: "Bengal Luxe Lifestyle",
      businessType: "Fashion & Lifestyle",
      branchName: "Banani Flagship Store",
      city: "Dhaka (Banani/Gulshan)",
      ownerName: "Tanzim Ahmed",
      email: "tanzim@bengalluxe.com.bd",
      phone: "01712345678",
      password: "SuperSecretPassword123!",
      termsAccepted: true,
    });
    setErrors({});
  };

  // Step 1 validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company / Shop name is required";
    }
    if (!formData.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  // Final submit handler with simulated onboarding phases
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid work email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile phone is required";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.termsAccepted) {
      newErrors.terms = "You must agree to the Terms of Service";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // Dynamic launch progress states for feedback
    setSetupPhase("Creating your secure tenant workspace...");

    setTimeout(() => {
      setSetupPhase("Provisioning offline IndexedDB storage & branch...");
    }, 450);

    setTimeout(() => {
      setSetupPhase("Configuring NBR VAT & POS terminal...");

      // Update tenant context so the dashboard renders user's customized business info
      try {
        if (setCurrentOrg && currentOrg) {
          setCurrentOrg({
            ...currentOrg,
            name: formData.companyName.trim() || currentOrg.name,
            businessType: formData.businessType,
            email: formData.email.trim() || currentOrg.email,
            phone: formData.phone.trim() || currentOrg.phone,
          });
        }
        if (setCurrentBranch && currentBranch) {
          setCurrentBranch({
            ...currentBranch,
            name: formData.branchName.trim() || currentBranch.name,
            city: formData.city || currentBranch.city,
          });
        }
        if (setCurrentRole) {
          setCurrentRole("company_owner");
        }
      } catch {
        // Safe fallback
      }
    }, 900);

    setTimeout(() => {
      setSetupPhase("Ready! Launching XYZ Business OS...");
    }, 1350);

    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 1700);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-x-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Side: Brand Value Proposition & Trust Badges (Visible on lg screens) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden lg:flex lg:col-span-5 flex-col justify-between space-y-8 pr-4"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-subtle-xs">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
              14-Day Full Feature Trial • No Credit Card
            </div>

            <h1 className="text-3xl xl:text-4xl font-black text-foreground tracking-tight leading-tight">
              The Next-Gen Business OS for Bangladesh.
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Online &amp; offline POS, automated double-entry accounting, multi-branch inventory, and NBR VAT compliance in one unified system.
            </p>
          </div>

          {/* Feature Highlights Card */}
          <div className="space-y-3.5 p-5 rounded-3xl bg-card/60 dark:bg-card/40 border border-border/80 backdrop-blur-md shadow-subtle-sm">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <WifiOff className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">100% Offline-First POS</h4>
                <p className="text-[11px] text-muted-foreground">Keep ringing sales during internet drops; auto-syncs to cloud seamlessly.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Store className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Multi-Branch &amp; Warehouse</h4>
                <p className="text-[11px] text-muted-foreground">Live stock transfers between Dhaka, Chattogram and regional retail hubs.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">NBR 5% VAT &amp; Fiscal Invoices</h4>
                <p className="text-[11px] text-muted-foreground">Automatic Mushak 6.3 calculation with instant thermal barcode receipts.</p>
              </div>
            </div>
          </div>

          {/* Social Proof Banner */}
          <div className="flex items-center gap-3.5 pt-2">
            <div className="flex -space-x-2 overflow-hidden">
              {["bg-indigo-600", "bg-emerald-600", "bg-purple-600", "bg-cyan-600"].map((bg, i) => (
                <div
                  key={i}
                  className={`inline-block h-8 w-8 rounded-full ring-2 ring-background ${bg} flex items-center justify-center text-[10px] font-bold text-white shadow-subtle-xs`}
                >
                  {["RA", "BD", "MH", "SK"][i]}
                </div>
              ))}
            </div>
            <div className="text-xs">
              <div className="font-bold text-foreground flex items-center gap-1">
                <span>★ ★ ★ ★ ★</span>
                <span className="text-[11px] text-muted-foreground ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Trusted by 1,200+ merchants across Bangladesh
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="lg:col-span-7 w-full max-w-xl mx-auto"
        >
          <div className="relative rounded-3xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8">
            {/* Top Header */}
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

              {/* Quick Demo Fill Button */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/80 dark:border-indigo-800/80 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 transition-all active:scale-95 shadow-subtle-xs"
                title="Prefill realistic data for testing"
              >
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Fill Demo</span>
              </button>
            </div>

            {/* Stepper Progress Indicator */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setStep(1)}
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
                onClick={() => {
                  if (validateStep1()) {
                    setStep(2);
                  }
                }}
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

            {/* Dynamic Step Content with Framer Motion AnimatePresence */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step-1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleNextStep}
                  className="space-y-4"
                >
                  {/* Company Name */}
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
                        value={formData.companyName}
                        onChange={(e) => {
                          setFormData({ ...formData, companyName: e.target.value });
                          if (errors.companyName) setErrors({ ...errors, companyName: "" });
                        }}
                        className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                          errors.companyName ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
                        }`}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Business Category Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground flex items-center justify-between">
                      <span>Business Category *</span>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Configures POS features</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {BUSINESS_CATEGORIES.map((cat) => {
                        const isSelected = formData.businessType === cat.name;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, businessType: cat.name })}
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

                  {/* Initial Branch & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">
                        Initial Branch Name *
                      </label>
                      <div className="relative">
                        <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Banani Branch"
                          value={formData.branchName}
                          onChange={(e) => {
                            setFormData({ ...formData, branchName: e.target.value });
                            if (errors.branchName) setErrors({ ...errors, branchName: "" });
                          }}
                          className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                            errors.branchName ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
                          }`}
                        />
                      </div>
                      {errors.branchName && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.branchName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">
                        City / Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full h-10 pl-10 pr-9 text-xs rounded-xl border border-border/80 bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs appearance-none cursor-pointer"
                        >
                          {POPULAR_CITIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
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
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step-2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Owner Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">
                      Owner Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanzim Ahmed"
                        value={formData.ownerName}
                        onChange={(e) => {
                          setFormData({ ...formData, ownerName: e.target.value });
                          if (errors.ownerName) setErrors({ ...errors, ownerName: "" });
                        }}
                        className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                          errors.ownerName ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
                        }`}
                      />
                    </div>
                    {errors.ownerName && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.ownerName}</p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">
                        Work Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="owner@domain.com"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                            errors.email ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">
                        Mobile Phone (Bangladesh) *
                      </label>
                      <div className="flex rounded-xl border border-border/80 overflow-hidden bg-card focus-within:ring-2 focus-within:ring-indigo-500/50 shadow-subtle-xs">
                        <span className="px-3 bg-muted/40 text-muted-foreground font-bold text-xs flex items-center border-r border-border/80 select-none">
                          +880
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="01711-xxxxxx"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          className={`flex-1 h-10 px-3 text-xs bg-transparent font-mono text-foreground focus:outline-none ${
                            errors.phone ? "bg-rose-500/5" : ""
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Password with Show/Hide & Strength Meter */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-foreground">Password *</label>
                      {formData.password && (
                        <span className="text-[11px] font-semibold text-muted-foreground">
                          Strength: <span className={passwordStrength >= 3 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 font-bold"}>
                            {strengthLabels[passwordStrength - 1] || "Very Weak"}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="At least 6 characters (recommended 8+)"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({ ...formData, password: e.target.value });
                          if (errors.password) setErrors({ ...errors, password: "" });
                        }}
                        className={`w-full h-10 pl-10 pr-10 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                          errors.password ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Animated Strength Progress Bar */}
                    {formData.password && (
                      <div className="grid grid-cols-4 gap-1.5 pt-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              passwordStrength >= level
                                ? strengthColors[passwordStrength - 1]
                                : "bg-muted"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {errors.password && (
                      <p className="text-[11px] text-rose-500 font-medium">{errors.password}</p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="mt-0.5 h-4 w-4 rounded border-border text-indigo-600 accent-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[11px] text-muted-foreground select-none cursor-pointer leading-tight">
                      I agree to the{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        Privacy Policy
                      </span>
                      . Free 14-day trial includes all modules.
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-[11px] text-rose-500 font-medium">{errors.terms}</p>
                  )}

                  {/* Action Buttons: Back + Submit */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => setStep(1)}
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
                </motion.form>
              )}
            </AnimatePresence>

            {/* Launching / Setup Progress Banner during form submission */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-card/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 space-y-3 rounded-3xl"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center animate-spin">
                    <Layers className="h-7 w-7" />
                  </div>
                  <Sparkles className="h-4 w-4 text-amber-500 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Setting Up Your Workspace</h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium animate-pulse mt-1">
                    {setupPhase}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Bottom Sign In Link */}
            <div className="text-center pt-4 border-t border-border/70 text-xs text-muted-foreground mt-5">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Sign In to Business</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

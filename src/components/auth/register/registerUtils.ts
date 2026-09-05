export function computePasswordStrength(pwd: string): number {
  if (!pwd) return 0;
  let score = 1;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 8 && (/[A-Z]/.test(pwd) || /[0-9]/.test(pwd))) score += 1;
  if (pwd.length >= 10 && /[^A-Za-z0-9]/.test(pwd)) score += 1;
  return Math.min(score, 4);
}

export function validateRegisterStep1(formData: { companyName: string; branchName: string }) {
  const errs: { [key: string]: string } = {};
  if (!formData.companyName.trim()) errs.companyName = "Company / Shop name is required";
  if (!formData.branchName.trim()) errs.branchName = "Branch name is required";
  return errs;
}

export function validateRegisterStep2(formData: {
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  termsAccepted: boolean;
}) {
  const errs: { [key: string]: string } = {};
  if (!formData.ownerName.trim()) errs.ownerName = "Owner name is required";
  if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Please enter a valid work email";
  if (!formData.phone.trim()) errs.phone = "Mobile phone is required";
  if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";
  if (!formData.termsAccepted) errs.terms = "You must agree to the Terms of Service";
  return errs;
}

export function runWorkspaceSetupSimulation(
  formData: any,
  setSetupPhase: (s: string) => void,
  setIsLoading: (b: boolean) => void,
  tenant: { currentOrg: any; setCurrentOrg: any; currentBranch: any; setCurrentBranch: any; setCurrentRole: any },
  router: any
) {
  setSetupPhase("Creating your secure tenant workspace...");
  setTimeout(() => setSetupPhase("Provisioning offline IndexedDB storage & branch..."), 450);
  setTimeout(() => {
    setSetupPhase("Configuring NBR VAT & POS terminal...");
    if (tenant.setCurrentOrg && tenant.currentOrg) {
      tenant.setCurrentOrg({
        ...tenant.currentOrg,
        name: formData.companyName.trim() || tenant.currentOrg.name,
        businessType: formData.businessType,
        email: formData.email.trim() || tenant.currentOrg.email,
        phone: formData.phone.trim() || tenant.currentOrg.phone,
      });
    }
    if (tenant.setCurrentBranch && tenant.currentBranch) {
      tenant.setCurrentBranch({
        ...tenant.currentBranch,
        name: formData.branchName.trim() || tenant.currentBranch.name,
        city: formData.city || tenant.currentBranch.city,
      });
    }
    if (tenant.setCurrentRole) tenant.setCurrentRole("company_owner");
  }, 900);
  setTimeout(() => setSetupPhase("Ready! Launching XYZ Business OS..."), 1350);
  setTimeout(() => {
    setIsLoading(false);
    router.push("/app/dashboard");
  }, 1700);
}

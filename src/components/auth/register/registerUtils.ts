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

export async function executeWorkspaceRegistration(
  formData: any,
  setSetupPhase: (s: string) => void,
  setIsLoading: (b: boolean) => void,
  setErrors: (errs: { [key: string]: string }) => void,
  tenant: {
    setCurrentUser?: (u: any) => void;
    setCurrentOrg?: (o: any) => void;
    setCurrentBranch?: (b: any) => void;
    setCurrentRole?: (r: any) => void;
  },
  router: any
) {
  setSetupPhase("Provisioning your enterprise workspace on cloud database...");
  try {
    const { authService } = await import("@/services/auth.service");
    const res = await authService.register({
      ownerName: formData.ownerName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      password: formData.password,
      companyName: formData.companyName.trim(),
      businessType: formData.businessType || "Retail",
      branchName: formData.branchName.trim(),
      city: formData.city || "Dhaka",
    });

    if (!res.success || !res.data) {
      setIsLoading(false);
      setErrors({ email: res.error || "Registration failed. Please try again." });
      return;
    }

    setSetupPhase("Configuring NBR VAT & Chart of Accounts...");
    const { user, organization, branch } = res.data;

    if (tenant.setCurrentUser) tenant.setCurrentUser(user);
    if (tenant.setCurrentOrg && organization) tenant.setCurrentOrg(organization);
    if (tenant.setCurrentBranch && branch) tenant.setCurrentBranch(branch);
    if (tenant.setCurrentRole) tenant.setCurrentRole("company_owner");

    setSetupPhase("Ready! Launching XYZ Business OS...");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/app/dashboard");
    }, 500);
  } catch {
    setIsLoading(false);
    setErrors({ email: "Network error occurred during registration. Please try again." });
  }
}

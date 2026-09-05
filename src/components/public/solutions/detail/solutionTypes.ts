export interface SolutionData {
  title: string;
  subtitle: string;
  banglaTitle: string;
  banglaDesc: string;
  icon: any;
  color: string;
  bgGradient: string;
  stats: { label: string; value: string; detail: string }[];
  keyFeatures: { title: string; desc: string; icon: any }[];
  workflow: { step: string; title: string; desc: string }[];
  bdBenefits: string[];
  recommendedPlan: string;
  recommendedPrice: string;
}

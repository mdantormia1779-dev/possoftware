import type { Metadata } from "next";
import { FeaturesHero } from "@/components/public/features/FeaturesHero";
import { FeaturesGrid } from "@/components/public/features/FeaturesGrid";
import { SpotlightSection } from "@/components/public/features/SpotlightSection";
import { ConnectedSection } from "@/components/public/features/ConnectedSection";
import { FeaturesCta } from "@/components/public/features/FeaturesCta";
import { PosMockup } from "@/components/public/features/mockups/PosMockup";
import { InventoryMockup } from "@/components/public/features/mockups/InventoryMockup";
import { AnalyticsMockup } from "@/components/public/features/mockups/AnalyticsMockup";
import {
  POS_COPY,
  INVENTORY_COPY,
  ANALYTICS_COPY,
} from "@/components/public/features/features-content";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything you need to run a modern business, packed into one connected platform.",
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero />
      <FeaturesGrid />

      <SpotlightSection copy={POS_COPY}>
        <PosMockup />
      </SpotlightSection>

      <SpotlightSection copy={INVENTORY_COPY} reverse tone="alt">
        <InventoryMockup />
      </SpotlightSection>

      <SpotlightSection copy={ANALYTICS_COPY}>
        <AnalyticsMockup />
      </SpotlightSection>

      <ConnectedSection />
      <FeaturesCta />
    </>
  );
}
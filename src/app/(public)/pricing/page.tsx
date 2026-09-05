"use client";

import React, { useState } from "react";
import { PricingHeader } from "@/components/public/pricing/PricingHeader";
import { PricingCards } from "@/components/public/pricing/PricingCards";
import { PricingAddons } from "@/components/public/pricing/PricingAddons";
import { PricingComparisonTable } from "@/components/public/pricing/PricingComparisonTable";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <PricingHeader
        isYearly={isYearly}
        onToggleYearly={() => setIsYearly(!isYearly)}
      />
      <PricingCards isYearly={isYearly} />
      <PricingAddons />
      <PricingComparisonTable />
    </div>
  );
}

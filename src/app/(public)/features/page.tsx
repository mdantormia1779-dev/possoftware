import React from "react";
import { MODULES_LIST } from "@/components/public/features/featuresData";
import { FeaturesHeader } from "@/components/public/features/FeaturesHeader";
import { FeatureCard } from "@/components/public/features/FeatureCard";
import { FeaturesCta } from "@/components/public/features/FeaturesCta";

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <FeaturesHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES_LIST.map((mod, idx) => (
          <FeatureCard
            key={idx}
            icon={mod.icon}
            title={mod.title}
            desc={mod.desc}
          />
        ))}
      </div>
      <FeaturesCta />
    </div>
  );
}

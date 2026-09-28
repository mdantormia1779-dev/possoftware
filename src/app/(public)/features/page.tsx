import React from "react";
import { MODULES_LIST } from "@/components/public/features/featuresData";
import { FeaturesHeader } from "@/components/public/features/FeaturesHeader";
import { FeatureCard } from "@/components/public/features/FeatureCard";
import { FeaturesCta } from "@/components/public/features/FeaturesCta";

function groupByCategory(modules: typeof MODULES_LIST) {
  const groups = new Map<string, typeof MODULES_LIST>();
  for (const mod of modules) {
    const list = groups.get(mod.category) ?? [];
    list.push(mod);
    groups.set(mod.category, list);
  }
  return Array.from(groups.entries());
}

export default function FeaturesPage() {
  const categories = groupByCategory(MODULES_LIST);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <FeaturesHeader />

      <div className="space-y-14">
        {categories.map(([category, modules]) => (
          <section key={category} className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-sm font-bold text-foreground whitespace-nowrap">
                {category}
              </h2>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {modules.length} module{modules.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod) => (
                <FeatureCard
                  key={mod.number}
                  number={mod.number}
                  icon={mod.icon}
                  title={mod.title}
                  desc={mod.desc}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      <FeaturesCta />
    </div>
  );
}
import React from "react";
import { SOLUTIONS } from "@/components/public/solutions/solutionsData";
import { SolutionsHeader } from "@/components/public/solutions/SolutionsHeader";
import { SolutionCard } from "@/components/public/solutions/SolutionCard";

export default function SolutionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <SolutionsHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SOLUTIONS.map((sol) => (
          <SolutionCard key={sol.slug} solution={sol} />
        ))}
      </div>
    </div>
  );
}

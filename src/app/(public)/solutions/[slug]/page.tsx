import React from "react";
import { notFound } from "next/navigation";
import { getSolution, STATIC_SLUGS } from "@/components/public/solutions/detail/solutionsMap";
import { SolutionHero } from "@/components/public/solutions/detail/SolutionHero";
import { SolutionKeyFeatures } from "@/components/public/solutions/detail/SolutionKeyFeatures";
import { SolutionWorkflow } from "@/components/public/solutions/detail/SolutionWorkflow";
import { SolutionLocalization } from "@/components/public/solutions/detail/SolutionLocalization";

export function generateStaticParams() {
  return STATIC_SLUGS;
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <div className="space-y-20 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SolutionHero slug={slug} solution={solution} />
      <SolutionKeyFeatures solution={solution} />
      <SolutionWorkflow solution={solution} />
      <SolutionLocalization solution={solution} />
    </div>
  );
}

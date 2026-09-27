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
    <div className="relative">
      {/* Ambient page-level background glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-indigo-500/[0.06] via-cyan-500/[0.03] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-12 sm:py-16">
        <section>
          <SolutionHero slug={slug} solution={solution} />
        </section>

        <div className="my-16 sm:my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <section>
          <SolutionKeyFeatures solution={solution} />
        </section>

        <div className="my-16 sm:my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <section>
          <SolutionWorkflow solution={solution} />
        </section>

        <div className="my-16 sm:my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <section className="pb-4">
          <SolutionLocalization solution={solution} />
        </section>
      </div>
    </div>
  );
}
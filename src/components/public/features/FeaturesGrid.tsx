import { ECOSYSTEM, FEATURES } from "./features-content";
import { FeatureCard } from "./FeatureCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturesGrid() {
  return (
    <section className="bg-background py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={ECOSYSTEM.eyebrow}
          title={ECOSYSTEM.title}
          subtitle={ECOSYSTEM.subtitle}
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
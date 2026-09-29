import type { ReactNode } from "react";
import type { SpotlightCopy } from "./features-content";
import { SectionHeading } from "./SectionHeading";
import { CheckList } from "./CheckList";

interface SpotlightSectionProps {
  copy: SpotlightCopy;
  reverse?: boolean;
  tone?: "base" | "alt";
  children: ReactNode; // mockup
}

export function SpotlightSection({
  copy,
  reverse = false,
  tone = "base",
  children,
}: SpotlightSectionProps) {
  return (
    <section
      className={`py-16 lg:py-20 ${
        tone === "alt" ? "bg-muted/30 dark:bg-[#131a25]" : "bg-background"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            size="lg"
            eyebrow={copy.eyebrow}
            title={copy.title}
            subtitle={copy.tagline}
          />
          <CheckList items={copy.points} />
        </div>
        <div className={reverse ? "lg:order-first" : ""}>{children}</div>
      </div>
    </section>
  );
}
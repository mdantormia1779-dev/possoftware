import { CONNECTED } from "./features-content";
import { SectionHeading } from "./SectionHeading";
import { DashboardMockup } from "./mockups/DashboardMockup";

export function ConnectedSection() {
  return (
    <section className="bg-muted/30 py-16 dark:bg-[#131a25] lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={CONNECTED.eyebrow}
          title={CONNECTED.title}
          subtitle={CONNECTED.subtitle}
        />

        <div className="mt-12">
          <DashboardMockup />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CONNECTED.pillars.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
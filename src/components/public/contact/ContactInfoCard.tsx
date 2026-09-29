import type { ContactItem } from "./contact-data";

export function ContactInfoCard({ icon: Icon, label, value, href }: ContactItem) {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 break-words text-sm font-semibold text-foreground">{value}</p>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-colors";

  return href ? (
    <a href={href} className={`${className} hover:border-blue-500/50`}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
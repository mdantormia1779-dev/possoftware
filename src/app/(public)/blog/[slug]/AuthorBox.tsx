interface AuthorBoxProps {
  authorName: string;
  authorRole: string;
  initials: string;
}

export function AuthorBox({ authorName, authorRole, initials }: AuthorBoxProps) {
  return (
    <section className="mt-16 p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="h-14 w-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-base font-bold shrink-0">
        {initials}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Published by
        </p>
        <h4 className="text-base font-bold text-foreground">{authorName}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {authorRole} • Experienced in industry infrastructure, software architectures, and offline-first data protocols.
        </p>
      </div>
    </section>
  );
}
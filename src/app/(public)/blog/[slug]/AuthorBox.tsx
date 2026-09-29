interface AuthorBoxProps {
  authorName: string;
  authorRole: string;
  initials: string;
}

export function AuthorBox({ authorName, authorRole, initials }: AuthorBoxProps) {
  return (
    <section className="rounded-2xl border border-slate-200/90 bg-[#f8fafd] p-6 dark:border-slate-800 dark:bg-slate-900/40">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        ABOUT THE AUTHOR
      </p>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a60d9] text-sm font-bold text-white shadow-sm">
          {initials}
        </div>
        <div className="min-w-0 space-y-0.5">
          <h4 className="font-[family-name:var(--font-jakarta)] text-base font-bold text-[#0c1831] dark:text-white">
            {authorName}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{authorRole}</p>
          <p className="pt-2 text-[14px] leading-relaxed text-[#475569] dark:text-slate-300">
            Helping businesses simplify operations with modern POS, inventory,
            accounting, HR and CRM technology.
          </p>
        </div>
      </div>
    </section>
  );
}
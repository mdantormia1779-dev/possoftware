interface ArticleHeaderProps {
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  authorName: string;
  authorRole: string;
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"
    />
  );
}

export function ArticleHeader({
  title,
  summary,
  category,
  date,
  readTime,
  authorName,
  authorRole,
}: ArticleHeaderProps) {
  return (
    <header className="bg-background">
      <div className="mx-auto max-w-[1200px] px-4 pb-12 pt-16 sm:px-8">
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center">
          {/* Category Badge */}
          <span className="inline-flex rounded-full bg-[#dfeafc] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0648a8] dark:bg-blue-950/60 dark:text-blue-300">
            {category}
          </span>

          {/* Article Main Title */}
          <h1 className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold leading-[1.12] tracking-[-0.035em] text-[#0b1730] sm:text-4xl md:text-[2.75rem] dark:text-white">
            {title}
          </h1>

          {/* Summary / Subtitle */}
          <p className="max-w-[640px] text-base leading-relaxed text-slate-500 sm:text-lg dark:text-slate-400">
            {summary}
          </p>

          {/* Meta Info (Date, Read Time, Author) */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {date}
            </span>
            <Dot />
            <span className="text-slate-500 dark:text-slate-400">
              {readTime}
            </span>
            <Dot />
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {authorName}
            </span>
            <Dot />
            <span className="text-slate-500 dark:text-slate-400">
              {authorRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
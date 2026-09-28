import Link from "next/link";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import { ShareButton } from "./ShareButton";
import { BackButton } from "./BackButton";

interface ArticleHeaderProps {
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  initials: string;
}

export function ArticleHeader({
  title,
  summary,
  category,
  date,
  readTime,
  authorName,
  authorRole,
  initials,
}: ArticleHeaderProps) {
  return (
    <header className="relative border-b border-border/60 bg-linear-to-b from-indigo-50/50 via-background to-background dark:from-indigo-950/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 space-y-8">
        <div className="flex items-center justify-between gap-4">
          <BackButton />

          <nav className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <span className="text-foreground font-medium truncate max-w-[160px]">
              {category}
            </span>
          </nav>
        </div>

        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800">
            <Tag className="h-3 w-3" /> {category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.18]">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-linear-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-background shadow-xs shrink-0">
              {initials}
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-foreground text-sm leading-tight">{authorName}</p>
              <p className="text-muted-foreground">{authorRole}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-3 pr-2">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {readTime}
              </span>
            </div>
            <ShareButton title={title} />
          </div>
        </div>
      </div>
    </header>
  );
}
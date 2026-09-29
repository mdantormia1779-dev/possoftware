import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/public/blog/ArticleCard";
import type { Article } from "@/components/public/blog/blogData";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <aside className="bg-[#f6f8fc] py-20 dark:bg-slate-900/30">
      <div className="mx-auto max-w-[1200px] space-y-8 px-4 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0a60d9] dark:text-blue-400">
              Keep Reading
            </p>
            <h3 className="font-[family-name:var(--font-jakarta)] text-3xl font-bold tracking-[-0.03em] text-[#0b1730] sm:text-[2rem] dark:text-white">
              Continue Reading
            </h3>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0a60d9] transition-colors hover:text-[#0648a8] dark:text-blue-400"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </aside>
  );
}
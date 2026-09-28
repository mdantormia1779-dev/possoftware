import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ArticleCard } from "@/components/public/blog/ArticleCard";
import type { Article } from "@/components/public/blog/blogData";

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <aside className="border-t border-border/60 bg-muted/20 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span>Related Articles</span>
          </h3>
          <Link
            href="/blog"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </aside>
  );
}
import React from "react";
import { BookOpen } from "lucide-react";
import { ARTICLES } from "@/components/public/blog/blogData";
import { BlogHeader } from "@/components/public/blog/BlogHeader";
import { FeaturedArticle } from "@/components/public/blog/FeaturedArticle";
import { ArticleCard } from "@/components/public/blog/ArticleCard";
import { BlogNewsletter } from "@/components/public/blog/BlogNewsletter";

export default function BlogPage() {
  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <BlogHeader />
      <FeaturedArticle article={featured} />

      <div className="space-y-6">
        <h3 className="text-xl font-extrabold text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span>Latest Articles &amp; Guides</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      <BlogNewsletter />
    </div>
  );
}

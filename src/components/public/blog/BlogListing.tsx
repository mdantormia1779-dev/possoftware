"use client";

import React, { useMemo, useState } from "react";
import { ARTICLES, CATEGORIES } from "./blogData";
import { BlogHeader } from "./BlogHeader";
import { FeaturedArticle } from "./FeaturedArticle";
import { ArticleCard } from "./ArticleCard";
import { CategoryFilter } from "./CategoryFilter";
import { BlogEmptyState } from "./BlogEmptyState";
import { BlogPagination } from "./BlogPagination";

const ITEMS_PER_PAGE = 6;

export function BlogListing(): React.JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // কেস-ইনসেনসিটিভ সার্চ ও ক্যাটাগরি ফিল্টারিং
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const selectedCat = category.trim().toLowerCase();

    return ARTICLES.filter((a) => {
      const articleCat = (a.category || "").trim().toLowerCase();
      const inCategory =
        selectedCat === "all" || articleCat === selectedCat;

      const inQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        articleCat.includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))) ||
        a.author.toLowerCase().includes(q);

      return inCategory && inQuery;
    });
  }, [query, category]);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setCurrentPage(1);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setQuery("");
    setCategory("All");
    setCurrentPage(1);
  };

  // 'All' ভিউতে থাকলে Featured কার্ড আলাদা দেখানো হবে
  const isDefaultView = category.toLowerCase() === "all" && !query.trim();
  const featured = isDefaultView ? matches.find((a) => a.highlight) : null;
  const listArticles = featured
    ? matches.filter((a) => a.id !== featured.id)
    : matches;

  // পেজিনেশন লজিক
  const totalPages = Math.ceil(listArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return listArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [listArticles, currentPage]);

  return (
    <>
      <BlogHeader query={query} onQueryChange={handleQueryChange} />

      <section className="mx-auto max-w-6xl px-6 py-12">
        {/* ফিল্টার চিপস */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={category}
          onSelectCategory={handleCategoryChange}
        />

        {/* খালি অবস্থা */}
        {matches.length === 0 ? (
          <BlogEmptyState onReset={handleResetFilters} />
        ) : (
          <>
            {/* ফিচারড কার্ড */}
            {featured && (
              <div className="mt-10">
                <FeaturedArticle article={featured} />
              </div>
            )}

            {/* আর্টিকেল গ্রিড */}
            {paginatedArticles.length > 0 && (
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {/* পেজিনেশন কন্ট্রোল */}
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </>
  );
}
import React from "react";
import { BookOpen } from "lucide-react";
import { ARTICLES } from "@/components/public/blog/blogData";
import { BlogHeader } from "@/components/public/blog/BlogHeader";
import { FeaturedArticle } from "@/components/public/blog/FeaturedArticle";
import { ArticleCard } from "@/components/public/blog/ArticleCard";
import { BlogNewsletter } from "@/components/public/blog/BlogNewsletter";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { LandingHeroSection } from "@/components/public/landing/LandingHeroSection";
import { LandingCategoriesSection } from "@/components/public/landing/LandingCategoriesSection";
import { LandingOfflineSimulator } from "@/components/public/landing/LandingOfflineSimulator";
import { LandingBentoSection } from "@/components/public/landing/LandingBentoSection";
import { LandingPricingSection } from "@/components/public/landing/LandingPricingSection";
import { LandingFaqSection } from "@/components/public/landing/LandingFaqSection";
import { LandingCtaSection } from "@/components/public/landing/LandingCtaSection";
import { LandingFeaturesSection } from "@/components/public/landing/LandingFeaturesSection";

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

  return (
    <div ref={heroRef} className="space-y-24 sm:space-y-32 pb-24 overflow-hidden px-30">
      <LandingHeroSection glowRef={glowRef} />
      <LandingFeaturesSection/>
      <LandingCategoriesSection />
      <LandingOfflineSimulator />
      <LandingBentoSection />
      <LandingPricingSection />
      <LandingFaqSection />
      <LandingCtaSection />
    </div>
  );
}
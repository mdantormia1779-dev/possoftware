import React from "react";
import type { Metadata } from "next";
import { BlogListing } from "../../../components/public/blog/BlogListing";
import { BlogNewsletter } from "../../../components/public/blog/BlogNewsletter";

export const metadata: Metadata = {
  title: "Blog | XYZ Business OS",
  description:
    "Practical guides, industry trends and product tips from the team behind XYZ Business OS.",
};

export default function BlogListPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <BlogListing />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pt-24">
        <BlogNewsletter />
      </div>
    </main>
  );
}
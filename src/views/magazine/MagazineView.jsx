"use client";

import React from "react";
import { useRouter } from "next/navigation";

import MagazineHeader from "./components/MagazineHeader";
import FeaturedHero from "./components/FeaturedHero";
import ArticleGrid from "./components/ArticleGrid";
import MagazineSidebar from "./components/MagazineSidebar";
import MagazineFooter from "./components/MagazineFooter";

export default function MagazineView({
  articles = [],
  trends = [],
  featured = null,
}) {
  const router = useRouter();

  const goPost = (slug) => router.push(`/magazine/${slug}`);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200" dir="rtl">
      <MagazineHeader
        onGoHome={() => router.push("/")}
        onGoDashboard={() => router.push("/wizard")}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {featured && (
          <FeaturedHero
            article={featured}
            onClick={() => goPost(featured.slug)}
          />
        )}

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <ArticleGrid
              title="تازه‌ترین تحلیل‌ها"
              onViewAll={() => router.push("/magazine")}
              articles={articles}
              onOpen={goPost}
            />
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <MagazineSidebar trends={trends} />
          </aside>
        </div>
      </main>

      <MagazineFooter />
    </div>
  );
}

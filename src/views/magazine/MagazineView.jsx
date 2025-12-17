"use client";

import React from "react";
import { useRouter } from "next/navigation";

import MagazineHeader from "./components/MagazineHeader";
import FeaturedHero from "./components/FeaturedHero";
import ArticleGrid from "./components/ArticleGrid";
import MagazineSidebar from "./components/MagazineSidebar";
import MagazineFooter from "./components/MagazineFooter";

export default function MagazineView() {
  const router = useRouter();

  const articles = [
    {
      slug: "end-of-traditional-ads-algorithmic-marketing",
      category: "استراتژی",
      title: "پایان دوران تبلیغات سنتی؛ ظهور بازاریابی الگوریتمی",
      excerpt:
        "چگونه هوش مصنوعی رفتار مصرف‌کننده را قبل از خرید پیش‌بینی می‌کند؟ تحلیل داده‌های کلان در سال ۲۰۲۵.",
      image: "bg-gradient-to-br from-purple-900 to-indigo-900",
      readTime: "۸ دقیقه",
      author: "دکتر آرش پارسا",
      date: "۲ روز پیش",
    },
    {
      slug: "microservices-architecture-iranian-scaleups",
      category: "تکنولوژی",
      title: "معماری میکروسرویس‌ها در اسکیل‌آپ‌های ایرانی",
      excerpt:
        "بررسی فنی چالش‌های مهاجرت از ساختار یکپارچه به میکروسرویس در استارتاپ‌های با رشد سریع.",
      image: "bg-gradient-to-bl from-slate-800 to-slate-900",
      readTime: "۱۲ دقیقه",
      author: "سارا راد",
      date: "۴ روز پیش",
    },
    {
      slug: "neumorphism-color-psychology-ui",
      category: "برندینگ",
      title: "روانشناسی رنگ‌ها در رابط کاربری نئومورفیسم",
      excerpt:
        "چرا برندهای فین‌تک به سمت رنگ‌های تیره و گرادینت‌های نئونی حرکت می‌کنند؟",
      image: "bg-gradient-to-tr from-pink-900 to-rose-900",
      readTime: "۶ دقیقه",
      author: "امیرحسین گرافیک",
      date: "۱ هفته پیش",
    },
    {
      slug: "zero-budget-growth-hacks",
      category: "رشد (Growth)",
      title: "هک رشد با بودجه صفر: داستان ۳ استارتاپ موفق",
      excerpt:
        "تکنیک‌های چریکی برای جذب ۱۰۰۰ کاربر اول بدون هزینه تبلیغات پولی.",
      image: "bg-gradient-to-r from-emerald-900 to-teal-900",
      readTime: "۵ دقیقه",
      author: "تیم تحریریه هیوارا",
      date: "۱ هفته پیش",
    },
  ];

  const trends = [
    "#هوش_مصنوعی",
    "#دیجیتال_مارکتینگ",
    "#استارتاپ",
    "#UX_Design",
    "#بلاکچین",
    "#سرمایه_گذاری",
  ];

  const goPost = (slug) => router.push(`/magazine/${slug}`);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 " dir="rtl">
      <MagazineHeader
        onGoHome={() => router.push("/")}
        onGoDashboard={() => router.push("/wizard")}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <FeaturedHero
          onClick={() => goPost("future-is-here-genai-business-models")}
        />

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

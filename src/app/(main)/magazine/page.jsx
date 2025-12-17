"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Clock,
  TrendingUp,
  ChevronLeft,
  Bookmark,
  Share2,
  Zap,
  Command,
} from "lucide-react";

export default function MagazinePage() {
  const router = useRouter();

  const articles = [
    {
      category: "استراتژی",
      title: "پایان دوران تبلیغات سنتی؛ ظهور بازاریابی الگوریتمی",
      excerpt:
        "چگونه هوش مصنوعی رفتار مصرف‌کننده را قبل از خرید پیش‌بینی می‌کند؟ تحلیل داده‌های کلان در سال ۲۰۲۵.",
      image: "bg-gradient-to-br from-purple-900 to-indigo-900",
      readTime: "۸ دقیقه",
      author: "دکتر آرش پارسا",
      date: "۲ روز پیش",
      href: "/magazine/post",
    },
    {
      category: "تکنولوژی",
      title: "معماری میکروسرویس‌ها در اسکیل‌آپ‌های ایرانی",
      excerpt:
        "بررسی فنی چالش‌های مهاجرت از ساختار یکپارچه به میکروسرویس در استارتاپ‌های با رشد سریع.",
      image: "bg-gradient-to-bl from-slate-800 to-slate-900",
      readTime: "۱۲ دقیقه",
      author: "سارا راد",
      date: "۴ روز پیش",
      href: "/magazine/post",
    },
    {
      category: "برندینگ",
      title: "روانشناسی رنگ‌ها در رابط کاربری نئومورفیسم",
      excerpt:
        "چرا برندهای فین‌تک به سمت رنگ‌های تیره و گرادینت‌های نئونی حرکت می‌کنند؟",
      image: "bg-gradient-to-tr from-pink-900 to-rose-900",
      readTime: "۶ دقیقه",
      author: "امیرحسین گرافیک",
      date: "۱ هفته پیش",
      href: "/magazine/post",
    },
    {
      category: "رشد (Growth)",
      title: "هک رشد با بودجه صفر: داستان ۳ استارتاپ موفق",
      excerpt:
        "تکنیک‌های چریکی برای جذب ۱۰۰۰ کاربر اول بدون هزینه تبلیغات پولی.",
      image: "bg-gradient-to-r from-emerald-900 to-teal-900",
      readTime: "۵ دقیقه",
      author: "تیم تحریریه هیوارا",
      date: "۱ هفته پیش",
      href: "/magazine/post",
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

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-200 font-sans"
      dir="rtl"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <Command size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight">
                  HIVARA
                </span>
                <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                  MAGAZINE
                </span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
              <span className="text-white cursor-pointer">تکنولوژی</span>
              <span className="hover:text-white transition-colors cursor-pointer">
                کسب‌وکار
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                طراحی
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                پادکست
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-400 focus-within:border-indigo-500 transition-colors w-64">
              <Search size={16} />
              <input
                type="text"
                placeholder="جستجو در مقالات..."
                className="bg-transparent border-none outline-none w-full placeholder-slate-600"
              />
            </div>

            <button
              onClick={() => router.push("/wizard")}
              className="bg-white text-black px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <Zap size={16} /> داشبورد
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Featured */}
        <section
          onClick={() => router.push("/magazine/post")}
          className="mb-20 relative group cursor-pointer"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-500" />
          <div className="relative bg-[#0f172a] rounded-[30px] border border-slate-700 overflow-hidden grid lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">
                  ویژه سردبیر
                </span>
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock size={12} /> خواندن: ۱۵ دقیقه
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 group-hover:text-indigo-300 transition-colors">
                آینده اینجاست: چگونه{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  GenAI
                </span>{" "}
                مدل‌های کسب‌وکار را بازتعریف می‌کند؟
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                در این گزارش تحلیلی، به بررسی عمیق تاثیر مدل‌های زبانی بزرگ بر
                استراتژی‌های مارکتینگ B2B و حذف واسطه‌های سنتی می‌پردازیم.
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Author"
                  className="w-10 h-10 rounded-full border-2 border-slate-800"
                />
                <div>
                  <div className="text-white font-bold text-sm">
                    مهندس سیاوش صادقی
                  </div>
                  <div className="text-slate-500 text-xs">
                    مدیر ارشد محصول @ Google
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 min-h-[300px] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-50 animate-pulse-fast" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-white/10 rounded-full transform rotate-12" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-white/5 rounded-full transform -rotate-12" />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Latest */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="text-yellow-400" /> تازه‌ترین تحلیل‌ها
              </h2>
              <button
                type="button"
                onClick={() => router.push("/magazine")}
                className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1"
              >
                مشاهده همه <ChevronLeft size={16} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article, i) => (
                <div
                  key={i}
                  onClick={() => router.push(article.href)}
                  className="group bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className={`h-48 ${article.image} relative`}>
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg border border-white/10">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-300">
                        نویسنده: {article.author}
                      </span>
                      <div className="flex gap-3 text-slate-500">
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Bookmark
                            size={18}
                            className="hover:text-white cursor-pointer"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Share2
                            size={18}
                            className="hover:text-white cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Trending */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="text-green-400" size={20} /> ترندهای روز
              </h3>
              <div className="flex flex-wrap gap-2">
                {trends.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-700 hover:border-indigo-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
              <div className="bg-[#020617] rounded-xl p-6 relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg shadow-indigo-600/30">
                  <Zap />
                </div>
                <h3 className="text-lg font-bold text-white text-center mb-2">
                  خبرنامه تخصصی هیوارا
                </h3>
                <p className="text-slate-400 text-xs text-center mb-6 leading-relaxed">
                  عضویت در خبرنامه برای دریافت آخرین تحلیل‌های بازار و
                  تکنولوژی‌های روز دنیا.
                </p>

                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="ایمیل شما..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors text-center"
                  />
                  <button
                    type="button"
                    onClick={() => alert("خبرنامه: بعداً وصل می‌کنیم")}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    عضویت رایگان
                  </button>
                </div>
              </div>
            </div>

            {/* Podcast */}
            <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">پادکست هیوارا</h3>
                <span className="text-xs text-indigo-400">قسمت ۴۲</span>
              </div>

              <div
                className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer group"
                onClick={() => alert("پادکست: بعداً لینک می‌دیم")}
              >
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    چگونه یک یونیکورن بسازیم؟
                  </h4>
                  <p className="text-xs text-slate-500">
                    گفتگو با هم‌بنیانگذار اسنپ
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-[#020617] mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            HIVARA MAGAZINE
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            رسانه تخصصی هوش مصنوعی و مارکتینگ
          </p>
          <div className="flex justify-center gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white">
              درباره ما
            </a>
            <a href="#" className="hover:text-white">
              تبلیغات در مجله
            </a>
            <a href="#" className="hover:text-white">
              ارسال مقاله
            </a>
          </div>
          <p className="mt-8 text-xs text-slate-600">
            © 2024 Hivara AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

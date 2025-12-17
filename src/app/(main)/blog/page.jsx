"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  Eye,
  AlertTriangle,
  Terminal,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Zap,
} from "lucide-react";

export default function BlogPostPage() {
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scroll = windowHeight > 0 ? totalScroll / windowHeight : 0;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200"
      dir="rtl"
    >
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[60]"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800 z-50 h-16 flex items-center justify-between px-6">
        <button
          onClick={() => router.push("/magazine")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          بازگشت به مجله
        </button>

        <div className="flex gap-4 text-slate-400">
          <button
            type="button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Hivara Blog",
                  text: "مقاله هیوارا",
                  url: window.location.href,
                });
              }
            }}
            className="hover:text-white cursor-pointer"
            aria-label="Share"
          >
            <Share2 size={18} />
          </button>

          <button
            type="button"
            onClick={() => alert("Bookmark (بعداً وصل می‌کنیم به پروفایل)")}
            className="hover:text-white cursor-pointer"
            aria-label="Bookmark"
          >
            <Bookmark size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 px-6 border-b border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617]">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-6">
            <Zap size={12} className="fill-indigo-400" />
            تحلیل ویژه هوش مصنوعی
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tight drop-shadow-2xl">
            پایان دوران{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              خلاقیت انسانی
            </span>
            ؟ <br />
            چگونه GenAI بازار را می‌بلعد
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Author"
                className="w-8 h-8 rounded-full border border-slate-700"
              />
              <span className="text-slate-300">دکتر آرش پارسا</span>
            </div>

            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center gap-1">
              <Clock size={14} /> خواندن: ۸ دقیقه
            </div>

            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <div className="flex items-center gap-1">
              <Eye size={14} /> ۲.۴k بازدید
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* AI Warning */}
        <div className="mb-12 relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-900/5 p-6 md:p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertTriangle size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Terminal size={18} />
              هشدار سیستمی: تحلیل حساس
            </h3>
            <p className="text-red-200/80 text-sm leading-relaxed max-w-2xl">
              این مقاله حاوی داده‌هایی است که ممکن است دیدگاه شما را نسبت به
              امنیت شغلی در ۱۰ سال آینده تغییر دهد. الگوریتم‌های پیش‌بینی ما با
              اطمینان ۹۸٪ این روند را تایید کرده‌اند. با احتیاط مطالعه کنید.
            </p>
          </div>
          <div className="mt-6 h-1 w-full bg-red-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-red-500/50 w-[98%] animate-pulse" />
          </div>
        </div>

        {/* Article */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-400 prose-p:leading-8 prose-strong:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg">
          <p className="lead text-xl text-slate-300 font-medium">
            زمانی تصور می‌کردیم خلاقیت آخرین سنگر بشریت است...
          </p>

          <h2>انقلاب خاموش الگوریتم‌ها</h2>
          <p>
            در حالی که اکثر مارکترها سرگرم بهینه‌سازی کلمات کلیدی برای گوگل
            بودند، هوش مصنوعی در حال یادگیری چیزی فراتر بود:{" "}
            <strong>درک ناخودآگاه انسان</strong>.
          </p>

          <div className="my-10 bg-[#0f172a] border border-slate-700 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
              <span className="text-xs font-mono text-green-400">
                Simulation_Result_v4.2
              </span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>

            <code className="block font-mono text-sm text-blue-300 whitespace-pre-wrap">
              {`> Analysis: Traditional Ads Efficiency
> Year 2023: 12.4%
> Year 2024: 8.1%
> Year 2025 (Projected): 3.2%

> ALERT: Hyper-Personalization protocol initiated.
> Target: Individual synaptic patterns.`}
            </code>
          </div>

          <h2>مرگ محتوای عمومی</h2>
          <p>
            اینترنت پر از محتوای "خوب" است. اما هوش مصنوعی محتوای "عالی" و
            "شخصی" را در مقیاس میلیونی تولید می‌کند...
          </p>

          <blockquote>
            "ما دیگر بازاریابی نمی‌کنیم؛ ما در حال مهندسیِ تمایل هستیم."
            <br />
            <span className="text-sm font-normal not-italic text-slate-500 mt-2 block">
              - مدیر ارشد تکنولوژی OpenAI
            </span>
          </blockquote>

          <h3>آیا راه فراری هست؟</h3>
          <p>
            بله و خیر... هیوارا دقیقاً برای همین نقطه طراحی شده است: تبدیل شما
            از یک اپراتور به یک استراتژیست.
          </p>
        </article>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-2">
          {["#هوش_مصنوعی", "#آینده_پژوهی", "#تکنولوژی", "#مارکتینگ"].map(
            (tag, i) => (
              <span
                key={i}
                className="text-xs bg-slate-900 text-slate-400 px-3 py-1 rounded border border-slate-800 hover:border-indigo-500 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                سوالات متداول
              </h2>
              <p className="text-slate-500 text-sm">
                پاسخ‌های استخراج شده از پایگاه دانش
              </p>
            </div>
            <MessageSquare
              className="text-indigo-500 opacity-50 hidden md:block"
              size={40}
            />
          </div>

          <div className="space-y-4">
            <AccordionItem
              question="آیا هوش مصنوعی جایگزین شغل من خواهد شد؟"
              answer="هوش مصنوعی جایگزین شغل کسانی می‌شود که از هوش مصنوعی استفاده نمی‌کنند..."
            />
            <AccordionItem
              question="هزینه استفاده از ابزارهایی مثل هیوارا چقدر است؟"
              answer="هیوارا مدل‌های مختلفی دارد..."
            />
            <AccordionItem
              question="آیا داده‌های کسب‌وکار من امن می‌ماند؟"
              answer="امنیت در هیوارا اولویت صفر است..."
            />
            <AccordionItem
              question="چقدر می‌توان به پیش‌بینی‌های AI اعتماد کرد؟"
              answer="هیچ پیش‌بینی‌ای ۱۰۰٪ نیست..."
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-[#020617] mt-20 py-12 text-center">
        <p className="text-slate-600 text-sm">
          End of Transmission block_id: #8821
        </p>
      </footer>
    </div>
  );
}

function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#0f172a] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
          : "bg-transparent border-slate-800 hover:border-slate-700"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right focus:outline-none"
      >
        <span
          className={`font-bold text-sm md:text-base ${
            isOpen ? "text-white" : "text-slate-300"
          }`}
        >
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="text-indigo-400" size={20} />
        ) : (
          <ChevronDown className="text-slate-500" size={20} />
        )}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-dashed border-slate-700/50 mt-2">
            <div className="py-2">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

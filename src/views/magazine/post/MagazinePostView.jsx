"use client";

import { useEffect, useState } from "react";

import ScrollProgress from "./components/ScrollProgress";
import PostNavbar from "./components/PostNavbar";
import PostHero from "./components/PostHero";
import AIWarning from "./components/AIWarning";
import ArticleBody from "./components/ArticleBody";
import TagsBar from "./components/TagsBar";
import FAQSection from "./components/FAQSection";
import PostFooter from "./components/PostFooter";
import MagazineHeader from "../components/MagazineHeader";

export default function MagazinePostView({ slug }) {
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
  }, [slug]);

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-200  selection:bg-indigo-500/30 selection:text-indigo-200"
      dir="rtl"
    >
      <ScrollProgress value={scrollProgress} />
      <MagazineHeader
        onGoHome={() => router.push("/")}
        onGoDashboard={() => router.push("/wizard")}
      />

      <PostHero
        badge="تحلیل ویژه هوش مصنوعی"
        titleTop="پایان دوران"
        titleHighlight="خلاقیت انسانی"
        titleBottom="؟ چگونه GenAI بازار را می‌بلعد"
        authorName="دکتر آرش پارسا"
        readTime="۸ دقیقه"
        views="۲.۴k"
      />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AIWarning />

        <ArticleBody />

        <TagsBar
          tags={["#هوش_مصنوعی", "#آینده_پژوهی", "#تکنولوژی", "#مارکتینگ"]}
        />

        <FAQSection
          subtitle="پاسخ‌های استخراج شده از پایگاه دانش"
          items={[
            {
              q: "آیا هوش مصنوعی جایگزین شغل من خواهد شد؟",
              a: "هوش مصنوعی جایگزین شغل کسانی می‌شود که از هوش مصنوعی استفاده نمی‌کنند...",
            },
            {
              q: "هزینه استفاده از ابزارهایی مثل هیوارا چقدر است؟",
              a: "هیوارا مدل‌های مختلفی دارد...",
            },
            {
              q: "آیا داده‌های کسب‌وکار من امن می‌ماند؟",
              a: "امنیت در هیوارا اولویت صفر است...",
            },
            {
              q: "چقدر می‌توان به پیش‌بینی‌های AI اعتماد کرد؟",
              a: "هیچ پیش‌بینی‌ای ۱۰۰٪ نیست...",
            },
          ]}
        />
      </main>

      <PostFooter />
    </div>
  );
}

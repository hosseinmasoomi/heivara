"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ScrollProgress from "./components/ScrollProgress";
import PostNavbar from "./components/PostNavbar";
import PostHero from "./components/PostHero";
import AIWarning from "./components/AIWarning";
import ArticleBody from "./components/ArticleBody";
import TagsBar from "./components/TagsBar";
import FAQSection from "./components/FAQSection";
import PostFooter from "./components/PostFooter";
import MagazineHeader from "../components/MagazineHeader";

function readingTimeFa(htmlOrText = "") {
  const text = String(htmlOrText)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} دقیقه`;
}

function normalizeFaq(faq) {
  if (!Array.isArray(faq)) return [];
  return faq
    .map((x) => ({
      q: x?.q || x?.question || "",
      a: x?.a || x?.answer || "",
    }))
    .filter((x) => x.q.trim() && x.a.trim());
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => String(t || "").trim())
    .filter(Boolean)
    .map((t) => (t.startsWith("#") ? t : `#${t}`));
}

export default function MagazinePostView({ post }) {
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
  }, [post?.id]);

  if (!post) return null;

  const tags = normalizeTags(post.tags);
  const faqItems = normalizeFaq(post.faq);

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200"
      dir="rtl"
    >
      <ScrollProgress value={scrollProgress} />

      {/* هدر اصلی مگزین */}
      <MagazineHeader
        onGoHome={() => router.push("/")}
        onGoDashboard={() => router.push("/wizard")}
      />

      {/* نوبار پست (اشتراک/بوکمارک/بازگشت) */}

      {/* هیرو */}
      <PostHero
        badge={post.category || "مقاله"}
        title={post.title}
        authorName={post.author || "Admin"}
        readTime={post.readTime || readingTimeFa(post.content)}
        views={post.views != null ? String(post.views) : "—"}
      />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AIWarning />

        <ArticleBody content={post.content || ""} />

        {tags.length > 0 && <TagsBar tags={tags} />}

        {faqItems.length > 0 && (
          <FAQSection subtitle="سوالات پرتکرار" items={faqItems} />
        )}
      </main>

      <PostFooter />
    </div>
  );
}

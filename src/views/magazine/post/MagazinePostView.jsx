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

  // وقتی اسلاگ عوض شد، برو بالا
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post?.id]);

  if (!post) return null;

  const tags =
    Array.isArray(post.tags) && post.tags.length
      ? post.tags.map((t) => (String(t).startsWith("#") ? String(t) : `#${t}`))
      : [];

  // faq shape: [{question, answer}] یا [{q,a}]
  const faqItems = Array.isArray(post.faq)
    ? post.faq
        .map((x) => ({
          q: x?.q || x?.question || "",
          a: x?.a || x?.answer || "",
        }))
        .filter((x) => x.q.trim() && x.a.trim())
    : [];

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200"
      dir="rtl"
    >
      <ScrollProgress value={scrollProgress} />

      <MagazineHeader
        onGoHome={() => router.push("/")}
        onGoDashboard={() => router.push("/wizard")}
      />

      <PostHero
        badge={post.category || "مقاله"}
        title={post.title}
        authorName={post.author || "Admin"}
        readTime={readingTimeFa(post.content)}
        views={post.views ? String(post.views) : "—"}
        coverImage={post.coverImage || ""}
        date={post.date || ""}
      />

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <AIWarning />

        {/* ✅ محتوا از DB */}
        <ArticleBody content={post.content || ""} />

        {tags.length > 0 && <TagsBar tags={tags} />}

        {faqItems.length > 0 && (
          <FAQSection subtitle="سوالات پرتکرار" items={faqItems} />
        )}
      </main>

      <PostFooter post={post} />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import MagazineView from "@/views/magazine/MagazineView";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readingTimeFa(htmlOrText = "") {
  const text = String(htmlOrText)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} دقیقه`;
}

export default async function MagazinePage() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { category: true, author: true },
    take: 24,
  });

  // ترندها از تگ‌ها (جمع‌آوری ساده)
  const trendMap = new Map();
  for (const p of posts) {
    if (Array.isArray(p.tags)) {
      for (const t of p.tags) {
        const key = String(t || "").trim();
        if (!key) continue;
        trendMap.set(key, (trendMap.get(key) || 0) + 1);
      }
    }
  }
  const trends = [...trendMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([t]) => (t.startsWith("#") ? t : `#${t}`));

  // دیتا در فرم UI مگزین
  const articles = posts.map((p) => ({
    slug: p.slug,
    category: p.category?.name || "عمومی",
    title: p.title,
    excerpt:
      p.summary ||
      (p.content
        ? p.content.replace(/<[^>]*>/g, "").slice(0, 160) + "..."
        : ""),
    image: p.coverImage || "", // اگر خالی بود تو ArticleCard fallback می‌ذاریم
    readTime: readingTimeFa(p.content),
    author: p.author?.name || "Admin",
    date: new Date(p.publishedAt || p.createdAt).toLocaleDateString("fa-IR"),
  }));

  // featured: اولین مقاله
  const featured = articles[0] || null;

  return (
    <MagazineView articles={articles} trends={trends} featured={featured} />
  );
}

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
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    include: { category: true, author: true },
    take: 24,
  });

  const trendMap = new Map();
  for (const post of posts) {
    if (!Array.isArray(post.tags)) continue;
    for (const tag of post.tags) {
      const key = String(tag || "").trim();
      if (!key) continue;
      trendMap.set(key, (trendMap.get(key) || 0) + 1);
    }
  }

  const trends = [...trendMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => (tag.startsWith("#") ? tag : `#${tag}`));

  const articles = posts.map((post) => ({
    slug: post.slug,
    category: post.category?.name || "عمومی",
    title: post.title,
    excerpt:
      post.summary ||
      (post.content
        ? `${post.content.replace(/<[^>]*>/g, "").slice(0, 160)}...`
        : ""),
    image: post.coverImage || "",
    readTime: readingTimeFa(post.content),
    author: post.author?.name || "Admin",
    date: new Date(post.publishedAt || post.createdAt).toLocaleDateString("fa-IR"),
  }));

  return (
    <MagazineView
      articles={articles}
      trends={trends}
      featured={articles[0] || null}
    />
  );
}

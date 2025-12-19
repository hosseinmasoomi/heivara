import prisma from "@/lib/prisma";
import MagazinePostView from "@/views/magazine/post/MagazinePostView";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function MagazinePostPage({ params }) {
  const p = await params; // Next 16
  const slug = String(p?.slug || "");

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  return (
    <MagazinePostView
      post={{
        id: post.id,
        title: post.title,
        summary: post.summary || "",
        content: post.content || "",
        coverImage: post.coverImage || "",
        category: post.category?.name || "عمومی",
        tags: Array.isArray(post.tags) ? post.tags : [],
        faq: Array.isArray(post.faq) ? post.faq : [],
        meta: Array.isArray(post.meta) ? post.meta : [],
        author: post.author?.name || "Admin",
        date: new Date(post.publishedAt || post.createdAt).toLocaleDateString(
          "fa-IR"
        ),
      }}
    />
  );
}

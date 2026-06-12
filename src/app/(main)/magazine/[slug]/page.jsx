import prisma from "@/lib/prisma";
import MagazinePostView from "@/views/magazine/post/MagazinePostView";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function MagazinePostPage({ params }) {
  const resolvedParams = await params;
  const slug = String(resolvedParams?.slug || "");

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true, author: true },
  });

  if (!post || post.status !== "PUBLISHED") notFound();

  await prisma.blogPost
    .update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })
    .catch(() => {});

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
        views: (post.views ?? 0) + 1,
      }}
    />
  );
}

import AdminShell from "@/views/admin/shell/AdminShell";
import BlogSection from "@/views/admin/sections/BlogSection";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BlogStatus } from "@prisma/client";
import { deleteBlogImage } from "@/lib/blogMedia";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true, author: true },
  });
}

export default async function AdminBlogIndexPage() {
  const posts = await getPosts();

  async function handleDeletePost(id) {
    "use server";
    const post = await prisma.blogPost.findUnique({ where: { id: String(id) } });
    if (!post) return;

    await prisma.blogPost.delete({ where: { id: String(id) } });
    await deleteBlogImage(post.coverImage);

    revalidatePath("/admin/blog");
    revalidatePath("/magazine");
    revalidatePath(`/magazine/${post.slug}`);
  }

  async function handleTogglePublish(id) {
    "use server";
    const post = await prisma.blogPost.findUnique({ where: { id: String(id) } });
    if (!post) return;

    const nextStatus =
      post.status === BlogStatus.PUBLISHED ? BlogStatus.DRAFT : BlogStatus.PUBLISHED;

    await prisma.blogPost.update({
      where: { id: String(id) },
      data: {
        status: nextStatus,
        publishedAt: nextStatus === BlogStatus.PUBLISHED ? new Date() : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/magazine");
    revalidatePath(`/magazine/${post.slug}`);
  }

  return (
    <AdminShell>
      <BlogSection
        posts={posts}
        onDelete={handleDeletePost}
        onTogglePublish={handleTogglePublish}
      />
    </AdminShell>
  );
}

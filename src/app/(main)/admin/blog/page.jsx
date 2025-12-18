import AdminShell from "@/views/admin/shell/AdminShell";
import BlogSection from "@/views/admin/sections/BlogSection";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
    include: { category: true },
  });
}

export default async function AdminBlogIndexPage() {
  const posts = await getPosts();

  async function handleDeletePost(id) {
    "use server";
    await prisma.blogPost.delete({ where: { id: String(id) } });
    revalidatePath("/admin/blog");
  }

  return (
    <AdminShell>
      <BlogSection posts={posts} onDelete={handleDeletePost} />
    </AdminShell>
  );
}

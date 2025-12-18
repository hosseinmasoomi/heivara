import AdminShell from "@/views/admin/shell/AdminShell";
import BlogForm from "@/views/admin/sections/BlogForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function NewBlogPage() {
  const categories = await getCategories();

  async function handleCreate(payload) {
    "use server";

    const title = String(payload.title || "").trim();
    if (!title) return;

    const slug =
      String(payload.slug || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "") || `post-${Date.now()}`;

    const created = await prisma.blogPost.create({
      data: {
        title,
        slug,
        summary: payload.summary || null,
        content: payload.content || "",
        coverImage: payload.coverImage || null,
        tags: payload.tags?.length ? payload.tags : undefined,
        faq: payload.faq?.length ? payload.faq : undefined,
        meta: payload.meta?.length ? payload.meta : undefined,
        status: payload.published ? "PUBLISHED" : "DRAFT",
        publishedAt: payload.published ? new Date() : null,
        categoryId: String(payload.categoryId),
        authorId: payload.authorId ? String(payload.authorId) : null,
      },
    });

    revalidatePath("/admin/blog");
    redirect(`/admin/blog/${created.id}/edit`);
  }

  return (
    <AdminShell>
      <BlogForm categories={categories ?? []} onSubmit={handleCreate} />
    </AdminShell>
  );
}

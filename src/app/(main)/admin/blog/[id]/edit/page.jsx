import AdminShell from "@/views/admin/shell/AdminShell";
import BlogForm from "@/views/admin/sections/BlogForm";
import { prisma } from "@/lib/prisma"; // اگر default داری: import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getPost(id) {
  return prisma.blogPost.findUnique({
    where: { id: String(id) },
    include: { category: true },
  });
}

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

function normalizePost(p) {
  if (!p) return null;
  return {
    id: p.id,
    title: p.title ?? "",
    slug: p.slug ?? "",
    summary: p.summary ?? "",
    content: p.content ?? "",
    coverImage: p.coverImage ?? "",
    categoryId: p.categoryId ? String(p.categoryId) : "",
    tags: Array.isArray(p.tags) ? p.tags : [],
    faq: Array.isArray(p.faq) ? p.faq : [{ question: "", answer: "" }],
    meta: Array.isArray(p.meta) ? p.meta : [{ key: "", value: "" }],
    published: p.status === "PUBLISHED",
    authorId: p.authorId ?? null,
  };
}

export default async function EditBlogPage({ params }) {
  const p = await params; // ✅ مهم
  const id = String(p?.id || "");

  const post = await getPost(id);
  if (!post) redirect("/admin/blog");

  const categories = await getCategories();
  const initialData = normalizePost(post);

  async function handleUpdate(payload) {
    "use server";

    const published = !!payload.published;

    await prisma.blogPost.update({
      where: { id },
      data: {
        title: String(payload.title || "").trim(),
        slug: String(payload.slug || "").trim(),
        summary: payload.summary?.trim() ? payload.summary.trim() : null,
        content: payload.content || "",
        coverImage: payload.coverImage?.trim()
          ? payload.coverImage.trim()
          : null,

        tags: payload.tags?.length ? payload.tags : undefined,
        faq: payload.faq?.length ? payload.faq : undefined,
        meta: payload.meta?.length ? payload.meta : undefined,

        status: published ? "PUBLISHED" : "DRAFT",
        publishedAt: published ? new Date() : null,

        categoryId: String(payload.categoryId),
        authorId: payload.authorId ? String(payload.authorId) : null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}/edit`);
  }

  return (
    <AdminShell>
      <BlogForm
        initialData={initialData}
        categories={categories ?? []}
        onSubmit={handleUpdate}
      />
    </AdminShell>
  );
}

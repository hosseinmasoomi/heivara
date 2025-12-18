import AdminShell from "@/views/admin/shell/AdminShell";
import BlogForm from "@/views/admin/sections/BlogForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getBlog(id) {
  return prisma.blogPost.findUnique({
    where: { id: String(id) },
    include: { category: true },
  });
}

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function EditBlogPage({ params }) {
  const blog = await getBlog(params.id);
  //   if (!blog) redirect("/admin/blog");

  const categories = await getCategories();

  async function handleUpdate(payload) {
    "use server";

    await prisma.blogPost.update({
      where: { id: String(params.id) },
      data: {
        title: payload.title,
        slug: payload.slug,
        summary: payload.summary || null,
        content: payload.content || "",
        coverImage: payload.coverImage || null,
        tags: payload.tags?.length ? payload.tags : undefined,
        faq: payload.faq?.length ? payload.faq : undefined,
        meta: payload.meta?.length ? payload.meta : undefined,
        status: payload.published ? "PUBLISHED" : "DRAFT",
        publishedAt: payload.published ? new Date() : null,
        categoryId: String(payload.categoryId),
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${params.id}/edit`);
  }

  return (
    <AdminShell>
      <BlogForm
        initialData={blog}
        categories={categories ?? []}
        onSubmit={handleUpdate}
      />
    </AdminShell>
  );
}

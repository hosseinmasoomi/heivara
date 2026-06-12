import AdminShell from "@/views/admin/shell/AdminShell";
import BlogForm from "@/views/admin/sections/BlogForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

export default async function NewBlogPage() {
  const { user } = await requireUser();
  const categories = await getCategories();

  async function handleCreate(payload) {
    "use server";

    const title = String(payload?.title || "").trim();
    if (!title) throw new Error("عنوان الزامی است.");
    if (!payload?.categoryId) throw new Error("دسته‌بندی الزامی است.");

    const slug =
      String(payload?.slug || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "") || `post-${Date.now()}`;

    let created;
    try {
      created = await prisma.blogPost.create({
        data: {
          title,
          slug,
          summary: payload.summary?.trim() ? payload.summary.trim() : null,
          content: payload.content || "",
          coverImage: payload.coverImage?.trim() ? payload.coverImage.trim() : null,
          tags: payload.tags?.length ? payload.tags : undefined,
          faq: payload.faq?.length ? payload.faq : undefined,
          meta: payload.meta?.length ? payload.meta : undefined,
          status: payload.published ? "PUBLISHED" : "DRAFT",
          publishedAt: payload.published ? new Date() : null,
          categoryId: String(payload.categoryId),
          authorId: user?.id || null,
        },
      });
    } catch (error) {
      if (error?.code === "P2002") {
        throw new Error("اسلاگ تکراری است. اسلاگ دیگری انتخاب کنید.");
      }
      throw new Error("ذخیره مقاله انجام نشد.");
    }

    revalidatePath("/admin/blog");
    revalidatePath("/magazine");
    redirect(`/admin/blog/${created.id}/edit`);
  }

  return (
    <AdminShell>
      <BlogForm categories={categories ?? []} onSubmit={handleCreate} />
    </AdminShell>
  );
}

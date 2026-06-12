import AdminShell from "@/views/admin/shell/AdminShell";
import BlogForm from "@/views/admin/sections/BlogForm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteBlogImage } from "@/lib/blogMedia";

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

function normalizePost(post) {
  if (!post) return null;

  return {
    id: post.id,
    title: post.title ?? "",
    slug: post.slug ?? "",
    summary: post.summary ?? "",
    content: post.content ?? "",
    coverImage: post.coverImage ?? "",
    categoryId: post.categoryId ? String(post.categoryId) : "",
    tags: Array.isArray(post.tags) ? post.tags : [],
    faq: Array.isArray(post.faq) ? post.faq : [{ question: "", answer: "" }],
    meta: Array.isArray(post.meta) ? post.meta : [{ key: "", value: "" }],
    published: post.status === "PUBLISHED",
    authorId: post.authorId ?? null,
  };
}

export default async function EditBlogPage({ params }) {
  const resolvedParams = await params;
  const id = String(resolvedParams?.id || "");

  const post = await getPost(id);
  if (!post) redirect("/admin/blog");

  const categories = await getCategories();
  const initialData = normalizePost(post);

  async function handleUpdate(payload) {
    "use server";

    const published = !!payload.published;
    const title = String(payload?.title || "").trim();
    const slug = String(payload?.slug || "").trim();
    const nextCoverImage = payload.coverImage?.trim() ? payload.coverImage.trim() : null;

    if (!title) throw new Error("عنوان الزامی است.");
    if (!slug) throw new Error("اسلاگ الزامی است.");
    if (!payload?.categoryId) throw new Error("دسته‌بندی الزامی است.");

    try {
      await prisma.blogPost.update({
        where: { id },
        data: {
          title,
          slug,
          summary: payload.summary?.trim() ? payload.summary.trim() : null,
          content: payload.content || "",
          coverImage: nextCoverImage,
          tags: payload.tags?.length ? payload.tags : undefined,
          faq: payload.faq?.length ? payload.faq : undefined,
          meta: payload.meta?.length ? payload.meta : undefined,
          status: published ? "PUBLISHED" : "DRAFT",
          publishedAt: published ? new Date() : null,
          categoryId: String(payload.categoryId),
          authorId: post.authorId ?? null,
        },
      });

      if (post.coverImage && post.coverImage !== nextCoverImage) {
        await deleteBlogImage(post.coverImage);
      }

      revalidatePath("/admin/blog");
      revalidatePath(`/admin/blog/${id}/edit`);
      revalidatePath("/magazine");
      revalidatePath(`/magazine/${post.slug}`);
      revalidatePath(`/magazine/${slug}`);
    } catch (error) {
      if (error?.code === "P2002") {
        throw new Error("اسلاگ تکراری است. اسلاگ دیگری انتخاب کنید.");
      }
      throw new Error("به‌روزرسانی مقاله انجام نشد.");
    }
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

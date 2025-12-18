"use client";

import { useRouter } from "next/navigation";
import BlogList from "./BlogList";

export default function BlogSection({ posts = [], onDelete }) {
  const router = useRouter();

  // تبدیل دیتای DB به فرم UI قبلی تو
  const blogPosts = posts.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category?.name || "-",
    author: "Admin",
    status: p.status === "PUBLISHED" ? "Published" : "Draft",
    views: p.views ?? 0,
    date: new Date(p.createdAt).toLocaleDateString("fa-IR"),
  }));

  return (
    <BlogList
      blogPosts={blogPosts}
      handleNewPost={() => router.push("/admin/blog/new")}
      handleEditPost={(post) => router.push(`/admin/blog/${post.id}/edit`)}
      handleDeletePost={(id) => onDelete?.(id)}
    />
  );
}

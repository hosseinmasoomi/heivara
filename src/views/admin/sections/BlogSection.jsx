"use client";

import { useRouter } from "next/navigation";
import BlogList from "./BlogList";

export default function BlogSection({ posts = [], onDelete, onTogglePublish }) {
  const router = useRouter();

  const blogPosts = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    summary: post.summary || "",
    coverImage: post.coverImage || "",
    category: post.category?.name || "-",
    author: post.author?.name || post.author?.phone || "Admin",
    status: post.status === "PUBLISHED" ? "Published" : "Draft",
    views: post.views ?? 0,
    date: new Date(post.publishedAt || post.createdAt).toLocaleDateString("fa-IR"),
  }));

  return (
    <BlogList
      blogPosts={blogPosts}
      handleNewPost={() => router.push("/admin/blog/new")}
      handleDeletePost={(id) => onDelete?.(id)}
      handleTogglePublish={(id) => onTogglePublish?.(id)}
    />
  );
}

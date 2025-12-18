import React from "react";
import AdminShell from "@/views/admin/shell/AdminShell";
import BlogSection from "@/views/admin/sections/BlogSection";

export default function AdminBlogPage() {
  return (
    <AdminShell>
      <BlogSection />
    </AdminShell>
  );
}

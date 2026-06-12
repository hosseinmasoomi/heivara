import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  CheckCircle2,
  CircleOff,
  Image as ImageIcon,
} from "lucide-react";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/navigation";

export default function BlogList({
  blogPosts = [],
  handleNewPost,
  handleDeletePost,
  handleTogglePublish,
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const q = query.trim().toLowerCase();
      const matchesText =
        !q ||
        post.title?.toLowerCase().includes(q) ||
        post.slug?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && post.status === "Published") ||
        (statusFilter === "draft" && post.status !== "Published");

      return matchesText && matchesStatus;
    });
  }, [blogPosts, query, statusFilter]);

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <BookOpen className="text-pink-400" /> مدیریت محتوا و بلاگ
        </h3>

        <Button
          onClick={handleNewPost}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> مقاله جدید
        </Button>
      </div>

      <div className="p-4 border-b border-slate-800 bg-slate-900/20 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جستجو بر اساس عنوان، اسلاگ یا دسته..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 pr-10 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: "all", label: "همه", active: "bg-indigo-600/20 border-indigo-500/40 text-indigo-300" },
            { id: "published", label: "منتشرشده", active: "bg-green-600/20 border-green-500/40 text-green-300" },
            { id: "draft", label: "پیش‌نویس", active: "bg-yellow-600/20 border-yellow-500/40 text-yellow-300" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatusFilter(item.id)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border ${
                statusFilter === item.id
                  ? item.active
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm min-w-[1100px]">
          <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
            <tr>
              <th className="px-6 py-4">کاور</th>
              <th className="px-6 py-4">عنوان مقاله</th>
              <th className="px-6 py-4">اسلاگ</th>
              <th className="px-6 py-4">دسته‌بندی</th>
              <th className="px-6 py-4">نویسنده</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4">بازدید</th>
              <th className="px-6 py-4">تاریخ</th>
              <th className="px-6 py-4">انتشار</th>
              <th className="px-6 py-4">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800 text-slate-300">
            {filteredPosts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-slate-800/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={128}
                      height={96}
                      className="w-16 h-12 object-cover rounded-lg border border-slate-700"
                      unoptimized
                    />
                  ) : (
                    <div className="w-16 h-12 rounded-lg border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                      <ImageIcon size={16} />
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 font-bold text-white max-w-xs truncate">
                  {post.title}
                </td>

                <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                  /{post.slug}
                </td>

                <td className="px-6 py-4">
                  <span className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-400">
                    {post.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-xs">{post.author}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold border ${
                      post.status === "Published"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}
                  >
                    {post.status === "Published" ? "منتشر شده" : "پیش‌نویس"}
                  </span>
                </td>

                <td className="px-6 py-4 font-mono text-xs">
                  {Number(post.views || 0).toLocaleString("fa-IR")}
                </td>
                <td className="px-6 py-4 font-mono text-xs">{post.date}</td>

                <td className="px-6 py-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleTogglePublish?.(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.status === "Published"
                        ? "bg-green-500/10 text-green-400 hover:bg-yellow-500/20 hover:text-yellow-300"
                        : "bg-yellow-500/10 text-yellow-400 hover:bg-green-500/20 hover:text-green-300"
                    }`}
                    title={
                      post.status === "Published"
                        ? "برگشت به پیش‌نویس"
                        : "انتشار مقاله"
                    }
                  >
                    {post.status === "Published" ? (
                      <CircleOff size={14} />
                    ) : (
                      <CheckCircle2 size={14} />
                    )}
                  </Button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.push(`/magazine/${post.slug}`)}
                      className="p-2 bg-slate-800 rounded-lg hover:bg-sky-600 hover:text-white text-slate-400 transition-colors"
                      title="نمایش در سایت"
                    >
                      <Eye size={14} />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                      className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors"
                      title="ویرایش"
                    >
                      <Edit size={14} />
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => handleDeletePost(post.id)}
                      className="p-2 bg-slate-800 rounded-lg hover:bg-red-600 hover:text-white text-slate-400 transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12 text-slate-500">
                  مقاله‌ای با این فیلتر پیدا نشد.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

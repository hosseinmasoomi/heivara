"use client";

import React from "react";
import Button from "../../../components/ui/Button";
export default function BlogList({
  blogPosts,
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  icons,
}) {
  const { BookOpen, Plus, Edit, Trash2 } = icons;

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

      <table className="w-full text-right text-sm">
        <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
          <tr>
            <th className="px-6 py-4">عنوان مقاله</th>
            <th className="px-6 py-4">دسته‌بندی</th>
            <th className="px-6 py-4">نویسنده</th>
            <th className="px-6 py-4">وضعیت</th>
            <th className="px-6 py-4">بازدید</th>
            <th className="px-6 py-4">تاریخ</th>
            <th className="px-6 py-4">عملیات</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 text-slate-300">
          {blogPosts.map((post) => (
            <tr
              key={post.id}
              className="hover:bg-slate-800/50 transition-colors group"
            >
              <td className="px-6 py-4 font-bold text-white max-w-xs truncate">
                {post.title}
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
                {post.views.toLocaleString()}
              </td>
              <td className="px-6 py-4 font-mono text-xs">{post.date}</td>

              <td className="px-6 py-4">
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    onClick={() => handleEditPost(post)}
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

          {blogPosts.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-12 text-slate-500">
                هیچ مقاله‌ای یافت نشد.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

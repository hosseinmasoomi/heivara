"use client";

import React from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function BlogEditor({
  currentPost,
  setCurrentPost,
  setIsEditingBlog,
  handleSavePost,
  icons,
}) {
  const { Edit, Save, X } = icons;

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <Edit className="text-indigo-400" />
          {currentPost.id ? "ویرایش مقاله" : "نوشتن مقاله جدید"}
        </h3>

        <Button
          variant="ghost"
          onClick={() => {
            setIsEditingBlog(false);
            setCurrentPost(null);
          }}
          className="text-slate-400 hover:text-white"
        >
          <X size={24} />
        </Button>
      </div>

      <div className="p-6 md:p-10">
        <form onSubmit={handleSavePost} className="space-y-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">
                عنوان مقاله
              </label>
              <Input
                variant="dark"
                value={currentPost.title}
                onChange={(e) =>
                  setCurrentPost((prev) => ({ ...prev, title: e.target.value }))
                }
                className="rounded-xl p-3"
                placeholder="عنوان جذاب..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">
                دسته‌بندی
              </label>
              <select
                value={currentPost.category}
                onChange={(e) =>
                  setCurrentPost((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="">انتخاب کنید...</option>
                <option value="استراتژی">استراتژی</option>
                <option value="تکنولوژی">تکنولوژی</option>
                <option value="برندینگ">برندینگ</option>
                <option value="رشد">رشد (Growth)</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">
                نویسنده
              </label>
              <Input
                variant="dark"
                value={currentPost.author}
                onChange={(e) =>
                  setCurrentPost((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="rounded-xl p-3"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400">
                وضعیت انتشار
              </label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() =>
                    setCurrentPost((prev) => ({ ...prev, status: "Published" }))
                  }
                  className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                    currentPost.status === "Published"
                      ? "bg-green-500/20 border-green-500 text-green-400"
                      : "bg-slate-900 border-slate-700 text-slate-500"
                  }`}
                >
                  منتشر شود
                </Button>

                <Button
                  type="button"
                  onClick={() =>
                    setCurrentPost((prev) => ({ ...prev, status: "Draft" }))
                  }
                  className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                    currentPost.status === "Draft"
                      ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                      : "bg-slate-900 border-slate-700 text-slate-500"
                  }`}
                >
                  پیش‌نویس
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400">
              محتوای مقاله
            </label>
            <textarea
              value={currentPost.content}
              onChange={(e) =>
                setCurrentPost((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full h-96 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none font-mono leading-relaxed"
              placeholder="متن خود را اینجا بنویسید..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditingBlog(false);
                setCurrentPost(null);
              }}
              className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              انصراف
            </Button>

            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Save size={18} />
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

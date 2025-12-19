"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/Editor"), { ssr: false });

function slugify(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export default function BlogForm({ initialData, onSubmit, categories = [] }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [meta, setMeta] = useState([{ key: "", value: "" }]);
  const [published, setPublished] = useState(false);

  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setSlug(initialData.slug || "");
    setSummary(initialData.summary || "");
    setContent(initialData.content || "");
    setCoverImage(initialData.coverImage || "");
    setCategoryId(initialData.categoryId ? String(initialData.categoryId) : "");

    setTags(Array.isArray(initialData.tags) ? initialData.tags : []);
    setFaq(
      Array.isArray(initialData.faq)
        ? initialData.faq
        : [{ question: "", answer: "" }]
    );
    setMeta(
      Array.isArray(initialData.meta)
        ? initialData.meta
        : [{ key: "", value: "" }]
    );

    setPublished(!!initialData.published);
  }, [initialData]);

  const tabs = useMemo(
    () => [
      { id: "basic", label: "اطلاعات اولیه" },
      { id: "content", label: "محتوا" },
      { id: "faq", label: "سوالات متداول" },
      { id: "meta", label: "متاتگ‌ها" },
    ],
    []
  );

  const handleAddTag = () => {
    const t = newTag.trim();
    if (!t) return;
    if (tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
    setNewTag("");
  };

  const handleRemoveTag = (t) => setTags((prev) => prev.filter((x) => x !== t));

  const cleanFaq = (arr) =>
    (arr || []).filter((x) => x?.question?.trim() && x?.answer?.trim());

  const cleanMeta = (arr) =>
    (arr || []).filter((x) => x?.key?.trim() && x?.value?.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const finalTitle = title.trim();
      if (!finalTitle) throw new Error("عنوان الزامی است.");

      const finalCategoryId = String(categoryId || "");
      if (!finalCategoryId) throw new Error("لطفاً یک دسته‌بندی انتخاب کنید.");

      const finalSlug = slug.trim() ? slugify(slug) : slugify(finalTitle);
      if (!finalSlug) throw new Error("اسلاگ نامعتبر است.");

      const payload = {
        id: initialData?.id,
        title: finalTitle,
        slug: finalSlug,
        summary: summary?.trim() || "",
        content: content || "",
        coverImage: coverImage?.trim() || "",
        categoryId: finalCategoryId,
        tags,
        faq: cleanFaq(faq),
        meta: cleanMeta(meta),
        published,
        authorId: initialData?.authorId ?? null,
      };

      await onSubmit?.(payload);
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "خطای داخلی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {isEdit ? "ویرایش مقاله" : "افزودن مقاله جدید"}
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          وضعیت انتشار را هم همین‌جا کنترل کن.
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-800 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === t.id
                ? "text-indigo-300 border-b-2 border-indigo-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#020617] border border-slate-800 rounded-2xl p-5 md:p-7 shadow-xl"
      >
        {activeTab === "basic" && (
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-300">
                  عنوان
                </label>
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!isEdit) setSlug(slugify(e.target.value));
                  }}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="عنوان مقاله..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">Slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 font-mono"
                  placeholder="my-first-post"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">خلاصه</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 min-h-[90px]"
                placeholder="خلاصه کوتاه..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-300">
                  دسته‌بندی
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value="">انتخاب کنید...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end justify-between gap-4">
                <label className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="accent-indigo-500"
                  />
                  انتشار (Published)
                </label>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">
                کاور (URL)
              </label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">تگ‌ها</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="مثلاً: سئو"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm"
                >
                  افزودن
                </button>
              </div>

              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs hover:bg-red-600/20 hover:text-red-300 transition-colors"
                      title="حذف"
                    >
                      {t} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">محتوا</label>
            <RichEditor value={content} onChange={setContent} />
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">
              سوالات متداول
            </label>

            {faq.map((item, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-2">
                <input
                  value={item.question}
                  onChange={(e) => {
                    const arr = [...faq];
                    arr[i].question = e.target.value;
                    setFaq(arr);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="سوال"
                />
                <input
                  value={item.answer}
                  onChange={(e) => {
                    const arr = [...faq];
                    arr[i].answer = e.target.value;
                    setFaq(arr);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="پاسخ"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setFaq((prev) => [...prev, { question: "", answer: "" }])
              }
              className="text-indigo-300 text-sm font-bold"
            >
              + افزودن سوال جدید
            </button>
          </div>
        )}

        {activeTab === "meta" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">متاتگ‌ها</label>

            {meta.map((item, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-2">
                <input
                  value={item.key}
                  onChange={(e) => {
                    const arr = [...meta];
                    arr[i].key = e.target.value;
                    setMeta(arr);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 font-mono"
                  placeholder="key"
                />
                <input
                  value={item.value}
                  onChange={(e) => {
                    const arr = [...meta];
                    arr[i].value = e.target.value;
                    setMeta(arr);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="value"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setMeta((prev) => [...prev, { key: "", value: "" }])
              }
              className="text-indigo-300 text-sm font-bold"
            >
              + افزودن متاتگ جدید
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 mt-7">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold disabled:opacity-60"
          >
            {loading
              ? "در حال ذخیره..."
              : isEdit
              ? "ذخیره تغییرات"
              : "ساخت مقاله"}
          </button>

          {success && (
            <span className="text-green-400 text-sm font-bold">
              ✅ انجام شد
            </span>
          )}
          {error && (
            <span className="text-red-400 text-sm font-bold">❌ {error}</span>
          )}
        </div>
      </form>
    </div>
  );
}

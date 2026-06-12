"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const RichEditor = dynamic(() => import("@/components/Editor"), { ssr: false });

function slugify(value) {
  return String(value || "")
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
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);
  const isEdit = Boolean(initialData?.id);

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
      Array.isArray(initialData.faq) && initialData.faq.length
        ? initialData.faq
        : [{ question: "", answer: "" }]
    );
    setMeta(
      Array.isArray(initialData.meta) && initialData.meta.length
        ? initialData.meta
        : [{ key: "", value: "" }]
    );
    setPublished(Boolean(initialData.published));
  }, [initialData]);

  const tabs = useMemo(
    () => [
      { id: "basic", label: "اطلاعات اولیه" },
      { id: "content", label: "محتوا" },
      { id: "faq", label: "سوالات متداول" },
      { id: "meta", label: "سئو و متاتگ‌ها" },
    ],
    []
  );

  const cleanFaq = (items) =>
    (items || []).filter((item) => item?.question?.trim() && item?.answer?.trim());

  const cleanMeta = (items) =>
    (items || []).filter((item) => item?.key?.trim() && item?.value?.trim());

  const handleAddTag = () => {
    const nextTag = newTag.trim();
    if (!nextTag || tags.includes(nextTag)) return;
    setTags((prev) => [...prev, nextTag]);
    setNewTag("");
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error("آپلود تصویر انجام نشد.");
      }

      setCoverImage(data.url);
    } catch (uploadError) {
      setError(uploadError?.message || "آپلود تصویر انجام نشد.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const finalTitle = title.trim();
      if (!finalTitle) throw new Error("عنوان الزامی است.");
      if ((summary || "").trim().length < 20) {
        throw new Error("خلاصه مقاله باید حداقل ۲۰ کاراکتر باشد.");
      }
      if ((content || "").replace(/<[^>]*>/g, "").trim().length < 50) {
        throw new Error("محتوا خیلی کوتاه است. حداقل ۵۰ کاراکتر لازم است.");
      }

      const finalCategoryId = String(categoryId || "");
      if (!finalCategoryId) throw new Error("لطفاً یک دسته‌بندی انتخاب کنید.");

      const finalSlug = slug.trim() ? slugify(slug) : slugify(finalTitle);
      if (!finalSlug) throw new Error("اسلاگ نامعتبر است.");

      await onSubmit?.({
        id: initialData?.id,
        title: finalTitle,
        slug: finalSlug,
        summary: summary.trim(),
        content: content || "",
        coverImage: coverImage.trim(),
        categoryId: finalCategoryId,
        tags,
        faq: cleanFaq(faq),
        meta: cleanMeta(meta),
        published,
        authorId: initialData?.authorId ?? null,
      });

      setSuccess(true);
    } catch (submitError) {
      setError(submitError?.message || "خطای داخلی");
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
          ساخت، ویرایش، تصویر، سئو و وضعیت انتشار را از همین فرم مدیریت کن.
        </p>
      </div>

      <div className="flex gap-2 border-b border-slate-800 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-bold transition-colors ${
              activeTab === tab.id
                ? "text-indigo-300 border-b-2 border-indigo-500"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
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
                <label className="text-sm font-bold text-slate-300">عنوان</label>
                <input
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                    if (!isEdit) setSlug(slugify(event.target.value));
                  }}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="عنوان مقاله..."
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-300">Slug</label>
                <input
                  value={slug}
                  onChange={(event) => setSlug(slugify(event.target.value))}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 font-mono"
                  placeholder="my-first-post"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">خلاصه</label>
              <textarea
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 min-h-[90px]"
                placeholder="خلاصه کوتاه مقاله..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-300">دسته‌بندی</label>
                <select
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                >
                  <option value="">انتخاب کنید...</option>
                  {categories.map((category) => (
                    <option key={category.id} value={String(category.id)}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end justify-between gap-4">
                <label className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(event) => setPublished(event.target.checked)}
                    className="accent-indigo-500"
                  />
                  انتشار در مگزین
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <label className="text-sm font-bold text-slate-300">تصویر کاور</label>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-bold"
                  >
                    {uploading ? "در حال آپلود..." : "آپلود تصویر"}
                  </button>
                  {coverImage ? (
                    <button
                      type="button"
                      onClick={() => setCoverImage("")}
                      className="px-4 py-2 rounded-lg bg-red-600/15 hover:bg-red-600/25 text-red-300 text-xs font-bold border border-red-500/30"
                    >
                      حذف تصویر
                    </button>
                  ) : null}
                </div>
              </div>

              <input
                value={coverImage}
                onChange={(event) => setCoverImage(event.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                placeholder="https://... یا /uploads/blog/..."
              />

              <p className="text-xs text-slate-500">
                تصویر کاور در لیست مگزین، کارت مقاله، بخش ویژه و صفحه داخلی مقاله استفاده می‌شود.
              </p>

              {coverImage ? (
                <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40">
                  <Image
                    src={coverImage}
                    alt={title || "Blog cover preview"}
                    width={1200}
                    height={640}
                    className="w-full h-64 object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-700 h-40 flex items-center justify-center text-slate-500 text-sm">
                  هنوز تصویری انتخاب نشده است.
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-bold text-slate-300">تگ‌ها</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={newTag}
                  onChange={(event) => setNewTag(event.target.value)}
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

              {tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}
                      className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs hover:bg-red-600/20 hover:text-red-300 transition-colors"
                      title="حذف"
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">محتوا</label>
            <RichEditor value={content} onChange={setContent} />
            <p className="text-xs text-slate-500">
              خروجی این بخش به صورت HTML در صفحه مقاله رندر می‌شود.
            </p>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">سوالات متداول</label>

            {faq.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-2">
                <input
                  value={item.question}
                  onChange={(event) => {
                    const next = [...faq];
                    next[index].question = event.target.value;
                    setFaq(next);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="سوال"
                />
                <input
                  value={item.answer}
                  onChange={(event) => {
                    const next = [...faq];
                    next[index].answer = event.target.value;
                    setFaq(next);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="پاسخ"
                />
                <button
                  type="button"
                  onClick={() => setFaq((prev) => prev.filter((_, i) => i !== index))}
                  className="md:col-span-2 text-xs text-red-300 hover:text-red-200 justify-self-start"
                >
                  حذف این سوال
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setFaq((prev) => [...prev, { question: "", answer: "" }])}
              className="text-indigo-300 text-sm font-bold"
            >
              + افزودن سوال جدید
            </button>
          </div>
        )}

        {activeTab === "meta" && (
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-300">متاتگ‌ها</label>

            {meta.map((item, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-2">
                <input
                  value={item.key}
                  onChange={(event) => {
                    const next = [...meta];
                    next[index].key = event.target.value;
                    setMeta(next);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 font-mono"
                  placeholder="key"
                />
                <input
                  value={item.value}
                  onChange={(event) => {
                    const next = [...meta];
                    next[index].value = event.target.value;
                    setMeta(next);
                  }}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                  placeholder="value"
                />
                <button
                  type="button"
                  onClick={() => setMeta((prev) => prev.filter((_, i) => i !== index))}
                  className="md:col-span-2 text-xs text-red-300 hover:text-red-200 justify-self-start"
                >
                  حذف این متا
                </button>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setMeta((prev) => [...prev, { key: "", value: "" }])}
                className="text-indigo-300 text-sm font-bold"
              >
                + افزودن متاتگ جدید
              </button>

              <button
                type="button"
                onClick={() =>
                  setMeta((prev) => [
                    ...prev,
                    { key: "metaTitle", value: title || "" },
                    { key: "metaDescription", value: summary || "" },
                    { key: "canonical", value: slug ? `/magazine/${slug}` : "" },
                  ])
                }
                className="text-emerald-300 text-sm font-bold"
              >
                + افزودن متاهای پیشنهادی
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-7 flex-wrap">
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold disabled:opacity-60"
          >
            {loading
              ? "در حال ذخیره..."
              : isEdit
              ? "ذخیره تغییرات"
              : "ساخت مقاله"}
          </button>

          {isEdit && slug && published ? (
            <a
              href={`/magazine/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 font-bold text-sm border border-sky-500/30"
            >
              مشاهده در سایت
            </a>
          ) : null}

          {success ? (
            <span className="text-green-400 text-sm font-bold">ذخیره شد.</span>
          ) : null}
          {error ? <span className="text-red-400 text-sm font-bold">{error}</span> : null}
        </div>
      </form>
    </div>
  );
}

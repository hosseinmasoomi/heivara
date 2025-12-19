"use client";

export default function ArticleBody({ content = "" }) {
  return (
    <article
      className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-400 prose-p:leading-8 prose-strong:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

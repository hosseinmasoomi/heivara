"use client";

import { Bookmark, Share2 } from "lucide-react";

export default function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className={`h-48 ${article.image} relative`}>
        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-lg border border-white/10">
          {article.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>{article.readTime}</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
          {article.title}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-300">
            نویسنده: {article.author}
          </span>

          <div className="flex gap-3 text-slate-500">
            <button type="button" onClick={(e) => e.stopPropagation()}>
              <Bookmark size={18} className="hover:text-white" />
            </button>
            <button type="button" onClick={(e) => e.stopPropagation()}>
              <Share2 size={18} className="hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Clock, Eye, Zap } from "lucide-react";

function splitFancyTitle(title = "") {
  const t = String(title || "").trim();
  if (!t) return { top: "", highlight: "", bottom: "" };

  // اگر کاربر خودش با | جدا کرد: top|highlight|bottom
  if (t.includes("|")) {
    const [top, highlight, bottom] = t.split("|").map((x) => x.trim());
    return { top: top || "", highlight: highlight || "", bottom: bottom || "" };
  }

  // حالت پیش‌فرض: وسط جمله رو هایلایت کن
  const words = t.split(" ").filter(Boolean);
  if (words.length < 3) return { top: t, highlight: "", bottom: "" };

  const mid = Math.floor(words.length / 2);
  return {
    top: words.slice(0, mid - 1).join(" "),
    highlight: words[mid - 1],
    bottom: words.slice(mid).join(" "),
  };
}

export default function PostHero({
  badge,
  // حالت جدید
  title,
  // حالت قدیمی (اگر هنوز جایی استفاده می‌کنی)
  titleTop,
  titleHighlight,
  titleBottom,
  authorName,
  readTime,
  views,
}) {
  const isLegacy = titleTop || titleHighlight || titleBottom;
  const t = isLegacy
    ? {
        top: titleTop || "",
        highlight: titleHighlight || "",
        bottom: titleBottom || "",
      }
    : splitFancyTitle(title || "");

  return (
    <header className="relative pt-32 pb-20 px-6 border-b border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617] to-[#020617]">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold mb-6">
          <Zap size={12} className="fill-indigo-400" />
          {badge}
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 tracking-tight drop-shadow-2xl">
          {t.top}{" "}
          {t.highlight ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              {t.highlight}
            </span>
          ) : null}
          {t.bottom ? (
            <>
              <br />
              {t.bottom}
            </>
          ) : null}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Author"
              className="w-8 h-8 rounded-full border border-slate-700"
            />
            <span className="text-slate-300">{authorName}</span>
          </div>

          <span className="w-1 h-1 bg-slate-700 rounded-full" />

          <div className="flex items-center gap-1">
            <Clock size={14} /> خواندن: {readTime}
          </div>

          <span className="w-1 h-1 bg-slate-700 rounded-full" />

          <div className="flex items-center gap-1">
            <Eye size={14} /> {views} بازدید
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
    </header>
  );
}

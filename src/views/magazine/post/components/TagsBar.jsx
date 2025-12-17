"use client";

export default function TagsBar({ tags = [] }) {
  return (
    <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="text-xs bg-slate-900 text-slate-400 px-3 py-1 rounded border border-slate-800 hover:border-indigo-500 transition-colors cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

"use client";

import { TrendingUp } from "lucide-react";

export default function TrendingTags({ trends }) {
  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="text-green-400" size={20} />
        ترندهای روز
      </h3>

      <div className="flex flex-wrap gap-2">
        {trends.map((tag, i) => (
          <span
            key={i}
            className="bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-700 hover:border-indigo-500"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

export default function PodcastCard() {
  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">پادکست هیوارا</h3>
        <span className="text-xs text-indigo-400">قسمت ۴۲</span>
      </div>

      <div
        onClick={() => alert("پادکست: بعداً لینک می‌دیم")}
        className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer group"
      >
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-1">
            چگونه یک یونیکورن بسازیم؟
          </h4>
          <p className="text-xs text-slate-500">گفتگو با هم‌بنیانگذار اسنپ</p>
        </div>
      </div>
    </div>
  );
}

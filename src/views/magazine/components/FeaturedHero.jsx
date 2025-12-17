"use client";

import { Clock } from "lucide-react";

export default function FeaturedHero({ onClick }) {
  return (
    <section onClick={onClick} className="mb-20 relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-500" />

      <div className="relative bg-[#0f172a] rounded-[30px] border border-slate-700 overflow-hidden grid lg:grid-cols-2">
        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">
              ویژه سردبیر
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Clock size={12} /> خواندن: ۱۵ دقیقه
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 group-hover:text-indigo-300 transition-colors">
            آینده اینجاست: چگونه{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              GenAI
            </span>{" "}
            مدل‌های کسب‌وکار را بازتعریف می‌کند؟
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            بررسی عمیق تاثیر مدل‌های زبانی بزرگ بر استراتژی‌های مارکتینگ و حذف
            واسطه‌های سنتی.
          </p>

          <div className="flex items-center gap-4 mt-auto">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Author"
              className="w-10 h-10 rounded-full border-2 border-slate-800"
            />
            <div>
              <div className="text-white font-bold text-sm">
                مهندس سیاوش صادقی
              </div>
              <div className="text-slate-500 text-xs">
                مدیر ارشد محصول @ Google
              </div>
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-50 animate-pulse-fast" />
          </div>
        </div>
      </div>
    </section>
  );
}

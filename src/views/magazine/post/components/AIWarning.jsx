"use client";

import { AlertTriangle, Terminal } from "lucide-react";

export default function AIWarning() {
  return (
    <div className="mb-12 relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-900/5 p-6 md:p-8">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle size={120} />
      </div>

      <div className="relative z-10">
        <h3 className="text-red-400 font-bold text-lg mb-2 flex items-center gap-2">
          <Terminal size={18} />
          هشدار سیستمی: تحلیل حساس
        </h3>

        <p className="text-red-200/80 text-sm leading-relaxed max-w-2xl">
          این مقاله حاوی داده‌هایی است که ممکن است دیدگاه شما را نسبت به امنیت
          شغلی در ۱۰ سال آینده تغییر دهد. الگوریتم‌های پیش‌بینی ما با اطمینان
          ۹۸٪ این روند را تایید کرده‌اند. با احتیاط مطالعه کنید.
        </p>
      </div>

      <div className="mt-6 h-1 w-full bg-red-900/30 rounded-full overflow-hidden">
        <div className="h-full bg-red-500/50 w-[98%] animate-pulse" />
      </div>
    </div>
  );
}

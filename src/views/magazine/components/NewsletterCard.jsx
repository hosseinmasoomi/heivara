"use client";

import { Zap } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function NewsletterCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-1 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border border-indigo-500/30">
      <div className="bg-[#020617] rounded-xl p-6 relative z-10">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 mx-auto shadow-lg shadow-indigo-600/30">
          <Zap />
        </div>

        <h3 className="text-lg font-bold text-white text-center mb-2">
          خبرنامه تخصصی هیوارا
        </h3>

        <p className="text-slate-400 text-xs text-center mb-6 leading-relaxed">
          عضویت در خبرنامه برای دریافت آخرین تحلیل‌های بازار و تکنولوژی‌های روز
          دنیا.
        </p>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="ایمیل شما..."
            className="bg-slate-800 border-slate-700 text-white text-center"
          />

          <Button
            onClick={() => alert("خبرنامه: بعداً وصل می‌کنیم")}
            className="w-full bg-white text-black hover:bg-slate-200"
          >
            عضویت رایگان
          </Button>
        </div>
      </div>
    </div>
  );
}

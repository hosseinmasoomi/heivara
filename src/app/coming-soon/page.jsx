"use client";

import { Command, Lock, Sparkles } from "lucide-react";
import logo from "../../../public/images/logo.png";
import Image from "next/image";

export default function ComingSoon() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#020617] text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-fuchsia-500/20 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,.15)_1px,transparent_0)] [background-size:22px_22px] opacity-30" />

      {/* Card */}
      <div className="relative z-10 max-w-xl w-full mx-4">
        <div className="rounded-[32px] border border-slate-800 bg-[#0b1220]/80 backdrop-blur-xl p-10 text-center shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-30">
              <Image src={logo} />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-4">
            هیوارا موقتاً در{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-fuchsia-300">
              حالت ایمن
            </span>{" "}
            قرار دارد
          </h1>

          <p className="text-slate-300 leading-relaxed mb-8">
            برای جلوگیری از نمایش خروجی ناقص و باگ‌ها، دسترسی به سیستم فعلاً
            محدود شده است.
            <br />
            ما در حال بهینه‌سازی هسته‌ی هوش مصنوعی هستیم.
          </p>

          {/* Status */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">
              <Lock size={16} />
              Safe Mode فعال است
            </span>
          </div>

          {/* Footer text */}
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} HIVARA — AI Marketing Core
          </div>
        </div>
      </div>
    </div>
  );
}

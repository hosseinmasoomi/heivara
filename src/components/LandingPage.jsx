"use client";

import { useRouter } from "next/navigation";
import Hero from "../components/Hero";
import {
  Cpu,
  Target,
  Rocket,
  ShieldCheck,
  Zap,
  BarChart,
  Users,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="bg-[#020617] w-full overflow-hidden">
      {/* SECTION 1: HERO */}
      <Hero onStart={() => router.push("/wizard")} />

      {/* SECTION 2: FEATURES GRID */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-900 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              هسته پردازش مرکزی
            </h2>
            <p className="font-light">
              هیوارا فقط یک ابزار نیست؛ یک تیم کامل از متخصصین هوش مصنوعی است که
              به صورت موازی روی پروژه شما کار می‌کنند.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "معماری محصول",
                desc: "تحلیل فنی، انتخاب تکنولوژی، و طراحی ساختار دیتابیس متناسب با اسکیل پروژه.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
              },
              {
                icon: Target,
                title: "استراتژی نفوذ",
                desc: "تدوین برنامه مارکتینگ چریکی برای جذب اولین مشتریان بدون بودجه کلان.",
                color: "text-red-400",
                bg: "bg-red-500/10",
                border: "border-red-500/20",
              },
              {
                icon: Rocket,
                title: "شتاب‌دهنده رشد",
                desc: "سناریوهای وایرال شدن در سوشال مدیا و تقویم محتوایی دقیق برای ۳۰ روز اول.",
                color: "text-green-400",
                bg: "bg-green-500/10",
                border: "border-green-500/20",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group p-8 rounded-3xl border ${item.border} bg-[#0f172a]/50 hover:bg-[#0f172a] transition-all duration-300 hover:-translate-y-2`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS */}
      <section className="py-24 bg-[#0B0F19] relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-indigo-600/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                از ایده خام تا <br />
                <span className="text-indigo-500">سند استراتژیک اجرایی</span>
              </h2>

              <p className="text-slate-400 text-lg">
                فرآیند هیوارا خطی نیست. ما همزمان تمام ابعاد کسب‌وکار شما را
                شبیه‌سازی می‌کنیم تا ریسک شکست را به صفر برسانیم.
              </p>

              <div className="space-y-6">
                {[
                  "آنالیز کلمات کلیدی و حجم بازار هدف",
                  "طراحی هویت بصری و لوگوی اختصاصی",
                  "محاسبه هزینه زیرساخت و قیمت‌گذاری",
                  "ارزیابی پتانسیل سرمایه‌گذاری توسط هیوارا",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <span className="text-slate-300">{text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push("/wizard")}
                className="mt-8 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                شروع آنالیز رایگان <ArrowLeft size={18} />
              </button>
            </div>

            {/* Visual */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-20" />
                <div className="relative bg-[#020617] border border-slate-700 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      analysis_core.py
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-sm" dir="ltr">
                    <div className="text-green-400">
                      $ connecting to market_db... [OK]
                    </div>
                    <div className="text-indigo-400">
                      $ evaluating competitor strategies...
                    </div>
                    <div className="text-slate-500 pl-4">
                      Found 12 direct competitors
                    </div>
                    <div className="text-slate-500 pl-4">
                      Analyzing weakness patterns...
                    </div>
                    <div className="text-yellow-400">
                      $ calculating success_probability: 87%
                    </div>
                    <div className="text-white animate-pulse">_</div>
                  </div>
                </div>

                <div className="absolute -bottom-10 -right-10 bg-slate-800 p-4 rounded-xl border border-slate-600 shadow-xl animate-bounce-slow">
                  <BarChart className="text-indigo-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-12">
            مورد اعتماد نسل جدید کارآفرینان
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center justify-center gap-2 text-xl font-black text-white">
              <Zap size={24} /> StartupOne
            </div>
            <div className="flex items-center justify-center gap-2 text-xl font-black text-white">
              <ShieldCheck size={24} /> SecureNet
            </div>
            <div className="flex items-center justify-center gap-2 text-xl font-black text-white">
              <Users size={24} /> CrowdGrow
            </div>
            <div className="flex items-center justify-center gap-2 text-xl font-black text-white">
              <Target size={24} /> AimPoint
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>© 2024 Hivara AI Agency. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">
                حریم خصوصی
              </a>
              <a href="#" className="hover:text-white">
                شرایط استفاده
              </a>
              <a href="#" className="hover:text-white">
                پشتیبانی
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

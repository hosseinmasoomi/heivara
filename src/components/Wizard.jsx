"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send, Terminal, Shield, Cpu, Activity } from "lucide-react";

// Step enum ساده (JSX)
const WizardStep = {
  INPUT: "INPUT",
  ANALYZING: "ANALYZING",
  ROADMAP: "ROADMAP",
  GENERATING: "GENERATING",
};

export default function Wizard({ onResults }) {
  const [idea, setIdea] = useState("");
  const [step, setStep] = useState(WizardStep.INPUT);
  const [terminalLines, setTerminalLines] = useState([]);
  const scrollRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const addLog = (text, type = "info") => {
    setTerminalLines((prev) => [...prev, `${type}|${text}`]);
  };

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setStep(WizardStep.ANALYZING);
    setTerminalLines([]);

    const logs = [
      "راه‌اندازی هسته هیوارا نسخه ۲.۴...",
      "اتصال به شبکه عصبی...",
      "تحلیل احساسات بازار برای داده ورودی...",
      "شناسایی زبان: فارسی (FA)",
      "بررسی ساختار و موجودیت‌های کسب‌وکار...",
      "محاسبه تخمینی حجم بازار...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        addLog(logs[i], "code");
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStep(WizardStep.ROADMAP), 800);
      }
    }, 400);
  };

  const handleConfirmRoadmap = async () => {
    setStep(WizardStep.GENERATING);
    setTerminalLines([]);

    const processes = [
      {
        text: "root@hivara:~# init_sequence --target=all",
        delay: 100,
        type: "warn",
      },
      { text: "> تزریق داده‌های برندینگ...", delay: 800, type: "code" },
      { text: "> کامپایل بردارهای هویت بصری...", delay: 1600, type: "code" },
      { text: "> بهینه‌سازی الگوریتم‌های رشد...", delay: 2500, type: "code" },
      { text: "> تولید قلاب‌های ویروسی...", delay: 3200, type: "code" },
      { text: "> ساخت و جمع‌بندی گزارش نهایی...", delay: 4000, type: "code" },
    ];

    processes.forEach((p) => {
      setTimeout(() => addLog(p.text, p.type), p.delay);
    });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) throw new Error("AI Error");

      const plan = await res.json();

      addLog("پردازش تکمیل شد. آماده‌سازی داشبورد...", "success");

      // ارسال خروجی به والد (UserPage)
      setTimeout(() => onResults?.(plan), 900);
    } catch (error) {
      console.error(error);
      addLog("خطای بحرانی: قطع ارتباط با سرور", "warn");
      setTimeout(() => {
        setStep(WizardStep.INPUT);
        alert("متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید.");
      }, 1200);
    }
  };

  // --- TERMINAL VIEW ---
  const TerminalView = ({ title }) => (
    <div className="w-full max-w-3xl mx-auto animate-fade-in font-mono text-sm sm:text-base">
      <div
        className="bg-[#0f172a] rounded-t-xl border border-slate-700 p-3 flex items-center justify-between"
        dir="ltr"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-slate-400 text-xs flex items-center gap-2">
          <Terminal size={12} />
          {title}
        </div>
        <div className="w-10" />
      </div>

      <div
        ref={scrollRef}
        className="bg-[#020617]/95 border-x border-b border-slate-700 rounded-b-xl p-6 h-[400px] overflow-y-auto shadow-[0_0_50px_rgba(99,102,241,0.1)] custom-scrollbar"
        dir="ltr"
      >
        {terminalLines.map((line, idx) => {
          const [type, content] = line.split("|");

          const cls =
            type === "warn"
              ? "text-yellow-400 font-bold"
              : type === "success"
              ? "text-green-400 font-bold"
              : type === "code"
              ? "text-indigo-300"
              : "text-slate-300";

          return (
            <div
              key={idx}
              className="mb-2 font-mono flex gap-2 break-all justify-end"
            >
              <span className={`${cls} text-right w-full`}>{content}</span>
              <span className="text-slate-600 select-none">{` <`}</span>
            </div>
          );
        })}

        <div className="flex items-center gap-2 text-indigo-500 animate-pulse mt-4 justify-end">
          <span className="w-2 h-4 bg-indigo-500" />
        </div>
      </div>
    </div>
  );

  // 1) ANALYZING
  if (step === WizardStep.ANALYZING) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-6"
        dir="rtl"
      >
        <TerminalView title="hivara-analyser --v2.4" />
        <p className="mt-6 text-slate-400 text-sm animate-pulse">
          در حال تحلیل اولیه...
        </p>
      </div>
    );
  }

  // 2) GENERATING
  if (step === WizardStep.GENERATING) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] px-6"
        dir="rtl"
      >
        <TerminalView title="hivara-generator --root" />
        <div className="mt-8 flex gap-4">
          <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            <Cpu size={14} className="animate-spin" /> پردازش موازی
          </div>
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            <Activity size={14} /> تزریق داده
          </div>
        </div>
      </div>
    );
  }

  // 3) ROADMAP
  if (step === WizardStep.ROADMAP) {
    return (
      <div
        className="w-full max-w-5xl mx-auto animate-fade-in pb-10 px-6 pt-10"
        dir="rtl"
      >
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                نقشه عملیات
              </h2>
              <p className="text-slate-400 text-sm">
                سیستم این مراحل را برای اجرای پروژه پیشنهاد می‌دهد
              </p>
            </div>
            <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20">
              <Shield className="text-indigo-400" size={18} />
              <span className="text-indigo-300 text-sm font-mono">
                Secure Connection
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { title: "DNA برند", subtitle: "تحلیل هسته مرکزی" },
              { title: "سیستم بصری", subtitle: "طراحی هویت" },
              { title: "زیرساخت فنی", subtitle: "معماری وب" },
              { title: "موتور رشد", subtitle: "استراتژی فروش" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#020617] border border-slate-800 p-6 rounded-xl relative group hover:border-indigo-500/50 transition-colors"
              >
                <div
                  className="text-indigo-500/20 text-4xl font-black absolute top-4 left-4 opacity-50"
                  dir="ltr"
                >
                  0{i + 1}
                </div>
                <div className="relative z-10 pt-4">
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800 group-hover:bg-indigo-500 transition-colors" />
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => setStep(WizardStep.INPUT)}
              className="px-6 py-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold"
            >
              بازنویسی دستور
            </button>
            <button
              type="button"
              onClick={handleConfirmRoadmap}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-[1.02]"
            >
              <Terminal size={18} />
              اجرای کدها
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4) INPUT
  return (
    <div className="w-full max-w-4xl mx-auto pt-10 px-6" dir="rtl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          دستور را وارد کنید
        </h1>
        <p className="text-slate-400 text-lg">
          هسته مرکزی هیوارا آماده دریافت مشخصات پروژه است.
        </p>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-1.5 shadow-2xl">
        <div className="bg-[#020617] rounded-[20px] p-8">
          <form onSubmit={handleInitialSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="مثال: من می‌خواهم یک اپلیکیشن تناسب اندام برای کارمندان پرمشغله بسازم..."
                className="relative w-full h-48 bg-[#0f172a] border border-slate-700 rounded-xl p-6 text-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none font-mono leading-relaxed"
                dir="rtl"
              />
              <div className="absolute bottom-4 left-4 font-mono text-xs text-slate-500 bg-black/50 px-2 py-1 rounded">
                {idea.length} کاراکتر
              </div>
            </div>

            <button
              type="submit"
              disabled={!idea.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-6 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 group"
            >
              <span>شروع پردازش</span>
              <Send className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-6 text-slate-500 text-xs font-mono uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          هوش مصنوعی فعال
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
          کانال امن
        </div>
      </div>
    </div>
  );
}

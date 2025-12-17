"use client";

import React, { useState } from "react";
import {
  Layout,
  Palette,
  Instagram,
  Type as TypeIcon,
  Check,
  Hash,
  Copy,
  TrendingUp,
  Sparkles,
  Download,
  ArrowRight,
  Lock,
  Megaphone,
  BarChart,
  Server,
  Code2,
  MousePointerClick,
  Lightbulb,
  Handshake,
  Wallet,
  CheckCircle,
  Calendar,
  Star,
} from "lucide-react";

export const ResultsDashboard = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] =
    (useState < "branding") |
    "visuals" |
    "web" |
    "social" |
    "growth" |
    "timeline" |
    ("ads" > "branding");

  const brandName = plan?.branding?.[0]?.name || "HIVARA";

  /* ---------------- utils ---------------- */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert("کپی انجام نشد");
    }
  };

  const downloadSvg = () => {
    const svg = plan?.visuals?.logoSvg;
    if (!svg) return alert("لوگو موجود نیست");

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${brandName}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ---------------- pricing ---------------- */
  const BASE_PRICE = 100_000_000;
  const score = plan?.evaluation?.score ?? 0;
  const investmentPercent = plan?.evaluation?.investmentPercentage ?? 0;
  const hivaraInvestment = (BASE_PRICE * investmentPercent) / 100;
  const userPayable = BASE_PRICE - hivaraInvestment;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 border-b border-white/5 pb-8">
        <div>
          <h1 className="text-3xl font-black text-white">{brandName}</h1>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            پردازش تکمیل شده
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
          >
            پروژه جدید
          </button>
          <button
            onClick={downloadSvg}
            className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-slate-200 flex items-center gap-2"
          >
            <Download size={16} /> دانلود لوگو
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {[
          { id: "branding", label: "نام و شعار", icon: TypeIcon },
          { id: "visuals", label: "هویت بصری", icon: Palette },
          { id: "web", label: "پلتفرم", icon: Layout },
          { id: "social", label: "سوشال مدیا", icon: Instagram },
          { id: "growth", label: "فروش", icon: TrendingUp },
          { id: "ads", label: "تبلیغات", icon: Megaphone, locked: true },
          {
            id: "timeline",
            label: "سرمایه‌گذاری هیوارا",
            icon: Handshake,
            special: true,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.locked) return;
              setActiveTab(tab.id);
            }}
            className={`relative flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition
              ${
                activeTab === tab.id
                  ? tab.special
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-black"
                  : "bg-slate-900 text-slate-500 hover:text-slate-300"
              }
              ${tab.locked ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {tab.locked ? <Lock size={14} /> : <tab.icon size={18} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {/* BRANDING */}
      {activeTab === "branding" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plan.branding.map((b, i) => (
            <div
              key={i}
              className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 text-center"
            >
              <h3 className="text-2xl font-black text-white mb-4">{b.name}</h3>
              <p className="italic text-slate-300 mb-4">"{b.slogan}"</p>
              <p className="text-slate-500 text-sm mb-4">{b.rationale}</p>
              <button
                onClick={() => copyToClipboard(b.name)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mx-auto"
              >
                <Copy size={12} /> کپی نام
              </button>
            </div>
          ))}
        </div>
      )}

      {/* VISUALS */}
      {activeTab === "visuals" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div
            className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: plan.visuals.logoSvg }}
          />
          <div className="space-y-6">
            <div className="flex gap-4">
              <div
                className="flex-1 rounded-2xl p-4 text-white font-mono"
                style={{ background: plan.visuals.primaryColor }}
              >
                {plan.visuals.primaryColor}
              </div>
              <div
                className="flex-1 rounded-2xl p-4 text-white font-mono"
                style={{ background: plan.visuals.secondaryColor }}
              >
                {plan.visuals.secondaryColor}
              </div>
            </div>
            <p className="text-slate-300">{plan.visuals.logoConcept}</p>
            <p className="text-slate-400 text-sm">
              {plan.visuals.moodDescription}
            </p>
          </div>
        </div>
      )}

      {/* WEB */}
      {activeTab === "web" && (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-[#0f172a] border border-indigo-500/20 rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Server /> Tech Stack
            </h3>
            {plan.website.techStack.map((t, i) => (
              <div key={i} className="text-indigo-300 font-mono mb-2">
                • {t}
              </div>
            ))}
          </div>

          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Layout /> ساختار سایت
            </h3>
            {plan.website.structure.map((s, i) => (
              <div key={i} className="text-slate-300 text-sm">
                {i + 1}. {s}
              </div>
            ))}
          </div>

          <div className="bg-[#0f172a] border border-slate-700 rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MousePointerClick /> UX
            </h3>
            {plan.website.uiUxTips.map((u, i) => (
              <p key={i} className="text-slate-300 text-sm mb-2">
                • {u}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* SOCIAL */}
      {activeTab === "social" && (
        <div className="space-y-4">
          {plan.instagram.map((p, i) => (
            <div
              key={i}
              className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {p.day}
              </div>
              <div>
                <h4 className="text-white font-bold">{p.title}</h4>
                <p className="text-slate-400 text-sm">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GROWTH */}
      {activeTab === "growth" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-3xl p-8">
            <h3 className="text-white font-black text-xl mb-4">
              {plan.growth.challengeTitle}
            </h3>
            <p className="text-slate-200">{plan.growth.challengeDescription}</p>
            <div className="mt-4 text-green-400 flex items-center gap-2">
              <Check /> {plan.growth.expectedResult}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6">
              <Sparkles className="text-yellow-400 mb-2" />
              <p className="text-slate-300">{plan.growth.viralIdea}</p>
            </div>
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 italic">
              "{plan.growth.mentorAdvice}"
            </div>
          </div>
        </div>
      )}

      {/* INVESTMENT */}
      {activeTab === "timeline" && (
        <div className="max-w-3xl mx-auto bg-[#0f172a] border border-slate-700 rounded-[40px] overflow-hidden">
          <div className="p-10 text-center border-b border-slate-800">
            <h2 className="text-3xl font-black text-white mb-2">
              ارزیابی سرمایه‌گذاری
            </h2>
            <p className="text-slate-400">
              نمره ایده: <b className="text-white">{score}</b>
            </p>
          </div>

          <div className="p-10 space-y-6">
            <div className="flex justify-between text-slate-300">
              <span>هزینه کل</span>
              <span>{BASE_PRICE.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between text-green-400">
              <span>سرمایه‌گذاری هیوارا ({investmentPercent}%)</span>
              <span>- {hivaraInvestment.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between text-white font-black text-xl">
              <span>پرداخت شما</span>
              <span>{userPayable.toLocaleString()} تومان</span>
            </div>

            <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2">
              درخواست جلسه قرارداد <ArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

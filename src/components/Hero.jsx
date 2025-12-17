"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, BarChart3, Fingerprint, Layers } from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col pt-24 overflow-hidden">
      {/* Background Tech Grid */}
      <div className="absolute inset-0 z-0 bg-grid pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center mt-8">
        {/* Text */}
        <div className="text-right space-y-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold tracking-wider uppercase"
            dir="ltr"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            System Online v3.0
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight text-white">
            معماری <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              آینده‌ی برند شما
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-loose">
            هیوارا یک سیستم هوشمند طراحی کسب‌وکار است. ما داده‌های خام ایده شما
            را به یک استراتژی فروش دقیق، هویت بصری مدرن و زیرساخت فنی تبدیل
            می‌کنیم.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => router.push("/wizard")}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-indigo-600 px-8 font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span className="relative flex items-center gap-3 text-lg font-bold">
                شروع پردازش ایده
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </span>
            </button>

            <button
              onClick={() => alert("نسخه عمومی مستندات به زودی منتشر می‌شود.")}
              className="h-14 px-8 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors"
            >
              مستندات سیستم
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/5">
            <Stat title="24/7" desc="منتورینگ فعال" />
            <Stat title="+12K" desc="داده پردازش شده" />
            <Stat title="100%" desc="دقت اجرا" />
          </div>
        </div>

        {/* Visual */}
        <div className="relative perspective-1000 hidden lg:block">
          <div className="relative z-10 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Fingerprint />
                </div>
                <div>
                  <div className="text-sm font-bold text-white" dir="ltr">
                    Brand_Identity.json
                  </div>
                  <div className="text-xs text-slate-500">در حال پردازش...</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <StatCard
                icon={<BarChart3 size={20} />}
                color="text-green-400"
                value="98.5%"
                label="پتانسیل فروش"
              />
              <StatCard
                icon={<Layers size={20} />}
                color="text-cyan-400"
                value="A+"
                label="تطابق با بازار"
              />
            </div>

            <div className="space-y-3 font-mono text-xs" dir="ltr">
              <Line
                text="Initializing Growth Protocols"
                status="OK"
                color="text-green-400"
              />
              <Line
                text="Synthesizing Logo Vectors"
                status="DONE"
                color="text-indigo-300"
              />
              <Line
                text="Deploying Website Architecture"
                status="..."
                color="text-slate-400"
              />
            </div>

            <div className="mt-6 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[70%]" />
            </div>
          </div>

          <div className="absolute -right-10 top-20 bg-slate-800/90 backdrop-blur border border-slate-600 p-4 rounded-xl shadow-xl animate-bounce-slow z-20">
            <Zap className="text-yellow-400 w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Small UI helpers ---- */

function Stat({ title, desc }) {
  return (
    <div>
      <h4 className="text-2xl font-bold text-white font-mono" dir="ltr">
        {title}
      </h4>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );
}

function StatCard({ icon, color, value, label }) {
  return (
    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
      <div className={`${color} mb-2`}>{icon}</div>
      <div className="text-2xl font-bold text-white font-mono" dir="ltr">
        {value}
      </div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function Line({ text, status, color }) {
  return (
    <div className={`flex justify-between ${color}`}>
      <span>
        {">"} {text}
      </span>
      <span>[{status}]</span>
    </div>
  );
}

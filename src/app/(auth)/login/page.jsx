"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  ArrowRight,
  Lock,
  Mail,
  Github,
  Chrome,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // TODO: Replace with real auth API (OTP or password)
    setTimeout(() => {
      setLoading(false);

      if (email === "hossein@gmail.com" && password === "123456") {
        router.push("/admin");
      } else {
        router.push("/user"); // یا /wizard اگر می‌خوای بعد لاگین مستقیم بره پردازش
      }
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 px-6">
        {/* Logo */}
        <div
          className="flex flex-col items-center mb-8 cursor-pointer group"
          onClick={() => router.push("/")}
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform mb-4">
            <Command size={26} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            HIVARA AI
          </h1>
          <p className="text-slate-500 text-sm mt-1">ورود به هسته مرکزی</p>
        </div>

        {/* Card */}
        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 mr-1">
                ایمیل سازمانی
              </label>
              <div className="relative group">
                <Mail
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 mr-1">
                  رمز عبور
                </label>
                <button
                  type="button"
                  onClick={() => alert("فراموشی رمز (بعداً OTP/Reset می‌زنیم)")}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300"
                >
                  فراموشی رمز؟
                </button>
              </div>

              <div className="relative group">
                <Lock
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#020617]/50 border border-slate-700 rounded-xl py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  ورود امن
                  <ArrowRight
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-2 text-slate-500">
                یا ادامه دهید با
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => alert("Google OAuth بعداً وصل میشه")}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-2.5 text-slate-300 transition-colors"
            >
              <Chrome size={18} /> Google
            </button>
            <button
              type="button"
              onClick={() => alert("GitHub OAuth بعداً وصل میشه")}
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-2.5 text-slate-300 transition-colors"
            >
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          حساب کاربری ندارید؟{" "}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="text-indigo-400 hover:text-indigo-300 font-bold underline decoration-indigo-500/30 underline-offset-4"
          >
            ثبت نام رایگان
          </button>
        </p>
      </div>
    </div>
  );
}

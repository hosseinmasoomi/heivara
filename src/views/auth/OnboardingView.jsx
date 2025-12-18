"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, User, Mail, AlertCircle, Sparkles } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

export default function OnboardingView() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch("/api/auth/onboarding", { method: "GET" });

        if (res.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await res.json();

        if (!mounted) return;

        if (data?.ok && data?.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");

          if (data.user.onboardingCompleted) {
            router.replace("/user");
            return;
          }
        }
      } catch (e) {
        // fail silently (UI handles)
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        const code = data?.error || "UNKNOWN";

        if (code === "EMAIL_ALREADY_USED")
          setError("این ایمیل قبلاً استفاده شده است.");
        else if (code === "INVALID_EMAIL") setError("فرمت ایمیل درست نیست.");
        else if (code === "INVALID_NAME")
          setError("نام باید حداقل ۲ کاراکتر باشد.");
        else if (res.status === 401) {
          setError("سشن منقضی شد. دوباره وارد شوید.");
          router.replace("/login");
        } else setError("خطا در ذخیره اطلاعات. دوباره تلاش کنید.");

        return;
      }

      router.replace("/user");
    } catch (e) {
      setError("مشکل اتصال. دوباره تلاش کنید.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#020617] flex items-center justify-center relative overflow-hidden"
      dir="rtl"
    >
      {/* Background (same vibe as your login) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[520px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles size={14} />
            تکمیل پروفایل
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight mt-4">
            یک قدم تا فعال‌سازی پنل
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            اطلاعات پایه را وارد کنید تا حساب شما آماده شود.
          </p>
        </div>

        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label>نام و نام خانوادگی</Label>
                <div className="relative group">
                  <User
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                    size={18}
                  />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثلاً: علی محمدی"
                    className="bg-[#020617]/50 border-slate-700 py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>ایمیل (اختیاری)</Label>
                <div className="relative group">
                  <Mail
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                    size={18}
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="bg-[#020617]/50 border-slate-700 py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={saving}
                className="w-full py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 group"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    ذخیره و ادامه
                    <ArrowRight
                      size={18}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => router.replace("/")}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                بعداً انجام می‌دم
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

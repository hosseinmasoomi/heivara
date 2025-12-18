"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Github,
  Chrome,
  AlertCircle,
  Smartphone,
  KeyRound,
  ArrowLeft,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Divider from "../../components/ui/Divider";

import Image from "next/image";
import logo from "../../../public/images/logo.png";

function normalizeIranPhone(input = "") {
  const raw = String(input).trim().replace(/\s+/g, "");
  const cleaned = raw.replace(/[^\d+]/g, "");
  let p = cleaned;

  if (p.startsWith("0098")) p = "0" + p.slice(4);
  else if (p.startsWith("+98")) p = "0" + p.slice(3);
  else if (p.startsWith("98")) p = "0" + p.slice(2);
  if (!p.startsWith("0") && p.length === 10) p = "0" + p;

  return p;
}

async function readJsonSafe(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, message: text?.slice(0, 400) || "NON_JSON_RESPONSE" };
  }
}

function isValidIranMobile(phone) {
  return /^09\d{9}$/.test(phone);
}

export default function LoginView() {
  const router = useRouter();
  const sp = useSearchParams();
  const nextPath = sp.get("next");

  const [step, setStep] = useState("phone"); // "phone" | "code"
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [resendLeft, setResendLeft] = useState(0); // seconds

  const normalizedPhone = useMemo(() => normalizeIranPhone(phone), [phone]);

  useEffect(() => {
    if (resendLeft <= 0) return;
    const t = setInterval(() => setResendLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendLeft]);

  const requestOtp = async () => {
    setError("");
    setInfo("");

    const p = normalizeIranPhone(phone);
    if (!isValidIranMobile(p)) {
      setError("شماره موبایل معتبر نیست. مثال: 09123456789");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p }),
      });
      const data = await readJsonSafe(res);

      if (!res.ok || !data?.ok) {
        setError(
          `(${res.status}) ${data?.message || data?.error || "SERVER_ERROR"}`
        );
        return;
      }
      setInfo("کد تایید ارسال شد.");
      setStep("code");
      setResendLeft(60);
    } catch (e) {
      setError("خطای شبکه. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setInfo("");

    const p = normalizeIranPhone(phone);
    if (!isValidIranMobile(p)) {
      setError("شماره موبایل معتبر نیست.");
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setError("کد باید ۶ رقمی باشد.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: p, code }),
      });
      const data = await readJsonSafe(res);

      if (!res.ok || !data?.ok) {
        setError(
          `(${res.status}) ${data?.message || data?.error || "SERVER_ERROR"}`
        );
        return;
      }

      const redirectTo = data?.redirectTo || "/user";
      const needsOnboarding = !!data?.needsOnboarding;

      // ✅ اگر onboarding لازم است، next را نادیده بگیر
      const target = needsOnboarding ? "/onboarding" : nextPath || redirectTo;

      // ✅ برای اینکه کوکی سشن تازه ست شده، قطعی‌ترین روش:
      window.location.href = target;
    } catch (e) {
      setError("خطای شبکه. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === "phone") return requestOtp();
    return verifyOtp();
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
          <div className="w-24 h-24 rounded-full p-3 bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform mb-4 overflow-hidden">
            <Image
              alt="logo"
              src={logo}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            HIVARA AI
          </h1>
          <p className="text-slate-500 text-sm mt-1">ورود با کد یکبار مصرف</p>
        </div>

        {/* Card */}
        <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === "code" && (
              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setCode("");
                  setError("");
                  setInfo("");
                }}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold"
              >
                <ArrowLeft size={16} />
                تغییر شماره
              </button>
            )}

            {/* PHONE */}
            <div className="space-y-2">
              <Label>شماره موبایل</Label>

              <div className="relative group">
                <Smartphone
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <Input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 09123456789"
                  className="bg-[#020617]/50 border-slate-700 py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
                  disabled={step === "code"}
                  required
                />
              </div>

              {phone && normalizedPhone !== phone && (
                <p className="text-[10px] text-slate-500 font-mono">
                  نرمال‌شده: {normalizedPhone}
                </p>
              )}
            </div>

            {/* CODE */}
            {step === "code" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>کد تایید ۶ رقمی</Label>

                  <Button
                    type="button"
                    variant="link"
                    onClick={requestOtp}
                    disabled={resendLeft > 0 || loading}
                    className="text-[10px]"
                  >
                    {resendLeft > 0
                      ? `ارسال مجدد (${resendLeft}s)`
                      : "ارسال مجدد"}
                  </Button>
                </div>

                <div className="relative group">
                  <KeyRound
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                    size={18}
                  />
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) =>
                      setCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))
                    }
                    placeholder="••••••"
                    className="bg-[#020617]/50 border-slate-700 py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono tracking-[0.4em] text-center"
                    required
                  />
                </div>

                <p className="text-[10px] text-slate-500">
                  کد تا <span className="font-mono">۲:۳۰</span> معتبر است.
                </p>
              </div>
            )}

            {/* ALERTS */}
            {info && (
              <div className="text-indigo-300 text-xs bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                {info}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step === "phone" ? (
                <>
                  ارسال کد
                  <ArrowRight
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </>
              ) : (
                <>
                  تایید و ورود
                  <ArrowRight
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                </>
              )}
            </Button>
          </form>

          <Divider label="یا ادامه دهید با" className="my-8" />

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="soft"
              onClick={() => alert("Google OAuth بعداً وصل میشه")}
              className="py-2.5"
            >
              <Chrome size={18} /> Google
            </Button>

            <Button
              type="button"
              variant="soft"
              onClick={() => alert("GitHub OAuth بعداً وصل میشه")}
              className="py-2.5"
            >
              <Github size={18} /> GitHub
            </Button>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          حساب کاربری ندارید؟{" "}
          <Button
            type="button"
            variant="link"
            onClick={() => router.push("/signup")}
            className="font-bold underline decoration-indigo-500/30 underline-offset-4"
          >
            ثبت نام رایگان
          </Button>
        </p>
      </div>
    </div>
  );
}

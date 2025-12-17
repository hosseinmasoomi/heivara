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

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import Divider from "../../components/ui/Divider";

import logo from "../../../public/images/logo.png";
import Image from "next/image";

// import { Button, Input, Label, Divider } from "@/components/ui";

export default function LoginView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email === "hossein@gmail.com" && password === "123456") {
        router.push("/admin");
      } else {
        router.push("/user");
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
          <div className="w-24 h-24 rounded-full p-3 bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform mb-4">
            <Image alt="logo" src={logo} />
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
              <Label>ایمیل سازمانی</Label>

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
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>رمز عبور</Label>

                <Button
                  type="button"
                  variant="link"
                  onClick={() => alert("فراموشی رمز (بعداً OTP/Reset می‌زنیم)")}
                  className="text-[10px]"
                >
                  فراموشی رمز؟
                </Button>
              </div>

              <div className="relative group">
                <Lock
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                  size={18}
                />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[#020617]/50 border-slate-700 py-3.5 pr-12 pl-4 text-white placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 group"
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

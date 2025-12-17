"use client";

import { useRouter } from "next/navigation";
import { Command, BookOpen, User } from "lucide-react";
import LandingPage from "../components/LandingPage";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617]" dir="rtl">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <Command size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                HIVARA
              </span>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                هوش مصنوعی
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button
              onClick={() => router.push("/magazine")}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <BookOpen size={16} /> مجله
            </button>
            <button className="hover:text-white transition-colors">
              راهکارها
            </button>
            <button className="hover:text-white transition-colors">
              سازمانی
            </button>
            <button className="hover:text-white transition-colors">
              تعرفه‌ها
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2"
            >
              <User size={16} />
              ورود
            </button>

            <button
              onClick={() => router.push("/wizard")}
              className="bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors"
            >
              شروع رایگان
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-20">
        <LandingPage onStart={() => router.push("/wizard")} />
      </main>
    </div>
  );
}

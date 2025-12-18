"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, User, Zap } from "lucide-react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function HomeHeader({
  onGoHome,
  onGoMagazine,
  onGoLogin,
  onGoWizard,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            onClick={onGoHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-14 h-14  rounded-full bg-[#0f172a] border border-slate-700 flex items-center justify-center shadow-lg shadow-indigo-600/10 overflow-hidden group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="HIVARA"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight">
                HIVARA
              </span>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                AI MARKETING
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              type="button"
              onClick={onGoMagazine}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <BookOpen size={16} /> مجله
            </button>

            <button
              type="button"
              className="hover:text-white transition-colors"
              onClick={() => {}}
            >
              راهکارها
            </button>

            <button
              type="button"
              className="hover:text-white transition-colors"
              onClick={() => {}}
            >
              سازمانی
            </button>

            <button
              type="button"
              className="hover:text-white transition-colors"
              onClick={() => {}}
            >
              تعرفه‌ها
            </button>
          </nav>
        </div>

        {/* Right: Search + Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onGoLogin} className="gap-2">
            <User size={16} />
            ورود
          </Button>

          <Button variant="white" size="lg" onClick={onGoWizard}>
            <Zap size={16} /> شروع رایگان
          </Button>
        </div>
      </div>
    </header>
  );
}

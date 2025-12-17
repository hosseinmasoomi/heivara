"use client";

import React from "react";
import { Search, Zap, Command } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function MagazineHeader({ onGoHome, onGoDashboard }) {
  return (
    <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            onClick={onGoHome}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <Command size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight">
                HIVARA
              </span>
              <span className="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">
                MAGAZINE
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-400">
            <span className="text-white cursor-pointer">تکنولوژی</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              کسب‌وکار
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              طراحی
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              پادکست
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-400 focus-within:border-indigo-500 transition-colors w-64">
            <Search size={16} />
            <Input
              variant="bare"
              placeholder="جستجو در مقالات..."
              className="text-slate-200 placeholder-slate-600"
            />
          </div>

          <Button variant="white" size="lg" onClick={onGoDashboard}>
            <Zap size={16} /> داشبورد
          </Button>
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function AdminTopbar({ icons }) {
  const { Search, Bell, Lock } = icons;

  return (
    <header className="h-20 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-white font-bold hidden md:block">
          داشبورد نظارت مرکزی
        </h2>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-400 font-mono">
            System Operational
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative" dir="ltr">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <Input
            variant="dark"
            placeholder="SQL Query / User Search..."
            className="rounded-lg py-2 pr-10 pl-4 w-80 font-mono"
          />
        </div>

        <Button
          variant="ghost"
          className="relative p-2 text-slate-400 hover:text-white"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-black" />
        </Button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center">
          <Lock size={16} className="text-slate-300" />
        </div>
      </div>
    </header>
  );
}

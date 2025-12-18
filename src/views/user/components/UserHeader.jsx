"use client";

import React from "react";
import { Command, Search, Bell, LogOut } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function UserHeader({
  onLogout,
  userName = "کاربر",
  planLabel = "FREE",
  loading,
}) {
  return (
    <header className="h-20 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 px-6 md:px-8 flex items-center justify-between">
      {/* Mobile Brand */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <Command size={18} />
        </div>
        <span className="font-bold text-white">HIVARA</span>
      </div>

      {/* Desktop Welcome */}
      <div className="hidden lg:flex items-center gap-4 text-slate-400 text-sm">
        <span>خوش آمدید، {loading ? "..." : userName} 👋</span>
        <span className="text-slate-500">
          طرح {loading ? "..." : planLabel} فعال است
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search - دقیقاً مثل UI خودت */}
        <div className="hidden md:block relative group">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />

          <Input
            variant="dark"
            placeholder="جستجو..."
            className="rounded-lg py-2 pr-10 pl-4 w-64"
          />
        </div>

        {/* Notification - با Button خودت */}
        <Button
          variant="ghost"
          className="relative w-10 h-10 rounded-lg border border-slate-700 px-0 py-0 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Mobile logout */}
        <Button
          variant="ghost"
          className="lg:hidden p-2 text-slate-400"
          onClick={onLogout}
        >
          <LogOut size={20} />
        </Button>
      </div>
    </header>
  );
}

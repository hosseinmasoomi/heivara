"use client";

import React from "react";
import {
  Command,
  Home,
  FolderGit2,
  Settings,
  LogOut,
  CreditCard,
  FileText,
  Bot,
} from "lucide-react";

export default function UserSidebar({
  activeMenu,
  setActiveMenu,
  onLogout,
  onNewProject,
  user,
}) {
  return (
    <aside className="w-72 bg-[#020617] border-l border-slate-800 flex flex-col fixed h-full z-20 hidden lg:flex">
      {/* Brand */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
          <Command size={18} />
        </div>
        <span className="font-bold text-white tracking-tight text-lg">
          پنل کاربری
        </span>
      </div>

      {/* Menu */}
      <div className="flex-1 py-8 px-4 space-y-2">
        <div className="text-xs font-bold text-slate-500 px-4 mb-2">
          منوی اصلی
        </div>

        <SidebarLink
          icon={Home}
          label="داشبورد"
          active={activeMenu === "dashboard"}
          onClick={() => setActiveMenu("dashboard")}
        />

        <SidebarLink
          icon={Bot}
          label="هوش مصنوعی هیوارا"
          active={activeMenu === "ai_creator"}
          onClick={onNewProject}
          highlight
        />

        <SidebarLink
          icon={FolderGit2}
          label="پروژه‌های من"
          active={activeMenu === "projects"}
          onClick={() => setActiveMenu("projects")}
        />

        <div className="w-full h-px bg-slate-800 my-4" />

        <div className="text-xs font-bold text-slate-500 px-4 mb-2">مدیریت</div>

        <SidebarLink
          icon={CreditCard}
          label="اشتراک و مالی"
          active={activeMenu === "billing"}
          onClick={() => setActiveMenu("billing")}
        />

        <SidebarLink
          icon={FileText}
          label="گزارش‌های ذخیره شده"
          active={activeMenu === "reports"}
          onClick={() => setActiveMenu("reports")}
        />

        <SidebarLink
          icon={Settings}
          label="تنظیمات"
          active={activeMenu === "settings"}
          onClick={() => setActiveMenu("settings")}
        />
      </div>

      {/* User Mini Profile */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-[#0f172a] rounded-xl p-3 flex items-center gap-3 border border-slate-700">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
            alt="User"
            className="w-10 h-10 rounded-full bg-slate-700"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate">
              {user?.name || "کاربر"}
            </div>
            <div className="text-xs text-slate-500 truncate">
              {user?.email || ""}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-slate-500 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ icon: Icon, label, active, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative group overflow-hidden ${
        active
          ? highlight
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30"
            : "bg-slate-800 text-white shadow-lg border border-slate-700"
          : highlight
          ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20"
          : "text-slate-400 hover:bg-[#0f172a] hover:text-white"
      }`}
    >
      <Icon
        size={20}
        className={active ? "" : highlight ? "text-indigo-400" : "opacity-70"}
      />
      <span className="relative z-10">{label}</span>

      {highlight && active && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      )}
    </button>
  );
}

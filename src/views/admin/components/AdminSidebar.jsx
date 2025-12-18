"use client";

import React from "react";

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  onOpenBlog,
  icons,
}) {
  const {
    ShieldAlert,
    Activity,
    Users,
    Briefcase,
    Calendar,
    BookOpen,
    DollarSign,
    Settings,
    LogOut,
  } = icons;

  return (
    <aside className="w-20 lg:w-72 bg-[#020617] border-l border-slate-800 flex flex-col fixed h-full z-20 transition-all">
      <div className="h-20 flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20">
          <ShieldAlert size={20} />
        </div>
        <div className="hidden lg:flex flex-col">
          <span className="font-bold text-white tracking-tight text-lg">
            Hivara Admin
          </span>
          <span className="text-[10px] text-red-500 font-mono font-bold tracking-widest uppercase">
            Super User
          </span>
        </div>
      </div>

      <div className="flex-1 py-8 px-3 space-y-2">
        <AdminSidebarItem
          icon={Activity}
          label="مرکز کنترل"
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />
        <AdminSidebarItem
          icon={Users}
          label="کاربران"
          active={activeTab === "users"}
          onClick={() => setActiveTab("users")}
        />
        <AdminSidebarItem
          icon={Briefcase}
          label="پروژه‌ها (ثبت شده)"
          active={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
        />
        <AdminSidebarItem
          icon={Calendar}
          label="جلسات (هماهنگی)"
          active={activeTab === "meetings"}
          onClick={() => setActiveTab("meetings")}
        />
        <AdminSidebarItem
          icon={BookOpen}
          label="مدیریت محتوا (بلاگ)"
          active={activeTab === "blog"}
          onClick={onOpenBlog}
        />
        <AdminSidebarItem
          icon={DollarSign}
          label="امور مالی"
          active={activeTab === "finance"}
          onClick={() => setActiveTab("finance")}
        />

        <div className="w-full h-px bg-slate-800 my-4" />

        <AdminSidebarItem
          icon={Settings}
          label="تنظیمات سیستم"
          active={activeTab === "logs"}
          onClick={() => setActiveTab("logs")}
        />
      </div>

      <div className="p-4 border-t border-slate-800 text-center lg:text-right">
        <button
          onClick={onLogout}
          className="flex items-center justify-center lg:justify-start gap-3 w-full p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span className="hidden lg:inline text-sm font-medium">خروج امن</span>
        </button>
      </div>
    </aside>
  );
}

function AdminSidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-slate-800 text-white border border-slate-700 shadow-lg"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
      }`}
    >
      <Icon size={18} className={active ? "text-indigo-400" : ""} />
      <span className="hidden lg:block">{label}</span>
    </button>
  );
}

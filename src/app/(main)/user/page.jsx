"use client";

import React, { useState } from "react";
import {
  Command,
  Home,
  FolderGit2,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  TrendingUp,
  CreditCard,
  Zap,
  ChevronLeft,
  Shield,
  User,
  LayoutGrid,
  FileText,
  Bot,
  Sparkles,
} from "lucide-react";

import Wizard from "../../../components/Wizard";
import { ResultsDashboard } from "../../../components/ResultsDashboard";

export default function Page() {
  return <UserPanel onLogout={() => {}} onNewProject={() => {}} />;
}

export const UserPanel = ({ onLogout }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Function to switch to AI Creator tab
  const handleNewProjectClick = () => {
    setActiveMenu("ai_creator");
    setGeneratedPlan(null); // Reset for new project
  };

  const handleWizardResults = (plan) => {
    setGeneratedPlan(plan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetWizard = () => {
    setGeneratedPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projects = [
    {
      id: 1,
      name: "فروشگاه قهوه آنلاین",
      type: "E-Commerce",
      status: "Completed",
      date: "2 ساعت پیش",
      views: 240,
    },
    {
      id: 2,
      name: "استارتاپ فین‌تک پی‌من",
      type: "SaaS",
      status: "In Progress",
      date: "1 روز پیش",
      views: 12,
    },
    {
      id: 3,
      name: "برند شخصی عکاسی",
      type: "Branding",
      status: "Draft",
      date: "3 روز پیش",
      views: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] flex" dir="rtl">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#020617] border-l border-slate-800 flex flex-col fixed h-full z-20 hidden lg:flex">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Command size={18} />
          </div>
          <span className="font-bold text-white tracking-tight text-lg">
            پنل کاربری
          </span>
        </div>

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

          {/* AI Item Highlighted */}
          <SidebarLink
            icon={Bot}
            label="هوش مصنوعی هیوارا"
            active={activeMenu === "ai_creator"}
            onClick={handleNewProjectClick}
            highlight
          />

          <SidebarLink
            icon={FolderGit2}
            label="پروژه‌های من"
            active={activeMenu === "projects"}
            onClick={() => setActiveMenu("projects")}
          />

          <div className="w-full h-px bg-slate-800 my-4"></div>

          <div className="text-xs font-bold text-slate-500 px-4 mb-2">
            مدیریت
          </div>
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
                علی محمدی
              </div>
              <div className="text-xs text-slate-500 truncate">
                ali.dev@hivara.ai
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

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="h-20 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 px-6 md:px-8 flex items-center justify-between">
          {/* Mobile Menu Button Placeholder (if needed in future) */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Command size={18} />
            </div>
            <span className="font-bold text-white">HIVARA</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-slate-400 text-sm">
            <span>خوش آمدید، علی 👋</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">طرح حرفه‌ای (Pro) فعال است</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative group">
              <input
                type="text"
                placeholder="جستجو..."
                className="bg-[#0f172a] border border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
            </div>
            <button className="relative w-10 h-10 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={onLogout} className="lg:hidden p-2 text-slate-400">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* --- DASHBOARD VIEW --- */}
          {activeMenu === "dashboard" && (
            <div className="max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="پروژه‌های فعال"
                  value="12"
                  change="+2 در این هفته"
                  icon={LayoutGrid}
                  trend="up"
                />
                <StatCard
                  title="اعتبار باقی‌مانده"
                  value="2,450"
                  unit="توکن"
                  change="شارژ خودکار: فعال"
                  icon={Zap}
                  trend="neutral"
                  highlight
                />
                <StatCard
                  title="میانگین نمره ایده"
                  value="84"
                  unit="/ 100"
                  change="+5% رشد کیفیت"
                  icon={TrendingUp}
                  trend="up"
                />
              </div>

              {/* Action Banner */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-3xl border border-indigo-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    ایده جدیدی در سر دارید؟
                  </h2>
                  <p className="text-indigo-200 text-sm max-w-xl leading-relaxed">
                    هسته پردازش هیوارا آماده تحلیل استراتژی بعدی شماست. همین
                    حالا پروژه جدیدی ایجاد کنید و در کمتر از ۲ دقیقه نقشه راه
                    بگیرید.
                  </p>
                </div>
                <button
                  onClick={handleNewProjectClick}
                  className="relative z-10 bg-white text-black hover:bg-indigo-50 px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
                >
                  <Sparkles size={20} />
                  شروع هوش مصنوعی
                </button>
              </div>

              {/* Recent Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    آخرین پروژه‌ها
                  </h3>
                  <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    مشاهده همه <ChevronLeft size={16} />
                  </button>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-right">
                    <thead className="bg-[#1e293b]/50 border-b border-slate-800 text-xs text-slate-400 uppercase font-bold">
                      <tr>
                        <th className="px-6 py-4">نام پروژه</th>
                        <th className="px-6 py-4">دسته‌بندی</th>
                        <th className="px-6 py-4">وضعیت</th>
                        <th className="px-6 py-4">آخرین ویرایش</th>
                        <th className="px-6 py-4">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {projects.map((project) => (
                        <tr
                          key={project.id}
                          className="hover:bg-slate-800/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                                {project.name.charAt(0)}
                              </div>
                              <span className="text-white font-medium">
                                {project.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-sm">
                            {project.type}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={project.status} />
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm font-mono">
                            {project.date}
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-slate-500 hover:text-white transition-colors">
                              <MoreHorizontal size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* --- AI CREATOR VIEW (WIZARD) --- */}
          {activeMenu === "ai_creator" && (
            <div className="animate-fade-in w-full">
              {!generatedPlan ? (
                <div className="max-w-5xl mx-auto">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        دستیار هوشمند هیوارا
                      </h2>
                      <p className="text-slate-400 text-sm">
                        از ایده تا اجرای کامل در چند دقیقه
                      </p>
                    </div>
                  </div>
                  <Wizard onResults={handleWizardResults} />
                </div>
              ) : (
                <ResultsDashboard
                  plan={generatedPlan}
                  onReset={handleResetWizard}
                />
              )}
            </div>
          )}

          {/* --- OTHER PLACEHOLDERS --- */}
          {["projects", "billing", "reports", "settings"].includes(
            activeMenu
          ) && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500 animate-fade-in">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Settings size={32} className="opacity-50" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                این بخش در حال توسعه است
              </h3>
              <p>به زودی قابلیت‌های جدیدی به پنل اضافه خواهد شد.</p>
              <button
                onClick={() => setActiveMenu("dashboard")}
                className="mt-6 px-6 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 text-white transition-colors"
              >
                بازگشت به داشبورد
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const SidebarLink = ({ icon: Icon, label, active, onClick, highlight }) => (
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
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    )}
  </button>
);

const StatCard = ({
  title,
  value,
  unit,
  change,
  icon: Icon,
  trend,
  highlight,
}) => (
  <div
    className={`p-6 rounded-2xl border ${
      highlight
        ? "bg-indigo-600 border-indigo-500 text-white"
        : "bg-[#0f172a] border-slate-800"
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-2 rounded-lg ${
          highlight ? "bg-white/20" : "bg-slate-800 text-slate-400"
        }`}
      >
        <Icon size={20} />
      </div>
      {trend === "up" && (
        <span
          className={`text-xs font-bold ${
            highlight ? "text-indigo-200" : "text-green-400"
          } flex items-center gap-1`}
        >
          <TrendingUp size={14} /> +12%
        </span>
      )}
    </div>
    <div className="text-3xl font-black font-mono mb-1">
      {value}{" "}
      <span className="text-sm font-sans font-normal opacity-60">{unit}</span>
    </div>
    <div
      className={`text-xs ${highlight ? "text-indigo-100" : "text-slate-500"}`}
    >
      {title}
    </div>
    <div
      className={`text-xs mt-2 ${highlight ? "opacity-80" : "text-slate-600"}`}
    >
      {change}
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";
  let label = "";

  switch (status) {
    case "Completed":
      styles = "bg-green-500/10 text-green-400 border-green-500/20";
      label = "تکمیل شده";
      break;
    case "In Progress":
      styles = "bg-blue-500/10 text-blue-400 border-blue-500/20";
      label = "در حال اجرا";
      break;
    default:
      styles = "bg-slate-500/10 text-slate-400 border-slate-500/20";
      label = "پیش‌نویس";
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles}`}
    >
      {label}
    </span>
  );
};

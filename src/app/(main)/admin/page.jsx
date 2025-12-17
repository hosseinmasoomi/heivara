"use client";

import React, { useState } from "react";
import {
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ShieldAlert,
  Activity,
  DollarSign,
  Terminal,
  Lock,
  Calendar,
  Briefcase,
  Clock,
  BookOpen,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function AdminPage() {
  return <AdminPanel onLogout={() => {}} />;
}

export const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Blog State
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "پایان دوران تبلیغات سنتی؛ ظهور بازاریابی الگوریتمی",
      category: "استراتژی",
      author: "دکتر آرش پارسا",
      status: "Published",
      views: 2450,
      date: "1402/08/10",
      content: "متن کامل مقاله...",
    },
    {
      id: 2,
      title: "معماری میکروسرویس‌ها در اسکیل‌آپ‌های ایرانی",
      category: "تکنولوژی",
      author: "سارا راد",
      status: "Published",
      views: 1800,
      date: "1402/08/05",
      content: "متن کامل مقاله...",
    },
    {
      id: 3,
      title: "راهنمای جامع سئو در سال ۲۰۲۵",
      category: "رشد",
      author: "تیم محتوا",
      status: "Draft",
      views: 0,
      date: "1402/08/12",
      content: "پیش‌نویس...",
    },
  ]);

  // --- MOCK DATA ---
  const usersData = [
    {
      id: 101,
      name: "علی محمدی",
      email: "ali.dev@hivara.ai",
      role: "User",
      plan: "PRO",
      status: "Active",
      joined: "1402/08/01",
    },
    {
      id: 102,
      name: "سارا راد",
      email: "sarah.design@gmail.com",
      role: "User",
      plan: "FREE",
      status: "Active",
      joined: "1402/08/05",
    },
    {
      id: 103,
      name: "امید علیزاده",
      email: "omid.biz@yahoo.com",
      role: "User",
      plan: "ENTERPRISE",
      status: "Pending",
      joined: "1402/08/10",
    },
    {
      id: 104,
      name: "حسین ادمین",
      email: "hossein@gmail.com",
      role: "Super Admin",
      plan: "GOD MODE",
      status: "Active",
      joined: "1400/01/01",
    },
  ];

  const projectsData = [
    {
      id: "P-101",
      name: "فروشگاه قهوه آنلاین",
      owner: "علی محمدی",
      type: "E-Commerce",
      aiScore: 84,
      status: "Completed",
      created: "2 ساعت پیش",
    },
    {
      id: "P-102",
      name: "اپلیکیشن مدیریت مالی",
      owner: "سارا راد",
      type: "Fintech",
      aiScore: 92,
      status: "In Progress",
      created: "1 روز پیش",
    },
    {
      id: "P-103",
      name: "پلتفرم اجاره ویلا",
      owner: "امید علیزاده",
      type: "Marketplace",
      aiScore: 65,
      status: "Draft",
      created: "3 روز پیش",
    },
  ];

  const meetingsData = [
    {
      id: "M-501",
      user: "علی محمدی",
      expert: "دکتر آرش پارسا",
      expertRole: "استراتژیست ارشد",
      time: "فردا، ۱۶:۰۰",
      topic: "عقد قرارداد نهایی",
      status: "Confirmed",
    },
    {
      id: "M-502",
      user: "سارا راد",
      expert: "مهندس سارا راد",
      expertRole: "مدیر فنی",
      time: "امروز، ۱۸:۳۰",
      topic: "بررسی معماری فنی",
      status: "Pending",
    },
    {
      id: "M-503",
      user: "امید علیزاده",
      expert: "مینا تهرانی",
      expertRole: "مدیر برند",
      time: "پس‌فردا، ۱۰:۰۰",
      topic: "مشاوره هویت بصری",
      status: "Confirmed",
    },
  ];

  const financeData = [
    {
      id: "TX-998",
      user: "علی محمدی",
      amount: "۴,۵۰۰,۰۰۰ تومان",
      plan: "اشتراک Pro یک ساله",
      date: "1402/08/12",
      status: "Success",
    },
    {
      id: "TX-999",
      user: "امید علیزاده",
      amount: "۱۵,۰۰۰,۰۰۰ تومان",
      plan: "پکیج مشاوره VIP",
      date: "1402/08/11",
      status: "Processing",
    },
  ];

  const serverLogs = [
    {
      time: "10:42:01",
      level: "INFO",
      msg: "New meeting booked: user_id=101 with expert_id=1",
    },
    {
      time: "10:41:55",
      level: "WARN",
      msg: "AI Model latency > 2000ms on generateMarketingPlan",
    },
    {
      time: "10:40:12",
      level: "INFO",
      msg: "Payment verification success: TX-998",
    },
    {
      time: "10:38:05",
      level: "ERROR",
      msg: "SMTP Connection timeout (Email Service)",
    },
  ];

  // --- BLOG HANDLERS ---
  const handleNewPost = () => {
    setCurrentPost({
      id: Date.now(),
      title: "",
      category: "",
      author: "Admin",
      status: "Draft",
      views: 0,
      date: new Date().toLocaleDateString("fa-IR"),
      content: "",
    });
    setIsEditingBlog(true);
  };

  const handleEditPost = (post) => {
    setCurrentPost({ ...post });
    setIsEditingBlog(true);
  };

  const handleDeletePost = (id) => {
    if (confirm("آیا از حذف این مقاله مطمئن هستید؟")) {
      setBlogPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSavePost = (e) => {
    e.preventDefault();
    if (!currentPost) return;

    setBlogPosts((prev) => {
      const exists = prev.find((p) => p.id === currentPost.id);
      if (exists)
        return prev.map((p) => (p.id === currentPost.id ? currentPost : p));
      return [currentPost, ...prev];
    });

    setIsEditingBlog(false);
    setCurrentPost(null);
  };

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8 animate-fade-in">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminStatCard
                title="درآمد کل ماه"
                value="۱۲۴,۵۰۰,۰۰۰"
                unit="تومان"
                change="+12%"
                icon={DollarSign}
                color="text-green-400"
              />
              <AdminStatCard
                title="کاربران جدید"
                value="۱۴۵"
                unit="نفر"
                change="+5%"
                icon={Users}
                color="text-blue-400"
              />
              <AdminStatCard
                title="پروژه‌های هوش مصنوعی"
                value="۸۹"
                unit="طرح"
                change="+22%"
                icon={Briefcase}
                color="text-purple-400"
              />
              <AdminStatCard
                title="جلسات رزرو شده"
                value="۱۲"
                unit="جلسه"
                change="نیاز به تایید"
                icon={Calendar}
                color="text-yellow-400"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Projects Table (Mini) */}
              <div className="lg:col-span-2 bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Briefcase size={18} className="text-indigo-400" /> آخرین
                    پروژه‌های ثبت شده
                  </h3>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    مدیریت همه
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-900/50 text-slate-400 font-medium text-xs uppercase">
                      <tr>
                        <th className="px-6 py-4">نام پروژه</th>
                        <th className="px-6 py-4">مالک</th>
                        <th className="px-6 py-4">نمره AI</th>
                        <th className="px-6 py-4">وضعیت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {projectsData.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-slate-800/50 transition-colors"
                        >
                          <td className="px-6 py-4 font-bold text-white">
                            {p.name}
                          </td>
                          <td className="px-6 py-4 text-slate-400">
                            {p.owner}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`font-mono font-bold ${
                                p.aiScore > 80
                                  ? "text-green-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {p.aiScore}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={p.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Live Logs */}
              <div className="bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
                <div className="p-6 border-b border-slate-800 bg-slate-900/30">
                  <h3 className="font-bold text-white flex items-center gap-2 text-sm font-mono">
                    <Terminal size={16} className="text-green-500" />{" "}
                    System_Live_Logs
                  </h3>
                </div>
                <div
                  className="p-4 space-y-3 font-mono text-xs overflow-y-auto max-h-[400px] flex-1"
                  dir="ltr"
                >
                  {serverLogs.map((log, i) => (
                    <div
                      key={i}
                      className="flex gap-3 border-l-2 border-slate-800 pl-2 hover:border-indigo-500 transition-colors"
                    >
                      <span className="text-slate-600 shrink-0">
                        [{log.time}]
                      </span>
                      <span
                        className={`font-bold shrink-0 w-12 ${
                          log.level === "INFO"
                            ? "text-blue-400"
                            : log.level === "WARN"
                            ? "text-yellow-400"
                            : "text-red-500"
                        }`}
                      >
                        {log.level}
                      </span>
                      <span className="text-slate-300 break-all">
                        {log.msg}
                      </span>
                    </div>
                  ))}
                  <div className="flex gap-2 animate-pulse mt-4">
                    <span className="text-green-500">{">"}</span>
                    <span className="w-2 h-4 bg-green-500 block"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "meetings":
        return (
          <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <Calendar className="text-yellow-400" /> مدیریت جلسات و مشاوره
              </h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs border border-green-500/20 flex items-center gap-1">
                  <CheckCircle size={12} /> ۲ تایید شده
                </span>
                <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg text-xs border border-yellow-500/20 flex items-center gap-1">
                  <Clock size={12} /> ۱ در انتظار
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">کاربر درخواست دهنده</th>
                    <th className="px-6 py-4">متخصص (تیم هیوارا)</th>
                    <th className="px-6 py-4">موضوع جلسه</th>
                    <th className="px-6 py-4">زمان</th>
                    <th className="px-6 py-4">وضعیت</th>
                    <th className="px-6 py-4">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {meetingsData.map((m) => (
                    <tr
                      key={m.id}
                      className="hover:bg-slate-800/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                            {m.user.charAt(0)}
                          </div>
                          <span className="font-bold text-white">{m.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-white font-medium">
                            {m.expert}
                          </span>
                          <span className="text-xs text-indigo-400">
                            {m.expertRole}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{m.topic}</td>
                      <td className="px-6 py-4 font-mono text-white bg-slate-800/30 rounded-lg w-fit px-2">
                        {m.time}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold border ${
                            m.status === "Confirmed"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}
                        >
                          {m.status === "Confirmed" ? "تایید شده" : "در انتظار"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-slate-500 hover:text-white transition-colors bg-slate-800 p-2 rounded-lg hover:bg-indigo-600">
                          <Settings size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <Users className="text-blue-400" /> پایگاه داده کاربران
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی کاربر..."
                  className="bg-slate-900 border border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
                />
                <Search
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={16}
                />
              </div>
            </div>

            <table className="w-full text-right text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">نام و ایمیل</th>
                  <th className="px-6 py-4">نقش</th>
                  <th className="px-6 py-4">پلن فعال</th>
                  <th className="px-6 py-4">تاریخ عضویت</th>
                  <th className="px-6 py-4">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {usersData.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{u.name}</div>
                      <div className="text-xs text-slate-500 font-mono">
                        {u.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {u.role === "Super Admin" ? (
                        <span className="text-red-400 font-bold border border-red-500/20 bg-red-500/10 px-2 py-0.5 rounded text-xs">
                          Admin
                        </span>
                      ) : (
                        <span className="text-slate-400">User</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded text-xs border border-indigo-500/20">
                        {u.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{u.joined}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`flex items-center gap-1 text-xs ${
                          u.status === "Active"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {u.status === "Active" ? (
                          <CheckCircle size={12} />
                        ) : (
                          <AlertTriangle size={12} />
                        )}
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "projects":
        return (
          <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/30">
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <Briefcase className="text-purple-400" /> مدیریت پروژه‌های هوش
                مصنوعی
              </h3>
            </div>

            <table className="w-full text-right text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">شناسه</th>
                  <th className="px-6 py-4">عنوان پروژه</th>
                  <th className="px-6 py-4">صاحب اثر</th>
                  <th className="px-6 py-4">دسته‌بندی</th>
                  <th className="px-6 py-4">نمره AI</th>
                  <th className="px-6 py-4">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {projectsData.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                      {p.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{p.name}</td>
                    <td className="px-6 py-4">{p.owner}</td>
                    <td className="px-6 py-4 text-xs">
                      <span className="bg-slate-700 px-2 py-1 rounded text-slate-300">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-700 h-1.5 rounded-full w-12 overflow-hidden">
                          <div
                            className="bg-green-500 h-full"
                            style={{ width: `${p.aiScore}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-xs">{p.aiScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "finance":
        return (
          <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between">
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <DollarSign className="text-green-400" /> تراکنش‌های مالی
              </h3>
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                خروجی اکسل
              </button>
            </div>

            <table className="w-full text-right text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">شناسه پرداخت</th>
                  <th className="px-6 py-4">کاربر</th>
                  <th className="px-6 py-4">مبلغ</th>
                  <th className="px-6 py-4">بابت</th>
                  <th className="px-6 py-4">تاریخ</th>
                  <th className="px-6 py-4">وضعیت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {financeData.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                      {f.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">{f.user}</td>
                    <td className="px-6 py-4 font-mono text-green-400">
                      {f.amount}
                    </td>
                    <td className="px-6 py-4 text-xs">{f.plan}</td>
                    <td className="px-6 py-4 font-mono text-xs">{f.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold border ${
                          f.status === "Success"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {f.status === "Success" ? "موفق" : "در حال پردازش"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "blog":
        if (isEditingBlog && currentPost) {
          return (
            <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
                <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                  <Edit className="text-indigo-400" />
                  {currentPost.id ? "ویرایش مقاله" : "نوشتن مقاله جدید"}
                </h3>
                <button
                  onClick={() => {
                    setIsEditingBlog(false);
                    setCurrentPost(null);
                  }}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-10">
                <form
                  onSubmit={handleSavePost}
                  className="space-y-6 max-w-4xl mx-auto"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">
                        عنوان مقاله
                      </label>
                      <input
                        type="text"
                        value={currentPost.title}
                        onChange={(e) =>
                          setCurrentPost((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none"
                        placeholder="عنوان جذاب..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">
                        دسته‌بندی
                      </label>
                      <select
                        value={currentPost.category}
                        onChange={(e) =>
                          setCurrentPost((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="">انتخاب کنید...</option>
                        <option value="استراتژی">استراتژی</option>
                        <option value="تکنولوژی">تکنولوژی</option>
                        <option value="برندینگ">برندینگ</option>
                        <option value="رشد">رشد (Growth)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">
                        نویسنده
                      </label>
                      <input
                        type="text"
                        value={currentPost.author}
                        onChange={(e) =>
                          setCurrentPost((prev) => ({
                            ...prev,
                            author: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">
                        وضعیت انتشار
                      </label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPost((prev) => ({
                              ...prev,
                              status: "Published",
                            }))
                          }
                          className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                            currentPost.status === "Published"
                              ? "bg-green-500/20 border-green-500 text-green-400"
                              : "bg-slate-900 border-slate-700 text-slate-500"
                          }`}
                        >
                          منتشر شود
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentPost((prev) => ({
                              ...prev,
                              status: "Draft",
                            }))
                          }
                          className={`flex-1 py-3 rounded-xl border font-bold text-sm transition-all ${
                            currentPost.status === "Draft"
                              ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                              : "bg-slate-900 border-slate-700 text-slate-500"
                          }`}
                        >
                          پیش‌نویس
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">
                      محتوای مقاله
                    </label>
                    <textarea
                      value={currentPost.content}
                      onChange={(e) =>
                        setCurrentPost((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      className="w-full h-96 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-indigo-500 focus:outline-none font-mono leading-relaxed"
                      placeholder="متن خود را اینجا بنویسید..."
                    />
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingBlog(false);
                        setCurrentPost(null);
                      }}
                      className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                      انصراف
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20"
                    >
                      <Save size={18} />
                      ذخیره تغییرات
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
        }

        return (
          <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2 text-lg">
                <BookOpen className="text-pink-400" /> مدیریت محتوا و بلاگ
              </h3>
              <button
                onClick={handleNewPost}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
              >
                <Plus size={16} /> مقاله جدید
              </button>
            </div>

            <table className="w-full text-right text-sm">
              <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">عنوان مقاله</th>
                  <th className="px-6 py-4">دسته‌بندی</th>
                  <th className="px-6 py-4">نویسنده</th>
                  <th className="px-6 py-4">وضعیت</th>
                  <th className="px-6 py-4">بازدید</th>
                  <th className="px-6 py-4">تاریخ</th>
                  <th className="px-6 py-4">عملیات</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800 text-slate-300">
                {blogPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-800/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-white max-w-xs truncate">
                      {post.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-400">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">{post.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold border ${
                          post.status === "Published"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        }`}
                      >
                        {post.status === "Published" ? "منتشر شده" : "پیش‌نویس"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">{post.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors"
                          title="ویرایش"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 bg-slate-800 rounded-lg hover:bg-red-600 hover:text-white text-slate-400 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {blogPosts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-12 text-slate-500"
                    >
                      هیچ مقاله‌ای یافت نشد.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );

      default:
        return <div className="text-white">Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans" dir="rtl">
      {/* ADMIN SIDEBAR */}
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
            onClick={() => {
              setActiveTab("blog");
              setIsEditingBlog(false);
              setCurrentPost(null);
            }}
          />
          <AdminSidebarItem
            icon={DollarSign}
            label="امور مالی"
            active={activeTab === "finance"}
            onClick={() => setActiveTab("finance")}
          />
          <div className="w-full h-px bg-slate-800 my-4"></div>
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
            <span className="hidden lg:inline text-sm font-medium">
              خروج امن
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col bg-[#0B0F19]">
        {/* TOP BAR */}
        <header className="h-20 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-bold hidden md:block">
              داشبورد نظارت مرکزی
            </h2>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-green-400 font-mono">
                System Operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="SQL Query / User Search..."
                className="bg-slate-900 border border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-indigo-500 w-80 font-mono"
                dir="ltr"
              />
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center">
              <Lock size={16} className="text-slate-300" />
            </div>
          </div>
        </header>

        <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- SUB COMPONENTS ---
const AdminSidebarItem = ({ icon: Icon, label, active, onClick }) => (
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

const AdminStatCard = ({ title, value, unit, change, icon: Icon, color }) => (
  <div className="bg-[#020617] border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors shadow-lg group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-2.5 rounded-lg bg-slate-900 ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon size={22} />
      </div>
      <span className="text-xs font-mono bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-800">
        {change}
      </span>
    </div>
    <div className="text-3xl font-black text-white font-mono tracking-tight mb-1">
      {value}{" "}
      <span className="text-sm font-sans font-normal opacity-50 text-slate-400">
        {unit}
      </span>
    </div>
    <div className="text-xs text-slate-500">{title}</div>
  </div>
);

const StatusBadge = ({ status }) => {
  let styles = "";

  switch (status) {
    case "Completed":
    case "Success":
    case "Active":
      styles = "bg-green-500/10 text-green-400 border-green-500/20";
      break;
    case "In Progress":
    case "Processing":
      styles = "bg-blue-500/10 text-blue-400 border-blue-500/20";
      break;
    case "Draft":
    case "Pending":
      styles = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      break;
    default:
      styles = "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles}`}
    >
      {status}
    </span>
  );
};

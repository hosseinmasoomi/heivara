"use client";

import React, { useMemo, useState } from "react";
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

import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";
import AdminContent from "./components/AdminContent";
import { useUser } from "@/context/UserContext";

export default function AdminView() {
  const [activeTab, setActiveTab] = useState("overview");
  const { logout } = useUser();
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
  const usersData = useMemo(
    () => [
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
    ],
    []
  );

  const projectsData = useMemo(
    () => [
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
    ],
    []
  );

  const meetingsData = useMemo(
    () => [
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
    ],
    []
  );

  const financeData = useMemo(
    () => [
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
    ],
    []
  );

  const serverLogs = useMemo(
    () => [
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
    ],
    []
  );

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

  const onLogout = () => logout();

  const icons = {
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
  };

  return (
    <div className="min-h-screen bg-[#020617] flex " dir="rtl">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // وقتی وارد blog می‌شی، حالت ادیت رو کنترل می‌کنیم
          if (tab !== "blog") return;
        }}
        onLogout={onLogout}
        onOpenBlog={() => {
          setActiveTab("blog");
          setIsEditingBlog(false);
          setCurrentPost(null);
        }}
        icons={icons}
      />

      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col bg-[#0B0F19]">
        <AdminTopbar icons={icons} />

        <div className="p-6 md:p-10 space-y-8 overflow-y-auto">
          <AdminContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            // data
            usersData={usersData}
            projectsData={projectsData}
            meetingsData={meetingsData}
            financeData={financeData}
            serverLogs={serverLogs}
            // blog
            isEditingBlog={isEditingBlog}
            setIsEditingBlog={setIsEditingBlog}
            currentPost={currentPost}
            setCurrentPost={setCurrentPost}
            blogPosts={blogPosts}
            // handlers
            handleNewPost={handleNewPost}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
            handleSavePost={handleSavePost}
            icons={icons}
          />
        </div>
      </main>
    </div>
  );
}

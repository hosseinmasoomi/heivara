"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

import AdminSidebar from "@/views/admin/components/AdminSidebar";
import AdminTopbar from "@/views/admin/components/AdminTopbar";

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

function pathToTab(pathname) {
  if (pathname === "/admin") return "overview";
  if (pathname.startsWith("/admin/users")) return "users";
  if (pathname.startsWith("/admin/projects")) return "projects";
  if (pathname.startsWith("/admin/meetings")) return "meetings";
  if (pathname.startsWith("/admin/finance")) return "finance";
  if (pathname.startsWith("/admin/blog")) return "blog";
  return "overview";
}

function tabToPath(tab) {
  switch (tab) {
    case "overview":
      return "/admin";
    case "users":
      return "/admin/users";
    case "projects":
      return "/admin/projects";
    case "meetings":
      return "/admin/meetings";
    case "finance":
      return "/admin/finance";
    case "blog":
      return "/admin/blog";
    default:
      return "/admin";
  }
}

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUser();

  const activeTab = pathToTab(pathname);

  return (
    <div className="min-h-screen bg-[#020617] flex" dir="rtl">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => router.push(tabToPath(tab))}
        onLogout={logout}
        onOpenBlog={() => router.push("/admin/blog")}
        icons={icons}
      />

      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col bg-[#0B0F19]">
        <AdminTopbar icons={icons} />
        <div className="p-6 md:p-10 space-y-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}

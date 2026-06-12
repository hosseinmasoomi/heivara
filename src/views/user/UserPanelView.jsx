"use client";

import React, { useEffect, useMemo, useState } from "react";
import UserSidebar from "./components/UserSidebar";
import UserHeader from "./components/UserHeader";
import UserContent from "./components/UserContent";
import { useUser } from "@/context/UserContext";

export default function UserPanelView() {
  const { loading, logout, user } = useUser();

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/projects", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json().catch(() => null);
        if (!alive) return;
        if (res.ok && data?.ok) setProjects(data.projects || []);
      } catch {
        // no-op
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const handleNewProjectClick = () => {
    setActiveMenu("ai_creator");
    setGeneratedPlan(null);
  };

  const handleWizardResults = async (plan, meta = {}) => {
    setGeneratedPlan(plan);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fallbackProject = {
      id: `local-${Date.now()}`,
      idea: meta?.idea || "ایده بدون عنوان",
      title: plan?.branding?.[0]?.name || "پروژه جدید",
      aiScore: Number(plan?.evaluation?.score || 0),
      status: "Completed",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          idea: meta?.idea || "ایده بدون عنوان",
          plan,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok && data.project) {
        setProjects((prev) => [data.project, ...prev]);
      } else {
        setProjects((prev) => [fallbackProject, ...prev]);
      }
    } catch {
      setProjects((prev) => [fallbackProject, ...prev]);
    }
  };

  const handleResetWizard = () => {
    setGeneratedPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mappedProjects = useMemo(() => {
    return projects.map((p) => ({
      id: p.id,
      name: p.title,
      type: "AI Plan",
      status: p.status,
      aiScore: p.aiScore,
      idea: p.idea,
      date: new Date(p.createdAt).toLocaleString("fa-IR"),
    }));
  }, [projects]);

  const viewUser = user
    ? {
        name: user.name || "کاربر",
        email: user.email || "",
      }
    : { name: "کاربر", email: "" };

  const planLabel = user?.subscription?.isActive
    ? user.subscription.plan
    : "FREE";

  return (
    <div className="min-h-screen bg-[#020617] flex" dir="rtl">
      <UserSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={logout}
        onNewProject={handleNewProjectClick}
        user={viewUser}
      />

      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col">
        <UserHeader
          onLogout={logout}
          userName={viewUser.name}
          planLabel={planLabel}
          loading={loading}
        />

        <UserContent
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          generatedPlan={generatedPlan}
          onNewProject={handleNewProjectClick}
          onWizardResults={handleWizardResults}
          onResetWizard={handleResetWizard}
          projects={mappedProjects}
          loading={loading}
        />
      </main>
    </div>
  );
}

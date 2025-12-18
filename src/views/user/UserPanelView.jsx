"use client";

import React, { useMemo, useState } from "react";
import UserSidebar from "./components/UserSidebar";
import UserHeader from "./components/UserHeader";
import UserContent from "./components/UserContent";
import { useUser } from "@/context/UserContext";

export default function UserPanelView() {
  const { loading, logout, user } = useUser();

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleNewProjectClick = () => {
    setActiveMenu("ai_creator");
    setGeneratedPlan(null);
  };

  const handleWizardResults = (plan) => {
    setGeneratedPlan(plan);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetWizard = () => {
    setGeneratedPlan(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projects = useMemo(() => {
    if (!user?.projects) return [];
    return user.projects.map((p) => ({
      ...p,
      date: new Date(p.createdAt).toLocaleString("fa-IR"),
    }));
  }, [user]);

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
          projects={projects}
          loading={loading}
        />
      </main>
    </div>
  );
}

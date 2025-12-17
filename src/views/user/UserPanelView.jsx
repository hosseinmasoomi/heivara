"use client";

import React, { useState } from "react";

import UserSidebar from "./components/UserSidebar";
import UserHeader from "./components/UserHeader";
import UserContent from "./components/UserContent";

export default function UserPanelView() {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleLogout = () => {
    // TODO: logout واقعی
  };

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
      <UserSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onLogout={handleLogout}
        onNewProject={handleNewProjectClick}
      />

      <main className="flex-1 lg:mr-72 min-h-screen flex flex-col">
        <UserHeader onLogout={handleLogout} />

        <UserContent
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          generatedPlan={generatedPlan}
          onNewProject={handleNewProjectClick}
          onWizardResults={handleWizardResults}
          onResetWizard={handleResetWizard}
          projects={projects}
        />
      </main>
    </div>
  );
}

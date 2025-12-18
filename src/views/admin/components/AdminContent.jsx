"use client";

import React from "react";

import OverviewSection from "../sections/OverviewSection";
import MeetingsSection from "../sections/MeetingsSection";
import UsersSection from "../sections/UsersSection";
import ProjectsSection from "../sections/ProjectsSection";
import FinanceSection from "../sections/FinanceSection";
import BlogSection from "../sections/BlogSection";

export default function AdminContent(props) {
  const { activeTab } = props;

  switch (activeTab) {
    case "overview":
      return <OverviewSection {...props} />;

    case "meetings":
      return <MeetingsSection {...props} />;

    case "users":
      return <UsersSection {...props} />;

    case "projects":
      return <ProjectsSection {...props} />;

    case "finance":
      return <FinanceSection {...props} />;

    case "blog":
      return <BlogSection {...props} />;

    default:
      return <div className="text-white">Select a tab</div>;
  }
}

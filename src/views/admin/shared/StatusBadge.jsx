"use client";

import React from "react";

export default function StatusBadge({ status }) {
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
}

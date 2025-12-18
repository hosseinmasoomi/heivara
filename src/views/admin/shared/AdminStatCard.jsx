"use client";

import React from "react";

export default function AdminStatCard({
  title,
  value,
  unit,
  change,
  icon: Icon,
  color,
}) {
  return (
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
}

"use client";

import React from "react";
import StatusBadge from "../shared/StatusBadge";

export default function ProjectsSection({ projectsData, icons }) {
  const { Briefcase } = icons;

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <Briefcase className="text-purple-400" /> مدیریت پروژه‌های هوش مصنوعی
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
            <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
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
                    />
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
}

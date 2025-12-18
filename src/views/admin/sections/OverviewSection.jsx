"use client";

import React from "react";
import Button from "../../../components/ui/Button";

import AdminStatCard from "../shared/AdminStatCard";
import StatusBadge from "../shared/StatusBadge";
import { DollarSign, Users, Briefcase, Calendar, Terminal } from "lucide-react";

export default function OverviewSection({
  setActiveTab,
  projectsData,
  serverLogs,
  icons,
}) {
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
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-400" /> آخرین
              پروژه‌های ثبت شده
            </h3>
            <Button
              variant="ghost"
              className="text-xs text-indigo-400 hover:text-indigo-300"
              onClick={() => setActiveTab("projects")}
            >
              مدیریت همه
            </Button>
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
                    <td className="px-6 py-4 font-bold text-white">{p.name}</td>
                    <td className="px-6 py-4 text-slate-400">{p.owner}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-mono font-bold ${
                          p.aiScore > 80 ? "text-green-400" : "text-yellow-400"
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
              <Terminal size={16} className="text-green-500" /> System_Live_Logs
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
                <span className="text-slate-600 shrink-0">[{log.time}]</span>
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
                <span className="text-slate-300 break-all">{log.msg}</span>
              </div>
            ))}
            <div className="flex gap-2 animate-pulse mt-4">
              <span className="text-green-500">{">"}</span>
              <span className="w-2 h-4 bg-green-500 block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

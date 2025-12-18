"use client";

import React from "react";
import Button from "../../../components/ui/Button";
import StatusBadge from "../shared/StatusBadge";

export default function MeetingsSection({ meetingsData, icons }) {
  const { Calendar, Clock, CheckCircle, Settings } = icons;

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <Calendar className="text-yellow-400" /> مدیریت جلسات و مشاوره
        </h3>

        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-xs border border-green-500/20 flex items-center gap-1">
            <CheckCircle size={12} /> ۲ تایید شده
          </span>
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg text-xs border border-yellow-500/20 flex items-center gap-1">
            <Clock size={12} /> ۱ در انتظار
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
            <tr>
              <th className="px-6 py-4">کاربر درخواست دهنده</th>
              <th className="px-6 py-4">متخصص (تیم هیوارا)</th>
              <th className="px-6 py-4">موضوع جلسه</th>
              <th className="px-6 py-4">زمان</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800 text-slate-300">
            {meetingsData.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-slate-800/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                      {m.user.charAt(0)}
                    </div>
                    <span className="font-bold text-white">{m.user}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{m.expert}</span>
                    <span className="text-xs text-indigo-400">
                      {m.expertRole}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-300">{m.topic}</td>
                <td className="px-6 py-4 font-mono text-white bg-slate-800/30 rounded-lg w-fit px-2">
                  {m.time}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge
                    status={m.status === "Confirmed" ? "Active" : "Pending"}
                  />
                </td>

                <td className="px-6 py-4">
                  <Button
                    variant="ghost"
                    className="text-slate-500 hover:text-white bg-slate-800 p-2 rounded-lg hover:bg-indigo-600"
                  >
                    <Settings size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

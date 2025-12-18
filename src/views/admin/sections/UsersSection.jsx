"use client";

import React from "react";
import Input from "../../../components/ui/Input";
export default function UsersSection({ usersData, icons }) {
  const { Users, Search, CheckCircle, AlertTriangle } = icons;

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <Users className="text-blue-400" /> پایگاه داده کاربران
        </h3>

        <div className="relative">
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <Input
            variant="dark"
            placeholder="جستجوی کاربر..."
            className="rounded-lg py-2 pr-10 pl-4 text-sm w-64"
          />
        </div>
      </div>

      <table className="w-full text-right text-sm">
        <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
          <tr>
            <th className="px-6 py-4">نام و ایمیل</th>
            <th className="px-6 py-4">نقش</th>
            <th className="px-6 py-4">پلن فعال</th>
            <th className="px-6 py-4">تاریخ عضویت</th>
            <th className="px-6 py-4">وضعیت</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 text-slate-300">
          {usersData.map((u) => (
            <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-white">{u.name}</div>
                <div className="text-xs text-slate-500 font-mono">
                  {u.email}
                </div>
              </td>

              <td className="px-6 py-4">
                {u.role === "Super Admin" ? (
                  <span className="text-red-400 font-bold border border-red-500/20 bg-red-500/10 px-2 py-0.5 rounded text-xs">
                    Admin
                  </span>
                ) : (
                  <span className="text-slate-400">User</span>
                )}
              </td>

              <td className="px-6 py-4">
                <span className="bg-indigo-500/10 text-indigo-300 px-2 py-1 rounded text-xs border border-indigo-500/20">
                  {u.plan}
                </span>
              </td>

              <td className="px-6 py-4 font-mono text-xs">{u.joined}</td>

              <td className="px-6 py-4">
                <span
                  className={`flex items-center gap-1 text-xs ${
                    u.status === "Active" ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {u.status === "Active" ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertTriangle size={12} />
                  )}
                  {u.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

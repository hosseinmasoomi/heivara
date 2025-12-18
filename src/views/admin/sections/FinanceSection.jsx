"use client";

import React from "react";
import Button from "../../../components/ui/Button";

export default function FinanceSection({ financeData, icons }) {
  const { DollarSign } = icons;

  return (
    <div className="animate-fade-in bg-[#020617] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-6 border-b border-slate-800 bg-slate-900/30 flex justify-between">
        <h3 className="font-bold text-white flex items-center gap-2 text-lg">
          <DollarSign className="text-green-400" /> تراکنش‌های مالی
        </h3>
        <Button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
          خروجی اکسل
        </Button>
      </div>

      <table className="w-full text-right text-sm">
        <thead className="bg-slate-900/50 text-slate-400 font-medium uppercase text-xs">
          <tr>
            <th className="px-6 py-4">شناسه پرداخت</th>
            <th className="px-6 py-4">کاربر</th>
            <th className="px-6 py-4">مبلغ</th>
            <th className="px-6 py-4">بابت</th>
            <th className="px-6 py-4">تاریخ</th>
            <th className="px-6 py-4">وضعیت</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 text-slate-300">
          {financeData.map((f) => (
            <tr key={f.id} className="hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-mono text-slate-500 text-xs">
                {f.id}
              </td>
              <td className="px-6 py-4 font-bold text-white">{f.user}</td>
              <td className="px-6 py-4 font-mono text-green-400">{f.amount}</td>
              <td className="px-6 py-4 text-xs">{f.plan}</td>
              <td className="px-6 py-4 font-mono text-xs">{f.date}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs font-bold border ${
                    f.status === "Success"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {f.status === "Success" ? "موفق" : "در حال پردازش"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

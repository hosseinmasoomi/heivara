"use client";

import { MessageSquare } from "lucide-react";
import AccordionItem from "./AccordionItem";

export default function FAQSection({ subtitle, items = [] }) {
  return (
    <div className="mt-24">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
            سوالات متداول
          </h2>
          <p className="text-slate-500 text-sm">{subtitle}</p>
        </div>

        <MessageSquare
          className="text-indigo-500 opacity-50 hidden md:block"
          size={40}
        />
      </div>

      <div className="space-y-4">
        {items.map((it, idx) => (
          <AccordionItem key={idx} question={it.q} answer={it.a} />
        ))}
      </div>
    </div>
  );
}

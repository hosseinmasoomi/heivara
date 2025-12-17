"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AccordionItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-[#0f172a] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
          : "bg-transparent border-slate-800 hover:border-slate-700"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right focus:outline-none"
      >
        <span
          className={`font-bold text-sm md:text-base ${
            isOpen ? "text-white" : "text-slate-300"
          }`}
        >
          {question}
        </span>

        {isOpen ? (
          <ChevronUp className="text-indigo-400" size={20} />
        ) : (
          <ChevronDown className="text-slate-500" size={20} />
        )}
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 pt-0 text-slate-400 text-sm leading-relaxed border-t border-dashed border-slate-700/50 mt-2">
            <div className="py-2">{answer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

export default function Divider({ label, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-700" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#0f172a] px-2 text-slate-500">{label}</span>
      </div>
    </div>
  );
}

"use client";

const variants = {
  default:
    "w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-black/40",
  dark: "w-full rounded-xl border border-slate-700 bg-[#020617]/50 px-3 py-2 text-sm text-white outline-none transition placeholder-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
  // برای input داخل wrapper مثل navbar (بدون padding/radius/border)
  bare: "w-full bg-transparent border-none outline-none px-0 py-0 rounded-none focus:ring-0",
};

export default function Input({
  className = "",
  variant = "default",
  ...props
}) {
  return (
    <input
      className={`${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
}

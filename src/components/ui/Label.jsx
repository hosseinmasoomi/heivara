"use client";

export default function Label({ children, className = "", ...props }) {
  return (
    <label
      className={`text-xs font-bold text-slate-400 mr-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

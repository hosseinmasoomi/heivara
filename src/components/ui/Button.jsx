"use client";

const base =
  "inline-flex items-center justify-center gap-2 text-sm font-bold transition disabled:opacity-70 disabled:cursor-not-allowed";

const variants = {
  primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
  soft: "bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300",
  white: "bg-white text-black hover:bg-slate-200",
  ghost: "bg-transparent hover:bg-white/5 text-slate-200",
  link: "bg-transparent text-indigo-400 hover:text-indigo-300 p-0 font-medium",
};

const sizes = {
  md: "px-4 py-2 rounded-xl",
  lg: "px-5 py-2 rounded-lg",
  xl: "px-5 py-3 rounded-xl",
  // برای variant=link عملاً padding نمی‌خوایم
  none: "",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const v = variants[variant] || variants.primary;

  // لینک‌ها padding نمی‌خوان
  const s = variant === "link" ? sizes.none : sizes[size] || sizes.md;

  return (
    <button type={type} className={`${base} ${v} ${s} ${className}`} {...props}>
      {children}
    </button>
  );
}

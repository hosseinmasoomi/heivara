import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  asChild = false,
  className = "",
  variant = "primary", // primary | ghost | outline
  size = "md", // sm | md | lg
  disabled,
  ...props
}) {
  const Comp = asChild ? "span" : "button";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
    outline:
      "bg-transparent text-foreground border border-border/60 hover:bg-card-2",
    ghost: "bg-transparent text-foreground hover:bg-card-2",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm rounded-[var(--radius-2xl)]",
    md: "h-12 px-5 text-sm rounded-[var(--radius-2xl)]",
    lg: "h-14 px-6 text-base rounded-[var(--radius-3xl)]",
  };

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-0",
        "disabled:opacity-50 disabled:pointer-events-none",
        "shadow-sm",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}

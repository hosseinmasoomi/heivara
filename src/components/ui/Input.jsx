import React from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Input({
  className = "",
  type = "text",
  error,
  ...props
}) {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "w-full h-12 px-4 rounded-[var(--radius-2xl)]",
          "bg-card text-foreground placeholder:text-muted/60",
          "border border-border/55",
          "transition",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:border-border/80",
          error && "border-red-400/70 focus-visible:ring-red-400/40",
          className
        )}
        {...props}
      />
      {error ? <p className="mt-2 text-xs text-red-300/90">{error}</p> : null}
    </div>
  );
}

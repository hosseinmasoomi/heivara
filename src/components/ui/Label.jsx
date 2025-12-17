import React from "react";

export default function Label({ className = "", ...props }) {
  return (
    <label
      className={
        "block text-sm font-medium text-foreground/90 mb-2 " + className
      }
      {...props}
    />
  );
}

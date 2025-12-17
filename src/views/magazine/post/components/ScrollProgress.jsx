"use client";

export default function ScrollProgress({ value = 0 }) {
  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[60]"
      style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
    />
  );
}

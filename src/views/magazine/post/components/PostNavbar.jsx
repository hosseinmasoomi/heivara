"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Bookmark } from "lucide-react";

export default function PostNavbar({ backHref = "/magazine" }) {
  const router = useRouter();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Hivara Magazine",
          text: "مقاله هیوارا",
          url: window.location.href,
        });
      }
    } catch {
      // ignore
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800 z-50 h-16 flex items-center justify-between px-6">
      <button
        onClick={() => router.push(backHref)}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        بازگشت به مجله
      </button>

      <div className="flex gap-4 text-slate-400">
        <button
          type="button"
          onClick={handleShare}
          className="hover:text-white cursor-pointer"
          aria-label="Share"
        >
          <Share2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => alert("Bookmark (بعداً وصل می‌کنیم به پروفایل)")}
          className="hover:text-white cursor-pointer"
          aria-label="Bookmark"
        >
          <Bookmark size={18} />
        </button>
      </div>
    </nav>
  );
}

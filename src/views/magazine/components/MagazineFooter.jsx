"use client";

export default function MagazineFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[#020617] mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
          HIVARA MAGAZINE
        </h2>

        <p className="text-slate-500 text-sm mb-8">
          رسانه تخصصی هوش مصنوعی و مارکتینگ
        </p>

        <div className="flex justify-center gap-6 text-slate-400 text-sm">
          <a className="hover:text-white cursor-pointer">درباره ما</a>
          <a className="hover:text-white cursor-pointer">تبلیغات</a>
          <a className="hover:text-white cursor-pointer">ارسال مقاله</a>
        </div>

        <p className="mt-8 text-xs text-slate-600">
          © 2024 Hivara AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

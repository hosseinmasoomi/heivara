import Image from "next/image";
import { Clock, Image as ImageIcon } from "lucide-react";

export default function FeaturedHero({ onClick, article }) {
  if (!article) return null;

  const hasImage =
    typeof article.image === "string" &&
    (article.image.startsWith("http") || article.image.startsWith("/"));

  return (
    <section onClick={onClick} className="mb-20 relative group cursor-pointer">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-500" />

      <div className="relative bg-[#0f172a] rounded-[30px] border border-slate-700 overflow-hidden grid lg:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-500/20">
              ویژه سردبیر
            </span>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              <Clock size={12} /> خواندن: {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 group-hover:text-indigo-300 transition-colors">
            {article.title}
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 mt-auto">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Author"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border-2 border-slate-800"
              unoptimized
            />
            <div>
              <div className="text-white font-bold text-sm">{article.author}</div>
              <div className="text-slate-500 text-xs">{article.date}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 min-h-[300px] relative overflow-hidden">
          {hasImage ? (
            <>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="absolute inset-0 w-full h-full object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/30 to-transparent" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-50 animate-pulse-fast" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                <ImageIcon size={42} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

export default function ArticleBody() {
  return (
    <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-400 prose-p:leading-8 prose-strong:text-indigo-400 prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg">
      <p className="lead text-xl text-slate-300 font-medium">
        زمانی تصور می‌کردیم خلاقیت آخرین سنگر بشریت است...
      </p>

      <h2>انقلاب خاموش الگوریتم‌ها</h2>
      <p>
        در حالی که اکثر مارکترها سرگرم بهینه‌سازی کلمات کلیدی برای گوگل بودند،
        هوش مصنوعی در حال یادگیری چیزی فراتر بود:{" "}
        <strong>درک ناخودآگاه انسان</strong>.
      </p>

      <div className="my-10 bg-[#0f172a] border border-slate-700 rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
          <span className="text-xs font-mono text-green-400">
            Simulation_Result_v4.2
          </span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>

        <code className="block font-mono text-sm text-blue-300 whitespace-pre-wrap">
          {`> Analysis: Traditional Ads Efficiency
> Year 2023: 12.4%
> Year 2024: 8.1%
> Year 2025 (Projected): 3.2%

> ALERT: Hyper-Personalization protocol initiated.
> Target: Individual synaptic patterns.`}
        </code>
      </div>

      <h2>مرگ محتوای عمومی</h2>
      <p>
        اینترنت پر از محتوای "خوب" است. اما هوش مصنوعی محتوای "عالی" و "شخصی" را
        در مقیاس میلیونی تولید می‌کند...
      </p>

      <blockquote>
        "ما دیگر بازاریابی نمی‌کنیم؛ ما در حال مهندسیِ تمایل هستیم."
        <br />
        <span className="text-sm font-normal not-italic text-slate-500 mt-2 block">
          - مدیر ارشد تکنولوژی OpenAI
        </span>
      </blockquote>

      <h3>آیا راه فراری هست؟</h3>
      <p>
        بله و خیر... هیوارا دقیقاً برای همین نقطه طراحی شده است: تبدیل شما از یک
        اپراتور به یک استراتژیست.
      </p>
    </article>
  );
}

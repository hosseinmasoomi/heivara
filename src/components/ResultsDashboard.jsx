"use client";

import React, { useMemo, useState } from "react";
import {
  Layout,
  Palette,
  Instagram,
  Type as TypeIcon,
  TrendingUp,
  Download,
  ArrowRight,
  Monitor,
  PenTool,
  Zap,
  Clock,
  DollarSign,
  Megaphone,
  Handshake,
  CheckCircle,
  Users,
  Info,
  MessageCircle,
  Heart,
  Target,
  Eye,
  Layers,
  Feather,
  Sparkles,
  Shield,
  Globe,
  Search,
  BarChart3,
  ListChecks,
  LayoutPanelLeft,
  Mic,
  Briefcase,
  Wrench,
  PieChart,
  Repeat2,
  Flag,
  MousePointer2,
  MousePointerClick,
  Smartphone,
  RefreshCcw,
  PlayCircle,
  Image as ImageIcon,
  History,
  Hash,
  Star,
} from "lucide-react";

const arr = (v) => (Array.isArray(v) ? v : []);
const num = (v, d = 0) => {
  const parsed = Number(v);
  return Number.isFinite(parsed) ? parsed : d;
};

const CP1252_MAP = {
  8364: 128,
  8218: 130,
  402: 131,
  8222: 132,
  8230: 133,
  8224: 134,
  8225: 135,
  710: 136,
  8240: 137,
  352: 138,
  8249: 139,
  338: 140,
  381: 142,
  8216: 145,
  8217: 146,
  8220: 147,
  8221: 148,
  8226: 149,
  8211: 150,
  8212: 151,
  732: 152,
  8482: 153,
  353: 154,
  8250: 155,
  339: 156,
  382: 158,
  376: 159,
};

const persianScore = (value) =>
  [...String(value || "")].filter((char) => /[\u0600-\u06FF]/.test(char)).length;

const decodeCp1252Utf8 = (value) => {
  const bytes = [];
  for (const char of String(value || "")) {
    const code = char.codePointAt(0);
    if (code <= 255) {
      bytes.push(code);
      continue;
    }
    if (CP1252_MAP[code]) {
      bytes.push(CP1252_MAP[code]);
      continue;
    }
    return value;
  }
  return new TextDecoder("utf-8").decode(new Uint8Array(bytes));
};

const fixText = (value) => {
  if (typeof value !== "string") return value;
  if (!/[ØÙÛâÀ-ÿŒœŠšŽžŸ‚„…†‡ˆ‰‹›‘’“”•–—˜™]/.test(value)) return value;

  let best = value;
  let bestScore = persianScore(value);
  let current = value;

  for (let i = 0; i < 3; i += 1) {
    const candidates = [current];

    try {
      candidates.push(decodeURIComponent(escape(current)));
    } catch {}

    try {
      candidates.push(decodeCp1252Utf8(current));
    } catch {}

    for (const candidate of candidates) {
      const score = persianScore(candidate);
      if (score > bestScore) {
        best = candidate;
        bestScore = score;
      }
    }

    if (best === current) break;
    current = best;
  }

  return best;
};

const str = (v, d = "") => fixText(typeof v === "string" ? v : d);

function normalizePlan(plan) {
  const score = Number(plan?.evaluation?.score || 70);
  const brandingRaw = arr(plan?.branding);
  const branding = (brandingRaw.length ? brandingRaw : [{ name: "HIVARA" }]).map((b, i) => ({
    name: str(b?.name, `Brand ${i + 1}`),
    slogan: str(b?.slogan, "یک قدم جلوتر"),
    rationale: str(b?.rationale, "انتخاب داده محور"),
    description: str(b?.description, str(b?.rationale, "توضیح برند")),
    personality: str(b?.personality, "حرفه ای و قابل اعتماد"),
  }));

  const keywords = arr(plan?.website?.seoStrategy?.keywords).length
    ? arr(plan?.website?.seoStrategy?.keywords).map((x) => ({
        keyword: str(x?.keyword),
        difficulty: str(x?.difficulty, "Medium"),
        attractiveness: num(x?.attractiveness, 70),
      }))
    : arr(plan?.website?.seoKeywords).map((x, i) => ({
        keyword: str(x),
        difficulty: i % 2 === 0 ? "Medium" : "Hard",
        attractiveness: 68 + i * 4,
      }));

  const pageMapping = arr(plan?.website?.seoStrategy?.pageMapping).length
    ? arr(plan?.website?.seoStrategy?.pageMapping).map((x) => ({
        pageName: str(x?.pageName),
        seoTitle: str(x?.seoTitle),
        userIntent: str(x?.userIntent),
      }))
    : arr(plan?.website?.structure).map((x, i) => ({
        pageName: str(x),
        seoTitle: `${str(x)} | ${branding[0].name}`,
        userIntent: i === 0 ? "آشنایی" : i === 1 ? "مقایسه" : "اقدام",
      }));

  const contentClusters = arr(plan?.website?.seoStrategy?.contentClusters).length
    ? arr(plan?.website?.seoStrategy?.contentClusters).map((x) => ({
        cluster: str(x?.cluster),
        intent: str(x?.intent),
        sampleTopics: arr(x?.sampleTopics).map(str),
      }))
    : [
        {
          cluster: "Pain-driven SEO",
          intent: "جذب کاربر از سرچ های درد محور",
          sampleTopics: ["اشتباه های رایج بازار", "چرا تبدیل نمی گیرید", "هزینه های پنهان"],
        },
        {
          cluster: "Money Pages",
          intent: "تبدیل جست وجوهای آماده به لید",
          sampleTopics: ["قیمت گذاری", "درخواست دمو", "نمونه کار"],
        },
      ];

  const socialCalendar = arr(plan?.social?.weeklyCalendar).length
    ? arr(plan?.social?.weeklyCalendar)
    : [];

  const marketIntel = {
    marketSize: {
      tam: str(plan?.marketIntel?.marketSize?.tam, "بازار بزرگ و در حال رشد"),
      sam: str(plan?.marketIntel?.marketSize?.sam, "بخش قابل دسترس برای یک تیم کوچک"),
      som: str(plan?.marketIntel?.marketSize?.som, "هدف واقع بینانه سال اول"),
    },
    competitors: arr(plan?.marketIntel?.competitors).length
      ? arr(plan?.marketIntel?.competitors).map((c) => ({
          name: str(c?.name),
          strength: str(c?.strength),
          weakness: str(c?.weakness),
          differentiation: str(c?.differentiation),
        }))
      : [],
    swot: {
      strengths: arr(plan?.marketIntel?.swot?.strengths).map(str),
      weaknesses: arr(plan?.marketIntel?.swot?.weaknesses).map(str),
      opportunities: arr(plan?.marketIntel?.swot?.opportunities).map(str),
      threats: arr(plan?.marketIntel?.swot?.threats).map(str),
    },
    competitiveAdvantage: str(plan?.marketIntel?.competitiveAdvantage, "تمایز مشخص نسبت به رقبا"),
    positioningStatement: str(plan?.marketIntel?.positioningStatement, "جایگاه برند نسبت به بازار"),
  };

  return {
    branding,
    marketIntel,
    visuals: {
      colors: {
        primary: plan?.visuals?.colors?.primary || plan?.visuals?.primaryColor || "#0F172A",
        secondary: plan?.visuals?.colors?.secondary || plan?.visuals?.secondaryColor || "#2563EB",
        accent: plan?.visuals?.colors?.accent || "#22C55E",
        neutral: plan?.visuals?.colors?.neutral || "#334155",
      },
      logoSvg:
        plan?.visuals?.logoSvg ||
        "<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'><rect width='120' height='120' rx='24' fill='#0F172A'/><path d='M26 84V36h12v18h24V36h12v48H62V66H38v18H26z' fill='#22C55E'/></svg>",
      logoConcept: str(plan?.visuals?.logoConcept, "لوگوی مینیمال رشد"),
      visualPersonality: str(plan?.visuals?.visualPersonality, str(plan?.visuals?.moodDescription, "مدرن")),
      typographyDirection: str(plan?.visuals?.typographyDirection, str(plan?.visuals?.fontStyle, "Sans فارسی")),
      logoCharacter: str(plan?.visuals?.logoCharacter, "جسور"),
      graphicStyle: str(plan?.visuals?.graphicStyle, "مینیمال"),
    },
    website: {
      keyFeatures: arr(plan?.website?.keyFeatures).length ? arr(plan?.website?.keyFeatures).map(str) : ["پیشنهاد ارزشی شفاف", "CTA قوی", "اثبات اجتماعی"],
      techStack: arr(plan?.website?.techStack).length ? arr(plan?.website?.techStack).map(str) : ["Next.js", "Analytics", "CRM", "SEO layer"],
      uiUxTips: arr(plan?.website?.uiUxTips).length ? arr(plan?.website?.uiUxTips).map(str) : ["CTA بالای fold", "Hero کوتاه", "مسیر تبدیل یکدست"],
      platformDefinition: {
        type: str(plan?.website?.platformDefinition?.type, "وب اپ + داشبورد"),
        primaryGoal: str(plan?.website?.platformDefinition?.primaryGoal, "تبدیل"),
        targetDevices: str(plan?.website?.platformDefinition?.targetDevices, "موبایل + دسکتاپ"),
      },
      uiMapping: {
        buttonStyle: str(plan?.website?.uiMapping?.buttonStyle, "CTA برجسته"),
        headerApproach: str(plan?.website?.uiMapping?.headerApproach, "هدر خلاصه"),
        mobileExperience: str(plan?.website?.uiMapping?.mobileExperience, "mobile-first"),
      },
      stackDecision: {
        recommended: str(plan?.website?.stackDecision?.recommended, "Custom Coding"),
        codingScore: num(plan?.website?.stackDecision?.codingScore, 89),
        wordpressScore: num(plan?.website?.stackDecision?.wordpressScore, 57),
        hivaraIndex: num(plan?.website?.stackDecision?.hivaraIndex, 86),
        reasoning: arr(plan?.website?.stackDecision?.reasoning).length
          ? arr(plan?.website?.stackDecision?.reasoning).map(str)
          : [
              "کدنویسی برای SEO عمیق، سرعت و داشبوردها کنترل بیشتری می دهد.",
              "برای money page های متعدد و A/B test استک اختصاصی برنده تر است.",
              "وردپرس برای شروع سریع مناسب است اما زودتر به سقف فنی می خورد.",
            ],
        roadmap: arr(plan?.website?.stackDecision?.roadmap).length
          ? arr(plan?.website?.stackDecision?.roadmap).map(str)
          : [
              "Sprint 1: landing page + analytics",
              "Sprint 2: money pages + technical SEO",
              "Sprint 3: dashboard + automation + CRO",
            ],
      },
      siteArchitecture: {
        corePages: arr(plan?.website?.siteArchitecture?.corePages).length ? arr(plan?.website?.siteArchitecture?.corePages).map(str) : ["صفحه اصلی", "ویژگی ها", "درخواست دمو", "مجله", "درباره ما"],
        moneyPages: arr(plan?.website?.siteArchitecture?.moneyPages).length ? arr(plan?.website?.siteArchitecture?.moneyPages).map(str) : ["قیمت گذاری", "مقایسه راهکارها", "درخواست مشاوره"],
        trustPages: arr(plan?.website?.siteArchitecture?.trustPages).length ? arr(plan?.website?.siteArchitecture?.trustPages).map(str) : ["نمونه کار", "نظر مشتریان", "FAQ"],
        featureModules: arr(plan?.website?.siteArchitecture?.featureModules).length ? arr(plan?.website?.siteArchitecture?.featureModules).map(str) : ["Lead scoring", "Booking/Demo", "CRM sync", "Reporting dashboard"],
      },
      healthCheck: {
        seo: str(plan?.website?.healthCheck?.seo, "GOOD"),
        performance: str(plan?.website?.healthCheck?.performance, "STRONG"),
        conversionReadiness: str(plan?.website?.healthCheck?.conversionReadiness, "HIGH"),
      },
      seoStrategy: { keywords, pageMapping, contentClusters },
    },
    social: {
      voiceAndTone: {
        formality: str(plan?.social?.voiceAndTone?.formality, "حرفه ای"),
        boldness: str(plan?.social?.voiceAndTone?.boldness, "جسور"),
        purpose: str(plan?.social?.voiceAndTone?.purpose, "آموزش + تبدیل"),
        vibe: str(plan?.social?.voiceAndTone?.vibe, "الهام بخش"),
      },
      weeklyCalendar: socialCalendar,
      pillars: arr(plan?.social?.pillars).length ? arr(plan?.social?.pillars).map((x) => ({ title: str(x?.title), description: str(x?.description) })) : [],
      growthHacks: arr(plan?.social?.growthHacks).length ? arr(plan?.social?.growthHacks).map(str) : ["چالش ۵ روزه", "UGC با پاداش", "همکاری میکرواینفلوئنسر"],
      hashtagClusters: arr(plan?.social?.hashtagClusters).length ? arr(plan?.social?.hashtagClusters).map((x) => ({ theme: str(x?.theme), hashtags: arr(x?.hashtags).map(str) })) : [{ theme: "Awareness", hashtags: ["#برندسازی", "#مارکتینگ", "#کسب_و_کار"] }],
      iranianInfluencers: arr(plan?.social?.iranianInfluencers).length ? arr(plan?.social?.iranianInfluencers).map((x) => ({ name: str(x?.name), niche: str(x?.niche), collaborationIdea: str(x?.collaborationIdea) })) : [],
    },
    growth: {
      goal: str(plan?.growth?.goal, "افزایش لید"),
      timeframe: str(plan?.growth?.timeframe, "۹۰ روز"),
      targetAudience: str(plan?.growth?.targetAudience, "کسب و کارهای کوچک و متوسط"),
      keyCampaignMessage: str(plan?.growth?.keyCampaignMessage, "پیام کمپین"),
      acquisitionMechanism: str(plan?.growth?.acquisitionMechanism, "محتوای هدفمند"),
      engagementMechanism: str(plan?.growth?.engagementMechanism, "تعامل مرحله ای"),
      conversionMechanism: str(plan?.growth?.conversionMechanism, "تبدیل به مشتری"),
      cta: str(plan?.growth?.cta, "شروع تست"),
      growthChannels: arr(plan?.growth?.growthChannels).length ? arr(plan?.growth?.growthChannels).map(str) : ["Instagram", "SEO", "Email"],
      partnerships: str(plan?.growth?.partnerships, "همکاری با برند مکمل"),
      reengagement: str(plan?.growth?.reengagement, "کمپین بازگشت کاربر"),
      requiredResources: str(plan?.growth?.requiredResources, "طراح + تولید محتوا + تحلیلگر"),
      executionCost: str(plan?.growth?.executionCost, "۷۰ تا ۱۱۰ میلیون تومان"),
      kpis: arr(plan?.growth?.kpis).length ? arr(plan?.growth?.kpis).map(str) : ["CTR", "CAC", "Leads"],
      resultPrediction: str(plan?.growth?.resultPrediction, "پیش بینی رشد مثبت"),
      scalabilityPlan: str(plan?.growth?.scalabilityPlan, "مقیاس تدریجی پس از اعتبارسنجی"),
    },
    evaluation: {
      marketScore: Number(plan?.evaluation?.marketScore || Math.min(99, score + 6)),
      brandScore: Number(plan?.evaluation?.brandScore || Math.max(45, score - 3)),
      growthScore: Number(plan?.evaluation?.growthScore || Math.min(99, score + 2)),
      executionScore: Number(plan?.evaluation?.executionScore || Math.max(40, score - 5)),
      riskScore: Number(plan?.evaluation?.riskScore || 55),
      feedback: str(plan?.evaluation?.feedback, "نیاز به تست بیشتر بازار"),
      strengthsSummary: str(
        plan?.evaluation?.strengthsSummary,
        "ایده دارای پتانسیل تمایز در بازار است، اما برای قضاوت نهایی به اجرای منظم نیاز دارد."
      ),
      riskFactors: arr(plan?.evaluation?.riskFactors).length
        ? arr(plan?.evaluation?.riskFactors).map(str)
        : [
            "وابستگی به اجرای دقیق فاز اول و سرعت ورود به بازار",
            "رقابت فزاینده در صورت تاخیر در تمایزسازی برند",
            "نیاز به اعتبارسنجی واقعی تقاضا پیش از مقیاس‌گذاری هزینه‌های جذب مشتری",
          ],
      milestonesForInvestment: arr(plan?.evaluation?.milestonesForInvestment).length
        ? arr(plan?.evaluation?.milestonesForInvestment).map(str)
        : [
            "راه‌اندازی نسخه اولیه محصول/پلتفرم و جذب اولین کاربران واقعی",
            "دستیابی به نرخ تبدیل و بازخورد مثبت در یک کانال رشد مشخص",
            "اثبات واحد اقتصادی (Unit Economics) قابل دفاع برای دور بعدی رشد",
          ],
      verdict: str(
        plan?.evaluation?.verdict,
        "تهمتن: این ایده پایه‌های قابل قبولی دارد، اما ورود سرمایه منوط به اجرای دقیق نقشه راه و عبور از نقاط عطف تعیین‌شده است."
      ),
      investmentDecision: str(plan?.evaluation?.investmentDecision, "قابل بررسی برای سرمایه گذاری مرحله ای"),
      investmentOffer: Boolean(plan?.evaluation?.investmentOffer),
      investmentPercentage: Number(plan?.evaluation?.investmentPercentage || 0),
    },
  };
}

const DeptHeader = ({ icon: Icon, dept, manager }) => (
  <div className="bg-indigo-600/10 border-b border-indigo-500/20 p-4 mb-8 flex items-center justify-between rounded-t-3xl">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-0.5">تهیه شده در مرکز عملیات هیوارا</div>
        <div className="text-sm font-black text-white">{fixText(dept)}</div>
      </div>
    </div>
    <div className="hidden md:flex flex-col items-end">
      <div className="text-[10px] text-slate-500 font-bold uppercase">مدیر دپارتمان</div>
      <div className="text-xs text-slate-300 font-bold">{fixText(manager)}</div>
    </div>
  </div>
);

const ScoreMeter = ({ label, value, tone = "indigo" }) => {
  const pct = Math.max(0, Math.min(100, Number(value || 0)));
  const toneClass = tone === "green" ? "from-emerald-400 to-green-500" : tone === "red" ? "from-rose-400 to-red-500" : "from-indigo-400 to-cyan-400";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-300 font-bold">{fixText(label)}</span>
        <span className="text-white font-mono">{pct}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
        <div className={`h-full rounded-full bg-gradient-to-r ${toneClass}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const GrowthCard = ({ label, value, icon: Icon }) => (
  <div className="bg-[#020617] border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all">
    <div className="flex items-center gap-2 mb-2">
      {Icon ? <Icon size={14} className="text-indigo-400/70" /> : null}
      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{fixText(label)}</span>
    </div>
    {Array.isArray(value) ? (
      <div className="flex flex-wrap gap-2">
        {value.map((v, i) => (
          <span key={i} className="bg-white/5 px-2 py-1 rounded-md text-xs text-slate-300 border border-white/5">{fixText(v)}</span>
        ))}
      </div>
    ) : (
      <p className="text-slate-200 text-sm leading-relaxed">{fixText(value)}</p>
    )}
  </div>
);

const ContentCard = ({ content, index }) => {
  const Icon = content.type === "Reel" ? PlayCircle : content.type === "Post" ? ImageIcon : History;
  const typeColor = content.type === "Reel" ? "text-pink-400" : content.type === "Post" ? "text-blue-400" : "text-purple-400";
  const typeBg = content.type === "Reel" ? "bg-pink-500/10" : content.type === "Post" ? "bg-blue-500/10" : "bg-purple-500/10";
  return (
    <div className="relative group">
      <div className="absolute -left-1.5 top-8 w-3 h-3 rounded-full bg-indigo-600 border-2 border-[#020617] z-10" />
      <div className="bg-[#020617] border border-white/5 rounded-3xl p-6 hover:border-indigo-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">{fixText(content.day)}</span>
            <div className={`px-3 py-1 rounded-full ${typeBg} ${typeColor} text-[10px] font-bold border border-white/5 flex items-center gap-1.5`}>
              <Icon size={12} /> {fixText(content.type)}
            </div>
          </div>
          <div className="text-[10px] text-slate-600 font-mono">STEP_0{index + 1}</div>
        </div>
        <h5 className="text-white font-bold mb-3 text-sm">{fixText(content.title)}</h5>
        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center gap-1">
              <Zap size={10} className="text-yellow-400" /> Hook
            </div>
            <p className="text-slate-300 text-xs italic">{fixText(content.hook)}</p>
          </div>
          <div className="bg-indigo-600/5 p-4 rounded-2xl border border-indigo-500/10">
            <div className="text-[10px] text-indigo-400 font-bold uppercase mb-2 flex items-center gap-1">
              <Mic size={10} /> سناریو
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">{fixText(content.scenario)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResultsDashboard = ({ plan, onReset }) => {
  const [activeTab, setActiveTab] = useState("branding");
  const [showConsultants, setShowConsultants] = useState(false);
  const [bookedExpert, setBookedExpert] = useState(null);
  const n = useMemo(() => normalizePlan(plan), [plan]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(String(text || ""));
      alert("کپی شد");
    } catch {
      alert("کپی انجام نشد");
    }
  };

  const handleDownloadReport = () => {
    const content = `گزارش جامع هیوارا\nنام برند: ${fixText(n.branding[0].name)}`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hivara_Plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const BASE_PRICE = 100000000;
  const investmentPercent = n.evaluation.investmentPercentage;
  const hivaraInvestment = (BASE_PRICE * investmentPercent) / 100;
  const userPayable = BASE_PRICE - hivaraInvestment;

  const experts = [
    { id: 1, name: "دکتر آرش پارسا", role: "استراتژیست ارشد رشد", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix", availability: "فردا، ۱۶:۰۰" },
    { id: 2, name: "مهندس سارا راد", role: "مدیر فنی و محصول", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", availability: "امروز، ۱۸:۳۰" },
  ];

  const tabs = [
    { id: "branding", label: "نام و شعار", icon: TypeIcon },
    { id: "visuals", label: "هویت بصری", icon: Palette },
    { id: "marketIntel", label: "تحلیل بازار و رقبا", icon: BarChart3 },
    { id: "web", label: "پلتفرم فنی", icon: Layout },
    { id: "social", label: "سوشال مدیا", icon: Instagram },
    { id: "growth", label: "استراتژی رشد", icon: TrendingUp },
    { id: "timeline", label: "حکم تهمتن", icon: Handshake, special: true },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-fade-in pb-20 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 pb-8 border-b border-white/5 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <span className="text-3xl">*</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">{fixText(n.branding[0].name)}</h1>
            <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              تحلیل اختصاصی هیوارا
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="bg-white/5 text-gray-300 px-6 py-3 rounded-xl text-sm border border-white/5">ایده جدید</button>
          <button onClick={handleDownloadReport} className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg">
            <Download size={16} /> دانلود گزارش
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-2 mb-12 no-scrollbar justify-center">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? (tab.special ? "bg-indigo-600 text-white" : "bg-white text-black") : "bg-[#0f172a] text-gray-500 hover:text-white"}`}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[600px] bg-[#0b1220] border border-white/5 rounded-[40px] shadow-2xl relative">
        {activeTab === "branding" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={TypeIcon} dept="دپارتمان نام گذاری و استراتژی برند" manager="دکتر آرش پارسا" />
            <div className="p-6 md:p-10 grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              {n.branding.map((brand, idx) => (
                <div key={idx} className="bg-[#020617] border border-white/5 rounded-[32px] overflow-hidden hover:border-indigo-500/50 transition-all shadow-xl">
                  <div className="p-8 border-b border-white/5 bg-gradient-to-br from-indigo-600/5 to-transparent">
                    <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">نام پیشنهادی #{idx + 1}</div>
                    <h3 className="text-3xl font-black text-white mb-2">{brand.name}</h3>
                    <p className="text-slate-400 text-sm font-medium italic">{brand.slogan}</p>
                  </div>
                  <div className="p-8 grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-indigo-400 mb-1.5"><Info size={14} /><span className="text-xs font-bold uppercase">توضیح</span></div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">{brand.description}</p>
                      <div className="flex items-center gap-2 text-indigo-400 mb-1.5"><Heart size={14} /><span className="text-xs font-bold uppercase">شخصیت</span></div>
                      <p className="text-slate-300 text-sm leading-relaxed">{brand.personality}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-indigo-400 mb-1.5"><Target size={14} /><span className="text-xs font-bold uppercase">دلیل انتخاب</span></div>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">{brand.rationale}</p>
                      <button onClick={() => copyToClipboard(brand.name)} className="bg-white/5 border border-white/10 hover:border-indigo-500/40 text-slate-200 text-xs px-3 py-2 rounded-lg">کپی نام</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "visuals" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={Palette} dept="دپارتمان طراحی هویت بصری و گرافیک" manager="مینا تهرانی" />
            <div className="p-6 md:p-10 space-y-10">
              <div className="grid lg:grid-cols-4 gap-6">
                {[{ label: "Primary", hex: n.visuals.colors.primary }, { label: "Secondary", hex: n.visuals.colors.secondary }, { label: "Accent", hex: n.visuals.colors.accent }, { label: "Neutral", hex: n.visuals.colors.neutral }].map((c, i) => (
                  <div key={i}>
                    <div onClick={() => copyToClipboard(c.hex)} className="h-40 rounded-3xl border border-white/10 cursor-pointer" style={{ backgroundColor: c.hex.startsWith("#") ? c.hex : "#1e293b" }} />
                    <div className="mt-3 text-center text-sm text-white font-mono">{c.hex}</div>
                  </div>
                ))}
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-[#020617] border border-white/5 rounded-[32px] p-8 flex flex-col items-center text-center">
                  <div className="w-full max-w-[200px] aspect-square mb-4" dangerouslySetInnerHTML={{ __html: n.visuals.logoSvg }} />
                  <h4 className="text-white font-bold mb-2">کانسپت لوگو</h4>
                  <p className="text-slate-400 text-xs italic">{n.visuals.logoConcept}</p>
                </div>
                <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
                  <GrowthCard label="شخصیت بصری" value={n.visuals.visualPersonality} icon={Heart} />
                  <GrowthCard label="تایپوگرافی" value={n.visuals.typographyDirection} icon={TypeIcon} />
                  <GrowthCard label="شخصیت لوگو" value={n.visuals.logoCharacter} icon={Feather} />
                  <GrowthCard label="سبک گرافیک" value={n.visuals.graphicStyle} icon={Eye} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "marketIntel" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={BarChart3} dept="واحد اطلاعات بازار و تحلیل رقبا" manager="دکتر لیلا مرادی" />
            <div className="p-6 md:p-10 space-y-8">
              <div className="grid md:grid-cols-3 gap-4">
                <GrowthCard label="TAM - کل بازار" value={n.marketIntel.marketSize.tam} icon={Globe} />
                <GrowthCard label="SAM - بازار قابل دسترس" value={n.marketIntel.marketSize.sam} icon={PieChart} />
                <GrowthCard label="SOM - هدف سال اول" value={n.marketIntel.marketSize.som} icon={Target} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 text-white font-bold"><Users size={18} className="text-indigo-400" /> تحلیل رقبا</div>
                <div className="grid lg:grid-cols-3 gap-4">
                  {n.marketIntel.competitors.map((c, idx) => (
                    <div key={idx} className="bg-[#020617] border border-white/5 rounded-3xl p-6 space-y-3">
                      <h4 className="text-white font-black">{c.name}</h4>
                      <div>
                        <div className="text-[10px] text-emerald-400 font-bold uppercase mb-1">نقطه قوت</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{c.strength}</p>
                      </div>
                      <div>
                        <div className="text-[10px] text-rose-400 font-bold uppercase mb-1">نقطه ضعف</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{c.weakness}</p>
                      </div>
                      <div>
                        <div className="text-[10px] text-indigo-400 font-bold uppercase mb-1">تمایز ما</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{c.differentiation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-6">
                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3">نقاط قوت</div>
                  <div className="space-y-2">{n.marketIntel.swot.strengths.map((item, idx) => <div key={idx} className="flex items-start gap-2 text-sm text-slate-200"><CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />{item}</div>)}</div>
                </div>
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-6">
                  <div className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-3">نقاط ضعف</div>
                  <div className="space-y-2">{n.marketIntel.swot.weaknesses.map((item, idx) => <div key={idx} className="flex items-start gap-2 text-sm text-slate-200"><Shield size={14} className="text-rose-400 mt-0.5 shrink-0" />{item}</div>)}</div>
                </div>
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-3xl p-6">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3">فرصت ها</div>
                  <div className="space-y-2">{n.marketIntel.swot.opportunities.map((item, idx) => <div key={idx} className="flex items-start gap-2 text-sm text-slate-200"><Sparkles size={14} className="text-indigo-400 mt-0.5 shrink-0" />{item}</div>)}</div>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6">
                  <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-3">تهدیدها</div>
                  <div className="space-y-2">{n.marketIntel.swot.threats.map((item, idx) => <div key={idx} className="flex items-start gap-2 text-sm text-slate-200"><Flag size={14} className="text-amber-400 mt-0.5 shrink-0" />{item}</div>)}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <GrowthCard label="مزیت رقابتی" value={n.marketIntel.competitiveAdvantage} icon={Sparkles} />
                <GrowthCard label="جایگاه برند" value={n.marketIntel.positioningStatement} icon={Target} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={Instagram} dept="دپارتمان شبکه های اجتماعی" manager="سیاوش صادقی" />
            <div className="p-6 md:p-10 space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GrowthCard label="رسمیت" value={n.social.voiceAndTone.formality} icon={Shield} />
                <GrowthCard label="جسارت" value={n.social.voiceAndTone.boldness} icon={Zap} />
                <GrowthCard label="هدف کلام" value={n.social.voiceAndTone.purpose} icon={Target} />
                <GrowthCard label="اتمسفر" value={n.social.voiceAndTone.vibe} icon={Sparkles} />
              </div>
              <div className="relative border-r border-white/5 mr-4 pr-8 space-y-8 py-2">
                {n.social.weeklyCalendar.map((content, idx) => <ContentCard key={idx} content={content} index={idx} />)}
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <GrowthCard label="ستون های محتوایی" value={n.social.pillars.map((p) => p.title)} icon={Layers} />
                <GrowthCard label="ایده های رشد سریع" value={n.social.growthHacks} icon={TrendingUp} />
              </div>

              {n.social.hashtagClusters.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Hash size={16} className="text-indigo-400" />
                    <h4 className="text-white font-bold text-sm">استراتژی هشتگ</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {n.social.hashtagClusters.map((cluster, idx) => (
                      <div key={idx} className="bg-[#020617] border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-black text-indigo-400">
                            {idx + 1}
                          </div>
                          <span className="text-xs font-bold text-slate-200">{fixText(cluster.theme)}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cluster.hashtags.map((tag, ti) => (
                            <span key={ti} className="bg-indigo-500/5 text-indigo-300 border border-indigo-500/10 px-2 py-1 rounded-md text-[11px] font-mono" dir="ltr">{fixText(tag)}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {n.social.iranianInfluencers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="text-pink-400" />
                    <h4 className="text-white font-bold text-sm">همکاری با اینفلوئنسرها</h4>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {n.social.iranianInfluencers.map((inf, idx) => (
                      <div key={idx} className="bg-[#020617] border border-white/5 p-5 rounded-2xl hover:border-pink-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                            <Users size={14} className="text-pink-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white">{fixText(inf.name)}</p>
                            <p className="text-[10px] text-slate-500">{fixText(inf.niche)}</p>
                          </div>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">{fixText(inf.collaborationIdea)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "growth" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={TrendingUp} dept="دپارتمان رشد و بازاریابی" manager="دکتر آرش پارسا" />
            <div className="p-6 md:p-10 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <GrowthCard label="هدف رشد" value={n.growth.goal} icon={Flag} />
                <GrowthCard label="بازه زمانی" value={n.growth.timeframe} icon={Clock} />
                <GrowthCard label="مخاطب هدف" value={n.growth.targetAudience} icon={Users} />
                <GrowthCard label="پیام کمپین" value={n.growth.keyCampaignMessage} icon={Megaphone} />
                <GrowthCard label="جذب کاربر" value={n.growth.acquisitionMechanism} icon={Layout} />
                <GrowthCard label="تعامل" value={n.growth.engagementMechanism} icon={MessageCircle} />
                <GrowthCard label="تبدیل" value={n.growth.conversionMechanism} icon={DollarSign} />
                <GrowthCard label="CTA" value={n.growth.cta} icon={MousePointer2} />
                <GrowthCard label="کانال های رشد" value={n.growth.growthChannels} icon={Globe} />
                <GrowthCard label="مشارکت" value={n.growth.partnerships} icon={Handshake} />
                <GrowthCard label="بازگشت کاربران" value={n.growth.reengagement} icon={RefreshCcw} />
                <GrowthCard label="منابع موردنیاز" value={n.growth.requiredResources} icon={Wrench} />
              </div>
              <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-3xl p-6 grid md:grid-cols-2 gap-6">
                <GrowthCard label="هزینه اجرا" value={n.growth.executionCost} icon={Briefcase} />
                <GrowthCard label="KPI" value={n.growth.kpis} icon={PieChart} />
                <GrowthCard label="پیش بینی نتیجه" value={n.growth.resultPrediction} icon={Sparkles} />
                <GrowthCard label="مقیاس پذیری" value={n.growth.scalabilityPlan} icon={Repeat2} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "web" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={Layout} dept="دپارتمان توسعه فنی و زیرساخت" manager="مهندس سارا راد" />
            <div className="p-6 md:p-10 space-y-8">
              <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
                <div className="bg-[#020617] border border-white/5 rounded-[32px] p-7 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.28em] text-indigo-400 font-bold mb-2">Hivara Build Index</div>
                      <h3 className="text-2xl font-black text-white mb-2">مسیر برنده برای این ایده: {n.website.stackDecision.recommended}</h3>
                      <p className="text-sm text-slate-400 leading-7">برای این مدل رشد، هیوارا کدنویسی را برنده می داند چون روی SEO عمیق، performance و توسعه صفحات پول ساز کنترل کامل می دهد.</p>
                    </div>
                    <div className="shrink-0 px-4 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center min-w-28">
                      <div className="text-[10px] uppercase tracking-[0.24em] text-indigo-300 font-bold mb-1">HIVARA</div>
                      <div className="text-3xl font-black text-white">{n.website.stackDecision.hivaraIndex}</div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <ScoreMeter label="Custom Coding" value={n.website.stackDecision.codingScore} tone="green" />
                    <ScoreMeter label="WordPress" value={n.website.stackDecision.wordpressScore} tone="red" />
                    <ScoreMeter label="Hivara Index" value={n.website.stackDecision.hivaraIndex} tone="indigo" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <GrowthCard label="نوع پلتفرم" value={n.website.platformDefinition.type} icon={Monitor} />
                    <GrowthCard label="هدف اصلی" value={n.website.platformDefinition.primaryGoal} icon={Target} />
                    <GrowthCard label="دستگاه هدف" value={n.website.platformDefinition.targetDevices} icon={Smartphone} />
                  </div>
                </div>
                <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[32px] p-7 space-y-5">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-indigo-300 font-bold mb-2">Why Coding Wins</div>
                    <h4 className="text-xl font-black text-white">منطق تصمیم فنی هیوارا</h4>
                  </div>
                  <div className="space-y-3">
                    {n.website.stackDecision.reasoning.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-2xl p-4">
                        <div className="mt-0.5 w-7 h-7 rounded-full bg-indigo-500/15 text-indigo-300 flex items-center justify-center text-xs font-black">{idx + 1}</div>
                        <p className="text-sm text-slate-200 leading-7">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                <GrowthCard label="استایل CTA" value={n.website.uiMapping.buttonStyle} icon={MousePointerClick} />
                <GrowthCard label="رویکرد هدر" value={n.website.uiMapping.headerApproach} icon={LayoutPanelLeft} />
                <GrowthCard label="موبایل اکسپرینس" value={n.website.uiMapping.mobileExperience} icon={PenTool} />
                <GrowthCard label="هسته ارزش سایت" value={n.website.keyFeatures} icon={Sparkles} />
                <GrowthCard label="تک استک پیشنهادی" value={n.website.techStack} icon={Briefcase} />
                <GrowthCard label="UI/UX Hint" value={n.website.uiUxTips} icon={Eye} />
              </div>
              <div className="grid xl:grid-cols-2 gap-6">
                <div className="bg-[#020617] border border-white/5 rounded-[32px] p-7">
                  <div className="flex items-center gap-2 mb-5 text-white font-bold"><ListChecks size={18} className="text-indigo-400" /> معماری صفحات سایت</div>
                  <div className="space-y-5">
                    <div><div className="text-xs uppercase tracking-[0.24em] text-slate-500 font-bold mb-3">Core Pages</div><div className="flex flex-wrap gap-2">{n.website.siteArchitecture.corePages.map((item, idx) => <span key={idx} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm text-slate-200">{item}</span>)}</div></div>
                    <div><div className="text-xs uppercase tracking-[0.24em] text-emerald-400 font-bold mb-3">Money Pages</div><div className="flex flex-wrap gap-2">{n.website.siteArchitecture.moneyPages.map((item, idx) => <span key={idx} className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-200">{item}</span>)}</div></div>
                    <div><div className="text-xs uppercase tracking-[0.24em] text-cyan-400 font-bold mb-3">Trust Pages</div><div className="flex flex-wrap gap-2">{n.website.siteArchitecture.trustPages.map((item, idx) => <span key={idx} className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-200">{item}</span>)}</div></div>
                  </div>
                </div>
                <div className="bg-[#020617] border border-white/5 rounded-[32px] p-7">
                  <div className="flex items-center gap-2 mb-5 text-white font-bold"><Layers size={18} className="text-indigo-400" /> ماژول های ضروری محصول/سایت</div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">{n.website.siteArchitecture.featureModules.map((item, idx) => <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 text-sm text-slate-200">{item}</div>)}</div>
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-500 font-bold mb-3">Roadmap</div>
                  <div className="space-y-3">{n.website.stackDecision.roadmap.map((step, idx) => <div key={idx} className="flex items-start gap-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 p-4"><div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</div><p className="text-sm text-slate-200 leading-7">{step}</p></div>)}</div>
                </div>
              </div>
              <div className="bg-[#020617] border border-white/5 rounded-[32px] p-7 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-white font-bold mb-2"><Search size={18} className="text-indigo-400" /> مرکز SEO و معماری رشد</div>
                    <p className="text-sm text-slate-400">این بخش باید موتور جذب ارگانیک، صفحات پول ساز و ساختار authority برند را هم زمان بسازد.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">SEO: {n.website.healthCheck.seo}</span>
                    <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300">Performance: {n.website.healthCheck.performance}</span>
                    <span className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">Conversion: {n.website.healthCheck.conversionReadiness}</span>
                  </div>
                </div>
                <div className="grid xl:grid-cols-3 gap-6">
                  <div>
                    <div className="text-indigo-400 text-sm mb-3 flex items-center gap-2"><BarChart3 size={16} /> کلمات کلیدی هدف</div>
                    <div className="space-y-2">{n.website.seoStrategy.keywords.map((kw, i) => <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3"><div className="flex items-center justify-between gap-3 mb-2"><span className="text-white text-sm font-bold">{kw.keyword}</span><span className="text-xs text-slate-400">{kw.difficulty}</span></div><ScoreMeter label="Attractiveness" value={kw.attractiveness || 70} tone="indigo" /></div>)}</div>
                  </div>
                  <div>
                    <div className="text-indigo-400 text-sm mb-3 flex items-center gap-2"><ListChecks size={16} /> نقشه صفحات سئو</div>
                    <div className="space-y-2">{n.website.seoStrategy.pageMapping.map((p, i) => <div key={i} className="bg-white/5 border-l-4 border-indigo-600 rounded-r-xl p-3"><div className="text-white text-sm font-bold mb-1">{p.pageName}</div><div className="text-slate-400 text-xs mb-1">{p.seoTitle}</div><div className="text-[11px] text-indigo-300">Intent: {p.userIntent}</div></div>)}</div>
                  </div>
                  <div>
                    <div className="text-indigo-400 text-sm mb-3 flex items-center gap-2"><Globe size={16} /> خوشه های محتوایی</div>
                    <div className="space-y-2">{n.website.seoStrategy.contentClusters.map((cluster, i) => <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4"><div className="text-white text-sm font-bold mb-1">{cluster.cluster}</div><div className="text-slate-400 text-xs leading-6 mb-3">{cluster.intent}</div><div className="flex flex-wrap gap-2">{arr(cluster.sampleTopics).map((topic, topicIdx) => <span key={topicIdx} className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">{topic}</span>)}</div></div>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="animate-fade-in-up">
            <DeptHeader icon={Handshake} dept="دفتر تهمتن - هیئت سرمایه گذاری هیوارا" manager="تهمتن" />
            <div className="p-10 max-w-5xl mx-auto space-y-10">
              <div className="bg-[#0f172a] border border-white/5 rounded-[40px] p-10">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-black text-white mb-2">حکم نهایی تهمتن</h3>
                  <p className="text-slate-500 text-sm">جمع بندی هیئت سرمایه گذاری هیوارا بر اساس گزارش تمام دپارتمان ها</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
                  <ScoreMeter label="پتانسیل بازار" value={n.evaluation.marketScore} tone="green" />
                  <ScoreMeter label="قدرت برند" value={n.evaluation.brandScore} tone="indigo" />
                  <ScoreMeter label="پایداری رشد" value={n.evaluation.growthScore} tone="indigo" />
                  <ScoreMeter label="آمادگی اجرا" value={n.evaluation.executionScore} tone="green" />
                  <ScoreMeter label="ریسک پروژه" value={n.evaluation.riskScore} tone="red" />
                </div>
                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6 mb-6">
                  <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-2">سخن تهمتن</div>
                  <p className="text-slate-200 text-sm leading-7 italic">«{n.evaluation.verdict}»</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-slate-300 text-sm">{n.evaluation.investmentDecision}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#020617] border border-white/5 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-sm"><CheckCircle size={16} /> جمع بندی نقاط قوت</div>
                  <p className="text-slate-300 text-sm leading-relaxed">{n.evaluation.strengthsSummary}</p>
                </div>
                <div className="bg-[#020617] border border-white/5 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-rose-400 font-bold text-sm"><Shield size={16} /> ریسک های کلیدی</div>
                  <div className="space-y-2">
                    {n.evaluation.riskFactors.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-slate-200"><span className="text-rose-400 mt-0.5">●</span>{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-[#020617] border border-white/5 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4 text-indigo-400 font-bold text-sm"><Flag size={16} /> نقاط عطف لازم برای ورود سرمایه</div>
                <div className="space-y-3">
                  {n.evaluation.milestonesForInvestment.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 p-4">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</div>
                      <p className="text-sm text-slate-200 leading-7">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                <p className="text-slate-400 text-sm mb-8">{n.evaluation.feedback}</p>
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-400 text-sm"><span>هزینه پایه</span><span className="text-white font-mono">{BASE_PRICE.toLocaleString()} تومان</span></div>
                  <div className="flex justify-between text-green-400 text-sm"><span>سرمایه گذاری هیوارا ({investmentPercent}%)</span><span className="font-mono">-{hivaraInvestment.toLocaleString()} تومان</span></div>
                  <div className="bg-indigo-600 rounded-2xl p-5 flex justify-between items-center"><span className="text-white font-bold">مبلغ نهایی</span><span className="text-2xl font-black text-white font-mono">{userPayable.toLocaleString()} <span className="text-sm font-normal">تومان</span></span></div>
                </div>
                <button onClick={() => setShowConsultants(true)} className={`w-full mt-8 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-lg ${n.evaluation.investmentOffer ? "bg-white text-black hover:bg-slate-200" : "bg-white/5 border border-white/10 text-slate-400 cursor-not-allowed opacity-50"}`} disabled={!n.evaluation.investmentOffer}>
                  {n.evaluation.investmentOffer ? "رزرو جلسه عقد قرارداد" : "نیاز به بازنگری ایده"} <ArrowRight size={22} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

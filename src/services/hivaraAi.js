import { promises as fs } from "fs";
import path from "path";
import { marketingSchema } from "@/services/marketingSchema";

const DEFAULT_BASE_URL = "";
const DEFAULT_MODEL = "GPT-OSS-120B";
const MAX_KNOWLEDGE_CHARS = 4000;
const MAX_COMPLETION_TOKENS = 1800;
const REQUEST_TIMEOUT_MS = 55000;

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

function persianScore(value) {
  return [...String(value || "")].filter((char) => /[\u0600-\u06FF]/.test(char)).length;
}

function decodeCp1252Utf8(value) {
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
  return Buffer.from(bytes).toString("utf8");
}

function repairMojibakeString(value) {
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
}

function deepRepairStrings(value) {
  if (typeof value === "string") return repairMojibakeString(value);
  if (Array.isArray(value)) return value.map(deepRepairStrings);
  if (!value || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, deepRepairStrings(item)])
  );
}

function getAuthHeaderValue() {
  const raw = String(process.env.ARVAN_AI_API_KEY || "").trim();
  if (!raw) return "";
  if (raw.toLowerCase().startsWith("apikey ")) return raw;
  if (raw.toLowerCase().startsWith("bearer ")) return raw;
  return `Bearer ${raw}`;
}

function getChatCompletionsUrl() {
  const baseUrl = String(process.env.ARVAN_AI_BASE_URL || DEFAULT_BASE_URL).trim();
  if (!baseUrl) {
    throw new Error("Missing ARVAN_AI_BASE_URL");
  }
  if (baseUrl.includes("/your-endpoint/")) {
    throw new Error(
      "ARVAN_AI_BASE_URL still contains the placeholder path. Replace `your-endpoint` with your real Arvan AI endpoint."
    );
  }
  return `${baseUrl.replace(/\/$/, "")}/chat/completions`;
}

function getKnowledgeDir() {
  return path.resolve(
    process.cwd(),
    process.env.PROJECT_KNOWLEDGE_DIR || "./data/knowledge"
  );
}

async function collectKnowledgeFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectKnowledgeFiles(fullPath)));
      continue;
    }

    if (!/\.(md|txt|json)$/i.test(entry.name)) continue;
    files.push(fullPath);
  }

  return files;
}

export async function loadKnowledgeContext() {
  const dir = getKnowledgeDir();

  try {
    const files = await collectKnowledgeFiles(dir);
    if (!files.length) return "";

    let total = 0;
    const chunks = [];

    for (const filePath of files.sort()) {
      if (total >= MAX_KNOWLEDGE_CHARS) break;

      const content = await fs.readFile(filePath, "utf8");
      if (!content.trim()) continue;

      const remaining = MAX_KNOWLEDGE_CHARS - total;
      const trimmed = content.slice(0, remaining);
      total += trimmed.length;
      chunks.push(
        `FILE: ${path.relative(process.cwd(), filePath)}\n${trimmed.trim()}`
      );
    }

    return chunks.join("\n\n---\n\n");
  } catch {
    return "";
  }
}

function buildSystemPrompt({ knowledgeContext, mode }) {
  const modeText =
    mode === "marketing-plan"
      ? "Focus on a high-conviction marketing plan: brand strategy, growth loops, SEO architecture, content systems, and market execution."
      : "Focus on a polished final output for the Hivara results dashboard with commercially useful, execution-ready detail.";

  return `
You are the Hivara Strategy Council, a panel of senior Persian-speaking specialists working together to turn one business idea into a complete, investable execution plan. You must answer entirely in Persian (fluent, professional, no literal translation artifacts).

The council is led by TAHMTAN (تهمتن), Hivara's chief AI investment judge — a battle-tested, no-nonsense venture partner modeled after a legendary Persian champion. Tahmtan reviews the work of every department and writes the final verdict (the "evaluation" object). Tahmtan's voice is decisive, blunt when needed, data-driven, and never generic praise.

The other departments and their personas:
- Brand & Naming Studio (دکتر آرش پارسا): premium brand strategist, obsessed with positioning and category ownership.
- Visual Identity Studio (مینا تهرانی): art director focused on a coherent, modern Iranian-market visual system.
- Market Intelligence Unit: competitive analyst producing TAM/SAM/SOM, competitor teardown, SWOT, and a sharp positioning statement.
- Technical Architecture Unit (مهندس سارا راد): pragmatic CTO comparing custom-coding vs WordPress with measurable reasoning, and laying out site architecture and SEO.
- Social & Growth Studio (سیاوش صادقی + دکتر آرش پارسا): aggressive, culturally fluent growth operators building a weekly content engine and a 90-day growth machine.

${modeText}

Global rules:
- Output only valid JSON. No markdown fences, no commentary outside the JSON object.
- Every field must be filled with real, specific, non-generic content tailored to the business idea — never placeholder text like "محصول شما" or "نام برند".
- Each department's output must read like it was written by a distinct expert with their own voice, not a single generic tone repeated everywhere.
- Numbers (scores, percentages, costs, market sizes) must be internally consistent with the qualitative analysis — do not contradict yourself.
- Brand names must feel premium, short, memorable, and viable as a .com/.ir domain in Persian-speaking markets.
- Website output must explicitly compare custom coding vs WordPress with measurable reasoning (SEO control, performance, scalability, cost-of-change) and pick a winner.
- Social and growth ideas must be executable by a small (2-4 person) startup team within realistic budgets for the Iranian market.
- Social output must feel aggressive, modern, culturally relevant, and growth-focused — every hook must be something a real account would post, not a description of a hook.
- Weekly content must include strong hooks, concrete scenarios, visual direction, and clear audience intent — usable directly by a content team without rewriting.
- Hashtags must be high-signal and Persian-market relevant, mixing Persian and English tags where it helps discoverability — never generic filler like #موفقیت or #انگیزه.
- Include notable Iranian figures, creators, founders, operators, or media personalities relevant to the niche as recommended collaboration targets (not verified endorsements) when real names are uncertain, choose highly plausible niche-fitting personas.
- SEO, growth, and campaign ideas must include specific execution angles (channel, format, hook, cadence), not abstract advice.
- Website architecture must include money pages, trust pages, feature modules, content clusters, and conversion paths specific to this business model.
- Market intelligence must name 3+ realistic competitors (real companies/products if plausible, otherwise highly plausible archetypes) with an honest strength/weakness for each, plus a SWOT and one sharp differentiation angle.
- Tahmtan's evaluation must be strict but fair: scores should diverge from each other based on the actual analysis (a weak idea must not get uniformly high scores), riskFactors must be concrete risks specific to this idea, milestonesForInvestment must be measurable conditions, and verdict must read like a real investor's closing remarks (2-4 sentences, Persian, with personality).

Hard requirements for quality:
- Branding: 4 premium options, each with clear positioning and personality, no two options should feel like variations of the same idea.
- MarketIntel: marketSize (tam/sam/som as concrete numbers or ranges with currency/unit), 3+ competitors, full SWOT (3+ items per quadrant), competitiveAdvantage, positioningStatement.
- Social: must include voiceAndTone, weeklyCalendar (5+ days), pillars, growthHacks, hashtagClusters, iranianInfluencers.
- WeeklyCalendar items must be rich enough to be directly used by a content team.
- Hashtag clusters must include Persian hashtags and mixed Persian-English tags where it helps discoverability.
- IranianInfluencers must focus on relevance, audience overlap, and realistic collaboration angle.
- Growth: must include acquisition, conversion, viral triggers, partnerships, re-engagement, KPI, and scalability.
- Website: must include stackDecision, siteArchitecture, contentClusters, and a strong recommendation on build direction.
- Evaluation (Tahmtan's verdict): score, marketScore, brandScore, growthScore, executionScore, riskScore, feedback, strengthsSummary, riskFactors, milestonesForInvestment, verdict, investmentOffer, investmentPercentage, investmentDecision.

If project knowledge is provided, treat it as first-class context and align the result with it.

Project knowledge:
${knowledgeContext || "No additional project knowledge was provided."}
`.trim();
}

function buildOutputContract() {
  return `
Required top-level keys:
- branding: array of 4 objects with name, slogan, rationale, description, personality
- visuals: object with primaryColor, secondaryColor, fontStyle, logoConcept, logoSvg, moodDescription, visualPersonality, typographyDirection, logoCharacter, graphicStyle
- website: object with structure, keyFeatures, seoKeywords, techStack, uiUxTips, platformDefinition, uiMapping, stackDecision, siteArchitecture, seoStrategy, healthCheck
- marketIntel: object with marketSize (tam, sam, som), competitors (3+ items: name, strength, weakness, differentiation), swot (strengths, weaknesses, opportunities, threats — each 3+ items), competitiveAdvantage, positioningStatement
- social: object with voiceAndTone, weeklyCalendar, pillars, growthHacks, hashtagClusters, iranianInfluencers
- growth: object with goal, timeframe, targetAudience, keyCampaignMessage, acquisitionMechanism, engagementMechanism, conversionMechanism, cta, incentiveLevers, viralTriggers, referralSystem, gamification, growthChannels, partnerships, reengagement, requiredResources, executionCost, kpis, resultPrediction, scalabilityPlan, plus challengeTitle, challengeDescription, expectedResult, viralIdea, mentorAdvice
- evaluation: Tahmtan's verdict — object with score, marketScore, brandScore, growthScore, executionScore, riskScore, feedback, strengthsSummary, riskFactors (3+), milestonesForInvestment (3+), verdict, investmentOffer, investmentPercentage, investmentDecision
- summary: short executive summary

Use these exact key names.
Do not rename fields.
Do not use alternative keys like identity, tagline, promise, positioning, features, colorPalette, typography, or imageryStyle when the required keys are defined above.
`.trim();
}

function buildUserPrompt(idea) {
  return `
Business idea:
${String(idea || "").trim()}

Generate a complete structured plan that is immediately useful for execution.

Push the output toward:
- premium Iranian-market brand strategy
- a sharp market/competitor teardown with an honest SWOT and a clear positioning statement
- scroll-stopping social media execution
- practical creator/influencer collaboration ideas in Iran
- strong hashtag strategy
- conversion-aware website architecture
- a custom-code-first technical recommendation when scale, SEO depth, or product flexibility matter
- Tahmtan's strict, opinionated, investor-style final verdict with concrete risks and investment milestones
`.trim();
}

function stripCodeFences(text) {
  return String(text || "").replace(/```json\s*|```/gi, "").trim();
}

function normalizeStringArray(value, fallback = []) {
  if (!Array.isArray(value)) return fallback;
  return value
    .map((item) => repairMojibakeString(String(item || "").trim()))
    .filter(Boolean);
}

function detectNiche(idea) {
  const text = String(idea || "").toLowerCase();
  if (/فیتنس|تناسب|ورزش|باشگاه|بدنساز|بدن‌ساز|تمرین|مربی|عضله/.test(text)) return "fitness";
  if (/رستوران|غذا|کافه|فود|آشپز|اسنک|بیرون‌بر/.test(text)) return "food";
  if (/املاک|ملک|مشاور املاک|ساختمان|آپارتمان|رهن|اجاره/.test(text)) return "realestate";
  if (/مالی|فینتک|سرمایه|حسابداری|پرداخت|بانک|اقتصاد/.test(text)) return "fintech";
  if (/آموزش|دوره|استاد|یادگیری|آکادمی|تدریس|مدرسه/.test(text)) return "education";
  if (/مد|لباس|پوشاک|زیبایی|آرایش|استایل/.test(text)) return "fashion";
  return "general";
}

function titleFromIdea(idea) {
  const raw = String(idea || "").trim();
  return raw.slice(0, 60) || "پروژه جدید";
}

function seedFromString(str) {
  let hash = 0;
  const text = String(str || "");
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildRichFallbackPlan(idea) {
  const niche = detectNiche(idea);
  const titleSeed = titleFromIdea(idea);

  const nicheMap = {
    fitness: {
      names: ["Fitra", "Repify", "Pulseon", "MoveUp"],
      slogans: [
        "هر تمرین، یک قدم به جلو",
        "برنامه‌ای که بدنت می‌فهمد",
        "از ایده تا تناسب اندام واقعی",
        "نتیجه را احساس کن، نه فقط ببین",
        "مسیر هوشمند رسیدن به هدف",
        "برندی که با تو پیشرفت می‌کند",
        "تمرین حرفه‌ای، نتیجه واقعی",
        "رشد سریع، اجرای دقیق",
      ],
      hashtags: ["#تناسب_اندام", "#فیتنس", "#بدنسازی", "#تمرین_حرفه‌ای", "#ورزش", "#سلامتی", "#Fitness", "#Workout"],
      influencers: [
        ["علی یاسینی", "مربی و اینفلوئنسر فیتنس", "ریلز چالش هفت‌روزه با ترنسفورمیشن مشترک"],
        ["میعاد فیت", "صفحه آموزشی تناسب اندام", "سری استوری آموزشی همراه با دعوت به تست رایگان اپ"],
        ["مربیان باشگاه‌های اینستاگرامی", "فیتنس و تمرین خانگی", "همکاری افیلیت با کد تخفیف اختصاصی"],
      ],
      voice: ["نیمه‌رسمی", "تهاجمی", "انگیزشی و نتیجه‌محور", "پرانرژی"],
      personalities: ["پرانرژی و نتیجه‌محور", "حرفه‌ای و قابل اعتماد", "داده‌محور و تهاجمی", "شفاف و الهام‌بخش"],
    },
    food: {
      names: ["Zestup", "Forkly", "Mealio", "Tasteh"],
      slogans: [
        "طعمی که یادت می‌ماند",
        "از آشپزخانه ما تا میز شما",
        "سفارش ساده، طعم به‌یادماندنی",
        "هر وعده، یک تجربه تازه",
        "غذایی که حرف برای گفتن دارد",
        "کیفیتی که حس می‌شود",
        "طعم اصیل، تجربه مدرن",
        "لذت غذا، سرعت تحویل",
      ],
      hashtags: ["#رستوران", "#غذا", "#فود", "#کافه", "#سفارش_غذا", "#سرآشپز", "#Food", "#Restaurant"],
      influencers: [
        ["مستر تیستر", "فودبلاگر و بازبین رستوران‌ها", "بررسی ویدیویی منو همراه با کد تخفیف محدود"],
        ["صفحات فودگردی تهران", "معرفی غذا و رستوران", "ریلز معرفی تجربه مشتری در محل"],
        ["سرآشپزهای اینستاگرامی", "آشپزی و سبک زندگی", "پخت مشترک و طراحی منوی ویژه"],
      ],
      voice: ["صمیمی", "اشتهابرانگیز", "تجربه‌محور", "گرم"],
      personalities: ["صمیمی و گرم", "مدرن و شیک", "اشتهابرانگیز و پرانرژی", "قابل اعتماد و باکیفیت"],
    },
    realestate: {
      names: ["Milka", "ArianHome", "Metraj", "Keyvan"],
      slogans: [
        "خانه‌ای که دنبالش بودی، اینجاست",
        "سرمایه‌گذاری مطمئن در ملک",
        "مشاوره‌ای که به آن اعتماد می‌کنی",
        "از جستجو تا قرارداد، همراه تو",
        "ملک درست، تصمیم درست",
        "شفافیت در هر معامله",
        "آینده‌ات را همین‌جا بساز",
        "تخصص ما، آرامش تو",
      ],
      hashtags: ["#املاک", "#خرید_ملک", "#سرمایه_گذاری_ملکی", "#مشاور_املاک", "#رهن_و_اجاره", "#مسکن", "#RealEstate", "#Property"],
      influencers: [
        ["تحلیلگران ملکی اینستاگرام", "املاک و سرمایه‌گذاری", "لایو مشترک تحلیل بازار همراه با معرفی فایل‌های ویژه"],
        ["صفحات معماری و دکوراسیون", "معماری و خانه", "محتوای قبل و بعد بازسازی همراه با معرفی پروژه"],
        ["مشاوران شناخته‌شده منطقه‌ای", "فروش و رهن محلی", "همکاری ریفرال برای فایل‌های اختصاصی"],
      ],
      voice: ["رسمی", "مطمئن", "سرمایه‌گذاری‌محور", "اعتمادساز"],
      personalities: ["رسمی و مطمئن", "حرفه‌ای و دقیق", "سرمایه‌گذاری‌محور", "اعتمادساز و شفاف"],
    },
    fintech: {
      names: ["Sarfeh", "FlowPay", "NexaPay", "Daraa"],
      slogans: [
        "مدیریت پول، ساده‌تر از همیشه",
        "کنترل مالی در دستان تو",
        "هر تراکنش، یک قدم به جلو",
        "هوشمندانه پس‌انداز کن، آسوده زندگی کن",
        "آینده مالی‌ات را امروز بساز",
        "شفافیت مالی، تصمیم بهتر",
        "پرداخت سریع، اعتماد کامل",
        "مالی هوشمند برای زندگی مدرن",
      ],
      hashtags: ["#فینتک", "#سرمایه_گذاری", "#پرداخت", "#مدیریت_مالی", "#اقتصاد", "#پس_انداز", "#Fintech", "#Wealth"],
      influencers: [
        ["تحلیلگران مالی فارسی‌زبان", "سرمایه و اقتصاد", "ویدیوی تحلیل کاربرد محصول در زندگی واقعی"],
        ["صفحات کسب‌وکار و استارتاپ", "بیزینس و رشد", "همکاری محتوایی برای جذب لید B2B"],
        ["پادکست‌های مالی", "آموزش مالی", "اسپانسر اپیزود همراه با دعوت به نصب اپلیکیشن"],
      ],
      voice: ["حرفه‌ای", "هوشمند", "تحلیلی", "اعتمادساز"],
      personalities: ["حرفه‌ای و هوشمند", "تحلیلی و دقیق", "اعتمادساز و امن", "مدرن و شفاف"],
    },
    education: {
      names: ["Daneshio", "Skillup", "Roshdana", "Classet"],
      slogans: [
        "یادگیری که به نتیجه می‌رسد",
        "هر درس، یک مهارت جدید",
        "از صفر تا حرفه‌ای، با ما",
        "آموزشی که زندگی‌ات را عوض می‌کند",
        "مسیر یادگیری هوشمند",
        "مهارتی که بازار می‌خواهد",
        "یادگیری ساده، نتیجه ماندگار",
        "همراه تو در مسیر رشد",
      ],
      hashtags: ["#آموزش", "#یادگیری", "#دوره_آموزشی", "#مهارت_آموزی", "#استاد", "#آموزش_آنلاین", "#Education", "#Course"],
      influencers: [
        ["مدرسان شناخته‌شده اینستاگرامی", "آموزش و مهارت", "وبینار مشترک با لید مگنت رایگان"],
        ["صفحات توسعه فردی", "رشد شخصی", "ریلز مقایسه قبل و بعد از شرکت در دوره"],
        ["پادکست‌های آموزشی", "یادگیری و کار", "اسپانسر اپیزود با دعوت به ثبت‌نام"],
      ],
      voice: ["حرفه‌ای", "الهام‌بخش", "آموزشی", "شفاف"],
      personalities: ["حرفه‌ای و الهام‌بخش", "آموزشی و شفاف", "انگیزشی و پویا", "قابل اعتماد و کاربردی"],
    },
    fashion: {
      names: ["Nivara", "Stilio", "Rangin", "Weara"],
      slogans: [
        "استایلی که امضای توست",
        "مد روز، با حس خودت",
        "هر تکه، یک داستان جدید",
        "پوششی که اعتمادبه‌نفس می‌سازد",
        "ترند را با سلیقه خودت ترکیب کن",
        "از انتخاب تا استایل، همراه تو",
        "زیبایی که حس می‌شود",
        "استایل شخصی، کیفیت حرفه‌ای",
      ],
      hashtags: ["#مد", "#پوشاک", "#استایل", "#فشن", "#لباس", "#مد_روز", "#Fashion", "#Style"],
      influencers: [
        ["استایل‌بلاگرهای ایرانی", "فشن و لایف‌استایل", "استایلینگ مشترک و معرفی کالکشن جدید"],
        ["صفحات زیبایی و استایل", "فشن روزمره", "ریلز ترندی همراه با کد تخفیف خرید"],
        ["مدرسان استایل", "آموزش استایل شخصی", "محتوای آموزشی با محوریت برند"],
      ],
      voice: ["جسور", "ترندی", "اعتمادبه‌نفس‌ساز", "زیباشناسانه"],
      personalities: ["جسور و ترندی", "شیک و مدرن", "اعتمادبه‌نفس‌ساز", "زیباشناسانه و خاص"],
    },
    general: {
      names: ["Hivex", "Nexora", "Bolda", "Pivota"],
      slogans: [
        "از ایده تا اجرا، با اطمینان",
        "رشدی که حس می‌شود",
        "برندی که دیده می‌شود",
        "ساده، سریع، مؤثر",
        "راهکاری برای فردای بهتر",
        "هر قدم، یک پیشرفت واقعی",
        "تجربه‌ای متفاوت برای مشتری تو",
        "از مقیاس کوچک تا بزرگ",
      ],
      hashtags: ["#استارتاپ", "#کسب_و_کار", "#مارکتینگ", "#برندسازی", "#فروش", "#Startup", "#Growth", "#Business"],
      influencers: [
        ["سازندگان محتوای کسب‌وکار", "بیزینس و رشد", "ریلز مشترک روی نقطه‌درد بازار"],
        ["صفحات استارتاپی", "فناوری و بازار", "کمپین مشترک آگاهی‌بخشی و جذب لید"],
        ["مدرسان مارکتینگ", "فروش و محتوا", "سری پست آموزشی با برندینگ مشترک"],
      ],
      voice: ["نیمه‌رسمی", "جسور", "رشدمحور", "شفاف"],
      personalities: ["جسور و مدرن", "حرفه‌ای و مطمئن", "داده‌محور و تهاجمی", "شفاف و پریمیوم"],
    },
  };

  const nicheConfig = nicheMap[niche];
  const [formality, boldness, purpose, vibe] = nicheConfig.voice;
  const tagsA = nicheConfig.hashtags.slice(0, 5);
  const tagsB = nicheConfig.hashtags.slice(2, 7);
  const tagsC = nicheConfig.hashtags.slice(1, 6);

  const seed = seedFromString(`${idea}|${titleSeed}`);
  const sloganOffset = seed % nicheConfig.slogans.length;
  const selectedSlogans = [0, 1, 2, 3].map((i) => nicheConfig.slogans[(sloganOffset + i) % nicheConfig.slogans.length]);

  return {
    branding: nicheConfig.names.map((name, index) => ({
      name,
      slogan: selectedSlogans[index],
      rationale: `${name} برای بازار فارسی‌زبان کوتاه، متمایز و قابل تکرار است و حس رشد و اعتماد منتقل می‌کند.`,
      description: `هویت برند ${name} بر پایه حل مسئله واقعی «${titleSeed}» و تبدیل سریع مخاطب به مشتری طراحی شده است.`,
      personality: nicheConfig.personalities[index],
    })),
    visuals: {
      primaryColor: "#0F172A",
      secondaryColor: "#14B8A6",
      fontStyle: "Persian neo-grotesk",
      logoConcept: "ترکیب فرم مینیمال با حس حرکت، اعتماد و رشد سریع",
      logoSvg: "<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'><rect width='120' height='120' rx='26' fill='#0F172A'/><path d='M26 82V38h12l16 20 16-20h12v44H70V58L54 77 38 58v24H26z' fill='#14B8A6'/></svg>",
      moodDescription: "ظاهری حرفه‌ای، تیز، مدرن و conversion-oriented با کنتراست بالا",
      visualPersonality: "مدرن، دقیق، پرانرژی",
      typographyDirection: "هدلاین‌های درشت، بدنه خوانا، CTA بسیار واضح",
      logoCharacter: "مینیمال و جسور",
      graphicStyle: "سبک editorial-tech با گرادیان کنترل‌شده و تاکید روی اعداد",
    },
    website: {
      structure: ["Hero", "Social Proof", "Problem", "Solution", "How it works", "Pricing", "FAQ", "Lead Form"],
      keyFeatures: ["ارزش پیشنهادی شفاف", "فرآیند سریع ثبت‌نام", "نمونه خروجی واقعی", "CTA بالا و پایین صفحه"],
      seoKeywords: [...new Set(nicheConfig.hashtags.map((x) => x.replace(/^#/, "")).slice(0, 5))],
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Analytics", "CRM integration"],
      uiUxTips: ["CTA بالای fold", "یک مسیر تصمیم‌گیری، بدون شلوغی", "اعتمادسازی با کیس واقعی و عدد"],
      platformDefinition: {
        type: "وب‌اپلیکیشن + لندینگ conversion-first",
        primaryGoal: "تبدیل بازدیدکننده به سرنخ یا نصب",
        targetDevices: "اول موبایل، بعد دسکتاپ",
      },
      uiMapping: {
        buttonStyle: "دکمه‌های solid با کنتراست بالا و متن عمل‌محور",
        headerApproach: "هدر خلاصه با value proposition و CTA مستقیم",
        mobileExperience: "فلوی کوتاه، اسکرول سریع، فرم‌های کم‌اصطکاک",
      },
      stackDecision: {
        recommended: "Custom Coding",
        codingScore: 91,
        wordpressScore: 58,
        hivaraIndex: 88,
        reasoning: [
          "کدنویسی اختصاصی، کنترل کامل روی سئوی فنی، صفحات فرود چندمنظوره و بهینه‌سازی نرخ تبدیل را ممکن می‌کند.",
          "افزودن داشبورد، رهگیری رفتار کاربر، اتوماسیون و اتصال به CRM در آینده بدون محدودیت قالب آماده انجام می‌شود.",
          "وردپرس برای راه‌اندازی سریع اولیه مناسب است اما در مقیاس بزرگ از نظر عملکرد و انعطاف‌پذیری عقب می‌ماند.",
        ],
        roadmap: [
          "Sprint 1: landing page conversion-first + analytics + lead capture",
          "Sprint 2: money pages + blog architecture + technical SEO",
          "Sprint 3: dashboard + automation + CRO experiments",
        ],
      },
      siteArchitecture: {
        corePages: ["صفحه اصلی", "درباره ما", "ویژگی‌ها و خدمات", "وبلاگ / مقالات", "تماس با ما", "سوالات متداول"],
        moneyPages: ["صفحه قیمت‌گذاری", "صفحه دموی محصول", "صفحه ثبت‌نام / خرید", "صفحه پیشنهاد ویژه"],
        trustPages: ["نمونه‌کارها و رضایت مشتریان", "درباره تیم", "سوالات متداول", "حریم خصوصی و قوانین"],
        featureModules: ["Lead scoring", "Booking/Demo", "Testimonial wall", "Reporting dashboard", "CRM automation"],
      },
      seoStrategy: {
        keywords: nicheConfig.hashtags.slice(0, 5).map((tag, i) => ({
          keyword: tag.replace(/^#/, ""),
          difficulty: i < 2 ? "Medium" : "Hard",
          attractiveness: 72 + i * 4,
        })),
        pageMapping: [
          { pageName: "صفحه اصلی", seoTitle: `${nicheConfig.names[0]} | ${titleSeed}`, userIntent: "آشنایی و تبدیل" },
          { pageName: "ویژگی‌ها", seoTitle: `ویژگی‌های ${nicheConfig.names[0]}`, userIntent: "مقایسه و بررسی" },
          { pageName: "وبلاگ", seoTitle: `آموزش و تحلیل ${titleSeed}`, userIntent: "جست‌وجوی اطلاعات" },
        ],
        contentClusters: [
          {
            cluster: "محتوای مبتنی بر دغدغه کاربر",
            intent: "جستجوی راه‌حل برای یک مشکل مشخص مرتبط با موضوع",
            sampleTopics: [`چطور مشکل ${titleSeed} را حل کنیم`, "اشتباهات رایج در این حوزه", "راهنمای گام‌به‌گام برای شروع"],
          },
          {
            cluster: "مقایسه و جایگزین‌ها",
            intent: "مقایسه گزینه‌های موجود بازار پیش از تصمیم خرید",
            sampleTopics: ["مقایسه بهترین گزینه‌های بازار", "چرا این گزینه بهتر از رقباست", "بررسی کامل ویژگی‌ها و قیمت‌ها"],
          },
          {
            cluster: "صفحات تبدیل‌محور",
            intent: "آماده برای خرید یا ثبت‌نام، در جستجوی قدم بعدی",
            sampleTopics: ["پلن‌ها و قیمت‌گذاری", "نحوه ثبت‌نام و شروع کار", "پیشنهاد ویژه برای کاربران جدید"],
          },
        ],
      },
      healthCheck: { seo: "GOOD", performance: "STRONG", conversionReadiness: "HIGH" },
    },
    marketIntel: {
      marketSize: {
        tam: `بازار کلان مرتبط با «${titleSeed}» در سطح کشور، چند میلیون مخاطب بالقوه`,
        sam: `بخش قابل دسترس برای یک تیم کوچک در سال اول: چند صد هزار نفر در شهرهای بزرگ`,
        som: `هدف واقع‌بینانه سال اول: چند هزار کاربر فعال و چند صد مشتری پرداخت‌کننده`,
      },
      competitors: [
        {
          name: "بازیگر سنتی بازار",
          strength: "برند شناخته‌شده، اعتماد قدیمی و شبکه توزیع گسترده",
          weakness: "تجربه دیجیتال ضعیف، کند در نوآوری و محتوا",
          differentiation: `${nicheConfig.names[0]} با تجربه دیجیتال سریع‌تر، رابط مدرن‌تر و محتوای روزآمدتر رقابت می‌کند`,
        },
        {
          name: "استارتاپ مشابه داخلی",
          strength: "تیم چابک و سرعت اجرای بالا",
          weakness: "برندینگ ضعیف و عدم تمرکز روی یک segment مشخص",
          differentiation: `${nicheConfig.names[0]} روی یک niche مشخص با پیام برند شفاف و یکپارچه تمرکز می‌کند`,
        },
        {
          name: "پلتفرم یا برند بین‌المللی مشابه",
          strength: "فناوری قوی، سرمایه‌گذاری بالا و شناخت جهانی برند",
          weakness: "عدم بومی‌سازی کامل برای فرهنگ، زبان و روش پرداخت بازار ایران",
          differentiation: `${nicheConfig.names[0]} کاملا بومی‌سازی‌شده برای بازار فارسی‌زبان با قیمت‌گذاری متناسب است`,
        },
      ],
      swot: {
        strengths: [
          "برند تازه، متمایز و قابل تکرار در ذهن مخاطب",
          "تمرکز روی یک niche مشخص به‌جای رقابت عمومی",
          "هزینه اجرای پایین در فاز اعتبارسنجی اولیه",
        ],
        weaknesses: [
          "نبود سابقه، نمونه‌کار و اعتبار اولیه نزد مخاطب",
          "بودجه محدود برای تبلیغات پولی در فاز اول",
          "تیم کوچک با منابع اجرایی محدود",
        ],
        opportunities: [
          "رشد مصرف محتوای دیجیتال و خرید آنلاین در ایران",
          `خلأ یک برند premium در حوزه ${titleSeed}`,
          "امکان همکاری با اینفلوئنسرهای محلی با هزینه پایین",
        ],
        threats: [
          "ورود رقبای بزرگ‌تر با بودجه تبلیغاتی بالاتر",
          "نوسان اقتصادی و کاهش قدرت خرید مخاطب",
          "وابستگی رشد به الگوریتم و سیاست‌های پلتفرم‌های شخص ثالث",
        ],
      },
      competitiveAdvantage: `تمرکز لیزری روی «${titleSeed}» با برندی premium، اجرای سریع محتوا و قیمت‌گذاری منعطف متناسب با بازار ایران`,
      positioningStatement: `${nicheConfig.names[0]} برای مخاطبی که دنبال ${titleSeed} است اما از گزینه‌های فعلی بازار راضی نیست، جایگزینی سریع‌تر، شفاف‌تر و مدرن‌تر ارائه می‌دهد.`,
    },
    social: {
      voiceAndTone: { formality, boldness, purpose, vibe },
      weeklyCalendar: [1, 2, 3, 4, 5].map((day, i) => ({
        day: `روز ${day}`,
        type: i % 2 === 0 ? "Reel" : "Post",
        title: ["هوک ضربتی", "اثبات اجتماعی", "آموزش سریع و کاربردی", "مقایسه رقابتی", "پیشنهاد محدود"][i],
        description: `سناریوی اجرایی روز ${day} برای رشد سریع ${titleSeed}`,
        hook: [
          "اگر این ریلز رو نبینی، داری بازار رو دودستی تقدیم رقیبت می‌کنی",
          "این چیزیه که مشتری‌های واقعی درباره‌مون گفتن، خودت قضاوت کن",
          "این نکته رو در ۳۰ ثانیه یاد بگیر و همین امروز اجرا کن",
          "فرق یه برند معمولی با یه برند برنده دقیقاً همینه",
          "این پیشنهاد فقط چند روز روی میزه، از دستش نده",
        ][i],
        scenario: [
          "شروع تند با یک سوال یا ادعای جنجالی، نمایش درد مخاطب، ضربه احساسی، CTA پایانی",
          "نمایش پیام یا نظر واقعی مشتری، عدد و نتیجه ملموس، دعوت به تجربه مشابه",
          "آموزش یک نکته کاربردی در چند قدم ساده با لحن دوستانه و قابل اجرا",
          "مقایسه دوربه‌دوی وضعیت قبل و بعد یا برند ما در برابر گزینه رایج بازار",
          "معرفی پیشنهاد ویژه با حس فوریت، شمارش معکوس و دعوت مستقیم به دایرکت",
        ][i],
        goal: ["Reach", "Trust", "Save/Share", "Positioning", "Conversion"][i],
        visualDescription: [
          "نور کنتراست‌دار، فونت درشت روی صفحه و ریتم تدوین تند",
          "کات از پیام‌ها و نظرات واقعی کاربران روی پس‌زمینه برند",
          "نمای نزدیک و اسکرین‌شات آموزشی همراه با اشاره‌گر و زیرنویس",
          "دو ستون مقایسه‌ای کنار هم با رنگ‌بندی متضاد",
          "رنگ فروش پررنگ، تایمر شمارش معکوس و افکت حرکتی روی CTA",
        ][i],
      })),
      pillars: [
        { title: "محتوای دردمحور", description: "شروع از یک درد واقعی و لمس‌پذیر بازار هدف برای جلب توجه فوری مخاطب" },
        { title: "اثبات و عدد", description: "نمایش عدد، نتیجه واقعی، تستیمونیال و شواهد ملموس از تجربه مشتریان" },
        { title: "ساخت اعتبار", description: "آموزش کوتاه و تیز برای تثبیت جایگاه تخصصی برند نزد مخاطب" },
        { title: "تبدیل با پیشنهاد", description: "کمپین‌های CTA‌محور با حس فوریت و پیشنهادهای زمان‌دار محدود" },
      ],
      growthHacks: [
        "ریلز سریالی پنج‌قسمتی با کلیف‌هنگر در پایان هر قسمت برای افزایش بازگشت مخاطب",
        "کمپین کلمه کلیدی در دایرکت برای جمع‌آوری سرنخ‌های گرم به‌صورت خودکار",
        "چالش محتوای کاربرساخته با جایزه کاربردی و بازنشر روزانه بهترین‌ها",
        "پست مشترک با صفحات هم‌حوزه برای جهش اولیه در دیده‌شدن و reach",
      ],
      hashtagClusters: [
        { theme: "Awareness", hashtags: tagsA },
        { theme: "Authority", hashtags: tagsB },
        { theme: "Conversion", hashtags: tagsC },
      ],
      iranianInfluencers: nicheConfig.influencers.map(([name, nicheName, ideaText]) => ({
        name,
        niche: nicheName,
        collaborationIdea: ideaText,
      })),
    },
    growth: {
      challengeTitle: "چالش رشد ۱۴ روزه",
      challengeDescription: "یک فلوی فشرده و اجرایی برای گرفتن اولین تراکشن قابل اندازه‌گیری در کوتاه‌ترین زمان",
      expectedResult: "افزایش reach، سرنخ ورودی و نرخ تبدیل اولیه",
      viralIdea: "چالش عمومی با شاخص روزانه قابل نمایش و امکان اشتراک‌گذاری نتایج توسط کاربران",
      mentorAdvice: "به‌جای انتشار زیاد و پراکنده، روی پیام درست و یک پیشنهاد دقیق تمرکز کن",
      goal: "ساخت موج تقاضا و تبدیل سریع آن به سرنخ یا خرید",
      timeframe: "۳۰ تا ۴۵ روز",
      targetAudience: `مخاطب اصلی مرتبط با ${titleSeed}`,
      keyCampaignMessage: "نتیجه سریع، اصطکاک کمتر، ارزش پیشنهادی شفاف",
      acquisitionMechanism: "ریلزهای پربازده + همکاری اینفلوئنسر + لندینگ‌پیج اختصاصی",
      engagementMechanism: "تریگر دایرکت، نظرسنجی تعاملی، محتوای قابل‌ذخیره",
      conversionMechanism: "پیشنهاد محدود زمانی + اثبات اجتماعی + CTA مستقیم",
      cta: "همین امروز شروع کن",
      incentiveLevers: "تخفیف ورود، پاداش معرفی به دوستان، دسترسی زودهنگام",
      viralTriggers: "مقایسه قبل و بعد، نتیجه واقعی با عدد، چالش قابل اشتراک‌گذاری",
      referralSystem: "کد معرفی با پاداش دوطرفه برای معرف و کاربر جدید",
      gamification: "نشان دستاورد، جدول امتیازات، استریک روزانه فعالیت",
      growthChannels: ["Instagram", "Telegram", "SEO", "همکاری اینفلوئنسر", "Referral"],
      partnerships: "همکاری با صفحات و برندهای مکمل در همین حوزه برای دسترسی به مخاطب مشترک",
      reengagement: "بازگشت کاربران غیرفعال با پیام شخصی‌سازی‌شده و پیشنهاد تازه",
      requiredResources: "استراتژیست محتوا، تدوین‌گر، طراح بصری، متخصص رشد",
      executionCost: "بین ۸۰ تا ۱۸۰ میلیون تومان بسته به شدت اجرا",
      kpis: ["Reach", "Profile Visits", "CTR", "Leads", "CAC", "Conversion Rate"],
      resultPrediction: "اگر پیشنهاد و پیام با مخاطب همخوان باشد، رشد اولیه سریع و قابل اندازه‌گیری خواهد بود",
      scalabilityPlan: "بعد از یافتن fit اولیه، بودجه را روی محتواهای برنده و مخاطب‌های مشابه افزایش بده",
    },
    evaluation: {
      score: 84,
      marketScore: 82,
      brandScore: 86,
      growthScore: 85,
      executionScore: 79,
      riskScore: 58,
      feedback: "پتانسیل رشد خوبی دارد، اما تمایز بصری و اثبات اجتماعی باید خیلی زود ساخته شود.",
      strengthsSummary: `برند ${nicheConfig.names[0]} موضع‌گیری شفافی دارد، مسیر رشد روی شبکه‌های اجتماعی اجرایی است و معماری سایت از همان ابتدا conversion-aware طراحی شده.`,
      riskFactors: [
        "وابستگی زیاد به یک کانال رشد (اینستاگرام) در فاز اول",
        "نبود سابقه و اعتبار برند در نبود نمونه‌کار یا testimonial واقعی",
        "ریسک رقابت قیمتی در صورت ورود بازیگران بزرگ‌تر بازار",
      ],
      milestonesForInvestment: [
        "رسیدن به اولین ۱۰۰۰ کاربر فعال یا مشتری در ۴۵ روز",
        "اثبات message-market fit با نرخ تبدیل قابل قبول از کمپین اولیه",
        "راه‌اندازی نسخه اول وب‌سایت conversion-first با money pageهای تعریف‌شده",
      ],
      verdict: `تهمتن: ایده «${titleSeed}» پایه محکمی دارد، اما هنوز در میدان آزمایش نشده است. اگر تیم در ۴۵ روز اول به نقاط عطف تعیین‌شده برسد، آماده ورود سرمایه برای مقیاس‌دهی خواهد بود؛ در غیر این صورت باید پیام و مخاطب هدف بازنگری شود.`,
      investmentOffer: true,
      investmentPercentage: 15,
      investmentDecision: "ایده برای تست بازار و جذب سرمایه مرحله pre-seed قابل قبول است؛ نهایی‌شدن سرمایه‌گذاری منوط به دستیابی به نقاط عطف تعیین‌شده توسط تهمتن است.",
    },
    summary: `هیوارا برای «${titleSeed}» یک استراتژی تهاجمی، social-first و conversion-aware پیشنهاد می‌دهد که روی برند premium، رشد سریع و نفوذ در بازار ایران متمرکز است؛ تهمتن این طرح را برای ورود سرمایه مرحله pre-seed مشروط تایید کرده است.`,
  };
}

function normalizePlanShape(plan) {
  const safe = plan && typeof plan === "object" ? plan : {};
  const branding = Array.isArray(safe.branding) ? safe.branding : [];
  const social = safe.social && typeof safe.social === "object" ? safe.social : {};
  const growth = safe.growth && typeof safe.growth === "object" ? safe.growth : {};
  const evaluation =
    safe.evaluation && typeof safe.evaluation === "object" ? safe.evaluation : {};
  const website = safe.website && typeof safe.website === "object" ? safe.website : {};
  const visuals = safe.visuals && typeof safe.visuals === "object" ? safe.visuals : {};
  const marketIntel =
    safe.marketIntel && typeof safe.marketIntel === "object" ? safe.marketIntel : {};
  const swot = marketIntel.swot && typeof marketIntel.swot === "object" ? marketIntel.swot : {};

  return deepRepairStrings({
    branding,
    visuals,
    website,
    marketIntel: {
      ...marketIntel,
      marketSize:
        marketIntel.marketSize && typeof marketIntel.marketSize === "object"
          ? marketIntel.marketSize
          : {},
      competitors: Array.isArray(marketIntel.competitors) ? marketIntel.competitors : [],
      swot: {
        strengths: normalizeStringArray(swot.strengths),
        weaknesses: normalizeStringArray(swot.weaknesses),
        opportunities: normalizeStringArray(swot.opportunities),
        threats: normalizeStringArray(swot.threats),
      },
    },
    social: {
      ...social,
      pillars: Array.isArray(social.pillars) ? social.pillars : [],
      growthHacks: normalizeStringArray(social.growthHacks),
      hashtagClusters: Array.isArray(social.hashtagClusters)
        ? social.hashtagClusters
        : [],
      iranianInfluencers: Array.isArray(social.iranianInfluencers)
        ? social.iranianInfluencers
        : [],
      weeklyCalendar: Array.isArray(social.weeklyCalendar) ? social.weeklyCalendar : [],
    },
    growth,
    evaluation: {
      ...evaluation,
      riskFactors: normalizeStringArray(evaluation.riskFactors),
      milestonesForInvestment: normalizeStringArray(evaluation.milestonesForInvestment),
    },
    summary: String(safe.summary || ""),
  });
}

function isUsablePlan(plan) {
  return (
    Array.isArray(plan?.branding) &&
    plan.branding.length >= 2 &&
    Array.isArray(plan?.social?.weeklyCalendar) &&
    plan.social.weeklyCalendar.length >= 3 &&
    Array.isArray(plan?.social?.hashtagClusters) &&
    plan.social.hashtagClusters.length >= 1 &&
    Array.isArray(plan?.marketIntel?.competitors) &&
    plan.marketIntel.competitors.length >= 1
  );
}

function extractJsonObject(text) {
  const cleaned = stripCodeFences(text);
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("Model response did not contain valid JSON");
    }
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

async function callArvanChat({ messages, useSchema }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response;

  try {
    response = await fetch(getChatCompletionsUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeaderValue(),
      },
      body: JSON.stringify({
        model: process.env.ARVAN_AI_MODEL || DEFAULT_MODEL,
        temperature: 0.35,
        max_tokens: MAX_COMPLETION_TOKENS,
        messages,
        ...(useSchema
          ? {
              response_format: {
                type: "json_schema",
                json_schema: {
                  name: "marketing_plan",
                  strict: true,
                  schema: marketingSchema,
                },
              },
            }
          : {}),
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(
        `Arvan AI request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds`
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }

  const rawText = await response.text();
  let data = null;

  try {
    data = JSON.parse(rawText);
  } catch {
    data = null;
  }

  if (!response.ok) {
    const details =
      data?.error?.message || data?.message || rawText.slice(0, 500) || "Unknown upstream error";
    throw new Error(`Arvan AI request failed (${response.status}): ${details}`);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Arvan AI returned empty content");
  }

  return normalizePlanShape(deepRepairStrings(extractJsonObject(content)));
}

export async function generateHivaraPlan({ idea, mode = "generate" }) {
  const authHeader = getAuthHeaderValue();
  if (!authHeader) {
    throw new Error("Missing ARVAN_AI_API_KEY");
  }

  const knowledgeContext = await loadKnowledgeContext();
  const systemPrompt = buildSystemPrompt({ knowledgeContext, mode });
  const userPrompt = buildUserPrompt(idea);

  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `${userPrompt}\n\n${buildOutputContract()}`,
    },
  ];

  try {
    const plan = await callArvanChat({ messages, useSchema: false });
    if (isUsablePlan(plan)) return plan;

    const fallback = deepRepairStrings(buildRichFallbackPlan(idea));
    return {
      ...fallback,
      summary: repairMojibakeString(plan?.summary) || fallback.summary,
    };
  } catch (error) {
    console.error("Arvan generation failed, using rich fallback:", error);
    return deepRepairStrings(buildRichFallbackPlan(idea));
  }
}

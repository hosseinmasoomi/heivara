import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const marketingSchema = {
  type: Type.OBJECT,
  properties: {
    branding: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          rationale: { type: Type.STRING },
          slogan: { type: Type.STRING },
        },
        required: ["name", "rationale", "slogan"],
      },
      description: "List of EXACTLY 4 distinct brand concepts",
    },
    visuals: {
      type: Type.OBJECT,
      properties: {
        primaryColor: { type: Type.STRING },
        secondaryColor: { type: Type.STRING },
        fontStyle: { type: Type.STRING },
        logoConcept: { type: Type.STRING },
        logoSvg: { type: Type.STRING },
        moodDescription: { type: Type.STRING },
      },
      required: [
        "primaryColor",
        "secondaryColor",
        "fontStyle",
        "logoConcept",
        "logoSvg",
        "moodDescription",
      ],
    },
    website: {
      type: Type.OBJECT,
      properties: {
        structure: { type: Type.ARRAY, items: { type: Type.STRING } },
        keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
        seoKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
        uiUxTips: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: [
        "structure",
        "keyFeatures",
        "seoKeywords",
        "techStack",
        "uiUxTips",
      ],
    },
    instagram: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          type: { type: Type.STRING, enum: ["Reel", "Post", "Story"] },
          title: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["day", "type", "title", "description"],
      },
      description: "A 5-day content calendar",
    },
    growth: {
      type: Type.OBJECT,
      properties: {
        challengeTitle: { type: Type.STRING },
        challengeDescription: { type: Type.STRING },
        expectedResult: { type: Type.STRING },
        viralIdea: { type: Type.STRING },
        mentorAdvice: { type: Type.STRING },
      },
      required: [
        "challengeTitle",
        "challengeDescription",
        "expectedResult",
        "viralIdea",
        "mentorAdvice",
      ],
    },
    evaluation: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER },
        feedback: { type: Type.STRING },
        investmentOffer: { type: Type.BOOLEAN },
        investmentPercentage: { type: Type.INTEGER },
      },
      required: [
        "score",
        "feedback",
        "investmentOffer",
        "investmentPercentage",
      ],
    },
    summary: { type: Type.STRING },
  },
  required: [
    "branding",
    "visuals",
    "website",
    "instagram",
    "growth",
    "evaluation",
    "summary",
  ],
};

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const businessIdea = (body?.businessIdea || "").trim();

    if (!businessIdea) {
      return NextResponse.json(
        { error: "businessIdea is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are Hivara (هیوارا), an elite Venture Capital & Marketing AI.

Analyze the user's business idea: "${businessIdea}"

Output strictly valid JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: marketingSchema,
        systemInstruction:
          "You are Hivara. You are professional, tech-savvy, and a sharp investor. You speak fluent Persian. You judge ideas fairly but strictly.",
      },
    });

    const raw = (response?.text || "").trim();
    if (!raw) throw new Error("Empty response from model");

    const clean = raw.replace(/```json\n?|\n?```/g, "").trim();
    const data = JSON.parse(clean);

    return NextResponse.json(data);
  } catch (err) {
    console.error("API marketing-plan error:", err);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}

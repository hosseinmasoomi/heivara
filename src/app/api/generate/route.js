import { NextResponse } from "next/server";
import OpenAI from "openai";
import { marketingSchema } from "../../../services/marketingSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const idea = body?.idea;

    if (!idea || typeof idea !== "string") {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are Hivara (هیوارا), an elite Venture Capital & Marketing AI. You speak Persian. Be strict but fair.",
        },
        { role: "user", content: `Idea:\n"${idea}"` },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "marketing_plan",
          schema: marketingSchema, // ✅ JS object
          strict: true,
        },
      },
    });

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    // Just in case model returns whitespace
    const parsed = JSON.parse(content.trim());
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("GPT ERROR:", err);
    return NextResponse.json(
      {
        error: "AI generation failed",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

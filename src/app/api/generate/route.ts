import { NextResponse } from "next/server";
import OpenAI from "openai";
import { marketingSchema } from "../../../services/marketingSchema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const { idea } = await req.json();

    if (!idea || typeof idea !== "string") {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // سریع + ارزون + پایدار
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are Hivara (هیوارا), an elite Venture Capital & Marketing AI. You speak Persian. Be strict but fair.",
        },
        {
          role: "user",
          content: `
Analyze this idea carefully and return STRICTLY valid JSON
that matches this schema. Do NOT add markdown.

Idea:
"${idea}"
          `,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "marketing_plan",
          schema: marketingSchema,
        },
      },
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(content));
  } catch (err: any) {
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

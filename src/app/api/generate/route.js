import { NextResponse } from "next/server";
import { generateHivaraPlan } from "@/services/hivaraAi";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const idea = String(body?.idea || "").trim();

    if (!idea) {
      return NextResponse.json({ error: "Idea is required" }, { status: 400 });
    }

    const plan = await generateHivaraPlan({
      idea,
      mode: "generate",
    });

    return NextResponse.json(plan);
  } catch (err) {
    console.error("Generate route error:", err);
    return NextResponse.json(
      {
        error: "AI generation failed",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

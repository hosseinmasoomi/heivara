import { NextResponse } from "next/server";
import { generateHivaraPlan } from "@/services/hivaraAi";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const businessIdea = String(body?.businessIdea || "").trim();

    if (!businessIdea) {
      return NextResponse.json(
        { error: "businessIdea is required" },
        { status: 400 }
      );
    }

    const plan = await generateHivaraPlan({
      idea: businessIdea,
      mode: "marketing-plan",
    });

    return NextResponse.json(plan);
  } catch (err) {
    console.error("API marketing-plan error:", err);
    return NextResponse.json(
      {
        error: "Failed to generate plan",
        details: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}

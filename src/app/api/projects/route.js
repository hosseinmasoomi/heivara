import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function inferScore(plan) {
  const score = Number(plan?.evaluation?.score);
  if (Number.isFinite(score)) return Math.max(0, Math.min(100, score));

  const parts = [
    Number(plan?.evaluation?.marketScore),
    Number(plan?.evaluation?.brandScore),
    Number(plan?.evaluation?.growthScore),
  ].filter(Number.isFinite);

  if (!parts.length) return 0;
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
}

function inferTitle(plan, idea) {
  const brandName = plan?.branding?.[0]?.name;
  if (brandName && String(brandName).trim()) return String(brandName).trim();

  const cleanIdea = String(idea || "").trim();
  if (!cleanIdea) return "پروژه بدون عنوان";
  return cleanIdea.slice(0, 60);
}

export async function GET() {
  const { user, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;
  if (!prisma?.project) {
    return NextResponse.json(
      { ok: false, error: "PROJECT_MODEL_UNAVAILABLE" },
      { status: 503 }
    );
  }

  const projects = await prisma.project.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      idea: true,
      title: true,
      aiScore: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ ok: true, projects });
}

export async function POST(req) {
  const { user, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;
  if (!prisma?.project) {
    return NextResponse.json(
      { ok: false, error: "PROJECT_MODEL_UNAVAILABLE" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => null);
  const idea = String(body?.idea || "").trim();
  const plan = body?.plan;

  if (!idea || !plan || typeof plan !== "object") {
    return NextResponse.json(
      { ok: false, error: "INVALID_PAYLOAD" },
      { status: 400 }
    );
  }

  const created = await prisma.project.create({
    data: {
      userId: user.id,
      idea,
      title: inferTitle(plan, idea),
      plan,
      aiScore: inferScore(plan),
      status: "Completed",
    },
    select: {
      id: true,
      idea: true,
      title: true,
      aiScore: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ ok: true, project: created });
}

// src/app/api/auth/onboarding/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const { user, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      phone: user.phone || null,
      name: user.name || "",
      email: user.email || "",
      onboardingCompleted: !!user.onboardingCompleted,
      role: user.role || "USER",
    },
  });
}

export async function POST(req) {
  const { user, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "")
    .trim()
    .toLowerCase();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "INVALID_NAME" },
      { status: 400 }
    );
  }

  // ایمیل اختیاریه، ولی اگر وارد شد validate ساده
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "INVALID_EMAIL" },
      { status: 400 }
    );
  }

  // email unique هست => اگر ایمیل دادی، چک کن مال یکی دیگه نباشه
  if (email) {
    const exists = await prisma.user.findFirst({
      where: { email, NOT: { id: user.id } },
      select: { id: true },
    });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "EMAIL_ALREADY_USED" },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      email: email || null,
      onboardingCompleted: true, // ✅ این معیار نهایی شماست
    },
    select: {
      id: true,
      phone: true,
      name: true,
      email: true,
      role: true,
      onboardingCompleted: true,
    },
  });

  return NextResponse.json({ ok: true, user: updated });
}

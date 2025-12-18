// src/app/api/auth/me/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireUser, clearSessionCookie } from "@/lib/auth";

export async function GET() {
  const { user, errorResponse } = await requireUser();

  if (errorResponse) {
    // ✅ فقط اگر 401 بود، کوکی را پاک کن (کوکی خراب/قدیمی)
    if (errorResponse.status === 401) {
      const res = NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      );
      clearSessionCookie(res);
      return res;
    }

    // 500 یا خطاهای دیگر
    return errorResponse;
  }

  return NextResponse.json({
    ok: true,
    user: {
      id: user.id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
      onboardingCompleted: user.onboardingCompleted,
    },
  });
}

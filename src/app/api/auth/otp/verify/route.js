export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeIranPhone, isValidIranMobile } from "@/lib/phone";
import { verifyOtpCode } from "@/lib/otp";
import { attachSession } from "@/lib/auth";

export async function POST(req) {
  const errorId = crypto.randomUUID();
  let step = "START";

  try {
    step = "READ_JSON";
    const body = await req.json(); // اگر Content-Type غلط باشه، همینجا می‌ترکه

    step = "NORMALIZE";
    const phone = normalizeIranPhone(body?.phone);
    const code = String(body?.code || "").trim();

    step = "VALIDATE_PHONE";
    if (!isValidIranMobile(phone)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_PHONE", errorId, step },
        { status: 400 }
      );
    }

    step = "VALIDATE_CODE";
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { ok: false, error: "INVALID_CODE", errorId, step },
        { status: 400 }
      );
    }

    step = "CHECK_MASTER_OTP";
    const masterOtp = process.env.DEV_MASTER_OTP;

    if (masterOtp && code === masterOtp) {
      step = "MASTER_OTP_BYPASS";

      const user = await prisma.user.upsert({
        where: { phone },
        update: {},
        create: { phone },
      });

      const res = NextResponse.json({
        ok: true,
        user: { id: user.id, phone: user.phone, role: user.role },
        needsOnboarding: !user.onboardingCompleted,
        bypass: "MASTER_OTP",
        errorId,
        step,
      });

      await attachSession(res, user.id);
      return res;
    }

    step = "DB_FIND_OTP";
    const otp = await prisma.otpCode.findFirst({
      where: { phone, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    });

    step = "CHECK_OTP_EXISTS";
    if (!otp) {
      return NextResponse.json(
        { ok: false, error: "OTP_NOT_FOUND", errorId, step },
        { status: 400 }
      );
    }

    step = "CHECK_ATTEMPTS";
    const maxAttempts = 5;
    if ((otp.attempts ?? 0) >= maxAttempts) {
      return NextResponse.json(
        { ok: false, error: "TOO_MANY_ATTEMPTS", errorId, step },
        { status: 429 }
      );
    }

    step = "VERIFY_CODE";
    const ok = verifyOtpCode({ phone, code, codeHash: otp.codeHash });
    if (!ok) {
      step = "INC_ATTEMPTS";
      await prisma.otpCode.update({
        where: { id: otp.id },
        data: { attempts: (otp.attempts ?? 0) + 1 },
      });
      return NextResponse.json(
        { ok: false, error: "WRONG_CODE", errorId, step },
        { status: 400 }
      );
    }

    step = "UPSERT_USER";
    const user = await prisma.user.upsert({
      where: { phone },
      update: {},
      create: { phone },
    });

    step = "SET_SESSION";
    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, phone: user.phone, role: user.role },
      needsOnboarding: !user.onboardingCompleted,
      errorId,
      step,
    });

    await attachSession(res, user.id);

    step = "CONSUME_OTP";
    await prisma.otpCode.update({
      where: { id: otp.id },
      data: { expiresAt: new Date(Date.now() - 1000) },
    });

    // آپدیت step نهایی در پاسخ (اختیاری)
    // (NextResponse بعد از ساخته‌شدن قابل تغییر body نیست، پس همین کافی است)
    return res;
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "INTERNAL_ERROR",
        errorId,
        step, // ✅ مهم‌ترین چیز: دقیقاً کجا ترکیده
        debug:
          process.env.NODE_ENV !== "production"
            ? {
                message: err?.message,
                stack: err?.stack,
                name: err?.name,
                code: err?.code,
                meta: err?.meta,
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}

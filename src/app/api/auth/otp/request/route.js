// src/app/api/auth/otp/request/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeIranPhone, isValidIranMobile } from "@/lib/phone";
import { generateOtpCode, hashOtpCode } from "@/lib/otp";

export async function POST(req) {
  try {
    const body = await req.json();
    const phone = normalizeIranPhone(body?.phone);

    if (!isValidIranMobile(phone)) {
      return NextResponse.json(
        {
          ok: false,
          error: "INVALID_PHONE",
          message: "شماره موبایل معتبر نیست.",
        },
        { status: 400 }
      );
    }

    // Rate limit: max 3 requests per 15 minutes for this phone (با مدل OtpCode)
    const fifteenMinAgo = new Date(Date.now() - 15 * 60 * 1000);
    const recentCount = await prisma.otpCode.count({
      where: { phone, createdAt: { gte: fifteenMinAgo } },
    });

    if (recentCount >= 3) {
      return NextResponse.json(
        {
          ok: false,
          error: "TOO_MANY_REQUESTS",
          message: "تعداد درخواست‌ها زیاد است. ۱۵ دقیقه بعد دوباره تلاش کنید.",
        },
        { status: 429 }
      );
    }

    const code = generateOtpCode(6);
    const expiresAt = new Date(Date.now() + 150 * 1000); // 150s

    await prisma.otpCode.create({
      data: {
        phone,
        codeHash: hashOtpCode({ phone, code }),
        expiresAt,
      },
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[OTP DEV] phone=${phone} code=${code} exp=${expiresAt.toISOString()}`
      );
    }

    return NextResponse.json({
      ok: true,
      message: "کد تایید ارسال شد.",
      expiresInSec: 150,
      resendInSec: 60,
    });
  } catch (err) {
    console.error("OTP REQUEST ERROR:", err);
    return NextResponse.json(
      { ok: false, error: "INTERNAL_ERROR", message: "خطای سرور." },
      { status: 500 }
    );
  }
}

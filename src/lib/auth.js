// src/lib/auth.js
import crypto from "crypto";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "hivara_session";

function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

function hashToken(raw) {
  return crypto.createHash("sha256").update(String(raw)).digest("hex");
}

export function getSessionCookieValue() {
  const jar = cookies();
  return jar.get(SESSION_COOKIE)?.value || null;
}

export async function getCurrentUser() {
  const raw = getSessionCookieValue();
  if (!raw) return null;

  const tokenHash = hashToken(raw);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

/**
 * ✅ FIX: headers() در Next جدید async است -> باید await شود
 */
export async function attachSession(res, userId) {
  const raw = createSessionToken();
  const tokenHash = hashToken(raw);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  // ✅ این خط‌ها علت 500 بودند
  const h = await headers();
  const ua = h.get("user-agent") || "";
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";

  // چون در schema فعلی Session فقط tokenHash/userId/expiresAt دارد،
  // ua/ip را ذخیره نمی‌کنیم (اگر خواستی فیلد اضافه می‌کنی)
  await prisma.session.create({
    data: {
      tokenHash,
      userId: String(userId),
      expiresAt,
    },
  });

  res.cookies.set(SESSION_COOKIE, raw, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return res;
}

export function clearSessionCookie(res) {
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
  return res;
}

export async function createSessionResponse(userId, redirectTo = null) {
  const res = redirectTo
    ? NextResponse.redirect(
        new URL(
          redirectTo,
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        )
      )
    : NextResponse.json({ ok: true });

  await attachSession(res, userId);
  return res;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      user: null,
      errorResponse: NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      ),
    };
  }
  return { user, errorResponse: null };
}

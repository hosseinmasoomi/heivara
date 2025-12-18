// src/lib/auth.js
import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const SESSION_COOKIE = "hivara_session";

export function createSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashSessionToken(raw) {
  return crypto.createHash("sha256").update(String(raw)).digest("hex");
}

export function sessionCookieOptions(expires) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(expires ? { expires } : {}),
  };
}

export function clearCookieOptions() {
  return {
    ...sessionCookieOptions(),
    expires: new Date(0),
    maxAge: 0,
  };
}

export async function getSessionCookieValue() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value || null;
}

export async function getCurrentUser() {
  const raw = await getSessionCookieValue();
  if (!raw) return null;

  const tokenHash = hashSessionToken(raw);

  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;

  // expire check
  if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  return session.user;
}

export async function attachSession(res, userId) {
  const raw = createSessionToken();
  const tokenHash = hashSessionToken(raw);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

  await prisma.session.create({
    data: {
      tokenHash,
      userId: String(userId),
      expiresAt,
    },
  });

  res.cookies.set(SESSION_COOKIE, raw, sessionCookieOptions(expiresAt));
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

export function clearSessionCookie(res) {
  res.cookies.set(SESSION_COOKIE, "", clearCookieOptions());
  return res;
}

export async function requireUser() {
  try {
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
  } catch (err) {
    console.error("requireUser/getCurrentUser ERROR:", err);
    return {
      user: null,
      errorResponse: NextResponse.json(
        { ok: false, error: "AUTH_INTERNAL_ERROR" },
        { status: 500 }
      ),
    };
  }
}

// src/app/api/auth/logout/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  SESSION_COOKIE,
  hashSessionToken,
  clearCookieOptions,
} from "@/lib/auth";

export async function POST(req) {
  try {
    const raw = req.cookies.get(SESSION_COOKIE)?.value;

    if (raw) {
      const tokenHash = hashSessionToken(raw);
      await prisma.session.deleteMany({ where: { tokenHash } });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, "", clearCookieOptions());
    return res;
  } catch (e) {
    // حتی اگه DB مشکل داشت، از نظر UX کوکی رو پاک کن
    console.error("LOGOUT ERROR:", e);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, "", clearCookieOptions());
    return res;
  }
}

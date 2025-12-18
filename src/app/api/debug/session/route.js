export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // یا { prisma }
import { SESSION_COOKIE, hashSessionToken } from "@/lib/auth";

export async function GET() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value || null;

  if (!raw) return NextResponse.json({ ok: true, hasCookie: false });

  const tokenHash = hashSessionToken(raw);
  const session = await prisma.session.findUnique({ where: { tokenHash } });

  return NextResponse.json({
    ok: true,
    hasCookie: true,
    sessionExists: !!session,
    expiresAt: session?.expiresAt || null,
  });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashSessionToken } from "../../../../../lib/crypto";

const COOKIE_NAME = "hivara_session";

export async function POST(req) {
  try {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    if (cookie) {
      const tokenHash = hashSessionToken(cookie);
      await prisma.session.deleteMany({ where: { tokenHash } });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: COOKIE_NAME,
      value: "",
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

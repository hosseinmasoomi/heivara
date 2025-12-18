export const runtime = "nodejs";

import { NextResponse } from "next/server";

console.log("✅ [PING ROUTE FILE LOADED]");

export async function GET() {
  console.log("✅ [PING HIT]");
  return NextResponse.json({ ok: true, pong: true });
}

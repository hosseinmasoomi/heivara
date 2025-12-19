// src/middleware.js
import { NextResponse } from "next/server";

const SESSION_COOKIE = "hivara_session";

function getInternalOrigin(request) {
  // پشت Cloudflare/Nginx اینها معمولاً درست‌ترن
  const xfHost = request.headers.get("x-forwarded-host");
  const host = xfHost || request.headers.get("host") || request.nextUrl.host;

  const xfProto = request.headers.get("x-forwarded-proto");
  let proto = xfProto || request.nextUrl.protocol.replace(":", "") || "http";

  // اگر رفت روی لوکال/127، حتماً http
  if (host.includes("127.0.0.1") || host.includes("localhost")) {
    proto = "http";
  }

  return `${proto}://${host}`;
}

async function fetchMe(request) {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) return { ok: false };

  const origin = getInternalOrigin(request);
  const url = new URL("/api/auth/me", origin);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
    cache: "no-store",
  });

  if (!res.ok) return { ok: false };

  const data = await res.json().catch(() => null);
  if (!data?.ok || !data?.user) return { ok: false };

  return { ok: true, user: data.user };
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isUserArea = pathname === "/user" || pathname.startsWith("/user/");
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAuthPage = pathname === "/login";
  const isOnboarding = pathname === "/onboarding";

  const needsAuthCheck =
    isUserArea || isAdminArea || isOnboarding || isAuthPage;

  if (!needsAuthCheck) return NextResponse.next();

  const me = await fetchMe(request);

  if (!me.ok && (isUserArea || isAdminArea || isOnboarding)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (me.ok && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = me.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(url);
  }

  if (me.ok && !me.user.onboardingCompleted && !isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  if (me.ok && me.user.onboardingCompleted && isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = me.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(url);
  }

  if (me.ok && isAdminArea && me.user.role !== "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  if (me.ok && isUserArea && me.user.role === "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login", "/onboarding"],
};

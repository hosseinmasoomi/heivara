// src/middleware.js
import { NextResponse } from "next/server";

const SESSION_COOKIE = "hivara_session";

async function fetchMe(request) {
  const raw = request.cookies.get(SESSION_COOKIE)?.value;
  if (!raw) return { ok: false };

  const url = new URL("/api/auth/me", request.nextUrl.origin);

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

  // فقط برای مسیرهای حساس
  const needsAuthCheck =
    isUserArea || isAdminArea || isOnboarding || isAuthPage;

  if (!needsAuthCheck) return NextResponse.next();

  const me = await fetchMe(request);

  // 1) اگر لاگین نیست و رفت admin/user/onboarding => login
  if (!me.ok && (isUserArea || isAdminArea || isOnboarding)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // 2) اگر لاگین هست، /login رو نبینه
  if (me.ok && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = me.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(url);
  }

  // 3) اگر onboarding ناقصه، همه‌جا بفرست onboarding (به جز خود onboarding)
  if (me.ok && !me.user.onboardingCompleted && !isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = "/onboarding";
    return NextResponse.redirect(url);
  }

  // 4) اگر onboarding کامل شده ولی رفت onboarding => بفرست پنل
  if (me.ok && me.user.onboardingCompleted && isOnboarding) {
    const url = request.nextUrl.clone();
    url.pathname = me.user.role === "ADMIN" ? "/admin" : "/user";
    return NextResponse.redirect(url);
  }

  // 5) قفل ادمین: یوزر عادی نتونه وارد /admin بشه
  if (me.ok && isAdminArea && me.user.role !== "ADMIN") {
    const url = request.nextUrl.clone();
    url.pathname = "/user";
    return NextResponse.redirect(url);
  }

  // 6) اگر ادمین وارد /user شد، ترجیحاً ببریمش /admin
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

import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // console.log("MIDDLEWARE HIT:", pathname);

  // ✅ اجازه بده خود صفحه coming-soon باز بشه
  if (pathname === "/coming-soon" || pathname.startsWith("/coming-soon/")) {
    return NextResponse.next();
  }

  // ✅ اجازه بده فایل‌های Next (JS/CSS) لود بشن
  if (pathname.startsWith("/_next")) return NextResponse.next();

  // ✅ اجازه بده فایل‌های عمومی/استاتیک لود بشن
  // (هر چی تو public داری مثل fonts, images, icons, assets)
  if (
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // ✅ فایل‌های ریشه
  if (
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  // ✅ اگر فونت از CDN/فایل با پسوند میاد (خیلی مهم)
  // اجازه بده درخواست‌های فایل مستقیم رد بشن
  if (
    /\.(?:css|js|map|png|jpg|jpeg|gif|webp|svg|ico|ttf|otf|woff|woff2|eot)$/.test(
      pathname
    )
  ) {
    return NextResponse.next();
  }

  // 🚫 بقیه همه چی -> coming-soon
  const url = req.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/:path*",
};

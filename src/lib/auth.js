// src/lib/auth.js
import { prisma } from "./prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ✅ ساخت سشن بعد از لاگین
export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 روز

  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  });

  const cookieStore = cookies(); // ❗ اینجا await لازم نیست
  cookieStore.set("sessionId", session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  return session;
}

// ✅ خواندن کاربر فعلی از کوکی + سشن
export async function getCurrentUser() {
  const cookieStore = cookies(); // ❗ بدون await
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session.user; // { id, phone, role, name, preference, createdAt, ... }
}

// ✅ فقط لاگین بودن را چک می‌کند (برای صفحات عادی)
export async function requireUser(redirectPath = "/login") {
  const user = await getCurrentUser();

  if (!user) {
    const target = redirectPath || "/account";
    redirect(`/login?redirect=${encodeURIComponent(target)}`);
  }

  return user;
}

// ✅ فقط ادمین‌ها اجازه عبور دارند (برای صفحات / لایوت ادمین)
export async function requireAdmin(redirectPath = "/login") {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    const target = redirectPath || "/admin";
    redirect(`/login?redirect=${encodeURIComponent(target)}`);
  }

  return user;
}

// ✅ نسخه مناسب API → هیچ redirectای نمی‌کند، فقط null برمی‌گرداند
export async function requireAdminApi() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

// ✅ logout برای استفاده در /api/auth/logout
export async function logout() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (sessionId) {
    await prisma.session.deleteMany({
      where: { id: sessionId },
    });
  }

  cookieStore.set("sessionId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

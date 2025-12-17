// src/lib/prisma.js
import { PrismaClient } from "@prisma/client";

// برای جلوگیری از ساخت چندباره PrismaClient در dev
const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // می‌تونی لاگ‌ها رو بعداً کم/زیاد کنی
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

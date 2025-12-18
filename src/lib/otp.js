// src/lib/otp.js
import crypto from "crypto";
import { normalizeIranPhone } from "./phone";

export function generateOtpCode(length = 6) {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return String(crypto.randomInt(min, max + 1));
}

function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

export function hashOtpCode({ phone, code }) {
  const secret = process.env.OTP_SECRET || "dev-secret";
  const p = normalizeIranPhone(phone);
  return sha256(`${secret}:${p}:${String(code)}`);
}

export function verifyOtpCode({ phone, code, codeHash }) {
  const h = hashOtpCode({ phone, code });

  // timing-safe compare
  const a = Buffer.from(h, "hex");
  const b = Buffer.from(String(codeHash), "hex");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

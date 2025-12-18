import crypto from "crypto";

export function randomOtp6() {
  // 6-digit numeric
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function sha256(input) {
  return crypto.createHash("sha256").update(String(input)).digest("hex");
}

export function hashOtpCode({ phone, code }) {
  const secret = process.env.OTP_SECRET || "dev-secret";
  return sha256(`${secret}:${phone}:${code}`);
}

export function hashSessionToken(token) {
  const secret = process.env.SESSION_SECRET || "dev-session-secret";
  return sha256(`${secret}:${token}`);
}

export function randomSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

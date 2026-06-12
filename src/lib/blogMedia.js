import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const BLOG_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "blog");
const BLOG_UPLOAD_PREFIX = "/uploads/blog/";

export function isBlogUploadPath(value) {
  return typeof value === "string" && value.startsWith(BLOG_UPLOAD_PREFIX);
}

export async function ensureBlogUploadDir() {
  await mkdir(BLOG_UPLOAD_DIR, { recursive: true });
}

export async function saveBlogImage(file) {
  if (!file) throw new Error("Image file is required.");

  const mime = String(file.type || "");
  if (!mime.startsWith("image/")) {
    throw new Error("Only image uploads are allowed.");
  }

  const ext =
    path.extname(String(file.name || "")).toLowerCase() ||
    `.${mime.split("/")[1] || "jpg"}`;

  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext)
    ? ext
    : ".jpg";

  const fileName = `${Date.now()}-${crypto.randomUUID()}${safeExt}`;
  const filePath = path.join(BLOG_UPLOAD_DIR, fileName);
  const bytes = Buffer.from(await file.arrayBuffer());

  await ensureBlogUploadDir();
  await writeFile(filePath, bytes);

  return `${BLOG_UPLOAD_PREFIX}${fileName}`;
}

export async function deleteBlogImage(imageUrl) {
  if (!isBlogUploadPath(imageUrl)) return;

  const fileName = imageUrl.slice(BLOG_UPLOAD_PREFIX.length);
  if (!fileName) return;

  const filePath = path.join(BLOG_UPLOAD_DIR, fileName);
  await unlink(filePath).catch(() => {});
}

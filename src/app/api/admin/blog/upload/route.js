import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { saveBlogImage } from "@/lib/blogMedia";

export const runtime = "nodejs";

export async function POST(request) {
  const { user, errorResponse } = await requireUser();
  if (errorResponse || !user) return errorResponse;
  if (user.role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "FORBIDDEN" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: "IMAGE_FILE_REQUIRED" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "IMAGE_TOO_LARGE" },
        { status: 400 }
      );
    }

    const url = await saveBlogImage(file);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    console.error("BLOG_IMAGE_UPLOAD_ERROR", error);
    return NextResponse.json(
      { ok: false, error: "BLOG_IMAGE_UPLOAD_FAILED" },
      { status: 500 }
    );
  }
}

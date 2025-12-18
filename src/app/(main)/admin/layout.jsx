import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }) {
  const { user, errorResponse } = await requireUser();

  if (errorResponse || !user) redirect("/login");
  if (!user.onboardingCompleted) redirect("/onboarding");
  if (user.role !== "ADMIN") redirect("/user");

  // ✅ خیلی مهم: هیچ div/flex اینجا نذار
  return children;
}

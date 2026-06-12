import AdminShell from "@/views/admin/shell/AdminShell";
import ProjectsSection from "@/views/admin/sections/ProjectsSection";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = prisma?.project
    ? await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              phone: true,
              email: true,
            },
          },
        },
        take: 200,
      })
    : [];

  const projectsData = projects.map((p) => ({
    id: p.id,
    name: p.title,
    idea: p.idea,
    owner: p.user?.name || p.user?.phone || "کاربر",
    type: "AI Plan",
    aiScore: p.aiScore || 0,
    status: p.status || "Completed",
  }));

  return (
    <AdminShell>
      <ProjectsSection projectsData={projectsData} />
    </AdminShell>
  );
}

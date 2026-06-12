import AdminShell from "@/views/admin/shell/AdminShell";
import OverviewSection from "@/views/admin/sections/OverviewSection";
import { prisma } from "@/lib/prisma";

export default async function AdminOverviewPage() {
  const projects = prisma?.project
    ? await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, phone: true } },
        },
        take: 8,
      })
    : [];

  const projectsData = projects.map((p) => ({
    id: p.id,
    name: p.title,
    owner: p.user?.name || p.user?.phone || "کاربر",
    aiScore: p.aiScore || 0,
    status: p.status || "Completed",
  }));

  const serverLogs = [
    {
      time: "10:42:01",
      level: "INFO",
      msg: "Projects loaded from database",
    },
    {
      time: "10:41:55",
      level: "WARN",
      msg: "AI queue usage is growing",
    },
    {
      time: "10:38:05",
      level: "INFO",
      msg: "Admin dashboard synced",
    },
  ];

  return (
    <AdminShell>
      <OverviewSection projectsData={projectsData} serverLogs={serverLogs} />
    </AdminShell>
  );
}

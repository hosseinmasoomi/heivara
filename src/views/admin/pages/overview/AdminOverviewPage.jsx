import AdminShell from "@/views/admin/shell/AdminShell";
import OverviewSection from "@/views/admin/sections/OverviewSection";

export default function AdminOverviewPage() {
  const projectsData = [
    {
      id: "P-101",
      name: "فروشگاه قهوه آنلاین",
      owner: "علی محمدی",
      aiScore: 84,
      status: "Completed",
    },
    {
      id: "P-102",
      name: "اپلیکیشن مدیریت مالی",
      owner: "سارا راد",
      aiScore: 92,
      status: "In Progress",
    },
  ];

  const serverLogs = [
    {
      time: "10:42:01",
      level: "INFO",
      msg: "New meeting booked",
    },
    {
      time: "10:41:55",
      level: "WARN",
      msg: "AI latency high",
    },
    {
      time: "10:38:05",
      level: "ERROR",
      msg: "SMTP timeout",
    },
  ];

  return (
    <AdminShell>
      <OverviewSection projectsData={projectsData} serverLogs={serverLogs} />
    </AdminShell>
  );
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const phone = String(process.env.ADMIN_PHONE || "").trim();
  const name = String(process.env.ADMIN_NAME || "Admin").trim();
  const email = String(process.env.ADMIN_EMAIL || "").trim() || null;

  if (!phone) {
    throw new Error("ADMIN_PHONE is required.");
  }

  const user = await prisma.user.upsert({
    where: { phone },
    update: {
      role: "ADMIN",
      onboardingCompleted: true,
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    },
    create: {
      phone,
      role: "ADMIN",
      onboardingCompleted: true,
      ...(email ? { email } : {}),
      ...(name ? { name } : {}),
    },
  });

  console.log("Admin ready:", {
    id: user.id,
    phone: user.phone,
    email: user.email,
    role: user.role,
  });
}

main()
  .catch((error) => {
    console.error("create-admin failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

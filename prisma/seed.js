const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: { slug: "general" },
    update: {},
    create: { name: "عمومی", slug: "general" },
  });
  await prisma.category.upsert({
    where: { slug: "marketing" },
    update: {},
    create: { name: "بازاریابی", slug: "marketing" },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

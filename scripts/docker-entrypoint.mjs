import { execSync } from "child_process";

function run(command) {
  execSync(command, { stdio: "inherit", env: process.env });
}

try {
  console.log("[docker-entrypoint] Applying Prisma migrations...");
  run("npx prisma migrate deploy");

  console.log("[docker-entrypoint] Starting Next.js server...");
  const port = process.env.PORT || "3000";
  run(`npx next start -H 0.0.0.0 -p ${port}`);
} catch (error) {
  console.error("[docker-entrypoint] Startup failed:", error);
  process.exit(1);
}

import { execSync } from "child_process"
import path from "path"

console.log("[v0] Starting Prisma migration...")

try {
  // Run the migration
  const result = execSync("npx prisma migrate dev --name init", {
    cwd: path.resolve(process.cwd()),
    stdio: "inherit",
    env: {
      ...process.env,
      NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
    },
  })

  console.log("[v0] Migration completed successfully!")
} catch (error) {
  console.error("[v0] Migration failed:", error)
  process.exit(1)
}

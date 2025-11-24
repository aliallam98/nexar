import { spawnSync } from "child_process"

console.log("[v0] Running database migration setup...\n")

const result = spawnSync("npx", ["ts-node", "scripts/setup-database.ts"], {
  cwd: process.cwd(),
  stdio: "inherit",
  env: {
    ...process.env,
    NEON_NEON_DATABASE_URL: process.env.NEON_DATABASE_URL,
  },
})

if (result.status !== 0) {
  console.error("\n[v0] Migration failed!")
  process.exit(1)
}

console.log("\n[v0] Migration completed successfully!")

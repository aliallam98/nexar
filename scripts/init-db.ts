import { prisma } from "@/lib/prisma";

async function main() {
  console.log("[v0] Starting database initialization...");

  try {
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("[v0] ✓ Database connected successfully!");

    // Verify tables exist by querying one
    const categoryCount = await prisma.category.count();
    console.log(`[v0] ✓ Tables exist. Categories: ${categoryCount}`);

    console.log("[v0] Database is ready!");
  } catch (error) {
    console.error("[v0] ✗ Database error:", error);
    console.error("[v0] Please ensure:");
    console.error(
      "[v0] 1. NEON_NEON_DATABASE_URL is set in environment variables"
    );
    console.error("[v0] 2. Run: npx prisma migrate dev --name init");
    console.error("[v0] 3. Run: npx prisma generate");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

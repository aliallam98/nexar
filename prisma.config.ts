import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Use your connection string here
    url: process.env.NEON_DATABASE_URL!,
  },
});

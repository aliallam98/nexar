import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Create Admin Users
  console.log("👤 Creating admin users...");
  
  const adminUsers = [
    {
      email: "ali@nexar.com",
      password: "123456",
      name: "Ali",
      role: "ADMIN" as const,
    },
    {
      email: "mohamed@nexar.com",
      password: "123456",
      name: "Mohamed",
      role: "ADMIN" as const,
    },
  ];

  for (const userData of adminUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      console.log(`   ⚠️  User ${userData.email} already exists, skipping...`);
      continue;
    }

    const hashedPassword = await hashPassword(userData.password);
    
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        role: userData.role,
        isActive: true,
      },
    });

    console.log(`   ✅ Created admin user: ${user.email} (${user.name})`);
  }

  // Create Expense Categories
  console.log("\n📁 Creating expense categories...");
  
  const categories = [
    { name: "Office Supplies", description: "Pens, paper, and office materials" },
    { name: "Technology", description: "Hardware, software, and tech equipment" },
    { name: "Travel", description: "Transportation and accommodation" },
    { name: "Marketing", description: "Advertising and promotional materials" },
    { name: "Utilities", description: "Electricity, internet, water" },
    { name: "Miscellaneous", description: "Other expenses" },
  ];

  for (const category of categories) {
    const existing = await prisma.expenseCategory.findUnique({
      where: { name: category.name },
    });

    if (existing) {
      console.log(`   ⚠️  Category "${category.name}" already exists, skipping...`);
      continue;
    }

    await prisma.expenseCategory.create({
      data: category,
    });

    console.log(`   ✅ Created category: ${category.name}`);
  }

  console.log("\n✨ Seed completed successfully!\n");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin User",
      role: "ADMIN",
      phone: "+201234567890",
    },
  });
  console.log("✓ Admin user created:", admin.email);

  // Create test user
  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: userPassword,
      name: "Test User",
      role: "CUSTOMER",
      phone: "+201234567891",
    },
  });
  console.log("✓ Test user created:", user.email);

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: "electronics" },
    update: {},
    create: {
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and gadgets",
      image: "https://via.placeholder.com/200",
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: "smartphones" },
    update: {},
    create: {
      name: "Smartphones",
      slug: "smartphones",
      description: "Mobile phones and devices",
      image: "https://via.placeholder.com/200",
      parentId: electronics.id,
    },
  });
  console.log("✓ Categories created");

  // Create brands
  const apple = await prisma.brand.upsert({
    where: { slug: "apple" },
    update: {},
    create: {
      name: "Apple",
      slug: "apple",
      description: "Apple Inc.",
      image: "https://via.placeholder.com/100",
    },
  });

  const samsung = await prisma.brand.upsert({
    where: { slug: "samsung" },
    update: {},
    create: {
      name: "Samsung",
      slug: "samsung",
      description: "Samsung Electronics",
      image: "https://via.placeholder.com/100",
    },
  });
  console.log("✓ Brands created");

  // Create products
  const products = [
    {
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      description: "Latest Apple flagship smartphone",
      price: 999.99,
      comparePrice: 1199.99,
      stock: 50,
      isFeatured: true,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: ["https://via.placeholder.com/400?text=iPhone+15+Pro"],
    },
    {
      name: "iPhone 15",
      slug: "iphone-15",
      description: "Apple iPhone 15",
      price: 799.99,
      comparePrice: 899.99,
      stock: 75,
      isFeatured: true,
      categoryId: smartphones.id,
      brandId: apple.id,
      images: ["https://via.placeholder.com/400?text=iPhone+15"],
    },
    {
      name: "Samsung Galaxy S24",
      slug: "samsung-galaxy-s24",
      description: "Samsung flagship smartphone",
      price: 899.99,
      comparePrice: 999.99,
      stock: 60,
      isFeatured: true,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: ["https://via.placeholder.com/400?text=Galaxy+S24"],
    },
    {
      name: "Samsung Galaxy A14",
      slug: "samsung-galaxy-a14",
      description: "Samsung budget smartphone",
      price: 199.99,
      stock: 100,
      categoryId: smartphones.id,
      brandId: samsung.id,
      images: ["https://via.placeholder.com/400?text=Galaxy+A14"],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log("✓ Products created");

  // Create test coupon
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      description: "Welcome discount",
      discountType: "PERCENTAGE",
      discountValue: 10,
      minPurchase: 100,
      maxUseCount: 100,
      maxUsePerUser: 1,
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });
  console.log("✓ Coupon created");

  // Create user address
  await prisma.address.upsert({
    where: { id: user.id + "-home" },
    update: {},
    create: {
      id: user.id + "-home",
      label: "Home",
      fullName: "Test User",
      phone: "+201234567891",
      country: "Egypt",
      city: "Cairo",
      street: "123 Main Street",
      postalCode: "11111",
      isDefault: true,
      userId: user.id,
    },
  });
  console.log("✓ User address created");

  console.log("\n✅ Seed completed successfully!");
  console.log("\nTest Credentials:");
  console.log("Admin: admin@example.com / admin123");
  console.log("User: user@example.com / user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

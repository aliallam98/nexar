# Database Setup Guide

## Prerequisites

Your project uses **Neon** (PostgreSQL) and **Prisma ORM**.

## Setup Steps

### 1. Verify Environment Variables

Make sure your Neon database URL is set in the environment:

In the v0 sidebar, go to **Vars** section and verify:
- `NEON_NEON_DATABASE_URL` - Your Neon PostgreSQL connection string
- `JWT_SECRET` - For JWT token signing (can be any random string)

### 2. Initialize Database Schema

Run the Prisma migration to create all tables:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

This will:
- Connect to your Neon database
- Create all tables defined in `prisma/schema.prisma`
- Generate the Prisma Client

### 3. Generate Prisma Client

\`\`\`bash
npx prisma generate
\`\`\`

### 4. Verify Database

Test that everything is connected:

\`\`\`bash
npx ts-node scripts/init-db.ts
\`\`\`

You should see:
\`\`\`
[v0] ✓ Database connected successfully!
[v0] ✓ Tables exist. Categories: 0
[v0] Database is ready!
\`\`\`

## Troubleshooting

### Error: "NEON_DATABASE_URL is not set"

**Solution:** Go to the **Vars** section in the v0 sidebar and add your Neon database URL.

### Error: "relation does not exist"

**Solution:** Run the migration again:
\`\`\`bash
npx prisma migrate reset --force
npx prisma migrate dev --name init
\`\`\`

### Error: "Can't reach database server"

**Solution:** 
1. Verify your Neon database is running
2. Check the connection string is correct
3. Make sure firewall allows connections

### Health Check Returns 500 Error

**Solution:**
1. Run `npx prisma migrate dev --name init`
2. Run `npx prisma generate`
3. Restart the development server: `npm run dev`

## Database Schema

Your database includes these main tables:

- **User** - User accounts with authentication
- **Product** - Product catalog with variants
- **Category** - Product categories
- **Brand** - Product brands
- **Cart** - Shopping cart items
- **Order** - Orders with status tracking
- **Payment** - Payment records
- **Coupon** - Discount coupons
- **Review** - Product reviews
- **Address** - Shipping addresses
- **Wishlist** - Saved products
- **Refund** - Refund records

## Next Steps

Once database is set up:

1. Go to http://localhost:3000
2. Click **"Health Check"** - should return "GraphQL server is running"
3. Click **"Create Category"** - creates a test category
4. Click **"Get All Categories"** - should see your created category
5. Test the full flow: Register → Create Product → Add to Cart → Create Order

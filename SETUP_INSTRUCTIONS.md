# ABI GraphQL Backend - Setup Instructions

## Critical Issue: Database Not Connected

Your GraphQL server is failing because the database connection is not configured. Follow these steps:

### Step 1: Check Environment Variables

In the v0 sidebar, go to **Vars** section and look for:
- `NEON_NEON_DATABASE_URL` or `DATABASE_URL`

If these are **missing or empty**, you need to add them.

### Step 2: Get Your Database URL from Neon

1. Go to your Neon project dashboard
2. Copy the connection string (should look like: `postgresql://user:password@host/database`)
3. In v0 sidebar → **Vars** → Add variable:
   - Name: `NEON_DATABASE_URL`
   - Value: [your connection string from Neon]

### Step 3: Initialize the Database Schema

Once you've added the environment variable, you need to create the database tables:

**Option A: Using Prisma CLI (Recommended)**
\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

**Option B: Using the init script**
\`\`\`bash
npx ts-node scripts/init-db.ts
\`\`\`

### Step 4: Restart the Development Server

\`\`\`bash
npm run dev
\`\`\`

### Step 5: Test the GraphQL Server

Open http://localhost:3000 and click "Health Check" - it should now return "GraphQL server is running"

## Troubleshooting

If you still see HTTP 500 errors:

1. **Check the console** for detailed error messages (they're logged when DEBUG_GRAPHQL is set)
2. **Verify DATABASE_URL** is set in environment variables
3. **Check Neon** - make sure your project is active and you can connect
4. **Run migrations** - `npx prisma migrate dev --name init`

## What the Backend Includes

- 38 GraphQL Queries
- 51 GraphQL Mutations  
- JWT Authentication with HTTP-Only Cookies
- Prisma ORM with PostgreSQL
- Type-safe database access
- Comprehensive error handling

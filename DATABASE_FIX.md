# Database Connection Fix

## Problem
The Neon integration is connected but the NEON_DATABASE_URL environment variable is missing.

## Solution

### Step 1: Get Your Connection String
1. Go to your Neon Console: https://console.neon.tech
2. Select your project and database
3. Click "Connection string" button
4. Copy the full connection string (looks like: `postgresql://user:password@host/database`)

### Step 2: Add to v0
1. In v0 sidebar, click **Vars**
2. Add a new variable:
   - Key: `DATABASE_URL`
   - Value: Paste your Neon connection string
3. Click Save

### Step 3: Initialize Database
1. Restart dev server: `npm run dev`
2. Run migration: `npx prisma migrate dev --name init`
3. This will create all database tables

### Step 4: Test Health Check
1. Go back to http://localhost:3000
2. Click "Health Check"
3. Should see: "GraphQL server is running successfully!"

## Troubleshooting

If you still see errors after adding DATABASE_URL:

1. **Check Neon connection string** - Make sure it has the format `postgresql://user:password@host/database`
2. **Restart dev server** - Environment variables are loaded on startup
3. **Check error logs** - Click "Health Check" and look at console for detailed error

If connection still fails, try the **Simple Test** step below to verify the database connection.

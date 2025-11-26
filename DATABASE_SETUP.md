# ⚠️ Database Setup Required

## Issue
The migration failed because `NEON_DATABASE_URL` is not properly configured in `.env` file.

## Fix Required
Please add your Neon database URL to `.env` file:

```env
NEON_DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

The URL should start with `postgresql://` or `postgres://`

## Next Steps After Fixing URL

1. **Run Migration**:
   ```bash
   npx prisma migrate dev --name simplify-to-admin-only-and-add-contact-requests
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Seed Database**:
   ```bash
   npx prisma db seed
   ```

This will:
- Create the new simplified schema
- Generate TypeScript types
- Create admin users (Ali and Mohamed)
- Create expense categories

## Alternative: Reset Database (if needed)
If you want to start fresh:
```bash
npx prisma migrate reset
```

This will drop all data and re-run migrations + seed.

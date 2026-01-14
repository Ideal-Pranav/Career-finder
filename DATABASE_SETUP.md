# Database & Authentication Setup Guide

## Prerequisites

1. **PostgreSQL Database** (Choose one):
   - Local: Install PostgreSQL from https://www.postgresql.org/download/
   - Cloud: Use [Supabase](https://supabase.com) (free tier) or [Neon](https://neon.tech) (recommended)

## Step 1: Create Database

### Option A: Using Neon (Recommended - Free)

1. Go to https://neon.tech
2. Sign up and create account
3. Create new project "career-finder"
4. Copy the connection string (looks like: `postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/career_finder`)

### Option B: Local PostgreSQL

```bash
# Create database
createdb career_finder

# Your connection string will be:
postgresql://YOUR_USERNAME@localhost:5432/career_finder
```

## Step 2: Configure Environment Variables

Create `.env` file in project root:

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/career_finder?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (Optional)
EMAIL_SERVER="smtp://username:password@smtp.gmail.com:587"
EMAIL_FROM="Career Finder <noreply@example.com>"
```

## Step 3: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: Web application
6. Authorized JavaScript origins: `http://localhost:3000`
7. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
8. Copy Client ID and Client Secret to `.env` file

## Step 4: Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

## Step 5: Populate Initial Data

```bash
# Run seed script to import careers from JSON
npm run seed
```

## Development

```bash
# Start dev server
npm run dev

# View database in browser
npx prisma studio
```

## Troubleshooting

### Database connection errors

- Verify DATABASE_URL is correct
- Check database is running
- Ensure firewall allows connection

### Auth not working

- Check NEXTAUTH_SECRET is set
- Verify Google OAuth credentials
- Confirm redirect URIs match exactly

### Prisma errors

```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

## Database Schema

The schema includes:

- **Users** - Authentication and profiles
- **Careers** - Career information
- **Bookmarks** - Saved careers per user
- **QuizResults** - Assessment quiz results
- **Colleges** - College/institute data
- **Scholarships** - Financial aid information
- **CareerRoadmaps** - Step-by-step career paths

## Next Steps

1. Configure environment variables
2. Run migrations
3. Seed database with career data
4. Test authentication
5. Start building features!

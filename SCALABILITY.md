# Future Scalability Configuration

## Database Schema (PostgreSQL/MongoDB)

### Careers Collection/Table

```sql
CREATE TABLE careers (
  id VARCHAR(255) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  career_option VARCHAR(255) NOT NULL,
  stream VARCHAR(100) NOT NULL,
  description TEXT,
  skills_required JSONB,
  entry_level_roles TEXT,
  mid_level_roles TEXT,
  senior_level_roles TEXT,
  salary_entry INTEGER,
  salary_senior INTEGER,
  min_age INTEGER,
  max_age VARCHAR(20),  -- Can be "No limit" or number
  passing_criteria_12th TEXT,
  top_colleges JSONB,
  popular_exams JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_category ON careers(category);
CREATE INDEX idx_stream ON careers(stream);
CREATE INDEX idx_salary ON careers(salary_entry, salary_senior);
```

### Users Table (for Authentication)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',  -- 'user' or 'admin'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### User Favorites Table

```sql
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  career_id VARCHAR(255) REFERENCES careers(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, career_id)
);
```

### Career Comparisons Table

```sql
CREATE TABLE career_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  career_ids JSONB,  -- Array of career IDs
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Routes Structure

### Authentication Routes

```
/api/auth/
├── register      POST   - Register new user
├── login         POST   - Login user
├── logout        POST   - Logout user
├── me            GET    - Get current user
└── refresh       POST   - Refresh JWT token
```

### Career Routes

```
/api/careers/
├── /             GET    - List all careers (with filtering)
├── /:id          GET    - Get single career by ID
├── /             POST   - Create new career (admin only)
├── /:id          PUT    - Update career (admin only)
├── /:id          DELETE - Delete career (admin only)
└── /search       POST   - Advanced search with filters
```

### Favorites Routes

```
/api/favorites/
├── /             GET    - Get user's favorites
├── /             POST   - Add career to favorites
└── /:id          DELETE - Remove from favorites
```

### Comparison Routes

```
/api/comparisons/
├── /             GET    - Get user's comparisons
├── /             POST   - Save new comparison
└── /:id          DELETE - Delete comparison
```

---

## Environment Variables (.env.example)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/career_finder"
# or for MongoDB
MONGODB_URI="mongodb://localhost:27017/career_finder"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
JWT_SECRET="your-jwt-secret-change-in-production"

# Email (for password reset, etc.)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="Career Finder <noreply@careerfinder.com>"

# API Keys (if needed for future integrations)
OPENAI_API_KEY="sk-..."
ANALYTICS_ID="GA-..."

# Admin Configuration
ADMIN_EMAIL="admin@careerfinder.com"

# Feature Flags
ENABLE_REGISTRATION=true
ENABLE_COMPARISON=true
ENABLE_FAVORITES=true

# Performance
DATABASE_POOL_SIZE=10
CACHE_TTL=3600

# Production Only
NODE_ENV="production"
```

---

## Authentication Setup (NextAuth.js)

### Installation

```bash
npm install next-auth bcryptjs
npm install --save-dev @types/bcryptjs
```

### Configuration (app/api/auth/[...nextauth]/route.ts)

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db"; // Your database connection

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password_hash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## File Structure for Scalability

```
career-finder/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── careers/
│   │   │   ├── route.ts           # List/Create careers
│   │   │   ├── [id]/
│   │   │   │   └── route.ts       # Get/Update/Delete career
│   │   │   └── search/
│   │   │       └── route.ts       # Advanced search
│   │   ├── favorites/
│   │   │   └── route.ts
│   │   └── comparisons/
│   │       └── route.ts
│   ├── admin/
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── careers/
│   │   │   ├── page.tsx           # Career management
│   │   │   ├── new/
│   │   │   │   └── page.tsx       # Add new career
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Edit career
│   │   └── users/
│   │       └── page.tsx           # User management
│   └── auth/
│       ├── signin/
│       │   └── page.tsx
│       └── signup/
│           └── page.tsx
├── lib/
│   ├── db.ts                      # Database connection
│   ├── auth.ts                    # Auth utilities
│   ├── validations.ts             # Zod schemas
│   └── api-client.ts              # API client utilities
├── hooks/
│   ├── useCareerData.ts           # Career data fetching hook
│   ├── useFavorites.ts            # Favorites management
│   └── useComparisons.ts          # Comparisons management
├── middleware.ts                   # Auth middleware
└── .env.example                   # Environment template
```

---

## Data Migration Script

### From JSON to Database

```typescript
// scripts/migrate-data.ts
import { careers } from "@/data/careers.json";
import { db } from "@/lib/db";

async function migrateCareerData() {
  console.log("Starting migration...");

  for (const career of careers) {
    await db.career.create({
      data: {
        id: career.id,
        category: career.category,
        career_option: career.career_option,
        stream: career.stream,
        description: career.description,
        skills_required: career.skills_required,
        entry_level_roles: career.entry_level_roles,
        mid_level_roles: career.mid_level_roles,
        senior_level_roles: career.senior_level_roles,
        salary_entry: career.salary_entry,
        salary_senior: career.salary_senior,
        min_age: career.min_age,
        max_age: career.max_age,
        passing_criteria_12th: career.passing_criteria_12th,
        top_colleges: career.top_colleges,
        popular_exams: career.popular_exams,
      },
    });
    console.log(`Migrated: ${career.career_option}`);
  }

  console.log("Migration complete!");
}

migrateCareerData()
  .catch(console.error)
  .finally(() => process.exit());
```

Run with:

```bash
npx tsx scripts/migrate-data.ts
```

---

## API Client Hook Example

### hooks/useCareerData.ts

```typescript
"use client";

import { useState, useEffect } from "react";
import { Career, CareerFilters } from "@/types/career";

export function useCareerData() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = async (filters?: CareerFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters) {
        if (filters.categories.length)
          params.set("categories", filters.categories.join(","));
        if (filters.streams.length)
          params.set("streams", filters.streams.join(","));
        if (filters.minSalary)
          params.set("minSalary", filters.minSalary.toString());
        if (filters.maxSalary)
          params.set("maxSalary", filters.maxSalary.toString());
        // Add other filters...
      }

      const response = await fetch(`/api/careers?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch careers");

      const data = await response.json();
      setCareers(data.careers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  return { careers, loading, error, refetch: fetchCareers };
}
```

---

## Security Considerations

### 1. Authentication Middleware

```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Protect admin routes
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/api/careers/:path*"],
};
```

### 2. Input Validation (Zod)

```typescript
// lib/validations.ts
import { z } from "zod";

export const careerSchema = z.object({
  career_option: z.string().min(3).max(255),
  category: z.enum([
    "Engineering & Tech",
    "Medical & Healthcare",
    // ... all categories
  ]),
  stream: z.string(),
  salary_entry: z.number().min(0),
  salary_senior: z.number().min(0),
  // ... other fields
});
```

### 3. Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
```

---

## Deployment Checklist

- [ ] Set up production database (PostgreSQL/MongoDB)
- [ ] Configure environment variables
- [ ] Set up authentication (NextAuth.js)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS policies
- [ ] Set up error logging (Sentry, etc.)
- [ ] Configure CDN for static assets
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure analytics
- [ ] Test all API endpoints
- [ ] Security audit
- [ ] Performance optimization
- [ ] SEO optimization

---

## Monitoring & Analytics

### Recommended Tools

- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Performance**: Vercel Analytics, Lighthouse CI
- **Database**: Database-specific monitoring tools
- **Logging**: Winston, Pino

---

This architecture provides a solid foundation for scaling the Career Finder application from a static JSON-based solution to a full-stack application with user management, dynamic data, and advanced features.

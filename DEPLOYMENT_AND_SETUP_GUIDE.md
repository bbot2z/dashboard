# Bixbott Dashboard - Deployment & Setup Guide (20+ Pages)

**Version:** 1.0  
**Last Updated:** June 24, 2026  
**Project:** bbot2z/dashboard  
**Status:** Active Development

---

## Table of Contents

1. [Overview](#overview)
2. [Project Architecture](#project-architecture)
3. [Technology Stack](#technology-stack)
4. [Local Development Setup](#local-development-setup)
5. [Project Structure](#project-structure)
6. [Page Expansion Roadmap](#page-expansion-roadmap)
7. [Deployment to Vercel](#deployment-to-vercel)
8. [Environment Variables](#environment-variables)
9. [Database & Backend Setup](#database--backend-setup)
10. [Authentication Setup](#authentication-setup)
11. [API Integration Guide](#api-integration-guide)
12. [Performance Optimization](#performance-optimization)
13. [Monitoring & Logging](#monitoring--logging)
14. [Security Checklist](#security-checklist)
15. [CI/CD Pipeline](#cicd-pipeline)
16. [Troubleshooting](#troubleshooting)
17. [Maintenance & Updates](#maintenance--updates)
18. [Team Collaboration](#team-collaboration)
19. [Backup & Recovery](#backup--recovery)
20. [Support & Resources](#support--resources)

---

## 1. Overview

The Bixbott Dashboard is a comprehensive AI agent orchestration platform built with React and Vite, designed to manage multiple AI services, repositories, and workflows. This guide covers expanding the dashboard from its current state to 20+ pages and deploying it to Vercel with production-ready infrastructure.

### Key Features:
- **Agent Management:** Create, deploy, and monitor AI agents
- **Analytics & Monitoring:** Real-time service metrics and performance tracking
- **Team Collaboration:** Multi-user support with role-based access control
- **Integration Hub:** Connect with external services and APIs
- **Documentation Management:** Integrated docs with search capabilities
- **Audit Logging:** Comprehensive activity and event logging
- **Billing & Analytics:** Usage tracking and billing integration
- **Settings & Configuration:** Granular control over system behavior

---

## 2. Project Architecture

### Current Architecture (As-Is)
```
Client Layer (React + Vite)
    ↓
Express.js Backend (Node.js)
    ↓
External APIs (Gemini, GitHub, etc.)
```

### Target Architecture (To-Be)
```
┌─────────────────────────────────────────────────┐
│          Vercel Edge Network                    │
├─────────────────────────────────────────────────┤
│    Next.js Frontend (React 19 with SSR)         │
│    - Server Components for Auth/Data            │
│    - Client Components for Interactivity        │
├─────────────────────────────────────────────────┤
│    Vercel Serverless Functions (API Routes)     │
│    - Agent Management APIs                      │
│    - Analytics & Monitoring APIs                │
│    - Team & User Management APIs                │
│    - Billing & Analytics APIs                   │
│    - Settings & Configuration APIs              │
├─────────────────────────────────────────────────┤
│    Database Layer (PostgreSQL + Prisma)         │
│    - User & Team Management                     │
│    - Agent Configurations                       │
│    - Billing & Usage Data                       │
│    - Audit Logs                                 │
├─────────────────────────────────────────────────┤
│    External Integrations                        │
│    - Gemini API                                 │
│    - GitHub API                                 │
│    - Stripe (Payments)                          │
│    - SendGrid (Email)                           │
└─────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

### Frontend
- **Framework:** Vite + React 19.0.1
- **UI Components:** shadcn/ui (when migrating to Next.js)
- **Styling:** Tailwind CSS 4.1.14
- **Animations:** Motion 12.23.24
- **Icons:** Lucide React 0.546.0
- **Charts:** Recharts 3.8.1
- **Type Safety:** TypeScript 5.8.2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.21.2
- **Task Queue:** Vercel Queues (planned)
- **Database:** PostgreSQL with Prisma ORM (planned)
- **Authentication:** NextAuth.js / Auth.js (planned)
- **Email:** SendGrid (planned)
- **Payments:** Stripe (planned)

### Infrastructure
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Database:** Vercel Postgres or Neon
- **Storage:** Vercel Blob Storage
- **CI/CD:** GitHub Actions + Vercel Deployment
- **Monitoring:** Vercel Analytics + Sentry (planned)
- **Logging:** Vercel Logs

### External Services
- **AI:** Google Gemini API
- **Version Control:** GitHub API
- **Payments:** Stripe API
- **Email:** SendGrid API
- **Observability:** Sentry (error tracking)

---

## 4. Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn package manager
- Git
- Vercel CLI (optional but recommended)
- A text editor (VS Code recommended)

### Step 1: Clone Repository
```bash
git clone https://github.com/bbot2z/dashboard.git
cd dashboard
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Setup Environment Variables
Create a `.env.local` file in the project root:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# GitHub (optional for repo features)
VITE_GITHUB_TOKEN=your_github_token_here

# Backend URL (local development)
VITE_API_URL=http://localhost:3000

# Database (when added)
DATABASE_URL=postgresql://user:password@localhost:5432/bixbott

# Authentication
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Stripe (when added)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### Step 4: Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or `http://localhost:5173` for Vite).

### Step 5: Verify Setup
1. Open http://localhost:3000 in your browser
2. You should see the Bixbott dashboard landing page
3. Try navigating through available sections (Tools, Repos, Chat, Docs)

---

## 5. Project Structure

### Current Structure
```
dashboard/
├── src/
│   ├── components/
│   │   ├── BixbottAgentChat.tsx        # AI chat interface
│   │   ├── HealthGaugeSection.tsx      # Health monitoring
│   │   ├── InteractivePlayground.tsx   # Testing environment
│   │   ├── PRBlueprintWorkspace.tsx    # PR management
│   │   ├── PulseRateMeter.tsx          # Performance metrics
│   │   ├── RepoCard.tsx                # Repository display
│   │   └── ServiceCard.tsx             # Service status display
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # React entry point
│   ├── index.css                       # Global styles
│   ├── types.ts                        # TypeScript interfaces
│   └── data.ts                         # Mock data
├── api/                                # API endpoints
├── assets/                             # Static assets
├── server.ts                           # Express server configuration
├── package.json                        # Project dependencies
├── tsconfig.json                       # TypeScript config
├── vite.config.ts                      # Vite configuration
└── index.html                          # HTML entry point
```

### Planned Expanded Structure
```
dashboard/
├── src/
│   ├── app/                            # Next.js app directory (future)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── analytics/
│   │   │   ├── monitoring/
│   │   │   └── layout.tsx
│   │   ├── agents/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   ├── templates/
│   │   │   └── deployments/
│   │   ├── team/
│   │   │   ├── page.tsx
│   │   │   ├── users/
│   │   │   └── roles/
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── api-keys/
│   │   │   └── integrations/
│   │   ├── logs/
│   │   │   ├── page.tsx
│   │   │   ├── audit/
│   │   │   └── events/
│   │   ├── billing/
│   │   │   ├── page.tsx
│   │   │   └── usage/
│   │   ├── docs/
│   │   │   └── page.tsx
│   │   └── api/
│   │       ├── agents/
│   │       ├── team/
│   │       ├── billing/
│   │       └── ...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── NavBar.tsx
│   │   ├── dashboard/
│   │   │   ├── OverviewCards.tsx
│   │   │   ├── Charts.tsx
│   │   │   └── Widgets.tsx
│   │   ├── agents/
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentForm.tsx
│   │   │   └── DeploymentStatus.tsx
│   │   └── shared/
│   │       ├── Modal.tsx
│   │       ├── Table.tsx
│   │       └── StatusBadge.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   └── hooks/
│       ├── useAuth.ts
│       ├── useAgents.ts
│       └── useBilling.ts
├── prisma/
│   └── schema.prisma
├── .vercel/
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 6. Page Expansion Roadmap

### Phase 1: Core Dashboard (5 pages)
1. **Dashboard Overview** - Main dashboard with key metrics
2. **Analytics** - Detailed analytics and metrics
3. **Monitoring** - Service health and performance
4. **Agents** - List and manage AI agents
5. **Agent Details** - Individual agent configuration

### Phase 2: Agent Management (5 pages)
6. **Agent Templates** - Pre-built agent configurations
7. **Agent Deployments** - Deployment history and status
8. **Workflow Builder** - Visual workflow creation
9. **Model Management** - Manage AI models
10. **Testing Playground** - Test agents and workflows

### Phase 3: Team & Access (4 pages)
11. **Team Members** - Manage team members
12. **User Roles** - Define and manage roles
13. **Permissions** - Granular permission settings
14. **Access Logs** - Audit trail of access

### Phase 4: Configuration (4 pages)
15. **Settings** - General system settings
16. **API Keys** - Manage API credentials
17. **Integrations** - Third-party integrations
18. **Webhooks** - Configure webhooks

### Phase 5: Monitoring & Logs (3 pages)
19. **Logs** - System and application logs
20. **Alerts** - Alert configuration and history
21. **Events** - System events tracking

### Phase 6: Billing & Account (2+ pages)
22. **Billing** - Payment and billing management
23. **Usage** - Usage tracking and limits
24. **Support** - Support tickets and documentation
25. **Account** - User account settings

### Phase 7: Documentation (1+ page)
26. **Documentation** - Internal documentation

---

## 7. Deployment to Vercel

### 7.1 Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- Environment variables configured

### 7.2 Initial Deployment Setup

#### Step 1: Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link
```

#### Step 2: Configure Vercel Project
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Choose bbot2z/dashboard
5. Configure project settings:
   - **Framework:** Next.js (for future migration) or Vite (current)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

#### Step 3: Add Environment Variables
In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.example`:
   ```
   GEMINI_API_KEY
   DATABASE_URL
   NEXTAUTH_SECRET
   STRIPE_PUBLIC_KEY
   STRIPE_SECRET_KEY
   ```

#### Step 4: Deploy
```bash
vercel deploy --prod
```

Or push to main branch and let Vercel auto-deploy.

### 7.3 Deployment Configuration File

Create `vercel.json` in project root:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "api/**": {
      "memory": 1024,
      "maxDuration": 30
    }
  },
  "redirects": [
    {
      "source": "/docs",
      "destination": "/documentation",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 7.4 Post-Deployment Verification
1. Visit deployed URL (provided by Vercel)
2. Test core functionality
3. Verify environment variables are loaded
4. Check Vercel analytics dashboard
5. Set up monitoring and alerts

---

## 8. Environment Variables

### Required Variables (All Environments)
```env
# Core Configuration
NODE_ENV=production|development
VITE_API_URL=https://your-api.vercel.app

# Authentication (for future implementation)
NEXTAUTH_SECRET=generated_secret_key_32_chars_min
NEXTAUTH_URL=https://your-domain.com

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# Database
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Optional Variables
```env
# GitHub Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_APP_ID=xxxx

# Stripe (Payments)
STRIPE_PUBLIC_KEY=pk_live_xxxx
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# SendGrid (Email)
SENDGRID_API_KEY=SG.xxxx

# Sentry (Error Tracking)
SENTRY_DSN=https://xxxx@xxxx.ingest.sentry.io/xxxx

# Slack Integration
SLACK_BOT_TOKEN=xoxb-xxxx
SLACK_SIGNING_SECRET=xxxx
```

### Development vs Production
- **Development:** Use `.env.local` file
- **Production:** Set via Vercel Dashboard → Settings → Environment Variables

---

## 9. Database & Backend Setup

### 9.1 Database Migration (Future)

When ready to add database support, migrate from Express + mock data to Next.js with Prisma:

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String     @id @default(cuid())
  email     String     @unique
  name      String?
  avatar    String?
  role      UserRole   @default(USER)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  
  agents    Agent[]
  teams     Team[]
  sessions  Session[]
}

model Agent {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      String   @default("idle")
  config      Json
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  deployments Deployment[]
}

model Deployment {
  id        String   @id @default(cuid())
  agentId   String
  agent     Agent    @relation(fields: [agentId], references: [id], onDelete: Cascade)
  version   Int
  status    String
  logs      String?
  createdAt DateTime @default(now())
}

model Team {
  id      String @id @default(cuid())
  name    String
  members User[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum UserRole {
  ADMIN
  MANAGER
  USER
  VIEWER
}
```

### 9.2 API Endpoints Structure

```
/api/
├── /agents
│   ├── GET    /           (list agents)
│   ├── POST   /           (create agent)
│   ├── GET    /:id        (get agent)
│   ├── PUT    /:id        (update agent)
│   ├── DELETE /:id        (delete agent)
│   └── POST   /:id/deploy (deploy agent)
├── /team
│   ├── GET    /           (list team members)
│   ├── POST   /           (add team member)
│   └── DELETE /:id        (remove team member)
├── /billing
│   ├── GET    /           (get billing info)
│   ├── GET    /usage      (get usage stats)
│   └── POST   /subscribe  (subscribe to plan)
├── /settings
│   ├── GET    /           (get settings)
│   └── PUT    /           (update settings)
└── /auth
    ├── POST   /login      (user login)
    ├── POST   /logout     (user logout)
    └── POST   /register   (user registration)
```

---

## 10. Authentication Setup

### 10.1 Current Status
- No authentication currently implemented
- Will use NextAuth.js when migrating to Next.js

### 10.2 Future Implementation Plan

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify credentials against database
        const user = await db.user.findUnique({
          where: { email: credentials?.email }
        });
        
        if (user && await verifyPassword(credentials?.password, user.password)) {
          return user;
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error"
  },
  session: {
    strategy: "jwt"
  }
};
```

### 10.3 Protected Routes Example
```typescript
// pages/dashboard.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  return <div>Welcome, {session.user.name}</div>;
}
```

---

## 11. API Integration Guide

### 11.1 Gemini API Integration

Already configured in server.ts. Usage:
```typescript
// In API route
const response = await ai.generateContent({
  contents: [{
    parts: [{ text: userMessage }]
  }]
});
```

### 11.2 GitHub API Integration

```typescript
// Fetch repositories
const response = await fetch('https://api.github.com/user/repos', {
  headers: {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});
```

### 11.3 Stripe Integration (Future)

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }]
});
```

---

## 12. Performance Optimization

### 12.1 Frontend Optimization
- **Code Splitting:** Lazy load pages using React.lazy()
- **Image Optimization:** Use next/image when migrating to Next.js
- **Bundle Analysis:** Run `npm run analyze` to check bundle size
- **Caching:** Implement service workers for offline support
- **Compression:** Gzip compression enabled by default on Vercel

### 12.2 Backend Optimization
- **Database Indexing:** Add indexes on frequently queried fields
- **Query Optimization:** Use Prisma select() for specific fields
- **Caching:** Redis for session and frequently accessed data
- **Rate Limiting:** Implement rate limiting on API routes

### 12.3 Monitoring Metrics
```typescript
// pages/api/metrics.ts
import { performance } from 'perf_hooks';

export default async function handler(req, res) {
  const start = performance.now();
  
  // Your logic here
  
  const duration = performance.now() - start;
  res.setHeader('X-Response-Time', duration);
  res.json({ success: true });
}
```

---

## 13. Monitoring & Logging

### 13.1 Vercel Analytics
- Enable in Vercel Dashboard → Analytics
- Track Core Web Vitals:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)

### 13.2 Error Tracking (Sentry Setup)

```typescript
// pages/_app.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});

export default Sentry.withProfiler(MyApp);
```

### 13.3 Logging Strategy
```typescript
// lib/logger.ts
enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug'
}

export function log(level: LogLevel, message: string, data?: any) {
  console.log(`[${level.toUpperCase()}] ${message}`, data);
  
  // Send to external service if needed
  if (level === LogLevel.ERROR) {
    // Send to Sentry or logging service
  }
}
```

---

## 14. Security Checklist

### Before Going to Production:
- [ ] All environment variables are secured and not committed to git
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured properly
- [ ] SQL injection prevention (use parameterized queries)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Secrets rotation policy in place
- [ ] Regular security audits scheduled
- [ ] Dependency vulnerabilities checked (`npm audit`)
- [ ] Database backups configured
- [ ] Access logs and audit trails enabled
- [ ] API authentication/authorization implemented
- [ ] Sensitive data encrypted

### Security Headers
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains"
        }
      ]
    }
  ]
}
```

---

## 15. CI/CD Pipeline

### 15.1 GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### 15.2 Pre-deployment Checklist
- [ ] All tests passing
- [ ] Code review completed
- [ ] No console errors or warnings
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Environment variables verified
- [ ] Staging deployment successful

---

## 16. Troubleshooting

### Issue: "Cannot find module"
**Solution:** Run `npm install` to install dependencies

### Issue: "Environment variable not found"
**Solution:** 
1. Check `.env.local` file exists
2. Verify variable name matches code
3. Restart dev server after adding variables

### Issue: "Build fails on Vercel"
**Solution:**
1. Check build logs in Vercel Dashboard
2. Verify `package.json` build command
3. Ensure all dependencies are in `package.json`

### Issue: "Database connection failed"
**Solution:**
1. Verify DATABASE_URL is correct
2. Check database is running
3. Test connection with `psql` command

### Issue: "API routes not working"
**Solution:**
1. Verify API route file location
2. Check HTTP method (GET, POST, etc.)
3. Verify request headers and body

---

## 17. Maintenance & Updates

### Regular Maintenance Schedule
- **Daily:** Monitor error logs and performance metrics
- **Weekly:** Review user feedback and support tickets
- **Bi-weekly:** Update dependencies (`npm update`)
- **Monthly:** Security audit and vulnerability check
- **Quarterly:** Performance optimization review
- **Annually:** Architecture review and technical debt assessment

### Dependency Updates
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package@latest

# Check for security vulnerabilities
npm audit
npm audit fix
```

### Database Maintenance
- Regular backups (automated on Vercel Postgres)
- Query optimization
- Index maintenance
- Disk space monitoring

---

## 18. Team Collaboration

### Git Workflow
```
main (production)
  ↑
  └── develop (staging)
      ↑
      └── feature/feature-name (feature branches)
```

### Commit Convention
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(dashboard): add analytics page

Add new analytics page with real-time metrics and charts.
Implements data fetching from new analytics API endpoint.

Closes #123
```

### Code Review Process
1. Create feature branch
2. Make changes
3. Create pull request
4. Request code review (2+ approvals)
5. Merge to develop
6. Merge develop to main (after testing)

---

## 19. Backup & Recovery

### Database Backups
- **Frequency:** Daily automated backups
- **Retention:** 30 days minimum
- **Testing:** Monthly restore testing

### Application Backups
- All code backed up on GitHub
- Build artifacts stored in Vercel
- Secrets managed in Vercel Dashboard

### Disaster Recovery Plan
1. **Recovery Time Objective (RTO):** 1 hour
2. **Recovery Point Objective (RPO):** 24 hours
3. **Backup Validation:** Weekly
4. **Documentation:** Maintained in README

---

## 20. Support & Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community & Support
- GitHub Issues: https://github.com/bbot2z/dashboard/issues
- Vercel Support: https://vercel.com/help
- Stack Overflow: Tag questions with `vercel`, `nextjs`, `react`

### Contact & Team
- Team Lead: [Team Lead Email]
- DevOps: [DevOps Contact]
- Support Email: support@example.com
- Slack Channel: #bixbott-dashboard

---

## Appendix A: Quick Reference

### Common Commands
```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server

# Linting & Testing
npm run lint            # Run linter
npm run format          # Format code with Prettier
npm test                # Run tests

# Database
npx prisma migrate dev --name migration_name  # Create migration
npx prisma generate    # Generate Prisma client

# Deployment
vercel deploy           # Deploy to staging
vercel deploy --prod    # Deploy to production
```

### Useful URLs (Post-Deploy)
- **Production:** https://bixbott-dashboard.vercel.app
- **Analytics:** https://vercel.com/dashboard
- **Database Admin:** (Provided by Vercel Postgres)
- **API Documentation:** /api/docs

---

## Appendix B: Glossary

- **Agent:** An AI entity that performs specific tasks
- **Deployment:** Release of an agent to production
- **Repository:** Version control repository
- **Webhook:** Automated message sent when events occur
- **Rate Limiting:** Restricting number of requests per time period
- **RTO:** Recovery Time Objective - maximum acceptable downtime
- **RPO:** Recovery Point Objective - maximum acceptable data loss

---

**Document Version:** 1.0  
**Last Updated:** June 24, 2026  
**Status:** Active  
**Next Review:** July 24, 2026

For the latest version, visit: [Repository README](https://github.com/bbot2z/dashboard)

# Bixbott Dashboard - Quick Start Guide

**Perfect for:** New team members, quick setup, getting started fast

---

## 5-Minute Setup

### 1. Clone & Install
```bash
git clone https://github.com/bbot2z/dashboard.git
cd dashboard
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Start Development
```bash
npm run dev
# Opens http://localhost:3000 (Vite) or http://localhost:5173
```

### 4. You're Ready!
Navigate the dashboard and start developing.

---

## 10-Minute Overview

### What is Bixbott?
Bixbott is an AI agent orchestration platform that manages multiple AI services, deployments, and workflows through an intuitive dashboard interface.

### Key Features (Today)
- Service monitoring and status tracking
- Chat interface with Gemini AI
- Repository browsing and management
- PR blueprint creation
- Interactive playground
- Documentation hub

### Key Features (Coming with 20-page expansion)
- Full dashboard analytics
- Agent management and deployment
- Team collaboration and roles
- Comprehensive settings and configuration
- Billing and usage tracking
- Advanced monitoring and alerting

---

## Project Structure (2-Minute Overview)

```
dashboard/
├── src/                    # Source code
│   ├── components/        # React components
│   ├── App.tsx           # Main component
│   ├── types.ts          # TypeScript types
│   ├── data.ts           # Mock data
│   └── index.css         # Global styles
├── api/                  # API endpoints (future)
├── server.ts            # Express server
├── package.json         # Dependencies
└── vite.config.ts       # Vite configuration
```

---

## Common Development Tasks

### Running Tests
```bash
npm test          # Run all tests
npm test:watch    # Run tests in watch mode
npm test:coverage # Generate coverage report
```

### Code Quality
```bash
npm run lint      # Check code quality
npm run format    # Format code with Prettier
npm run type-check # Check TypeScript types
```

### Building
```bash
npm run build      # Build for production
npm run preview    # Preview production build locally
npm start         # Start production server
```

---

## Making Changes

### Creating a Feature
```bash
# 1. Create feature branch
git checkout -b feature/your-feature-name

# 2. Make changes to src/ files
# 3. Test locally: npm run dev

# 4. Commit changes
git commit -m "feat: describe your feature"

# 5. Push to GitHub
git push origin feature/your-feature-name

# 6. Create Pull Request on GitHub
# 7. Wait for code review and tests to pass
```

### Adding a New Component
```typescript
// src/components/YourComponent.tsx
export function YourComponent() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Your Component</h2>
    </div>
  );
}
```

### Adding to App.tsx
```typescript
import { YourComponent } from "./components/YourComponent";

export default function App() {
  return (
    <div>
      <YourComponent />
    </div>
  );
}
```

---

## Deployment (Vercel)

### First Time Deployment
1. Go to vercel.com and sign up
2. Connect your GitHub account
3. Click "New Project" → Select this repository
4. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables
6. Click Deploy

### Redeploying
```bash
# Automatic: Just push to main branch
git push origin main

# Manual: Using Vercel CLI
npm i -g vercel   # First time only
vercel deploy --prod
```

---

## Environment Variables Quick Reference

```env
# Essential
VITE_API_URL=http://localhost:3000 # or Vercel URL

# For Gemini AI features
VITE_GEMINI_API_KEY=your_key_here

# For GitHub integration
VITE_GITHUB_TOKEN=your_token_here

# For backend (server.ts)
GEMINI_API_KEY=your_key_here
```

### Where to Add Them
- **Local:** Create `.env.local` file
- **Production:** Vercel Dashboard → Settings → Environment Variables

---

## Debugging Tips

### Issue: "Cannot find module"
```bash
npm install  # Reinstall dependencies
npm ci       # Clean install (in CI/CD)
```

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run dev
```

### Issue: Styles not updating
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Issue: TypeScript errors
```bash
npm run type-check  # See all errors
npm run lint        # See linting issues
```

---

## Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` or `Cmd+K` | Open command palette (in some apps) |
| `F12` | Open DevTools |
| `Ctrl+Shift+M` | Toggle device toolbar (responsive view) |
| `Ctrl+H` | Open git history |
| `Ctrl+/` | Toggle comment |

---

## File Navigation

### Find Files
```bash
# Find TypeScript files
find src -name "*.tsx"

# Find by name
find src -name "*Agent*"

# Search content
grep -r "componentName" src/
```

### Using VS Code
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Find in files
- `Ctrl+G` - Go to line

---

## Component Examples

### Simple Component
```tsx
export function SimpleCard({ title, value }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
```

### Component with State
```tsx
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Increment
      </button>
    </div>
  );
}
```

### Component with Props
```tsx
interface DashboardProps {
  title: string;
  metrics: Array<{ label: string; value: number }>;
}

export function Dashboard({ title, metrics }: DashboardProps) {
  return (
    <div>
      <h1>{title}</h1>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="p-4 border rounded">
            <p>{m.label}</p>
            <p className="text-lg font-bold">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Git Quick Reference

```bash
# View changes
git status
git diff

# Commit work
git add .
git commit -m "feat: description"

# Push changes
git push origin branch-name

# Pull latest
git pull origin main

# Create branch
git checkout -b feature/name

# Switch branch
git checkout main

# View history
git log --oneline

# Undo last commit
git reset --soft HEAD~1

# View branches
git branch -a
```

---

## NPM Commands Cheat Sheet

```bash
# Installation & Setup
npm install           # Install all dependencies
npm install package   # Install specific package
npm i -D package      # Install as dev dependency

# Development
npm start             # Start app
npm run dev           # Development mode
npm run dev -- --port 3001  # Custom port

# Building
npm run build         # Production build
npm run preview       # Preview build locally

# Quality
npm run lint          # Check code quality
npm run format        # Format code
npm test              # Run tests

# Publishing
npm publish           # Publish to npm registry
npm version patch     # Bump patch version
```

---

## Directory Quick Navigate

```bash
# Go to project
cd ~/projects/dashboard

# or if just cloned
cd dashboard
npm install
npm run dev

# In another terminal
cd dashboard
git checkout -b feature/xyz
# Make changes...
git commit -m "feat: xyz"
git push origin feature/xyz
```

---

## API Integration Quick Start

### Making API Calls
```typescript
// Fetch data
const response = await fetch('/api/agents');
const data = await response.json();

// With error handling
try {
  const res = await fetch('/api/agents');
  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  console.log(data);
} catch (error) {
  console.error('Error:', error);
}

// POST request
const response = await fetch('/api/agents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'New Agent' })
});
```

---

## Styling with Tailwind CSS

### Common Classes
```html
<!-- Padding -->
<div class="p-4">      <!-- padding all sides -->
<div class="px-4">     <!-- padding horizontal -->
<div class="py-2">     <!-- padding vertical -->

<!-- Margin -->
<div class="m-4">      <!-- margin all sides -->
<div class="mx-auto">  <!-- margin center -->

<!-- Sizing -->
<div class="w-full">   <!-- width 100% -->
<div class="h-screen"> <!-- height 100vh -->

<!-- Colors -->
<div class="bg-blue-500">    <!-- background -->
<div class="text-white">     <!-- text color -->
<div class="border-gray-200"><!-- border -->

<!-- Flexbox -->
<div class="flex items-center justify-between">

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">

<!-- Responsive -->
<div class="md:text-lg lg:text-xl">
```

---

## Team Communication

### Slack Channels
- `#bixbott-dashboard` - General discussion
- `#dashboard-deployments` - Deployment updates
- `#dashboard-support` - Support questions
- `#dashboard-dev` - Development discussions

### Code Review Process
1. Push feature branch
2. Open Pull Request on GitHub
3. Request reviewers
4. Address feedback
5. Merge when approved

### Reporting Issues
1. GitHub Issues tab
2. Include: Steps to reproduce, expected behavior, actual behavior
3. Assign to relevant team member
4. Add labels (bug, feature, documentation, etc.)

---

## Resources & Links

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org
- **Project Repo:** https://github.com/bbot2z/dashboard
- **GitHub Issues:** https://github.com/bbot2z/dashboard/issues
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## First Day Checklist

- [ ] Clone repository
- [ ] Run npm install
- [ ] Set up .env.local
- [ ] Start dev server (npm run dev)
- [ ] Explore the codebase
- [ ] Read EXPANSION_PLAN_20_PAGES.md
- [ ] Read DEPLOYMENT_AND_SETUP_GUIDE.md
- [ ] Join team Slack channels
- [ ] Introduce yourself to team
- [ ] Pick a small task to start

---

## Getting Help

### Before Asking
1. Check existing documentation
2. Search GitHub issues
3. Check Slack history
4. Try a Google search
5. Read error messages carefully

### How to Ask
- Be specific about the problem
- Share code snippets or screenshots
- Show what you've already tried
- Include error messages
- Ask in relevant Slack channel

### Key Contacts
- **Team Lead:** [Name/Email]
- **DevOps:** [Name/Email]
- **Design:** [Name/Email]

---

## Success Tips

✅ **Do:**
- Read the documentation first
- Ask questions early
- Test locally before pushing
- Keep commits small and focused
- Write descriptive commit messages
- Review your own code first
- Help teammates

❌ **Don't:**
- Push directly to main
- Commit environment variables
- Leave console.logs in code
- Make huge commits
- Commit work-in-progress
- Skip code reviews
- Ignore lint errors

---

**Version:** 1.0  
**Last Updated:** June 24, 2026  

For more detailed information, see:
- DEPLOYMENT_AND_SETUP_GUIDE.md (20 pages comprehensive guide)
- EXPANSION_PLAN_20_PAGES.md (Detailed page specifications)
- VERCEL_DEPLOYMENT_CHECKLIST.md (Deployment checklist)

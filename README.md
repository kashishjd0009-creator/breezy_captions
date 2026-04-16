# BreezyCaptions

## What does this project do?

**BreezyCaptions** is a Next.js web app that helps you generate ready-to-post social media captions with hashtags. You pick a platform (Instagram, TikTok, LinkedIn, and others), choose a tone, upload your image, add context about the post, and the app streams a caption from a Gemini vision model (or a built-in mock when enabled). It includes a marketing landing page, a `/tool` caption generator, privacy and terms pages, client-side free-tier usage limits, and server-side validation and rate limiting on the generate API.

## Prerequisites

- **Node.js** 20.x (LTS recommended; matches CI)
- **npm** 9+ (comes with Node)
- **Git** (to clone the repository)
- A **Google AI Studio** account and API key if you want real AI responses in development or production (`USE_MOCK_AI=false`)

## How do I set it up?

From your machine, run the following in a terminal. Comments explain each step.

```bash
# Clone the repository (replace with your fork or remote URL)
git clone <YOUR_REPO_URL> breezy_captions
cd breezy_captions

# Install dependencies — pick one:
npm install
# Installs packages from package.json and updates lockfile if needed (good first time / daily dev)

npm ci
# Clean install from package-lock.json only (fails if lockfile missing/out of sync; use in CI and for reproducible builds)

# Create your local environment file from the template
# Next.js loads .env.local automatically in dev/build on your machine
cp .env.example .env.local

# Edit .env.local and set:
#   GEMINI_API_KEY   — required for real AI (get one from https://aistudio.google.com)
#   GEMINI_MODEL     — optional override (default: gemini-2.5-flash)
#   USE_MOCK_AI      — set to true to skip Gemini and use the mock stream (good for UI work)
```

After saving `.env.local`:

```bash
# Start the development server (http://localhost:3000)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page and [http://localhost:3000/tool](http://localhost:3000/tool) for the caption generator.

### Image upload requirements

The caption tool expects exactly one uploaded image per generation request:

- Supported formats: **JPEG, PNG, WEBP**
- Maximum size: **4 MB**
- Storage model: **no persistent storage** (images are validated and processed in-memory only)

### Install and production build (local)

Use these anytime you need a clean install or to match what Vercel runs.

```bash
# From the project root (the folder that contains package.json)

# Install — same as in setup
npm install

# Production build — compiles the app into .next/ (same command Vercel uses)
npm run build

# Run the production server locally (only after a successful build; serves http://localhost:3000)
npm run start
```

## How do I run the tests?

There is **no `npm test` script** or bundled Jest/Vitest/Playwright suite in this project yet. The checks that keep the codebase healthy (and mirror what CI expects) are:

```bash
# Install dependencies if you have not already
npm ci

# TypeScript: compile check without emitting files — catches type errors
npx tsc --noEmit

# ESLint: Next.js + React rules
npm run lint

# Optional: same production build CI/Vercel would run — catches build-time failures
npm run build
```

If you add a test runner later, document its command here (for example `npm test` or `npx vitest`).

## How do I deploy it?

The app is designed for **[Vercel](https://vercel.com)** (Next.js App Router). Set environment variables in the Vercel project dashboard: **`GEMINI_API_KEY`**, **`GEMINI_MODEL`** (optional), **`USE_MOCK_AI`** (`false` in production unless you intentionally want mock responses).

### Option A: Vercel CLI (from your laptop)

```bash
# One-time: log in and link the folder to a Vercel project
npx vercel login
npx vercel link
# Follow prompts to create or connect a project

# Deploy a preview (unique URL for this deployment; good for QA)
npx vercel
# Uploads the project, builds on Vercel, prints a preview URL

# Deploy to production (your production domain / alias)
npx vercel --prod
# Same as above but promotes to the production deployment
```

### Option B: GitHub → Vercel (dashboard)

```text
1. Push the repository to GitHub.
2. In Vercel: Add New… → Project → Import your Git repository.
3. Framework Preset: Next.js (leave default unless you changed it).
4. Root Directory — set this to match where package.json lives:
   • Repo root IS this app (package.json at the top level of the repo)
     → leave Root Directory empty, or set it to .
   • Repo root is a parent folder (e.g. you have docs and this app in a subfolder)
     → set Root Directory to: breezy_captions
     (exactly the folder name that contains package.json, next.config.mjs, and app/)
5. Environment Variables: add GEMINI_API_KEY, optional GEMINI_MODEL, USE_MOCK_AI (usually false in production).
6. Deploy.
```

Every push to the connected branch triggers a new deployment; production is usually the `main` branch.

### Option C: GitHub Actions with Vercel CLI

If your repository includes a workflow that runs `vercel deploy --prod` on push to `main`, configure these **repository secrets** in GitHub (Settings → Secrets and variables → Actions):

- **`VERCEL_TOKEN`** — create at Vercel → Account Settings → Tokens
- **`VERCEL_ORG_ID`** and **`VERCEL_PROJECT_ID`** — from the Vercel project settings (or run `npx vercel link` locally and inspect `.vercel/project.json`)

The workflow typically checks out the repo, runs `npm ci`, then `vercel deploy --prod --token=...` so the **deploy job** builds and publishes the app on Vercel’s infrastructure without using your laptop.

---

Built with Next.js 14, Tailwind CSS, Gemini (`@google/generative-ai`), and TypeScript.

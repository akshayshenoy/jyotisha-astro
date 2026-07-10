# 🌟 Jyotisha — Deployment Guide
### By Akshay Shenoy

---

## What you have
```
astro-app/
├── api/
│   └── reading.js       ← Backend (keeps your API key secret)
├── public/
│   └── index.html       ← Frontend (the beautiful webpage)
├── vercel.json          ← Vercel config
├── package.json
└── DEPLOY.md            ← This file
```

---

## Step-by-step deploy to Vercel (free, ~5 minutes)

### 1. Get your Anthropic API key
- Go to https://console.anthropic.com
- Create an account → API Keys → Create Key
- Copy the key (starts with `sk-ant-...`)

### 2. Create a GitHub account (if you don't have one)
- https://github.com → Sign up (free)

### 3. Upload this project to GitHub
- Click "+" → New repository
- Name it: `jyotisha-astro`
- Make it Public
- Upload all files from this folder (drag & drop)
- Click "Commit changes"

### 4. Deploy on Vercel
- Go to https://vercel.com → Sign up with GitHub (free)
- Click "Add New Project"
- Import your `jyotisha-astro` repo
- Click Deploy (leave all settings default)

### 5. Add your API key (IMPORTANT)
- In Vercel dashboard → your project → Settings → Environment Variables
- Add:
  - Name:  `ANTHROPIC_API_KEY`
  - Value: `sk-ant-api03-xxxxxx` (your actual key)
- Click Save
- Go to Deployments → click "Redeploy"

### 6. Done! 🎉
Vercel gives you a free public URL like:
`https://jyotisha-astro.vercel.app`

Share this URL with anyone — they can use it from any device,
no API key needed, no login required!

---

## Your page features
- ✦ Animated star field background
- 🌙 Sun, Moon, Rising + 5 planetary placements
- 📖 5 AI readings: Past life, Present, Future, Love, Career
- 🌐 5 languages: English, ಕನ್ನಡ, हिंदी, తెలుగు, தமிழ்
- 📱 Mobile + desktop responsive
- ⚡ Readings cached per tab (no duplicate API calls)
- 🔒 Your API key is secure — never visible to users

---

## Estimated costs
- Vercel hosting: FREE
- Anthropic API: ~$0.003 per reading (very cheap)
  - 1000 readings ≈ $3

---

## Custom domain (optional)
In Vercel → Settings → Domains → add your own domain (e.g. jyotisha.in)

# 🤖 MasterCard CIS Chatbot — Deploy to Vercel

Deploy this app FREE on Vercel so anyone can use it via a link — no downloads, no setup for your friends!

---

## 🚀 DEPLOY IN 5 STEPS (takes ~10 minutes)

---

### STEP 1 — Create a GitHub Account (if you don't have one)
👉 https://github.com/signup (free)

---

### STEP 2 — Upload this project to GitHub

1. Go to https://github.com/new
2. Repository name: `cis-chatbot`
3. Set to **Public**
4. Click **"Create repository"**
5. On the next page, click **"uploading an existing file"**
6. Drag and drop ALL files from this folder:
   - `api/` folder
   - `public/` folder
   - `cis_knowledge.txt`
   - `package.json`
   - `vercel.json`
7. Click **"Commit changes"**

---

### STEP 3 — Create a Vercel Account
👉 https://vercel.com/signup
- Sign up with your GitHub account (easiest)

---

### STEP 4 — Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **"Import"** next to your `cis-chatbot` repo
3. Leave all settings as default
4. Click **"Deploy"**
5. Wait ~1 minute for deployment ✅

---

### STEP 5 — Add your Claude API Key

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your key from https://console.anthropic.com
4. Click **Save**
5. Go to **Deployments** → click **"Redeploy"**

---

## 🎉 Done! Share your link

Your app will be live at:
```
https://cis-chatbot.vercel.app
```
(or similar — Vercel shows you the exact URL)

**Share this link with anyone — they just open it in browser, no setup needed!**

---

## 💬 What friends can ask:
- "Which DEs are mandatory in Authorization Request/0100?"
- "Explain the Stand-In processing flow"
- "What is DE 39 Response Code?"
- "How does Chip PIN authorization work?"
- "What is DE 48 and its subelements?"

---

## 🔑 Getting a Claude API Key (FREE)
1. Go to https://console.anthropic.com
2. Sign up with email
3. Click "API Keys" → "Create Key"
4. Free tier gives you enough credits to start

---

Built with Claude AI + MasterCard CIS document knowledge base

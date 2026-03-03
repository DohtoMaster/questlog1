# QuestLog - Game Backlog Tracker 🎮

A mobile-first PWA with ad monetization for tracking your gaming backlog.

## 🚀 Deploy for Free (10 minutes)

### Step 1: Install tools (one-time)
1. Create a free **GitHub** account: https://github.com
2. Create a free **Vercel** account: https://vercel.com (sign in with GitHub)
3. Install **Node.js**: https://nodejs.org (LTS version)

### Step 2: Push to GitHub
1. Create a new repo at https://github.com/new (name it `questlog`)
2. Open terminal in this folder and run:
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/questlog.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your `questlog` repo
3. Click **Deploy**
4. Your app is live at `questlog-XXXX.vercel.app`

### Step 4: Custom domain (optional, ~$10/year)
Buy a domain from namecheap.com → add it in Vercel dashboard → Settings → Domains

---

## 💰 Set Up Ads (Start Earning Money)

### Google AdSense Setup:
1. Go to https://adsense.google.com and sign up (free)
2. Add your Vercel URL as your site
3. Wait for approval (usually 1-3 days, sometimes up to 2 weeks)
4. Once approved, get your **Publisher ID** (looks like `ca-pub-1234567890123456`)
5. Create ad units in AdSense dashboard:
   - **Banner ad** (320x50) → copy the slot ID
   - **In-feed ad** (fluid) → copy the slot ID

### Connect Ads to Your App:
1. In `index.html`: Uncomment the AdSense script line and replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
2. In `src/QuestLog.jsx`: Find `AD_CONFIG` at the top and replace:
   - `publisherId` → your publisher ID
   - `bannerSlotId` → your banner ad slot ID
   - `inFeedSlotId` → your in-feed ad slot ID
3. Push the changes to GitHub → Vercel auto-deploys

### Ad Placements Included:
- **Banner ad** — sticky at bottom of screen (always visible)
- **In-feed ads** — appear every 5 games in the list
- **Interstitial ad** — full-screen ad every 3 user actions (add/edit/delete)

### Expected Revenue:
- 100 daily users → ~$1-5/month
- 1,000 daily users → $30-150/month
- 10,000 daily users → $300-1,500/month
- Revenue grows with traffic. Focus on getting users first!

---

## 📱 Install on Phone
1. Open your URL in mobile browser
2. **Android**: Tap install banner or menu → "Install app"
3. **iPhone**: Tap Share → "Add to Home Screen"

## 📣 How to Get Users
- **Reddit**: Post in r/patientgamers, r/gaming, r/backlog, r/gamedeals
- **Discord**: Share in gaming servers
- **TikTok/YouTube Shorts**: Record quick demos of the app
- **Product Hunt**: Do a proper launch
- **Gaming forums**: NeoGAF, ResetEra, GameFAQs

## 🛠 Development
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # Production build → dist/
```

## Features
- 📜 Search & add from 100+ popular games
- ⚔️ Track status: Backlog, Playing, Completed, Dropped
- ⭐ Rate and review games
- 📊 Stats dashboard
- 📱 Installable PWA (works like a native app)
- 🔌 Works offline
- 💾 Data saved locally
- 💰 3 ad placements ready to earn

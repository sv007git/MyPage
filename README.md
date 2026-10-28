# Prabhata • Daily Morning Page & Hindu Calendar 🌅

> A serene, elegant morning dashboard hostable directly on **GitHub Pages**, featuring an astronomical **Hindu Panchangam** that calculates the day by **Moon phase** (Waxing / Shukla & Waning / Krishna Paksha), daily **Vedic Timings**, and today's latest **TV9 Telugu "4 Minutes 24 Headlines"** speed news bulletin.

![Prabhata Preview](assets/favicon.svg)

---

## ✨ Features

### 🌕 1. Astronomical Hindu Calendar (Panchangam)
- **Calculated Dynamically by Moon Phase**: Uses high-precision celestial equations (Jean Meeus algorithm) to compute exact solar & lunar ecliptic longitudes.
- **Waxing vs. Waning (Paksha)**:
  - **Shukla Paksha (శుక్ల పక్షం / Waxing)**: Moon ahead of Sun $0^\circ \to 180^\circ$ (growth from Amavasya to Purnima) with a radiant growth aura.
  - **Krishna Paksha (కృష్ణ పక్షం / Waning)**: Moon ahead of Sun $180^\circ \to 360^\circ$ (dispersion from Purnima to Amavasya) with a serene lunar aura.
- **Real-Time SVG Moon Disk**: Beautifully renders the exact mathematical lunar terminator shadow and crater textures for any given day.
- **Tithi (తిథి)**: Full Sanskrit and Telugu names (పాడ్యమి, విదియ, తదియ, చవితి, పంచమి, షష్ఠి, సప్తమి, అష్టమి, నవమి, దశమి, ఏకాదశి, ద్వాదశి, త్రయోదశి, చతుర్దశి, పౌర్ణమి / అమావాస్య), completion progress bar, and estimated ending time.
- **Nakshatra (నక్షత్రం)**: All 27 Nakshatras with pada (quarter) and degree calculation.
- **Masa (మాసం)**: Hindu lunar month (Amanta system: చైత్రం, వైశాఖం, ఆశ్వయుజం, కార్తీకం, etc.).
- **Vaasara (వారం)**: Vedic day of the week (ఆదివారం, సోమవారం, బుధవారం, etc.).
- **Yoga & Karana**: Daily astronomical combinations.
- **Zodiac Rashis (రాశులు)**: Current solar and lunar zodiac signs.

---

### 🌅 2. Vedic Timings & Muhurthams
- **Sunrise & Sunset**: Calculated using NOAA solar equations for your selected city (Hyderabad, Vijayawada, Visakhapatnam, Tirupati, Bengaluru, Chennai, Mumbai, Delhi, London, NY, SF) or browser GPS.
- **Brahma Muhurtham (బ్రహ్మ ముహూర్తం)**: The auspicious 48-minute morning meditation window before sunrise.
- **Abhijit Muhurtham (అభిజిత్ ముహూర్తం)**: Midday auspicious window.
- **Rahu Kalam (రాహు కాలం)**, **Yamagandam (యమగండం)**, and **Gulika Kalam (గుళిక కాలం)**.

---

### 📰 3. TV9 Telugu "4 Minutes 24 Headlines" Hub
- **Direct Link**: Seamlessly accesses the official channel [`@TV9TeluguLive`](https://www.youtube.com/@TV9TeluguLive).
- **Latest Timestamp of Today's Date**: Automatically extracts and displays the newest bulletin with its exact publication timestamp and relative time (e.g. *Just now*, *28-10-2026, 4:12 PM IST*).
- **Embedded Responsive Player**: Watch the bulletin directly inside your morning dashboard in 16:9 HD without ads or leaving the page.
- **1-Click Launch Buttons**:
  - `▶️ Watch on YouTube (Direct Link)`
  - `🔍 Today's Bulletin Search` (dynamically query TV9 with today's date formatted)
  - `📺 Channel Bulletins`
  - `🔴 TV9 Live Broadcast` (switch between 4 Min 24 Headlines and the 24/7 live stream with one click).
- **Automatic Daily Sync**: Includes an automated GitHub Actions cron workflow that refreshes `latest_news.json` every morning.

---

### 🧘 4. Morning Sanctuary & Focus
- **Live IST Clock**: High-precision real-time digital clock with greeting (*శుభోదయం / Good Morning*, *Brahma Muhurtham Peace*).
- **Daily Morning Mantra (శ్లోకం)**: Daily rotating Sanskrit chants (Gayatri Mantra, Karagre Vasate Lakshmi, Surya Vandana) with Telugu script and English meaning.
- **Morning Priorities Scratchpad**: Write down your top priorities and reflections for the day (persisted automatically in browser `localStorage`).
- **3 Color Themes**:
  - 🌅 **Dawn Sunrise** (Default: warm amber glow, serene morning sanctuary)
  - 🌙 **Midnight Cosmic** (Deep starry indigo, radiant silver moon)
  - ☀️ **Daylight Clean** (Crisp modern daytime layout)
- **Interactive Calendar Navigation**: Inspect yesterday, today, tomorrow, or any chosen calendar date via the datepicker. Keyboard shortcuts:
  - <kbd>T</kbd> : Jump to Today
  - <kbd>[</kbd> : Previous Day
  - <kbd>]</kbd> : Next Day
  - <kbd>D</kbd> : Toggle Theme

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

This project has **zero build dependencies** (pure vanilla HTML5, CSS3, and ES6 JavaScript), which makes hosting on GitHub Pages instant and free.

### Step 1: Initialize Git in this directory
Open PowerShell or your terminal in this directory:
```bash
git init
git add .
git commit -m "feat: initial commit for daily morning page"
```

### Step 2: Create a GitHub Repository & Push
1. Go to [github.com/new](https://github.com/new) and create a repository (e.g., `MyPage` or `daily-morning-page`). Keep it **Public** (or Private with GitHub Pro for Pages).
2. Link your remote and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** (tab at the top) $\to$ **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Option A (GitHub Actions - Recommended)**: Select **Source: GitHub Actions**. The included `.github/workflows/deploy.yml` will automatically publish your site!
   - **Option B (Direct Branch)**: Select **Source: Deploy from a branch**, choose branch `main` and folder `/ (root)`, then click **Save**.
4. In ~60 seconds, your page will be live at:
   ```
   https://<your-github-username>.github.io/<your-repo-name>/
   ```

---

## 🔄 Automated Daily News Updates

This repository includes a pre-configured GitHub Actions workflow in [`.github/workflows/update-news.yml`](.github/workflows/update-news.yml):
- Runs automatically every morning at **06:00 AM, 07:00 AM, 08:00 AM, and 10:00 AM IST** via cron.
- Fetches the newest "4 Minutes 24 Headlines" bulletin from TV9 Telugu's official RSS feed.
- Updates `latest_news.json` and pushes the commit back to your repo.
- You can also manually trigger it anytime by clicking **Actions** $\to$ **Daily Morning TV9 News Sync** $\to$ **Run workflow**.

---

## 📁 Project Architecture

```
MyPage/
├── index.html                   # Core dashboard HTML structure
├── latest_news.json             # Cached latest TV9 bulletin payload
├── assets/
│   └── favicon.svg              # Custom crescent & sun SVG icon
├── css/
│   └── style.css                # Themes (Dawn, Midnight, Daylight) & responsive styles
├── js/
│   ├── panchang.js              # High-precision Jean Meeus astronomical Panchangam engine
│   ├── suncalc.js               # NOAA solar times, Brahma Muhurtham, Rahu Kalam & cities
│   ├── moon-renderer.js         # Dynamic SVG moon phase terminator & craters renderer
│   ├── news.js                  # TV9 Telugu dynamic date links, RSS parser & YouTube embeds
│   └── app.js                   # UI controller, real-time clock, shortcuts, localStorage
├── scripts/
│   └── fetch-tv9-news.js        # Node.js news scraper for GitHub Actions and local sync
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Automated GitHub Pages deployment
│       └── update-news.yml      # Scheduled morning TV9 news sync
└── README.md                    # Documentation & setup guide
```

---

## 🌟 Local Development & Preview
To preview locally on your computer:
- Simply double-click `index.html` to open it in your default web browser, or:
- Run a lightweight HTTP server:
  ```bash
  npx serve .
  ```
  and navigate to `http://localhost:3000`.

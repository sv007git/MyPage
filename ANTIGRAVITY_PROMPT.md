# ANTIGRAVITY PROJECT BLUEPRINT & MASTER CONTEXT PROMPT
> **File:** `ANTIGRAVITY_PROMPT.md` / `antigravity_prompt.txt`  
> **Target Project:** `Prabhata • Daily Morning Sanctuary` (`MyPage`)  
> **Live GitHub Pages URL:** https://sv007git.github.io/MyPage/  
> **GitHub Repository:** https://github.com/sv007git/MyPage  
> **Active Deployment Branches:** `main` and `gh-pages` (Must always be kept 100% in sync)  
> **Last Updated:** November 2026

---

## 📌 1. PURPOSE & IDENTITY
`Prabhata` is a handcrafted, ultra-fast, zero-dependency daily morning dashboard hosted directly on GitHub Pages. It combines:
1. **Astronomical Hindu Panchangam**: Real-time celestial calculations (Moon phases, Tithi, Nakshatra, Masa, Vaara, Yoga, Karana, Rashis) using Meeus/NOAA equations.
2. **Daily Dharma & Worship Guide (Omkaram Format)**: Inspired by Devi Shree Guruji's *Omkaram* program on Zee Telugu, dynamically selecting the day's presiding deity, sacred mantras, home puja steps, naivedyam, and puranic story based strictly on the day's Panchang and observances (Atla Tadde, Ekadashi, Pradosham, etc.).
3. **Text-to-Audio (Speech Synthesis)**: Spoken daily briefing and mantra chanting in either English or Telugu using the browser's native Web Speech API.
4. **Vedic Solar Timings & Muhurthams**: Sunrise, Sunset, Brahma Muhurtham, Abhijit Muhurtham, Rahu Kalam, Yamagandam, Gulika Kalam, with auto IP-based geolocation.
5. **TV9 Telugu Speed News Hub**: Embedded "4 Minutes 24 Headlines" and 24/7 live stream, updated automatically via GitHub Actions every 30 minutes.

---

## ⚠️ 2. NON-NEGOTIABLE CORE INVARIANTS & CONSTRAINTS
Whenever modifying this codebase, you **MUST STRICTLY MAINTAIN** these rules:

1. **Strict Language Separation**:
   - **English Mode (`currentLang === 'en'`)**: There must be **EXACTLY ZERO TELUGU CHARACTERS** anywhere on the page (UI labels, Panchang details, Dharma guide, Audio TTS text). Mantras in English mode use Devanagari Sanskrit or phonetic English transliteration with English translations.
   - **Telugu Mode (`currentLang === 'te'`)**: Authentic, devotional, grammatically correct Telugu script with Telugu font stack (`Nirmala UI`, `Gautami`, `Mandali`, `Noto Sans Telugu`).
2. **Mobile Layout & Order Rule**:
   - On screens `<= 1024px`, the **Day Picker (`.date-nav-strip`) MUST BE POSITIONED DIRECTLY ABOVE the Hindu Calendar and Moon Phase (`.column-panchang`)**.
   - Grid order:
     - `order: 1` -> `.top-header`
     - `order: 2` -> `.column-news` (Contains News Hub & Daily Dharma Guide)
     - `order: 3` -> `.date-nav-strip` (Day Picker & Date Input)
     - `order: 4` -> `.column-panchang` (Hindu Calendar & Vedic Timings)
3. **Dual-Branch Git Deployment Rule**:
   - Every commit must be pushed to both branches:
     ```bash
     git push origin main
     git push origin main:gh-pages --force
     ```
   - GitHub Pages serves from `gh-pages`. Both branches must remain identical.
4. **Zero Framework Dependencies**:
   - Pure Vanilla ES6+ JavaScript, CSS3 variables, HTML5.
   - Do **NOT** introduce npm build steps, webpack, Vite, React, or external runtime libraries.
5. **Cache-Busting Asset Versioning**:
   - All script and stylesheet tags in `index.html` must include version parameters (e.g., `?v=8.0`) to avoid stale browser caching.

---

## 📂 3. COMPLETE FILE STRUCTURE & RESPONSIBILITIES

```
MyPage/
├── index.html                       # Single-page HTML5 semantic dashboard
├── css/
│   └── style.css                    # Comprehensive styling, themes, mobile media queries
├── js/
│   ├── app.js                       # Master app controller, state, I18N, DOM bindings, shortcuts
│   ├── audio-player.js              # Web Speech API TTS engine (English & Telugu briefings)
│   ├── dharma-guide.js              # Panchang-driven worship guide (Omkaram Devi Shree Guruji format)
│   ├── moon-renderer.js             # High-precision SVG Moon terminator & craters renderer
│   ├── news.js                      # TV9 Telugu video switcher, bulletin selector & cache fetch
│   ├── panchang.js                  # Jean Meeus celestial calculation engine (Nirayana, Tithi, Nakshatra)
│   └── suncalc.js                   # NOAA solar equations, Muhurthams, IP geolocation detection
├── scripts/
│   └── fetch-tv9-news.js            # Node.js scraper for TV9 Telugu 4-min headlines (executed by CI)
├── .github/
│   └── workflows/
│       └── update-news.yml          # Cron action running every 30 mins (05:30 AM to 11:30 PM IST)
├── latest_news.json                 # Auto-generated JSON payload of newest TV9 speed bulletins
├── assets/
│   └── favicon.svg                  # Brand favicon (Sun & Moon vector graphic)
├── README.md                        # Public repository documentation
├── ANTIGRAVITY_PROMPT.md            # This master blueprint document
└── antigravity_prompt.txt           # Plaintext copy for token-efficient agent referencing
```

---

## 🛠️ 4. MODULE ARCHITECTURE & API REFERENCE

### A. `js/panchang.js` (`Panchang`)
Calculates astronomical Hindu calendar variables for any `Date`:
- **Algorithm**: Jean Meeus celestial algorithms, converting tropical longitude to sidereal Nirayana using Lahiri (Chitrapaksha) Ayanamsa ($24.1^\circ$ reference).
- **Core Method**: `Panchang.calculate(date)`
- **Returns Object**:
  ```javascript
  {
    elongation,          // Moon - Sun angle (0° to 360°)
    illumination,        // Percentage (0% to 100%)
    moonAge,             // Age in days (0 to 29.53)
    isWaxing,            // Boolean (true = Shukla, false = Krishna)
    paksha: { name, short, telugu },
    tithiIndex,          // 0 to 29
    tithi: {
      index, inPaksha, name, telugu, progress, endTime, endsApprox
    },
    nakshatra: {
      index, name, telugu, rashi, rashiTelugu, pada
    },
    yoga,                // e.g., 'Siddha', 'Variyana'
    karana,              // e.g., 'Bava', 'Balava'
    sunRashi: { english, sanskrit, telugu },
    moonRashi: { english, sanskrit, telugu },
    masa: { name, telugu, sanskrit, season, deity },
    vaaram: { index, english, telugu, planet, deity },
    date
  }
  ```

### B. `js/dharma-guide.js` (`DharmaGuide`)
Dynamically identifies festivals, vratas, and presiding deities based on the day's Panchang:
- **Core Method**: `DharmaGuide.generateGuide(panchang, lang)`
- **Special Observances Recognized**:
  - `Atla Tadde (Gauri Vratam)`: Ashvina/Kartika Krishna Tritiya (Goddess Gauri, 11 atlu naivedyam, moonrise arghya)
  - `Ekadashi Vratam`: Shukla & Krishna Ekadashi (Lord Sri Maha Vishnu / Venkateswara)
  - `Pradosha Vratam`: Shukla & Krishna Trayodashi (Lord Shiva & Nandi)
  - `Sankashti Chaturthi`: Krishna Chaturthi (Lord Ganesha, Modak naivedyam)
  - `Vinayaka Chaturthi`: Shukla Chaturthi
  - `Pournami (Full Moon)`: Sri Satyanarayana Swamy & Mahalakshmi
  - `Amavasya (New Moon)`: Pitru Tarpana & Lord Shiva/Vishnu
  - `Masa Shivaratri`: Krishna Chaturdashi
  - `Skanda Shashti`: Shukla Shashti (Lord Subrahmanya Swamy)
  - `Durgashtami`: Shukla Ashtami (Goddess Durga Devi)
  - `Weekday Deities (Sun-Sat)`: Surya, Chandra, Mangala, Budha, Brihaspati, Shukra, Shani.
- **Returns Object**:
  ```javascript
  {
    panchangSummary,     // Formatted summary line (English or Telugu)
    deityName,           // Presiding deity name
    observanceTitle,     // Name of vrata or daily worship
    observanceBadge,     // Special badge label
    isSpecialObservance, // Boolean flag for special card border/glow
    reasonText,          // Scriptural rationale
    mainMantra: {
      sanskrit, translit, meaning, count
    },
    weekdayMantra: {
      name, text, meaning
    },
    puja: {
      flowers, naivedyam, charity, specialPractice
    },
    puranicStory         // Omkaram wisdom & devotional story
  }
  ```

### C. `js/audio-player.js` (`PrabhataAudio`)
Provides bilingual text-to-speech briefing:
- **Methods**:
  - `PrabhataAudio.toggleBriefing({ panchang, guide, timings, cityName, date, lang })`
  - `PrabhataAudio.toggleMantra({ guide, lang })`
  - `PrabhataAudio.stop()`
  - `PrabhataAudio.isPlaying()`
  - `PrabhataAudio.onStateChange((isPlaying, activeType) => {})`
- **Safeguards**:
  - Splits long text into <= 150-character sentence chunks to eliminate browser 15-second speech timeouts.
  - Auto-selects `te-IN` (Telugu) or `en-IN` (Indian English) voices for authentic pronunciation.
  - Automatically cancels speech when toggling language or changing calendar dates.

### D. `js/suncalc.js` (`SunCalc`)
Solar calculations and IP geolocation:
- **Preset Cities**: Hyderabad, Vijayawada, Visakhapatnam, Tirupati, Bengaluru, Chennai, Mumbai, Delhi, London, New York, San Francisco.
- **Auto IP Detection**: `SunCalc.detectLocationFromIP()` uses public IP APIs; user choice stored in `localStorage.getItem('morning_city_manual')`.
- **Muhurthams Computed**:
  - Sunrise & Sunset (NOAA algorithm)
  - Day Length
  - Brahma Muhurtham: 96 to 48 minutes before Sunrise (Pre-dawn meditation)
  - Abhijit Muhurtham: 24 minutes before to 24 minutes after solar noon
  - Rahu Kalam, Yamagandam, Gulika Kalam (Traditional 1/8th day division based on weekday)

### E. `js/news.js` (`NewsHub`)
Manages TV9 Telugu news video playback:
- Fetches `latest_news.json?t=` with `cache: 'no-store'` to prevent stale cache.
- Toggles between speed news bulletin iframe (`OtcTaXH2z78`) and 24/7 live broadcast (`IqqF2N_a_pY`).
- Provides 1-click fallback buttons to YouTube search if direct embed is blocked.

### F. `js/app.js`
Main application conductor:
- Contains `I18N` dictionaries (`I18N.en` and `I18N.te`).
- Theme switching: `data-theme="dark"` or `data-theme="light"` (saved to `localStorage.getItem('morning_theme')`).
- Language switching: `data-lang="en"` or `data-lang="te"` (saved to `localStorage.getItem('morning_lang')`).
- Keyboard shortcuts:
  - <kbd>T</kbd>: Today
  - <kbd>[</kbd>: Previous Day
  - <kbd>]</kbd>: Next Day
  - <kbd>D</kbd>: Toggle Dark/Light Mode
  - <kbd>L</kbd>: Toggle Telugu/English Mode
  - <kbd>A</kbd>: Toggle Audio Briefing (Play/Stop)

---

## 🎨 5. CSS & RESPONSIVE BREAKPOINT ARCHITECTURE (`css/style.css`)
- **Theme Variables**:
  - Dark: Deep cosmic purple-indigo radial gradient, warm amber gold accents (`#ffb454`), translucent frosted cards (`rgba(26, 26, 42, 0.78)`).
  - Light: Luminous daylight cream radial gradient, rich amber accents (`#b86a08`), high-contrast dark text (`#231c17`).
- **Responsive Media Queries**:
  - `@media (max-width: 1024px)`: Single-column flex layout. **Crucial rule: `.date-nav-strip` must have `order: 3` so Day Picker is directly above `.column-panchang` (`order: 4`)**.
  - `@media (max-width: 768px)`: Hides keyboard shortcut hints for touch displays.
  - `@media (max-width: 640px)`:
    - 3-column grid for header action buttons (`[ 🔊 Listen ]`, `[ ☀️ Mode ]`, `[ 🌐 Lang ]`) with 42px touch targets.
    - Centered brand title and audio pill.
    - Full-width stacked Panchang observance banner with full-width jump button.
    - 2x2 Panchang metadata grid.
    - 3-bubble Vedic timings overview strip.
    - Pre-wrapped sacred shlokam text without horizontal scroll bars.
  - `@media (max-width: 380px)`: Narrow phones / foldables: Single column grids for toggles, nav buttons, and timings bubbles.
- **Mobile Enhancements**:
  - `viewport-fit=cover` and safe-area insets (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
  - `overflow-x: hidden; width: 100%; max-width: 100vw;` to prevent horizontal jitter.
  - `touch-action: manipulation;` on interactive controls to eliminate 300ms tap delays.

---

## 📋 6. KEY DOM ELEMENT IDS

| ID | Purpose |
| :--- | :--- |
| `app-title` | Top header brand title |
| `greeting-text` | Time-sensitive greeting (Morning / Afternoon / Evening) |
| `live-clock` | Digital 24-hr/12-hr IST clock |
| `city-select` | City dropdown (IP detected or manual presets) |
| `audio-briefing-btn` | Header Text-to-Audio briefing toggle button |
| `brand-audio-btn` | Brand section quick audio pill |
| `theme-toggle-btn` | Dark / Light theme toggle button |
| `lang-toggle-btn` | Telugu / English language toggle button |
| `date-picker` | Native HTML5 calendar date picker input |
| `prev-day-btn`, `today-btn`, `next-day-btn` | Day step navigation buttons |
| `tab-bulletin`, `tab-live` | Video player tab toggles |
| `news-video-frame` | 16:9 YouTube iframe player |
| `daily-dharma-card` | Container for the Panchang-based Daily Dharma & Puja Guide |
| `listen-mantra-btn` | Audio button specifically for the sacred mantra & meaning |
| `copy-main-mantra-btn` | Clipboard copy button with instant "Copied!" feedback |
| `panchang-observance-banner` | Banner in Hindu Calendar card highlighting today's vrata |
| `moon-svg-container` | Dynamically injected astronomical SVG Moon |
| `paksha-badge` | Shukla (Waxing) or Krishna (Waning) status badge |
| `tithi-name`, `nakshatra-name`, `masa-name`, `vaaram-name` | Core astronomical Panchang output elements |
| `sunrise-time`, `sunset-time`, `brahma-muhurtham`, `abhijit-muhurtham`, `rahu-kalam` | Vedic timing output elements |

---

## ⚡ 7. HOW TO WORK ON THIS PROJECT WITHOUT WASTING TOKENS
When an agent starts a new task:
1. **Read this file (`ANTIGRAVITY_PROMPT.md`) first** to understand all architecture, constraints, and dependencies.
2. **Do NOT run deep search or recursive directory grep**; all 14 project files are mapped above.
3. If changing logic:
   - For astrology/panchang: Edit `js/panchang.js` or `js/dharma-guide.js`.
   - For solar/muhurthams/location: Edit `js/suncalc.js`.
   - For audio/TTS: Edit `js/audio-player.js`.
   - For news/bulletins: Edit `js/news.js` or `scripts/fetch-tv9-news.js`.
   - For UI text/translations/state: Edit `js/app.js`.
   - For styles/responsive: Edit `css/style.css`.
4. Always test both **English (`en`)** and **Telugu (`te`)** modes:
   - Verify 0 Telugu characters in English mode via regex: `/[\u0C00-\u0C7F]/`.
5. After editing, verify syntax:
   ```bash
   node -c js/app.js; node -c js/audio-player.js; node -c js/dharma-guide.js; node -c js/panchang.js
   ```
6. Always commit and push to **both** branches:
   ```bash
   git add -A
   git commit -m "your descriptive commit message"
   git push origin main
   git push origin main:gh-pages --force
   ```

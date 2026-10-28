/**
 * Main Application Controller for Daily Morning Page
 * Orchestrates:
 *  - Panchangam & Moon Phase Display
 *  - Real-time Clock & Date Navigation
 *  - Sunrise/Sunset & Vedic Timings
 *  - TV9 Telugu News Hub & Video Embeds
 *  - Morning Wisdom & Scratchpad (localStorage)
 *  - Theme & Location Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentDate = new Date();
  let selectedCity = SunCalc.CITIES[0]; // Default: Hyderabad
  let activeVideoTab = 'bulletin'; // 'bulletin' or 'live'
  let currentTheme = localStorage.getItem('morning_theme') || 'dawn';

  // Elements
  const liveClockEl = document.getElementById('live-clock');
  const liveDateEl = document.getElementById('live-date');
  const greetingEl = document.getElementById('greeting-text');
  const citySelectEl = document.getElementById('city-select');
  const dateInputEl = document.getElementById('date-picker');
  const prevDayBtn = document.getElementById('prev-day-btn');
  const nextDayBtn = document.getElementById('next-day-btn');
  const todayBtn = document.getElementById('today-btn');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');

  // Moon & Panchang Elements
  const moonSvgContainer = document.getElementById('moon-svg-container');
  const pakshaBadgeEl = document.getElementById('paksha-badge');
  const moonIllumEl = document.getElementById('moon-illumination');
  const moonPhaseNameEl = document.getElementById('moon-phase-name');
  const moonAgeEl = document.getElementById('moon-age');
  const tithiNameEl = document.getElementById('tithi-name');
  const tithiTeluguEl = document.getElementById('tithi-telugu');
  const tithiProgressEl = document.getElementById('tithi-progress');
  const tithiEndsEl = document.getElementById('tithi-ends');
  const nakshatraNameEl = document.getElementById('nakshatra-name');
  const masaNameEl = document.getElementById('masa-name');
  const vaaramNameEl = document.getElementById('vaaram-name');
  const yogaNameEl = document.getElementById('yoga-name');
  const karanaNameEl = document.getElementById('karana-name');
  const rashiSummaryEl = document.getElementById('rashi-summary');

  // Timings Elements
  const sunriseEl = document.getElementById('sunrise-time');
  const sunsetEl = document.getElementById('sunset-time');
  const dayLengthEl = document.getElementById('day-length');
  const brahmaMuhurthamEl = document.getElementById('brahma-muhurtham');
  const abhijitMuhurthamEl = document.getElementById('abhijit-muhurtham');
  const rahuKalamEl = document.getElementById('rahu-kalam');
  const yamagandamEl = document.getElementById('yamagandam');
  const gulikaKalamEl = document.getElementById('gulika-kalam');

  // TV9 News Elements
  const newsVideoFrame = document.getElementById('news-video-frame');
  const newsTitleEl = document.getElementById('news-title');
  const newsTimestampEl = document.getElementById('news-timestamp');
  const newsRelativeTimeEl = document.getElementById('news-relative-time');
  const watchYtBtn = document.getElementById('watch-yt-btn');
  const searchTodayBtn = document.getElementById('search-today-btn');
  const searchChannelBtn = document.getElementById('search-channel-btn');
  const tabBulletinBtn = document.getElementById('tab-bulletin');
  const tabLiveBtn = document.getElementById('tab-live');
  const refreshNewsBtn = document.getElementById('refresh-news-btn');
  const recentBulletinsList = document.getElementById('recent-bulletins-list');

  // Morning Intention & Notes
  const morningNotesEl = document.getElementById('morning-notes');
  const clearNotesBtn = document.getElementById('clear-notes-btn');
  const notesSavedIndicator = document.getElementById('notes-saved-indicator');

  // Morning Wisdom / Mantras
  const MORNING_MANTRAS = [
    {
      shlokam: 'కరాగ్రే వసతే లక్ష్మీః కరమధ్యే సరస్వతీ ।\nకరమూలే స్థితా గౌరీ ప్రభాతే కరదర్శనమ్ ॥',
      transliteration: 'Karāgre Vasate Lakṣmīḥ Karamadhye Sarasvatī |\nKaramūle Sthitā Gaurī Prabhāte Karadarśanam ||',
      meaning: 'At the tips of the fingers dwells Goddess Lakshmi; at the palm resides Goddess Saraswati; at the base sits Goddess Gowri. Behold one’s palms each morning upon waking.',
      title: 'Prabhata Kara Darshanam (Morning Palm Prayer)'
    },
    {
      shlokam: 'ఓం భూర్భువః స్వః తత్సవితుర్వరేణ్యమ్ ।\nభర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్ ॥',
      transliteration: 'Oṃ Bhūr Bhuvaḥ Svaḥ Tat-Savitur-Vareṇyam |\nBhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt ||',
      meaning: 'We meditate on the transcendental glory of the Sun deity Savitur; may that divine light illuminate our intellect and guide our thoughts.',
      title: 'Gayatri Mantra'
    },
    {
      shlokam: 'ఓం సూర్యాయ నమః । ఓం ఆదిత్యాయ నమః ।\nఆరోగ్యం భాస్కరాదిచ్ఛేత్ శ్రియమిచ్ఛేత్ హుతాశనాత్ ॥',
      transliteration: 'Oṃ Sūryāya Namaḥ | Oṃ Ādityāya Namaḥ |\nĀrogyaṃ Bhāskarād-Icchet Śriyam-Icchet Hutāśanāt ||',
      meaning: 'Salutations to the Sun deity who bestows health, vitality, and illumination. Seek radiant health from the Sun each morning.',
      title: 'Surya Vandanam (Sun Salutation)'
    },
    {
      shlokam: 'సర్వే భవంతు సుఖినః సర్వే సంతు నిరామయాః ।\nసర్వే భద్రాణి పశ్యంతు మా కశ్చిద్దుఃఖభాగ్‌భవేత్ ॥',
      transliteration: 'Sarve Bhavantu Sukhinaḥ Sarve Santu Nirāmayāḥ |\nSarve Bhadrāṇi Paśyantu Mā Kaścid-Duḥkha-Bhāg-Bhavet ||',
      meaning: 'May all beings be happy; may all be healthy and free from illness; may all see good and auspiciousness; may none suffer distress.',
      title: 'Shanti Prarthana (Universal Peace)'
    }
  ];

  function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButtonIcon();
  }

  function toggleTheme() {
    if (currentTheme === 'dawn') {
      currentTheme = 'midnight';
    } else if (currentTheme === 'midnight') {
      currentTheme = 'daylight';
    } else {
      currentTheme = 'dawn';
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('morning_theme', currentTheme);
    updateThemeButtonIcon();
  }

  function updateThemeButtonIcon() {
    if (!themeToggleBtn) return;
    if (currentTheme === 'dawn') {
      themeToggleBtn.innerHTML = '🌅 <span class="theme-label">Dawn</span>';
    } else if (currentTheme === 'midnight') {
      themeToggleBtn.innerHTML = '🌙 <span class="theme-label">Midnight</span>';
    } else {
      themeToggleBtn.innerHTML = '☀️ <span class="theme-label">Daylight</span>';
    }
  }

  function populateCities() {
    if (!citySelectEl) return;
    citySelectEl.innerHTML = '';
    SunCalc.CITIES.forEach(city => {
      const opt = document.createElement('option');
      opt.value = city.id;
      opt.textContent = city.name;
      citySelectEl.appendChild(opt);
    });

    const savedCityId = localStorage.getItem('morning_city');
    if (savedCityId) {
      const found = SunCalc.CITIES.find(c => c.id === savedCityId);
      if (found) {
        selectedCity = found;
        citySelectEl.value = found.id;
      }
    }

    citySelectEl.addEventListener('change', (e) => {
      const found = SunCalc.CITIES.find(c => c.id === e.target.value);
      if (found) {
        selectedCity = found;
        localStorage.setItem('morning_city', found.id);
        renderTimings();
      }
    });
  }

  function updateLiveClock() {
    const now = new Date();
    if (liveClockEl) {
      liveClockEl.textContent = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    }

    if (liveDateEl) {
      liveDateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    // Dynamic greeting based on current local hour
    if (greetingEl) {
      const hr = now.getHours();
      let greetText = '';
      if (hr >= 4 && hr < 6) {
        greetText = 'సుప్రభాతం • Brahma Muhurtham Peace 🕊️';
      } else if (hr >= 6 && hr < 12) {
        greetText = 'శుభోదయం • Good Morning! 🌅';
      } else if (hr >= 12 && hr < 17) {
        greetText = 'శుభ మధ్యాహ్నం • Good Afternoon ☀️';
      } else if (hr >= 17 && hr < 21) {
        greetText = 'శుభ సంధ్య • Serene Evening 🌇';
      } else {
        greetText = 'శుభ రాత్రి • Peaceful Night 🌙';
      }
      greetingEl.textContent = greetText;
    }
  }

  function renderDailyWisdom() {
    const wisdomEl = document.getElementById('daily-mantra-card');
    if (!wisdomEl) return;

    // Rotate mantra by day of year
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((currentDate - startOfYear) / (24 * 3600 * 1000));
    const mantra = MORNING_MANTRAS[dayOfYear % MORNING_MANTRAS.length];

    wisdomEl.innerHTML = `
      <div class="mantra-header">
        <span class="mantra-badge">🕉️ Daily Morning Chant</span>
        <h4 class="mantra-title">${mantra.title}</h4>
      </div>
      <pre class="mantra-shlokam">${mantra.shlokam}</pre>
      <p class="mantra-transliteration">${mantra.transliteration}</p>
      <p class="mantra-meaning"><strong>Meaning:</strong> ${mantra.meaning}</p>
    `;
  }

  function renderPanchang() {
    const p = Panchang.calculate(currentDate);

    // 1. Moon SVG render
    if (moonSvgContainer) {
      moonSvgContainer.innerHTML = MoonRenderer.renderSvg(p.elongation);
    }

    // 2. Paksha Badge & Moon status
    if (pakshaBadgeEl) {
      const isWaxing = p.isWaxing;
      pakshaBadgeEl.className = `paksha-badge ${isWaxing ? 'waxing' : 'waning'}`;
      pakshaBadgeEl.innerHTML = `
        <span class="paksha-icon">${p.phaseIcon}</span>
        <div class="paksha-info">
          <span class="paksha-type">${isWaxing ? 'WAXING PHASE (వృద్ధి)' : 'WANING PHASE (క్షయ)'}</span>
          <strong class="paksha-name">${p.paksha.name}</strong>
        </div>
      `;
    }

    if (moonIllumEl) {
      moonIllumEl.innerHTML = `<strong>${p.illumination.toFixed(1)}%</strong> <span class="subtext">Illuminated</span>`;
    }

    if (moonPhaseNameEl) {
      moonPhaseNameEl.textContent = p.phaseCategory;
    }

    if (moonAgeEl) {
      const keyPhases = MoonRenderer.getDaysToKeyPhases(p.elongation);
      moonAgeEl.innerHTML = `
        <span>Lunar Age: <strong>${p.moonAge.toFixed(1)} days</strong></span>
        <span class="phase-countdown">🌕 Purnima in ${keyPhases.daysToFull}d • 🌑 Amavasya in ${keyPhases.daysToNew}d</span>
      `;
    }

    // 3. Tithi
    if (tithiNameEl) {
      tithiNameEl.textContent = `${p.tithi.name} (Tithi ${p.tithi.inPaksha} of 15)`;
    }
    if (tithiTeluguEl) {
      tithiTeluguEl.textContent = p.tithi.telugu;
    }
    if (tithiProgressEl) {
      tithiProgressEl.style.width = `${Math.min(100, Math.max(5, p.tithi.progress))}%`;
    }
    if (tithiEndsEl) {
      const endStr = p.tithi.endTime ? p.tithi.endTime.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }) : '--:--';
      tithiEndsEl.textContent = `Ends approx: ${endStr} IST`;
    }

    // 4. Nakshatra, Masa, Vaaram, Yoga, Karana
    if (nakshatraNameEl) {
      nakshatraNameEl.innerHTML = `<strong>${p.nakshatra.name}</strong> (${p.nakshatra.telugu}) <span class="pada-badge">Pada ${p.nakshatra.pada}</span>`;
    }
    if (masaNameEl) {
      masaNameEl.innerHTML = `<strong>${p.masa.sanskrit}</strong> (${p.masa.telugu})`;
    }
    if (vaaramNameEl) {
      vaaramNameEl.innerHTML = `<strong>${p.vaaram.sanskrit}</strong> (${p.vaaram.telugu})`;
    }
    if (yogaNameEl) {
      yogaNameEl.textContent = p.yoga;
    }
    if (karanaNameEl) {
      karanaNameEl.textContent = p.karana;
    }
    if (rashiSummaryEl) {
      rashiSummaryEl.innerHTML = `
        <span>☀️ Sun in <strong>${p.rashi.sun.sanskrit}</strong> (${p.rashi.sun.telugu})</span>
        <span>🌙 Moon in <strong>${p.rashi.moon.sanskrit}</strong> (${p.rashi.moon.telugu})</span>
      `;
    }
  }

  function renderTimings() {
    const timings = SunCalc.calculateTimings(currentDate, selectedCity.lat, selectedCity.lon);
    if (!timings) return;

    if (sunriseEl) sunriseEl.textContent = SunCalc.formatTime(timings.sunrise);
    if (sunsetEl) sunsetEl.textContent = SunCalc.formatTime(timings.sunset);
    if (dayLengthEl) dayLengthEl.textContent = timings.dayLength;

    if (brahmaMuhurthamEl) {
      brahmaMuhurthamEl.textContent = `${SunCalc.formatTime(timings.brahmaMuhurtham.start)} - ${SunCalc.formatTime(timings.brahmaMuhurtham.end)}`;
    }
    if (abhijitMuhurthamEl) {
      abhijitMuhurthamEl.textContent = `${SunCalc.formatTime(timings.abhijitMuhurtham.start)} - ${SunCalc.formatTime(timings.abhijitMuhurtham.end)}`;
    }
    if (rahuKalamEl) {
      rahuKalamEl.textContent = `${SunCalc.formatTime(timings.rahuKalam.start)} - ${SunCalc.formatTime(timings.rahuKalam.end)}`;
    }
    if (yamagandamEl) {
      yamagandamEl.textContent = `${SunCalc.formatTime(timings.yamagandam.start)} - ${SunCalc.formatTime(timings.yamagandam.end)}`;
    }
    if (gulikaKalamEl) {
      gulikaKalamEl.textContent = `${SunCalc.formatTime(timings.gulikaKalam.start)} - ${SunCalc.formatTime(timings.gulikaKalam.end)}`;
    }
  }

  function updateNewsSection(newsData) {
    const links = NewsHub.getDynamicLinks(currentDate);

    // Update Action Buttons
    if (watchYtBtn) {
      watchYtBtn.href = newsData.url || links.channelDateSearchUrl;
    }
    if (searchTodayBtn) {
      searchTodayBtn.href = links.channelDateSearchUrl;
      searchTodayBtn.title = `Search TV9 for 4 Minutes 24 Headlines ${links.dates.ddmmyyyy}`;
    }
    if (searchChannelBtn) {
      searchChannelBtn.href = links.channelGeneralSearchUrl;
    }

    // Update Video Title & Timestamps
    if (newsTitleEl) {
      newsTitleEl.textContent = newsData.title || `4 Minutes 24 Headlines — ${links.dates.dateLong}`;
    }
    if (newsTimestampEl) {
      newsTimestampEl.textContent = NewsHub.formatISTDateTime(newsData.publishedAt);
    }
    if (newsRelativeTimeEl) {
      newsRelativeTimeEl.textContent = NewsHub.formatRelativeTime(newsData.publishedAt);
    }

    // Update Video Frame
    if (newsVideoFrame) {
      if (activeVideoTab === 'live') {
        newsVideoFrame.src = NewsHub.getEmbedUrl(null, true);
      } else {
        newsVideoFrame.src = NewsHub.getEmbedUrl(newsData.videoId);
      }
    }

    // Update Recent Bulletins List
    const recentList = NewsHub.getRecentBulletins();
    if (recentBulletinsList && recentList.length > 0) {
      recentBulletinsList.innerHTML = '';
      recentList.slice(0, 4).forEach(item => {
        const li = document.createElement('li');
        li.className = 'recent-bulletin-item';
        const isCurrent = item.videoId === newsData.videoId;
        li.innerHTML = `
          <button class="bulletin-select-btn ${isCurrent ? 'active' : ''}" data-video-id="${item.videoId}">
            <span class="bulletin-thumb-wrap">
              <img src="${item.thumbnail}" alt="Thumbnail" class="bulletin-mini-thumb" loading="lazy" />
              <span class="play-overlay">▶</span>
            </span>
            <div class="bulletin-meta">
              <span class="bulletin-title">${item.title}</span>
              <span class="bulletin-time">${NewsHub.formatISTTime(item.publishedAt)} • ${NewsHub.formatRelativeTime(item.publishedAt)}</span>
            </div>
          </button>
        `;
        recentBulletinsList.appendChild(li);
      });

      // Attach click events
      document.querySelectorAll('.bulletin-select-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const vId = btn.getAttribute('data-video-id');
          const found = recentList.find(x => x.videoId === vId);
          if (found) {
            updateNewsSection(found);
          }
        });
      });
    }
  }

  async function loadNews() {
    if (refreshNewsBtn) refreshNewsBtn.classList.add('spinning');
    try {
      const result = await NewsHub.fetchLatestNews();
      updateNewsSection(result.data);
    } catch (e) {
      console.error('Error fetching TV9 news:', e);
      updateNewsSection(NewsHub.getCurrentData());
    } finally {
      if (refreshNewsBtn) refreshNewsBtn.classList.remove('spinning');
    }
  }

  function setupNewsTabs() {
    if (tabBulletinBtn) {
      tabBulletinBtn.addEventListener('click', () => {
        activeVideoTab = 'bulletin';
        tabBulletinBtn.classList.add('active');
        if (tabLiveBtn) tabLiveBtn.classList.remove('active');
        updateNewsSection(NewsHub.getCurrentData());
      });
    }

    if (tabLiveBtn) {
      tabLiveBtn.addEventListener('click', () => {
        activeVideoTab = 'live';
        tabLiveBtn.classList.add('active');
        if (tabBulletinBtn) tabBulletinBtn.classList.remove('active');
        if (newsVideoFrame) {
          newsVideoFrame.src = NewsHub.getEmbedUrl(null, true);
        }
      });
    }

    if (refreshNewsBtn) {
      refreshNewsBtn.addEventListener('click', () => {
        loadNews();
      });
    }
  }

  function setupDateNavigation() {
    if (dateInputEl) {
      // Sync date picker
      const y = currentDate.getFullYear();
      const m = String(currentDate.getMonth() + 1).padStart(2, '0');
      const d = String(currentDate.getDate()).padStart(2, '0');
      dateInputEl.value = `${y}-${m}-${d}`;

      dateInputEl.addEventListener('change', (e) => {
        if (e.target.value) {
          const [yr, mo, da] = e.target.value.split('-').map(Number);
          currentDate = new Date(yr, mo - 1, da, 7, 0, 0);
          refreshAllViews();
        }
      });
    }

    if (prevDayBtn) {
      prevDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        syncDatePicker();
        refreshAllViews();
      });
    }

    if (nextDayBtn) {
      nextDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        syncDatePicker();
        refreshAllViews();
      });
    }

    if (todayBtn) {
      todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        syncDatePicker();
        refreshAllViews();
      });
    }
  }

  function syncDatePicker() {
    if (!dateInputEl) return;
    const y = currentDate.getFullYear();
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const d = String(currentDate.getDate()).padStart(2, '0');
    dateInputEl.value = `${y}-${m}-${d}`;
  }

  function setupNotes() {
    if (!morningNotesEl) return;
    const savedNotes = localStorage.getItem('morning_notes') || '';
    morningNotesEl.value = savedNotes;

    let debounceTimer;
    morningNotesEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      if (notesSavedIndicator) notesSavedIndicator.textContent = 'Saving...';
      debounceTimer = setTimeout(() => {
        localStorage.setItem('morning_notes', morningNotesEl.value);
        if (notesSavedIndicator) notesSavedIndicator.textContent = 'Saved';
      }, 500);
    });

    if (clearNotesBtn) {
      clearNotesBtn.addEventListener('click', () => {
        if (confirm('Clear today\'s morning notes?')) {
          morningNotesEl.value = '';
          localStorage.removeItem('morning_notes');
          if (notesSavedIndicator) notesSavedIndicator.textContent = 'Cleared';
        }
      });
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if typing in textarea or input
      if (['TEXTAREA', 'INPUT', 'SELECT'].includes(e.target.tagName)) return;

      if (e.key === 't' || e.key === 'T') {
        currentDate = new Date();
        syncDatePicker();
        refreshAllViews();
      } else if (e.key === '[') {
        currentDate.setDate(currentDate.getDate() - 1);
        syncDatePicker();
        refreshAllViews();
      } else if (e.key === ']') {
        currentDate.setDate(currentDate.getDate() + 1);
        syncDatePicker();
        refreshAllViews();
      } else if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      }
    });
  }

  function refreshAllViews() {
    renderPanchang();
    renderTimings();
    renderDailyWisdom();
    updateNewsSection(NewsHub.getCurrentData());
  }

  // Initial Boot
  initTheme();
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  populateCities();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  setupDateNavigation();
  setupNewsTabs();
  setupNotes();
  setupKeyboardShortcuts();

  // Initial render
  refreshAllViews();
  loadNews();
});

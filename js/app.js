/**
 * Main Application Controller for Daily Morning Page
 * Features:
 *  - 2 Prominent Toggles: Dark/Light Mode & Telugu/English Full-Site Language
 *  - High-precision Astronomical Hindu Panchangam by Moon Phase
 *  - Real-time Clock & Date Navigation
 *  - Sunrise/Sunset & Vedic Timings (Brahma Muhurtham, Rahu Kalam, etc.)
 *  - TV9 Telugu News Hub & Video Embeds
 *  - Bilingual Morning Wisdom & Notes (saved in localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Internationalization (i18n) Dictionary ----------------
  const I18N = {
    en: {
      appTitle: 'Prabhata • Daily Morning Page',
      themeBtnDark: '🌙 Dark Mode',
      themeBtnLight: '☀️ Light Mode',
      langBtn: 'తెలుగు',
      prevDay: '◀ Prev Day',
      today: 'Today',
      nextDay: 'Next Day ▶',
      shortcutsHint: 'Shortcuts: <kbd>T</kbd> Today • <kbd>[</kbd> Prev • <kbd>]</kbd> Next • <kbd>D</kbd> Dark/Light • <kbd>L</kbd> Language',
      
      // Panchang Card
      panchangTitle: 'Hindu Calendar & Moon Phase',
      panchangSub: 'Panchangam & Moon Phase',
      waxingType: 'WAXING PHASE',
      waningType: 'WANING PHASE',
      waxingName: 'Shukla Paksha (శుక్ల పక్షం)',
      waningName: 'Krishna Paksha (కృష్ణ పక్షం)',
      illuminated: 'Illuminated',
      lunarAgeLabel: 'Lunar Age:',
      daysUnit: 'days',
      purnimaCountdown: '🌕 Purnima in',
      amavasyaCountdown: '🌑 Amavasya in',
      tithiLabel: 'Current Tithi (తిథి)',
      tithiOf15: 'Tithi {num} of 15',
      tithiEndsApprox: 'Ends approx:',
      nakshatraLabel: 'Nakshatra (నక్షత్రం)',
      padaLabel: 'Pada',
      masaLabel: 'Masa / Month (మాసం)',
      vaaramLabel: 'Vaasara / Day (వారం)',
      yogaKaranaLabel: 'Yoga & Karana (యోగం, కరణం)',
      sunInLabel: '☀️ Sun in',
      moonInLabel: '🌙 Moon in',

      // Vedic Timings Card
      timingsTitle: 'Vedic Timings & Muhurthams',
      timingsSub: 'Sunrise & Muhurthams',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      dayLength: 'Day Length',
      brahmaMuhurtham: '🕊️ Brahma Muhurtham',
      abhijitMuhurtham: '✨ Abhijit Muhurtham',
      rahuKalam: '⚠️ Rahu Kalam',
      yamagandam: '⏳ Yamagandam',
      gulikaKalam: '🌿 Gulika Kalam',

      // TV9 News Card
      newsCardTitle: 'TV9 Telugu — 4 Min 24 Headlines',
      tabBulletin: '⚡ 4 Minutes 24 Headlines',
      tabLive: '🔴 TV9 Live Broadcast',
      fastNewsBadge: 'Fast News Bulletin',
      todayLatest: 'Today Latest',
      watchOnYt: 'Watch on YouTube (Direct Link)',
      todaySearch: "Today's Bulletin Search",
      channelBulletins: 'Channel Bulletins',
      recentBroadcastTitle: "Today's Broadcast Editions",

      // Priorities & Notes
      prioritiesTitle: 'Morning Priorities & Focus',
      saved: 'Saved',
      saving: 'Saving...',
      cleared: 'Cleared',
      clearBtn: 'Clear',
      notesPlaceholder: 'Write your morning thoughts, daily gratitude, or 3 top priorities for today... (auto-saved locally)',
      clearConfirm: "Clear today's morning notes?",

      // Footer
      footerText: 'Prabhata • Handcrafted Morning Sanctuary & Astronomical Hindu Panchangam',
      footerLiveLink: 'TV9 Telugu Live',
      footerHostedLink: 'Hosted on GitHub Pages',

      // City Names
      cities: {
        hyderabad: 'Hyderabad, TS',
        vijayawada: 'Vijayawada, AP',
        visakhapatnam: 'Visakhapatnam, AP',
        tirupati: 'Tirupati, AP',
        bengaluru: 'Bengaluru, KA',
        chennai: 'Chennai, TN',
        mumbai: 'Mumbai, MH',
        delhi: 'New Delhi, DL',
        london: 'London, UK',
        newyork: 'New York, US',
        sanfrancisco: 'San Francisco, US'
      }
    },
    te: {
      appTitle: 'ప్రభాత • నిత్య ఉదయపు దర్శనం',
      themeBtnDark: '🌙 డార్క్ మోడ్',
      themeBtnLight: '☀️ లైట్ మోడ్',
      langBtn: 'English',
      prevDay: '◀ నిన్న',
      today: 'నేడు',
      nextDay: 'రేపు ▶',
      shortcutsHint: 'షార్ట్‌కట్స్: <kbd>T</kbd> నేడు • <kbd>[</kbd> నిన్న • <kbd>]</kbd> రేపు • <kbd>D</kbd> డార్క్/లైట్ • <kbd>L</kbd> భాష',
      
      // Panchang Card
      panchangTitle: 'హిందూ పంచాంగం & చంద్ర కళ',
      panchangSub: 'తిథి, నక్షత్రం & చంద్ర దశ',
      waxingType: 'వృద్ధి కళ (శుక్ల పక్షం)',
      waningType: 'క్షయ కళ (కృష్ణ పక్షం)',
      waxingName: 'శుక్ల పక్షం (చంద్రవృద్ధి)',
      waningName: 'కృష్ణ పక్షం (చంద్రక్షయ)',
      illuminated: 'ప్రకాశితం',
      lunarAgeLabel: 'చంద్ర కాలం:',
      daysUnit: 'రోజులు',
      purnimaCountdown: '🌕 పౌర్ణమి ఇంకా',
      amavasyaCountdown: '🌑 అమావాస్య ఇంకా',
      tithiLabel: 'నేటి తిథి',
      tithiOf15: 'తిథి 15 లో {num}వ తిథి',
      tithiEndsApprox: 'ముగింపు సుమారు:',
      nakshatraLabel: 'నక్షత్రం',
      padaLabel: 'పాదము',
      masaLabel: 'మాసం',
      vaaramLabel: 'వారం',
      yogaKaranaLabel: 'యోగం & కరణం',
      sunInLabel: '☀️ సూర్యుడు:',
      moonInLabel: '🌙 చంద్రుడు:',

      // Vedic Timings Card
      timingsTitle: 'సూర్యోదయం & ముహూర్తాలు',
      timingsSub: 'శుభ & అశుభ కాలాలు',
      sunrise: 'సూర్యోదయం',
      sunset: 'సూర్యాస్తమయం',
      dayLength: 'పగటి సమయం',
      brahmaMuhurtham: '🕊️ బ్రహ్మ ముహూర్తం',
      abhijitMuhurtham: '✨ అభిజిత్ ముహూర్తం',
      rahuKalam: '⚠️ రాహు కాలం',
      yamagandam: '⏳ యమగండం',
      gulikaKalam: '🌿 గుళిక కాలం',

      // TV9 News Card
      newsCardTitle: 'టీవీ9 తెలుగు — 4 నిమిషాల్లో 24 హెడ్‌లైన్స్',
      tabBulletin: '⚡ 4 నిమిషాల్లో 24 వార్తలు',
      tabLive: '🔴 ప్రత్యక్ష ప్రసారం (Live)',
      fastNewsBadge: 'స్పీడ్ న్యూస్ బులెటిన్',
      todayLatest: 'నేటి తాజా బులెటిన్',
      watchOnYt: 'యూట్యూబ్‌లో చూడండి (డైరెక్ట్ లింక్)',
      todaySearch: 'నేటి బులెటిన్ శోధించండి',
      channelBulletins: 'ఛానల్ బులెటిన్లు',
      recentBroadcastTitle: 'నేటి ప్రసార ఎడిషన్లు',

      // Priorities & Notes
      prioritiesTitle: 'ఉదయపు లక్ష్యాలు & ప్రాధాన్యతలు',
      saved: 'సేవ్ అయింది',
      saving: 'సేవ్ అవుతోంది...',
      cleared: 'తొలగించబడింది',
      clearBtn: 'తుడిచివేయి',
      notesPlaceholder: 'మీ ఉదయపు ఆలోచనలు, కృతజ్ఞతలు లేదా నేటి ముఖ్యమైన 3 ప్రాధాన్యతలు ఇక్కడ రాయండి... (ఆటో-సేవ్ అవుతుంది)',
      clearConfirm: 'నేటి ఉదయపు నోట్స్ తుడిచివేయాలా?',

      // Footer
      footerText: 'ప్రభాత • నిత్య ఉదయపు దర్శనం & ఖగోళ హిందూ పంచాంగం',
      footerLiveLink: 'టీవీ9 తెలుగు లైవ్',
      footerHostedLink: 'గిట్‌హబ్ పేజీలలో హోస్ట్ చేయబడింది',

      // City Names in Telugu
      cities: {
        hyderabad: 'హైదరాబాద్, తెలంగాణ',
        vijayawada: 'విజయవాడ, ఆంధ్రప్రదేశ్',
        visakhapatnam: 'విశాఖపట్నం, ఆంధ్రప్రదేశ్',
        tirupati: 'తిరుపతి, ఆంధ్రప్రదేశ్',
        bengaluru: 'బెంగళూరు, కర్ణాటక',
        chennai: 'చెన్నై, తమిళనాడు',
        mumbai: 'ముంబై, మహారాష్ట్ర',
        delhi: 'న్యూ ఢిల్లీ',
        london: 'లండన్, UK',
        newyork: 'న్యూయార్క్, US',
        sanfrancisco: 'శాన్ ఫ్రాన్సిస్కో, US'
      }
    }
  };

  // State
  let currentDate = new Date();
  let currentTheme = localStorage.getItem('morning_theme') || 'dark'; // 'dark' or 'light'
  let currentLang = localStorage.getItem('morning_lang') || 'en';     // 'en' or 'te'
  let selectedCity = SunCalc.CITIES[0]; // Default: Hyderabad
  let activeVideoTab = 'bulletin'; // 'bulletin' or 'live'

  // Header Elements
  const liveClockEl = document.getElementById('live-clock');
  const liveDateEl = document.getElementById('live-date');
  const greetingEl = document.getElementById('greeting-text');
  const citySelectEl = document.getElementById('city-select');
  const dateInputEl = document.getElementById('date-picker');
  const prevDayBtn = document.getElementById('prev-day-btn');
  const nextDayBtn = document.getElementById('next-day-btn');
  const todayBtn = document.getElementById('today-btn');
  const shortcutsHintEl = document.getElementById('shortcuts-hint');

  // Toggle Buttons
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeBtnIcon = document.getElementById('theme-btn-icon');
  const themeBtnLabel = document.getElementById('theme-btn-label');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const langBtnLabel = document.getElementById('lang-btn-label');

  // Moon & Panchang Elements
  const moonSvgContainer = document.getElementById('moon-svg-container');
  const pakshaBadgeEl = document.getElementById('paksha-badge');
  const pakshaTypeLabel = document.getElementById('paksha-type-label');
  const pakshaNameLabel = document.getElementById('paksha-name-label');
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
  const labelBrahmaMuhurtham = document.getElementById('label-brahma-muhurtham');
  const labelAbhijitMuhurtham = document.getElementById('label-abhijit-muhurtham');
  const labelRahuKalam = document.getElementById('label-rahu-kalam');
  const labelYamagandam = document.getElementById('label-yamagandam');
  const labelGulikaKalam = document.getElementById('label-gulika-kalam');

  // TV9 News Elements
  const newsVideoFrame = document.getElementById('news-video-frame');
  const newsTitleEl = document.getElementById('news-title');
  const newsTimestampEl = document.getElementById('news-timestamp');
  const newsRelativeTimeEl = document.getElementById('news-relative-time');
  const watchYtBtn = document.getElementById('watch-yt-btn');
  const watchYtBtnLabel = document.getElementById('watch-yt-btn-label');
  const searchTodayBtn = document.getElementById('search-today-btn');
  const searchTodayBtnLabel = document.getElementById('search-today-btn-label');
  const searchChannelBtn = document.getElementById('search-channel-btn');
  const searchChannelBtnLabel = document.getElementById('search-channel-btn-label');
  const tabBulletinBtn = document.getElementById('tab-bulletin');
  const tabBulletinLabel = document.getElementById('tab-bulletin-label');
  const tabLiveBtn = document.getElementById('tab-live');
  const tabLiveLabel = document.getElementById('tab-live-label');
  const refreshNewsBtn = document.getElementById('refresh-news-btn');
  const recentBulletinsList = document.getElementById('recent-bulletins-list');

  // Morning Intention & Notes
  const morningNotesEl = document.getElementById('morning-notes');
  const clearNotesBtn = document.getElementById('clear-notes-btn');
  const notesSavedIndicator = document.getElementById('notes-saved-indicator');

  // Bilingual Mantras
  const MORNING_MANTRAS = [
    {
      shlokam: 'కరాగ్రే వసతే లక్ష్మీః కరమధ్యే సరస్వతీ ।\nకరమూలే స్థితా గౌరీ ప్రభాతే కరదర్శనమ్ ॥',
      transliteration: 'Karāgre Vasate Lakṣmīḥ Karamadhye Sarasvatī |\nKaramūle Sthitā Gaurī Prabhāte Karadarśanam ||',
      title_en: 'Prabhata Kara Darshanam (Morning Palm Prayer)',
      title_te: 'ప్రభాత కరదర్శనం (ఉదయపు అరచేతి ప్రార్థన)',
      meaning_en: 'At the tips of the fingers dwells Goddess Lakshmi; in the center resides Goddess Saraswati; at the base sits Goddess Gowri. Behold your palms each morning upon waking.',
      meaning_te: 'చేతి వేళ్ల కొనలలో లక్ష్మీదేవి, అరచేతి మధ్యలో సరస్వతీ దేవి, అరచేతి మూలంలో పార్వతీ దేవి కొలువై ఉంటారు. ప్రాతఃకాలంలో నిద్రలేవగానే మొదట మన అరచేతులను దర్శించాలి.'
    },
    {
      shlokam: 'ఓం భూర్భువః స్వః తత్సవితుర్వరేణ్యమ్ ।\nభర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్ ॥',
      transliteration: 'Oṃ Bhūr Bhuvaḥ Svaḥ Tat-Savitur-Vareṇyam |\nBhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt ||',
      title_en: 'Gayatri Mantra',
      title_te: 'గాయత్రీ మంత్రం',
      meaning_en: 'We meditate on the transcendental glory of the Sun deity Savitur; may that divine illumination enlighten our intellect and guide our actions.',
      meaning_te: 'సకల లోకాలను సృష్టించి ప్రకాశింపజేసే ఆ పరమేశ్వరుని దివ్య తేజస్సును మేము ధ్యానిస్తున్నాము. ఆ పరమాత్మ మా బుద్ధిని సన్మార్గంలో నడిపించుగాక.'
    },
    {
      shlokam: 'ఓం సూర్యాయ నమః । ఓం ఆదిత్యాయ నమః ।\nఆరోగ్యం భాస్కరాదిచ్ఛేత్ శ్రియమిచ్ఛేత్ హుతాశనాత్ ॥',
      transliteration: 'Oṃ Sūryāya Namaḥ | Oṃ Ādityāya Namaḥ |\nĀrogyaṃ Bhāskarād-Icchet Śriyam-Icchet Hutāśanāt ||',
      title_en: 'Surya Vandanam (Sun Salutation)',
      title_te: 'సూర్య వందనం (ఆరోగ్య ప్రదాత నమస్కారం)',
      meaning_en: 'Salutations to the Sun deity who bestows health, vitality, and illumination. Seek radiant health and clarity from the Sun each morning.',
      meaning_te: 'సమస్త జీవులకు ప్రాణశక్తిని, ఆరోగ్యాన్ని ప్రసాదించే సూర్య భగవానునికి ప్రణామాలు. ఉదయపు సూర్య నమస్కారాల వల్ల ఆయురారోగ్యాలు, తేజస్సు చేకూరుతాయి.'
    },
    {
      shlokam: 'సర్వే భవంతు సుఖినః సర్వే సంతు నిరామయాః ।\nసర్వే భద్రాణి పశ్యంతు మా కశ్చిద్దుఃఖభాగ్‌భవేత్ ॥',
      transliteration: 'Sarve Bhavantu Sukhinaḥ Sarve Santu Nirāmayāḥ |\nSarve Bhadrāṇi Paśyantu Mā Kaścid-Duḥkha-Bhāg-Bhavet ||',
      title_en: 'Shanti Prarthana (Universal Peace)',
      title_te: 'శాంతి ప్రార్థన (సర్వజన సుఖ ప్రార్థన)',
      meaning_en: 'May all beings be happy; may all be healthy and free from illness; may all behold goodness and auspiciousness; may none suffer distress.',
      meaning_te: 'సకల ప్రాణులు సుఖంగా ఉండుగాక; అందరూ ఆరోగ్యంగా రోగ విముక్తులుగా ఉండుగాక; అందరికీ శుభములు కలుగుగాక; ఎవరూ ఎలాంటి దుఃఖానికి గురికాకుండుగాక.'
    }
  ];

  // ---------------- Theme Management (Dark / Light) ----------------
  function applyTheme(theme) {
    currentTheme = (theme === 'light') ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('morning_theme', currentTheme);

    const t = I18N[currentLang];
    if (themeBtnIcon && themeBtnLabel) {
      if (currentTheme === 'dark') {
        themeBtnIcon.textContent = '☀️';
        themeBtnLabel.textContent = (currentLang === 'te') ? 'లైట్ మోడ్' : 'Light Mode';
      } else {
        themeBtnIcon.textContent = '🌙';
        themeBtnLabel.textContent = (currentLang === 'te') ? 'డార్క్ మోడ్' : 'Dark Mode';
      }
    }
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  // ---------------- Language Management (Telugu / English) ----------------
  function applyLanguage(lang) {
    currentLang = (lang === 'te') ? 'te' : 'en';
    document.documentElement.setAttribute('data-lang', currentLang);
    localStorage.setItem('morning_lang', currentLang);

    const t = I18N[currentLang];

    // 1. Update Lang button label
    if (langBtnLabel) {
      langBtnLabel.textContent = t.langBtn;
    }

    // 2. Update Theme button label in current language
    if (themeBtnLabel) {
      themeBtnLabel.textContent = (currentTheme === 'dark')
        ? (currentLang === 'te' ? 'లైట్ మోడ్' : 'Light Mode')
        : (currentLang === 'te' ? 'డార్క్ మోడ్' : 'Dark Mode');
    }

    // 3. Update all static data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // 4. Update dynamic interactive buttons & labels
    if (shortcutsHintEl) shortcutsHintEl.innerHTML = t.shortcutsHint;
    if (tabBulletinLabel) tabBulletinLabel.textContent = t.tabBulletin;
    if (tabLiveLabel) tabLiveLabel.textContent = t.tabLive;
    if (watchYtBtnLabel) watchYtBtnLabel.textContent = t.watchOnYt;
    if (searchTodayBtnLabel) searchTodayBtnLabel.textContent = t.todaySearch;
    if (searchChannelBtnLabel) searchChannelBtnLabel.textContent = t.channelBulletins;
    if (morningNotesEl) morningNotesEl.placeholder = t.notesPlaceholder;

    // 5. Update Timings labels
    if (labelBrahmaMuhurtham) labelBrahmaMuhurtham.textContent = t.brahmaMuhurtham;
    if (labelAbhijitMuhurtham) labelAbhijitMuhurtham.textContent = t.abhijitMuhurtham;
    if (labelRahuKalam) labelRahuKalam.textContent = t.rahuKalam;
    if (labelYamagandam) labelYamagandam.textContent = t.yamagandam;
    if (labelGulikaKalam) labelGulikaKalam.textContent = t.gulikaKalam;

    // Hide or adjust Telugu sub-labels in Telugu mode to avoid redundancy
    const subLabels = [
      'sub-brahma-muhurtham', 'sub-abhijit-muhurtham',
      'sub-rahu-kalam', 'sub-yamagandam', 'sub-gulika-kalam'
    ];
    subLabels.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = (currentLang === 'te') ? 'none' : 'inline';
    });

    // 6. Repopulate city names in selected language
    populateCities();

    // 7. Refresh all dynamic views
    refreshAllViews();
  }

  function toggleLanguage() {
    applyLanguage(currentLang === 'en' ? 'te' : 'en');
  }

  // ---------------- City Selector ----------------
  function populateCities() {
    if (!citySelectEl) return;
    const currentCityId = selectedCity ? selectedCity.id : 'hyderabad';
    citySelectEl.innerHTML = '';

    const t = I18N[currentLang];
    SunCalc.CITIES.forEach(city => {
      const opt = document.createElement('option');
      opt.value = city.id;
      opt.textContent = (t.cities && t.cities[city.id]) ? t.cities[city.id] : city.name;
      if (city.id === currentCityId) {
        opt.selected = true;
      }
      citySelectEl.appendChild(opt);
    });
  }

  // ---------------- Live Digital Clock & Greeting ----------------
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
      if (currentLang === 'te') {
        const teluguWeekdays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
        const teluguMonths = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జూలై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
        liveDateEl.textContent = `${teluguWeekdays[now.getDay()]}, ${now.getDate()} ${teluguMonths[now.getMonth()]} ${now.getFullYear()}`;
      } else {
        liveDateEl.textContent = now.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    }

    // Dynamic greeting based on current local hour & language
    if (greetingEl) {
      const hr = now.getHours();
      let greetText = '';
      if (currentLang === 'te') {
        if (hr >= 4 && hr < 6) greetText = 'సుప్రభాతం • బ్రహ్మ ముహూర్త ప్రశాంతత 🕊️';
        else if (hr >= 6 && hr < 12) greetText = 'శుభోదయం • ప్రాతఃకాల దర్శనం 🌅';
        else if (hr >= 12 && hr < 17) greetText = 'శుభ మధ్యాహ్నం • మధ్యాహ్న దర్శనం ☀️';
        else if (hr >= 17 && hr < 21) greetText = 'శుభ సంధ్య • ప్రశాంత సంధ్యా సమయం 🌇';
        else greetText = 'శుభ రాత్రి • ప్రశాంత రాత్రి 🌙';
      } else {
        if (hr >= 4 && hr < 6) greetText = 'Suprabhatam • Brahma Muhurtham Peace 🕊️';
        else if (hr >= 6 && hr < 12) greetText = 'Shubhodhayam • Good Morning! 🌅';
        else if (hr >= 12 && hr < 17) greetText = 'Shubha Madhyahnam • Good Afternoon ☀️';
        else if (hr >= 17 && hr < 21) greetText = 'Shubha Sandhya • Serene Evening 🌇';
        else greetText = 'Shubha Ratri • Peaceful Night 🌙';
      }
      greetingEl.textContent = greetText;
    }
  }

  // ---------------- Daily Morning Mantra / Wisdom ----------------
  function renderDailyWisdom() {
    const wisdomEl = document.getElementById('daily-mantra-card');
    if (!wisdomEl) return;

    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((currentDate - startOfYear) / (24 * 3600 * 1000));
    const mantra = MORNING_MANTRAS[dayOfYear % MORNING_MANTRAS.length];
    const t = I18N[currentLang];

    const title = (currentLang === 'te') ? mantra.title_te : mantra.title_en;
    const meaning = (currentLang === 'te') ? mantra.meaning_te : mantra.meaning_en;

    wisdomEl.innerHTML = `
      <div class="mantra-header">
        <span class="mantra-badge">${t.mantraBadge}</span>
        <h4 class="mantra-title">${title}</h4>
      </div>
      <pre class="mantra-shlokam">${mantra.shlokam}</pre>
      <p class="mantra-transliteration">${mantra.transliteration}</p>
      <p class="mantra-meaning"><strong>${t.meaningLabel}</strong> ${meaning}</p>
    `;
  }

  // ---------------- Astronomical Hindu Panchangam ----------------
  function renderPanchang() {
    const p = Panchang.calculate(currentDate);
    const t = I18N[currentLang];
    const isTe = (currentLang === 'te');

    // 1. Moon SVG render
    if (moonSvgContainer) {
      moonSvgContainer.innerHTML = MoonRenderer.renderSvg(p.elongation);
    }

    // 2. Paksha Badge & Status
    if (pakshaBadgeEl && pakshaTypeLabel && pakshaNameLabel) {
      const isWaxing = p.isWaxing;
      pakshaBadgeEl.className = `paksha-badge ${isWaxing ? 'waxing' : 'waning'}`;
      pakshaTypeLabel.textContent = isWaxing ? t.waxingType : t.waningType;
      pakshaNameLabel.textContent = isWaxing ? t.waxingName : t.waningName;
    }

    // 3. Illumination & Phase category
    if (moonIllumEl) {
      moonIllumEl.innerHTML = `<strong>${p.illumination.toFixed(1)}%</strong> <span class="subtext">${t.illuminated}</span>`;
    }

    if (moonPhaseNameEl) {
      if (isTe) {
        // Telugu phase descriptions
        if (p.elongation < 7.5 || p.elongation >= 352.5) moonPhaseNameEl.textContent = 'అమావాస్య (నూతన చంద్ర దశ)';
        else if (p.elongation < 82.5) moonPhaseNameEl.textContent = 'శుక్ల పక్ష వృద్ధి కళ (పాడ్యమి నుండి సప్తమి)';
        else if (p.elongation < 97.5) moonPhaseNameEl.textContent = 'శుక్ల అష్టమి (ప్రథమ పాద చంద్రుడు)';
        else if (p.elongation < 172.5) moonPhaseNameEl.textContent = 'శుక్ల పక్ష వృద్ధి గిబ్బస్ (నవమి నుండి చతుర్దశి)';
        else if (p.elongation < 187.5) moonPhaseNameEl.textContent = 'పౌర్ణమి (పూర్ణ చంద్ర బింబం)';
        else if (p.elongation < 262.5) moonPhaseNameEl.textContent = 'కృష్ణ పక్ష క్షయ గిబ్బస్ (పాడ్యమి నుండి సప్తమి)';
        else if (p.elongation < 277.5) moonPhaseNameEl.textContent = 'కృష్ణ అష్టమి (తృతీయ పాద చంద్రుడు)';
        else moonPhaseNameEl.textContent = 'కృష్ణ పక్ష క్షయ కళ (నవమి నుండి చతుర్దశి)';
      } else {
        moonPhaseNameEl.textContent = p.phaseCategory;
      }
    }

    if (moonAgeEl) {
      const keyPhases = MoonRenderer.getDaysToKeyPhases(p.elongation);
      moonAgeEl.innerHTML = `
        <span>${t.lunarAgeLabel} <strong>${p.moonAge.toFixed(1)} ${t.daysUnit}</strong></span>
        <span class="phase-countdown">${t.purnimaCountdown} ${keyPhases.daysToFull}d • ${t.amavasyaCountdown} ${keyPhases.daysToNew}d</span>
      `;
    }

    // 4. Tithi
    if (tithiNameEl) {
      tithiNameEl.textContent = isTe
        ? `${p.tithi.telugu.split(' ')[0]} (${p.paksha.telugu} ${p.tithi.inPaksha}వ తిథి)`
        : `${p.tithi.name} (Tithi ${p.tithi.inPaksha} of 15)`;
    }
    if (tithiTeluguEl) {
      tithiTeluguEl.textContent = isTe
        ? `${p.tithi.telugu} • ${p.paksha.telugu}`
        : `${p.tithi.telugu} • ${p.paksha.name}`;
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
      tithiEndsEl.textContent = `${t.tithiEndsApprox} ${endStr} IST`;
    }

    // 5. Nakshatra, Masa, Vaaram, Yoga, Karana
    if (nakshatraNameEl) {
      nakshatraNameEl.innerHTML = isTe
        ? `<strong>${p.nakshatra.telugu}</strong> <span class="pada-badge">${p.nakshatra.pada}వ ${t.padaLabel}</span>`
        : `<strong>${p.nakshatra.name}</strong> (${p.nakshatra.telugu}) <span class="pada-badge">${t.padaLabel} ${p.nakshatra.pada}</span>`;
    }
    if (masaNameEl) {
      masaNameEl.innerHTML = isTe
        ? `<strong>${p.masa.telugu}</strong>`
        : `<strong>${p.masa.sanskrit}</strong> (${p.masa.telugu})`;
    }
    if (vaaramNameEl) {
      vaaramNameEl.innerHTML = isTe
        ? `<strong>${p.vaaram.telugu}</strong>`
        : `<strong>${p.vaaram.sanskrit}</strong> (${p.vaaram.telugu})`;
    }
    if (yogaNameEl) {
      yogaNameEl.textContent = p.yoga;
    }
    if (karanaNameEl) {
      karanaNameEl.textContent = p.karana;
    }
    if (rashiSummaryEl) {
      rashiSummaryEl.innerHTML = isTe
        ? `<span>${t.sunInLabel} <strong>${p.rashi.sun.telugu} రాశిలో</strong></span>
           <span>${t.moonInLabel} <strong>${p.rashi.moon.telugu} రాశిలో</strong></span>`
        : `<span>${t.sunInLabel} <strong>${p.rashi.sun.sanskrit}</strong> (${p.rashi.sun.telugu})</span>
           <span>${t.moonInLabel} <strong>${p.rashi.moon.sanskrit}</strong> (${p.rashi.moon.telugu})</span>`;
    }
  }

  // ---------------- Vedic Timings ----------------
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

  // ---------------- TV9 Telugu News Hub ----------------
  function updateNewsSection(newsData) {
    const links = NewsHub.getDynamicLinks(currentDate);
    const t = I18N[currentLang];

    if (watchYtBtn) watchYtBtn.href = newsData.url || links.channelDateSearchUrl;
    if (searchTodayBtn) searchTodayBtn.href = links.channelDateSearchUrl;
    if (searchChannelBtn) searchChannelBtn.href = links.channelGeneralSearchUrl;

    if (newsTitleEl) {
      newsTitleEl.textContent = newsData.title || `4 Minutes 24 Headlines — ${links.dates.dateLong}`;
    }
    if (newsTimestampEl) {
      newsTimestampEl.textContent = NewsHub.formatISTDateTime(newsData.publishedAt);
    }
    if (newsRelativeTimeEl) {
      newsRelativeTimeEl.textContent = (currentLang === 'te')
        ? (NewsHub.formatRelativeTime(newsData.publishedAt) === 'Just now' ? 'ఇప్పుడే' : NewsHub.formatRelativeTime(newsData.publishedAt).replace('ago', 'క్రితం'))
        : NewsHub.formatRelativeTime(newsData.publishedAt);
    }

    if (newsVideoFrame) {
      if (activeVideoTab === 'live') {
        newsVideoFrame.src = NewsHub.getEmbedUrl(null, true);
      } else {
        newsVideoFrame.src = NewsHub.getEmbedUrl(newsData.videoId);
      }
    }

    // Recent Bulletins
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

      document.querySelectorAll('.bulletin-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
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
      refreshNewsBtn.addEventListener('click', loadNews);
    }
  }

  // ---------------- Date Navigation ----------------
  function setupDateNavigation() {
    if (dateInputEl) {
      syncDatePicker();
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

  // ---------------- Morning Scratchpad ----------------
  function setupNotes() {
    if (!morningNotesEl) return;
    const savedNotes = localStorage.getItem('morning_notes') || '';
    morningNotesEl.value = savedNotes;

    let debounceTimer;
    morningNotesEl.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      const t = I18N[currentLang];
      if (notesSavedIndicator) notesSavedIndicator.textContent = t.saving;
      debounceTimer = setTimeout(() => {
        localStorage.setItem('morning_notes', morningNotesEl.value);
        if (notesSavedIndicator) notesSavedIndicator.textContent = t.saved;
      }, 500);
    });

    if (clearNotesBtn) {
      clearNotesBtn.addEventListener('click', () => {
        const t = I18N[currentLang];
        if (confirm(t.clearConfirm)) {
          morningNotesEl.value = '';
          localStorage.removeItem('morning_notes');
          if (notesSavedIndicator) notesSavedIndicator.textContent = t.cleared;
        }
      });
    }
  }

  // ---------------- Keyboard Shortcuts ----------------
  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
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
      } else if (e.key === 'l' || e.key === 'L') {
        toggleLanguage();
      }
    });
  }

  function refreshAllViews() {
    renderPanchang();
    renderTimings();
    renderDailyWisdom();
    updateNewsSection(NewsHub.getCurrentData());
    updateLiveClock();
  }

  // ---------------- Initial Boot ----------------
  // Setup Buttons
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);

  if (citySelectEl) {
    citySelectEl.addEventListener('change', (e) => {
      const found = SunCalc.CITIES.find(c => c.id === e.target.value);
      if (found) {
        selectedCity = found;
        localStorage.setItem('morning_city', found.id);
        renderTimings();
      }
    });
  }

  const savedCityId = localStorage.getItem('morning_city');
  if (savedCityId) {
    const found = SunCalc.CITIES.find(c => c.id === savedCityId);
    if (found) selectedCity = found;
  }

  // Apply Theme & Language
  applyTheme(currentTheme);
  applyLanguage(currentLang);

  // Setup components
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  setupDateNavigation();
  setupNewsTabs();
  setupNotes();
  setupKeyboardShortcuts();

  // Load news
  loadNews();
});

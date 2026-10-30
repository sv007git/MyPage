/**
 * Main Application Controller for Daily Morning Page
 * Layout:
 *  - LEFT COLUMN: TV9 Telugu News Hub & Morning Wisdom (Chants)
 *  - RIGHT COLUMN: Hindu Calendar & Vedic Timings (Panchangam, Sun/Moon)
 * Language Modes:
 *  - English (EN): Strictly 100% English text with ZERO Telugu characters
 *  - Telugu (TE): Comprehensive, authentic Telugu script across all modules
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------- Strictly Separated Bilingual Dictionary ----------------
  const I18N = {
    en: {
      appTitle: 'Prabhata • Daily Morning Sanctuary',
      themeBtnDark: '🌙 Dark Mode',
      themeBtnLight: '☀️ Light Mode',
      langBtn: 'తెలుగు',
      prevDay: '◀ Prev Day',
      today: 'Today',
      nextDay: 'Next Day ▶',
      shortcutsHint: 'Shortcuts: <kbd>T</kbd> Today • <kbd>[</kbd> Prev • <kbd>]</kbd> Next • <kbd>D</kbd> Dark/Light • <kbd>L</kbd> Language',

      // News Hub Card (Left Column)
      newsCardTitle: 'TV9 Telugu — 4 Minutes 24 Headlines',
      tabBulletin: '⚡ 4 Minutes 24 Headlines',
      tabLive: '🔴 TV9 Live Broadcast',
      fastNewsBadge: 'Speed News Bulletin',
      todayLatest: "Today's Latest Edition",
      watchOnYt: 'Watch on YouTube (Direct Link)',
      todaySearch: "Today's Bulletin Search",
      channelBulletins: 'TV9 Channel Bulletins',
      recentBroadcastTitle: "Today's Broadcast Editions",

      // Panchang Card (Right Column)
      panchangTitle: 'Hindu Calendar & Moon Phase',
      panchangSub: 'Lunar Phase & Vedic Almanac',
      waxingType: 'WAXING PHASE',
      waningType: 'WANING PHASE',
      waxingName: 'Shukla Paksha (Waxing Phase)',
      waningName: 'Krishna Paksha (Waning Phase)',
      illuminated: 'Illuminated',
      lunarAgeLabel: 'Lunar Age:',
      daysUnit: 'days',
      purnimaCountdown: '🌕 Full Moon in',
      amavasyaCountdown: '🌑 New Moon in',
      tithiLabel: 'Current Lunar Day (Tithi)',
      tithiEndsApprox: 'Ends approx:',
      nakshatraLabel: 'Nakshatra (Lunar Mansion)',
      padaLabel: 'Pada',
      masaLabel: 'Lunar Month (Masa)',
      vaaramLabel: 'Weekday (Vaasara)',
      yogaKaranaLabel: 'Yoga & Karana',
      sunInLabel: '☀️ Sun in',
      moonInLabel: '🌙 Moon in',

      // Vedic Timings Card (Right Column)
      timingsTitle: 'Vedic Timings & Muhurthams',
      timingsSub: 'Solar & Astrological Hours',
      currentLocationLabel: 'Current Location',
      currentLocationSuffix: '(Current Location)',
      detectingLocation: '📍 Detecting location...',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      dayLength: 'Day Length',
      brahmaMuhurtham: '🕊️ Brahma Muhurtham',
      subBrahmaMuhurtham: '(Pre-Dawn Meditation)',
      abhijitMuhurtham: '✨ Abhijit Muhurtham',
      subAbhijitMuhurtham: '(Auspicious Midday)',
      rahuKalam: '⚠️ Rahu Kalam',
      subRahuKalam: '(Inauspicious Window)',
      yamagandam: '⏳ Yamagandam',
      subYamagandam: '(Inauspicious Window)',
      gulikaKalam: '🌿 Gulika Kalam',
      subGulikaKalam: '(Auspicious Window)',

      // Footer
      footerText: 'Prabhata • Handcrafted Morning Sanctuary & Astronomical Hindu Panchangam',
      footerLiveLink: 'TV9 Telugu Live',
      footerHostedLink: 'Hosted on GitHub Pages',

      // Daily Dharma & Worship Guide (Omkaram Format)
      dharmaTitle: 'Daily Dharma & Puja Guide',
      dharmaSub: 'Panchang-Based Spiritual Observance • Omkaram Devi Shree Guruji Margam',
      dharmaObservanceGuide: 'Puja Guide',
      copyMantra: 'Copy Mantra',
      copiedMantra: 'Copied!',

      // Cities in Pure English
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
      appTitle: 'ప్రభాత • నిత్య ప్రాతఃకాల దర్శనం',
      themeBtnDark: '🌙 డార్క్ మోడ్',
      themeBtnLight: '☀️ లైట్ మోడ్',
      langBtn: 'English',
      prevDay: '◀ నిన్న',
      today: 'నేడు',
      nextDay: 'రేపు ▶',
      shortcutsHint: 'షార్ట్‌కట్స్: <kbd>T</kbd> నేడు • <kbd>[</kbd> నిన్న • <kbd>]</kbd> రేపు • <kbd>D</kbd> డార్క్/లైట్ • <kbd>L</kbd> భాష',

      // News Hub Card (Left Column)
      newsCardTitle: 'టీవీ9 తెలుగు — 4 నిమిషాల్లో 24 హెడ్‌లైన్స్',
      tabBulletin: '⚡ 4 నిమిషాల్లో 24 వార్తలు',
      tabLive: '🔴 ప్రత్యక్ష ప్రసారం (Live)',
      fastNewsBadge: 'స్పీడ్ న్యూస్ బులెటిన్',
      todayLatest: 'నేటి తాజా బులెటిన్',
      watchOnYt: 'యూట్యూబ్‌లో చూడండి (డైరెక్ట్ లింక్)',
      todaySearch: 'నేటి బులెటిన్ శోధించండి',
      channelBulletins: 'ఛానల్ బులెటిన్లు',
      recentBroadcastTitle: 'నేటి ప్రసార ఎడిషన్లు',

      // Panchang Card (Right Column)
      panchangTitle: 'హిందూ పంచాంగం & చంద్ర కళ',
      panchangSub: 'తిథి, నక్షత్రం & ఖగోళ పంచాంగం',
      waxingType: 'వృద్ధి కళ (శుక్ల పక్షం)',
      waningType: 'క్షయ కళ (కృష్ణ పక్షం)',
      waxingName: 'శుక్ల పక్షం (చంద్రవృద్ధి దశ)',
      waningName: 'కృష్ణ పక్షం (చంద్రక్షయ దశ)',
      illuminated: 'ప్రకాశితం',
      lunarAgeLabel: 'చంద్ర కాలం:',
      daysUnit: 'రోజులు',
      purnimaCountdown: '🌕 పౌర్ణమి ఇంకా',
      amavasyaCountdown: '🌑 అమావాస్య ఇంకా',
      tithiLabel: 'నేటి తిథి',
      tithiEndsApprox: 'ముగింపు సుమారు:',
      nakshatraLabel: 'నక్షత్రం',
      padaLabel: 'పాదం',
      masaLabel: 'మాసం',
      vaaramLabel: 'వారం',
      yogaKaranaLabel: 'యోగం & కరణం',
      sunInLabel: '☀️ సూర్యుడు:',
      moonInLabel: '🌙 చంద్రుడు:',

      // Vedic Timings Card (Right Column)
      timingsTitle: 'సూర్యోదయం & ముహూర్తాలు',
      timingsSub: 'శుభ & అశుభ కాలాలు',
      currentLocationLabel: 'ప్రస్తుత స్థానం',
      currentLocationSuffix: '(ప్రస్తుత స్థానం)',
      detectingLocation: '📍 ప్రస్తుత స్థానం లెక్కింపు...',
      sunrise: 'సూర్యోదయం',
      sunset: 'సూర్యాస్తమయం',
      dayLength: 'పగటి సమయం',
      brahmaMuhurtham: '🕊️ బ్రహ్మ ముహూర్తం',
      subBrahmaMuhurtham: '(ఉదయపు ధ్యాన సమయం)',
      abhijitMuhurtham: '✨ అభిజిత్ ముహూర్తం',
      subAbhijitMuhurtham: '(మధ్యాహ్న శుభ సమయం)',
      rahuKalam: '⚠️ రాహు కాలం',
      subRahuKalam: '(వర్జ్య కాలం)',
      yamagandam: '⏳ యమగండం',
      subYamagandam: '(అశుభ సమయం)',
      gulikaKalam: '🌿 గుళిక కాలం',
      subGulikaKalam: '(శుభ సమయం)',

      // Footer
      footerText: 'ప్రభాత • నిత్య ఉదయపు దర్శనం & ఖగోళ హిందూ పంచాంగం',
      footerLiveLink: 'టీవీ9 తెలుగు లైవ్',
      footerHostedLink: 'గిట్‌హబ్ పేజీలలో హోస్ట్ చేయబడింది',

      // Daily Dharma & Worship Guide (Omkaram Format)
      dharmaTitle: 'నేటి ధర్మం & నిత్య పూజా విధానం',
      dharmaSub: 'పంచాంగ అధిష్టాన దైవారాధన • ఓంకారం దేవిశ్రీ గురూజీ మార్గం',
      dharmaObservanceGuide: 'పూజా విధానం',
      copyMantra: 'మంత్రం కాపీ చేయండి',
      copiedMantra: 'కాపీ అయింది!',

      // Cities in Pure Telugu
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
  let activeVideoTab = 'bulletin'; // 'bulletin' or 'live'

  // IP Location detection & city selection initialization
  const cachedLoc = (typeof SunCalc !== 'undefined' && SunCalc.getCachedLocation) ? SunCalc.getCachedLocation() : null;
  const manualCityId = localStorage.getItem('morning_city_manual');
  let selectedCity = null;

  if (manualCityId && manualCityId !== 'current_ip') {
    selectedCity = SunCalc.CITIES.find(c => c.id === manualCityId) || SunCalc.CITIES[0];
  } else if (cachedLoc) {
    selectedCity = cachedLoc;
  } else {
    selectedCity = SunCalc.CITIES[0]; // Temporary fallback until detectLocationFromIP completes
  }

  // Header Elements
  const appTitleEl = document.getElementById('app-title');
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

  // Left Column: News Elements
  const newsCardTitleEl = document.getElementById('news-card-title');
  const newsVideoFrame = document.getElementById('news-video-frame');
  const newsTitleEl = document.getElementById('news-title');
  const newsTimestampEl = document.getElementById('news-timestamp');
  const newsRelativeTimeEl = document.getElementById('news-relative-time');
  const bulletinTypeBadgeEl = document.getElementById('bulletin-type-badge');
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
  const recentBroadcastTitleEl = document.getElementById('recent-broadcast-title');
  const recentBulletinsList = document.getElementById('recent-bulletins-list');

  // Right Column: Moon & Panchang Elements
  const panchangTitleEl = document.getElementById('panchang-title');
  const panchangSubEl = document.getElementById('panchang-sub');
  const moonSvgContainer = document.getElementById('moon-svg-container');
  const pakshaBadgeEl = document.getElementById('paksha-badge');
  const pakshaTypeLabel = document.getElementById('paksha-type-label');
  const pakshaNameLabel = document.getElementById('paksha-name-label');
  const moonIllumEl = document.getElementById('moon-illumination');
  const moonPhaseNameEl = document.getElementById('moon-phase-name');
  const moonAgeEl = document.getElementById('moon-age');
  const tithiLabelEl = document.getElementById('tithi-label');
  const tithiNameEl = document.getElementById('tithi-name');
  const tithiSubDetailEl = document.getElementById('tithi-sub-detail');
  const tithiProgressEl = document.getElementById('tithi-progress');
  const tithiEndsEl = document.getElementById('tithi-ends');
  const labelNakshatraEl = document.getElementById('label-nakshatra');
  const nakshatraNameEl = document.getElementById('nakshatra-name');
  const labelMasaEl = document.getElementById('label-masa');
  const masaNameEl = document.getElementById('masa-name');
  const labelVaaramEl = document.getElementById('label-vaaram');
  const vaaramNameEl = document.getElementById('vaaram-name');
  const labelYogaKaranaEl = document.getElementById('label-yoga-karana');
  const yogaNameEl = document.getElementById('yoga-name');
  const karanaNameEl = document.getElementById('karana-name');
  const rashiSummaryEl = document.getElementById('rashi-summary');

  // Right Column: Timings Elements
  const timingsTitleEl = document.getElementById('timings-title');
  const timingsSubEl = document.getElementById('timings-sub');
  const labelSunriseEl = document.getElementById('label-sunrise');
  const labelSunsetEl = document.getElementById('label-sunset');
  const labelDayLengthEl = document.getElementById('label-daylength');
  const sunriseEl = document.getElementById('sunrise-time');
  const sunsetEl = document.getElementById('sunset-time');
  const dayLengthEl = document.getElementById('day-length');
  const labelBrahmaMuhurtham = document.getElementById('label-brahma-muhurtham');
  const subBrahmaMuhurtham = document.getElementById('sub-brahma-muhurtham');
  const brahmaMuhurthamEl = document.getElementById('brahma-muhurtham');
  const labelAbhijitMuhurtham = document.getElementById('label-abhijit-muhurtham');
  const subAbhijitMuhurtham = document.getElementById('sub-abhijit-muhurtham');
  const abhijitMuhurthamEl = document.getElementById('abhijit-muhurtham');
  const labelRahuKalam = document.getElementById('label-rahu-kalam');
  const subRahuKalam = document.getElementById('sub-rahu-kalam');
  const rahuKalamEl = document.getElementById('rahu-kalam');
  const labelYamagandam = document.getElementById('label-yamagandam');
  const subYamagandam = document.getElementById('sub-yamagandam');
  const yamagandamEl = document.getElementById('yamagandam');
  const labelGulikaKalam = document.getElementById('label-gulika-kalam');
  const subGulikaKalam = document.getElementById('sub-gulika-kalam');
  const gulikaKalamEl = document.getElementById('gulika-kalam');

  // Footer Elements
  const footerTextEl = document.getElementById('footer-text');
  const footerLiveLinkEl = document.getElementById('footer-live-link');
  const footerHostedLinkEl = document.getElementById('footer-hosted-link');

  // Dharma Guide & Observance Elements
  const dailyDharmaCard = document.getElementById('daily-dharma-card');
  const panchangObservanceBanner = document.getElementById('panchang-observance-banner');
  const panchangObservanceTitle = document.getElementById('panchang-observance-title');
  const observanceGuideBtnText = document.getElementById('observance-guide-btn-text');

  // ---------------- Bilingual Mantras ----------------
  const MORNING_MANTRAS = [
    {
      shlokam_en: 'Karāgre Vasate Lakṣmīḥ Karamadhye Sarasvatī |\nKaramūle Sthitā Gaurī Prabhāte Karadarśanam ||',
      shlokam_te: 'కరాగ్రే వసతే లక్ష్మీః కరమధ్యే సరస్వతీ ।\nకరమూలే స్థితా గౌరీ ప్రభాతే కరదర్శనమ్ ॥',
      title_en: 'Morning Palm Prayer (Prabhata Kara Darshanam)',
      title_te: 'ప్రభాత కరదర్శనం (ఉదయపు అరచేతి ప్రార్థన)',
      meaning_en: 'At the tips of the fingers dwells Goddess Lakshmi; in the center resides Goddess Saraswati; at the base sits Goddess Gowri. Behold your palms each morning upon waking.',
      meaning_te: 'చేతి వేళ్ల కొనలలో లక్ష్మీదేవి, అరచేతి మధ్యలో సరస్వతీ దేవి, అరచేతి మూలంలో పార్వతీ దేవి కొలువై ఉంటారు. కాబట్టి ప్రాతఃకాలంలో నిద్రలేవగానే మొదట మన అరచేతులను దర్శించాలి.'
    },
    {
      shlokam_en: 'Oṃ Bhūr Bhuvaḥ Svaḥ Tat-Savitur-Vareṇyam |\nBhargo Devasya Dhīmahi Dhiyo Yo Naḥ Pracodayāt ||',
      shlokam_te: 'ఓం భూర్భువః స్వః తత్సవితుర్వరేణ్యమ్ ।\nభర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్ ॥',
      title_en: 'Gayatri Mantra',
      title_te: 'గాయత్రీ మంత్రం',
      meaning_en: 'We meditate on the transcendental radiance of the Sun deity Savitur; may that divine illumination enlighten our intellect and guide our actions.',
      meaning_te: 'సకల లోకాలను సృష్టించి ప్రకాశింపజేసే ఆ పరమేశ్వరుని దివ్య తేజస్సును మేము ధ్యానిస్తున్నాము. ఆ పరమాత్మ మా బుద్ధిని సన్మార్గంలో నడిపించుగాక.'
    },
    {
      shlokam_en: 'Oṃ Sūryāya Namaḥ | Oṃ Ādityāya Namaḥ |\nĀrogyaṃ Bhāskarād-Icchet Śriyam-Icchet Hutāśanāt ||',
      shlokam_te: 'ఓం సూర్యాయ నమః । ఓం ఆదిత్యాయ నమః ।\nఆరోగ్యం భాస్కరాదిచ్ఛేత్ శ్రియమిచ్ఛేత్ హుతాశనాత్ ॥',
      title_en: 'Surya Vandana (Sun Salutation Prayer)',
      title_te: 'సూర్య వందనం (ఆరోగ్య ప్రదాత ప్రార్థన)',
      meaning_en: 'Salutations to the Sun deity who bestows health, vitality, and illumination. Seek radiant health and clarity from the Sun each morning.',
      meaning_te: 'సమస్త జీవులకు ప్రాణశక్తిని, ఆరోగ్యాన్ని ప్రసాదించే సూర్య భగవానునికి ప్రణామాలు. ఉదయపు సూర్య నమస్కారాల వల్ల ఆయురారోగ్యాలు, తేజస్సు చేకూరుతాయి.'
    },
    {
      shlokam_en: 'Sarve Bhavantu Sukhinaḥ Sarve Santu Nirāmayāḥ |\nSarve Bhadrāṇi Paśyantu Mā Kaścid-Duḥkha-Bhāg-Bhavet ||',
      shlokam_te: 'సర్వే భవంతు సుఖినః సర్వే సంతు నిరామయాః ।\nసర్వే భద్రాణి పశ్యంతు మా కశ్చిద్దుఃఖభాగ్‌భవేత్ ॥',
      title_en: 'Shanti Prarthana (Universal Peace Chant)',
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
        themeBtnLabel.textContent = t.themeBtnLight;
      } else {
        themeBtnIcon.textContent = '🌙';
        themeBtnLabel.textContent = t.themeBtnDark;
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

    // Document Title
    document.title = (currentLang === 'te')
      ? 'ప్రభాత • నిత్య ఉదయపు దర్శనం'
      : 'Prabhata • Daily Morning Sanctuary';

    // Top Header
    if (appTitleEl) appTitleEl.textContent = t.appTitle;
    if (langBtnLabel) langBtnLabel.textContent = t.langBtn;
    if (themeBtnLabel) {
      themeBtnLabel.textContent = (currentTheme === 'dark') ? t.themeBtnLight : t.themeBtnDark;
    }

    // Navigation Strip
    if (prevDayBtn) prevDayBtn.textContent = t.prevDay;
    if (todayBtn) todayBtn.textContent = t.today;
    if (nextDayBtn) nextDayBtn.textContent = t.nextDay;
    if (shortcutsHintEl) shortcutsHintEl.innerHTML = t.shortcutsHint;

    // Left Column: News Hub
    if (newsCardTitleEl) newsCardTitleEl.textContent = t.newsCardTitle;
    if (tabBulletinLabel) tabBulletinLabel.textContent = t.tabBulletin;
    if (tabLiveLabel) tabLiveLabel.textContent = t.tabLive;
    if (bulletinTypeBadgeEl) bulletinTypeBadgeEl.textContent = t.fastNewsBadge;
    if (watchYtBtnLabel) watchYtBtnLabel.textContent = t.watchOnYt;
    if (searchTodayBtnLabel) searchTodayBtnLabel.textContent = t.todaySearch;
    if (searchChannelBtnLabel) searchChannelBtnLabel.textContent = t.channelBulletins;
    if (recentBroadcastTitleEl) recentBroadcastTitleEl.textContent = t.recentBroadcastTitle;

    // Right Column: Panchang Card
    if (panchangTitleEl) panchangTitleEl.textContent = t.panchangTitle;
    if (panchangSubEl) panchangSubEl.textContent = t.panchangSub;
    if (tithiLabelEl) tithiLabelEl.textContent = t.tithiLabel;
    if (labelNakshatraEl) labelNakshatraEl.textContent = t.nakshatraLabel;
    if (labelMasaEl) labelMasaEl.textContent = t.masaLabel;
    if (labelVaaramEl) labelVaaramEl.textContent = t.vaaramLabel;
    if (labelYogaKaranaEl) labelYogaKaranaEl.textContent = t.yogaKaranaLabel;

    // Right Column: Vedic Timings Card
    if (timingsTitleEl) timingsTitleEl.textContent = t.timingsTitle;
    if (timingsSubEl) timingsSubEl.textContent = t.timingsSub;
    if (labelSunriseEl) labelSunriseEl.textContent = t.sunrise;
    if (labelSunsetEl) labelSunsetEl.textContent = t.sunset;
    if (labelDayLengthEl) labelDayLengthEl.textContent = t.dayLength;
    if (labelBrahmaMuhurtham) labelBrahmaMuhurtham.textContent = t.brahmaMuhurtham;
    if (subBrahmaMuhurtham) subBrahmaMuhurtham.textContent = t.subBrahmaMuhurtham;
    if (labelAbhijitMuhurtham) labelAbhijitMuhurtham.textContent = t.abhijitMuhurtham;
    if (subAbhijitMuhurtham) subAbhijitMuhurtham.textContent = t.subAbhijitMuhurtham;
    if (labelRahuKalam) labelRahuKalam.textContent = t.rahuKalam;
    if (subRahuKalam) subRahuKalam.textContent = t.subRahuKalam;
    if (labelYamagandam) labelYamagandam.textContent = t.yamagandam;
    if (subYamagandam) subYamagandam.textContent = t.subYamagandam;
    if (labelGulikaKalam) labelGulikaKalam.textContent = t.gulikaKalam;
    if (subGulikaKalam) subGulikaKalam.textContent = t.subGulikaKalam;

    // Footer
    if (footerTextEl) footerTextEl.textContent = t.footerText;
    if (footerLiveLinkEl) footerLiveLinkEl.textContent = t.footerLiveLink;
    if (footerHostedLinkEl) footerHostedLinkEl.textContent = t.footerHostedLink;

    // Repopulate city names in selected language
    populateCities();

    // Re-render dynamic sections
    refreshAllViews();
  }

  function toggleLanguage() {
    applyLanguage(currentLang === 'en' ? 'te' : 'en');
  }

  // ---------------- City Selector (Auto-detect from IP + Presets) ----------------
  function populateCities() {
    if (!citySelectEl) return;
    const currentCityId = selectedCity ? selectedCity.id : 'hyderabad';
    citySelectEl.innerHTML = '';

    const t = I18N[currentLang];
    const isTe = (currentLang === 'te');
    const detectedLoc = (typeof SunCalc !== 'undefined' && SunCalc.getDetectedLocation) ? SunCalc.getDetectedLocation() : null;

    // 1. IP detected location (top item)
    if (detectedLoc) {
      const opt = document.createElement('option');
      opt.value = 'current_ip';
      if (isTe) {
        const teName = detectedLoc.nameTe || detectedLoc.city;
        opt.textContent = `📍 ${teName} ${t.currentLocationSuffix}`;
      } else {
        const enName = `${detectedLoc.city}${detectedLoc.region ? ', ' + detectedLoc.region : ''}`;
        opt.textContent = `📍 ${enName} ${t.currentLocationSuffix}`;
      }
      if (currentCityId === 'current_ip') {
        opt.selected = true;
      }
      citySelectEl.appendChild(opt);

      // Visual divider
      const sep = document.createElement('option');
      sep.disabled = true;
      sep.textContent = '──────────';
      citySelectEl.appendChild(sep);
    } else {
      const opt = document.createElement('option');
      opt.value = 'current_ip';
      opt.textContent = t.detectingLocation;
      if (currentCityId === 'current_ip') {
        opt.selected = true;
      }
      citySelectEl.appendChild(opt);
    }

    // 2. Standard Pre-configured Cities
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
        if (hr >= 4 && hr < 6) greetText = 'Brahma Muhurtham Peace 🕊️';
        else if (hr >= 6 && hr < 12) greetText = 'Good Morning! 🌅';
        else if (hr >= 12 && hr < 17) greetText = 'Good Afternoon ☀️';
        else if (hr >= 17 && hr < 21) greetText = 'Serene Evening 🌇';
        else greetText = 'Peaceful Night 🌙';
      }
      greetingEl.textContent = greetText;
    }
  }

  // ---------------- Daily Dharma & Worship Guide (Omkaram Format) ----------------
  function renderDharmaGuide() {
    if (!dailyDharmaCard || typeof DharmaGuide === 'undefined') return;

    const p = Panchang.calculate(currentDate);
    const guide = DharmaGuide.generateGuide(p, currentLang);
    const isTe = (currentLang === 'te');
    const t = I18N[currentLang];

    // 1. Update Observatory Banner in Right Column Panchang Card
    if (panchangObservanceBanner && panchangObservanceTitle) {
      panchangObservanceTitle.textContent = `${guide.observanceTitle} (${guide.observanceBadge})`;
      if (observanceGuideBtnText) {
        observanceGuideBtnText.textContent = `🕉️ ${t.dharmaObservanceGuide || (isTe ? 'పూజా విధానం' : 'Puja Guide')}`;
      }
    }

    // 2. Render Full Dharma Guide Card in Left Column
    const specialClass = guide.isSpecialObservance ? ' special-vrata' : '';
    
    // Transliteration display (only in English mode if available)
    const translitHtml = (!isTe && guide.mainMantra.translit)
      ? `<div class="mantra-translit-text">${guide.mainMantra.translit}</div>`
      : '';

    // Weekday mantra secondary block
    const weekdayMeaningHtml = (!isTe && guide.weekdayMantra.meaning)
      ? `<div class="graha-meaning">${guide.weekdayMantra.meaning}</div>`
      : '';

    // Step 5 practice detail
    const step5Practice = guide.puja.specialPractice
      ? `<br><em>${isTe ? 'నేటి విశేష నియమం:' : 'Special Observance:'}</em> ${guide.puja.specialPractice}`
      : '';

    dailyDharmaCard.innerHTML = `
      <div class="card-header dharma-card-header">
        <div class="card-title-group">
          <span class="dharma-icon">🕉️</span>
          <h2 class="dharma-main-title">${t.dharmaTitle}</h2>
        </div>
        <span class="dharma-sub-title">${t.dharmaSub}</span>
      </div>

      <!-- Presiding Deity & Observance Spotlight -->
      <div class="dharma-hero-spotlight${specialClass}">
        <div class="spotlight-badge-row">
          <span class="spotlight-badge">${guide.observanceBadge}</span>
          <span class="panchang-sub-inline">${guide.panchangSummary}</span>
        </div>
        <h3 class="spotlight-deity-name">${guide.deityName}</h3>
        <div class="spotlight-reason">${guide.reasonText}</div>
      </div>

      <!-- Primary Sacred Mantra -->
      <div class="dharma-section">
        <div class="section-title-strip">
          <span class="strip-icon">📿</span>
          <h4>${isTe ? 'నేటి ప్రధాన మంత్రం' : 'Sacred Mantra of the Day'}</h4>
          <span class="mantra-count-badge">${isTe ? 'జప సంఖ్య:' : 'Repetition:'} ${guide.mainMantra.count}</span>
        </div>
        <div class="mantra-text-box">
          <pre class="sacred-shlokam-text">${guide.mainMantra.sanskrit}</pre>
          ${translitHtml}
          <div class="mantra-meaning-text"><strong>${isTe ? 'తాత్పర్యం:' : 'Meaning:'}</strong> ${guide.mainMantra.meaning}</div>
        </div>
        <div class="mantra-action-bar">
          <button class="copy-mantra-btn" id="copy-main-mantra-btn" type="button" title="${isTe ? 'మంత్రం కాపీ చేయండి' : 'Copy Mantra to Clipboard'}">
            <span>📋</span> <span class="copy-btn-text">${t.copyMantra || (isTe ? 'మంత్రం కాపీ చేయండి' : 'Copy Mantra')}</span>
          </button>
        </div>
      </div>

      <!-- Secondary Weekday Planetary Deity Mantra -->
      <div class="dharma-section">
        <div class="section-title-strip">
          <span class="strip-icon">🪐</span>
          <h4>${isTe ? 'వార అధిపతి మంత్రం' : 'Weekday Planetary Deity Mantra'} — ${guide.weekdayMantra.name}</h4>
        </div>
        <div class="weekday-mantra-content">
          <div class="graha-mantra-code">${guide.weekdayMantra.text}</div>
          ${weekdayMeaningHtml}
        </div>
      </div>

      <!-- 5-Step Simple Home Puja Routine -->
      <div class="dharma-section">
        <div class="section-title-strip">
          <span class="strip-icon">🪔</span>
          <h4>${isTe ? 'గృహ పూజా విధానం (5 సులభ దశలు)' : 'Simple 5-Step Home Puja Routine'}</h4>
        </div>
        <div class="puja-steps-grid">
          <div class="puja-step-card">
            <span class="step-num">1</span>
            <div class="step-content">
              <strong>${isTe ? 'దీపారాధన & శుచి' : 'Prepare Your Sacred Space'}</strong>
              <p>${isTe ? 'పూజా మందిరాన్ని శుభ్రం చేసి, ఆవు నెయ్యి లేదా నువ్వుల నూనెతో దీపం వెలిగించండి. ప్రశాంత చిత్తంతో ఆచమనం చేయండి.' : 'Clean the altar, light a traditional ghee or sesame oil lamp safely, and sit facing East or North with calm breath.'}</p>
            </div>
          </div>
          <div class="puja-step-card">
            <span class="step-num">2</span>
            <div class="step-content">
              <strong>${isTe ? 'గణపతి ప్రార్థన' : 'Seek Sri Ganesha\'s Grace'}</strong>
              <p>${isTe ? '"ఓం గం గణపతయే నమః" అని 11 సార్లు జపించి, విఘ్నాలు తొలగి పూజ నిర్విఘ్నంగా సాగాలని ప్రార్థించండి.' : 'Chant "Om Gam Ganapataye Namah" 11 times, praying for clarity and removal of all inner and outer obstacles.'}</p>
            </div>
          </div>
          <div class="puja-step-card">
            <span class="step-num">3</span>
            <div class="step-content">
              <strong>${isTe ? 'ప్రధాన దైవారాధన & పుష్ప సమర్పణ' : 'Worship ' + guide.deityName}</strong>
              <p>${isTe ? `పుష్పాలు: ${guide.puja.flowers} సమర్పించండి. భక్తి శ్రద్ధలతో ప్రధాన మంత్రాన్ని ${guide.mainMantra.count} జపించండి.` : `Offer ${guide.puja.flowers}. Meditate and chant the sacred mantra ${guide.mainMantra.count} with heartfelt devotion.`}</p>
            </div>
          </div>
          <div class="puja-step-card">
            <span class="step-num">4</span>
            <div class="step-content">
              <strong>${isTe ? 'నైవేద్యం & కర్పూర నీరాజనం' : 'Offer Naivedyam & Arati'}</strong>
              <p>${isTe ? `నైవేద్యం: ${guide.puja.naivedyam} సమర్పించి, భక్తితో కర్పూర హారతి లేదా ధూపం చూపించండి.` : `Offer ${guide.puja.naivedyam}. Wave incense or camphor flame (Arati) with gratitude.`}</p>
            </div>
          </div>
          <div class="puja-step-card">
            <span class="step-num">5</span>
            <div class="step-content">
              <strong>${isTe ? 'దాన ధర్మం & ముగింపు' : 'Charity & Prayer Completion'}</strong>
              <p>${guide.puja.charity}${step5Practice}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Why This Day is Special: Puranic Story & Omkaram Wisdom -->
      <div class="dharma-section">
        <div class="section-title-strip">
          <span class="strip-icon">📖</span>
          <h4>${isTe ? 'నేటి తిథి విశిష్టత & పురాణ గాథ' : 'Why This Day is Special — Puranic Story & Significance'}</h4>
        </div>
        <p class="puranic-story-text">${guide.puranicStory}</p>
      </div>

      <!-- Gentle Health & Fasting Guidance -->
      <div class="dharma-section gentle-note">
        <div class="fasting-health-note">${isTe ? 'గమనిక: పూజా సంకల్పం, ఉపవాసం శారీరక ఆరోగ్యం మరియు కుటుంబ ఆచారాలను బట్టి ఆచరించాలి. ఆరోగ్య రీత్యా పూర్తి ఉపవాసం వీలుకాని వారు పండ్లు లేదా పాలు తీసుకుంటూ భగవద్ ధ్యానం చేయవచ్చు.' : 'Devotional Note: Fasting and rigorous observances should always be tailored to your health and family traditions. If complete fasting is not suitable, consuming fruits, milk, or a simple vegetarian sattvic meal while engaging in quiet contemplation is equally auspicious.'}</div>
      </div>
    `;

    // Hook up copy mantra button
    const copyBtn = document.getElementById('copy-main-mantra-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = isTe
          ? `${guide.mainMantra.sanskrit}\n\nతాత్పర్యం: ${guide.mainMantra.meaning}`
          : `${guide.mainMantra.sanskrit}\n\n${guide.mainMantra.translit}\n\nMeaning: ${guide.mainMantra.meaning}`;
        
        const onCopied = () => {
          copyBtn.classList.add('copied');
          const btnTextEl = copyBtn.querySelector('.copy-btn-text');
          if (btnTextEl) btnTextEl.textContent = t.copiedMantra || (isTe ? 'కాపీ అయింది!' : 'Copied!');
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (btnTextEl) btnTextEl.textContent = t.copyMantra || (isTe ? 'మంత్రం కాపీ చేయండి' : 'Copy Mantra');
          }, 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(onCopied).catch(() => {
            fallbackCopyText(textToCopy, onCopied);
          });
        } else {
          fallbackCopyText(textToCopy, onCopied);
        }
      });
    }
  }

  function fallbackCopyText(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.warn('Copy failed:', err);
    }
    document.body.removeChild(ta);
  }

  const renderDailyWisdom = renderDharmaGuide;

  // ---------------- Astronomical Hindu Panchangam (Strictly Bilingual) ----------------
  function renderPanchang() {
    const p = Panchang.calculate(currentDate);
    const t = I18N[currentLang];
    const isTe = (currentLang === 'te');

    // 1. Moon SVG Render
    if (moonSvgContainer) {
      moonSvgContainer.innerHTML = MoonRenderer.renderSvg(p.elongation);
    }

    // 2. Paksha Badge & Status (Strict separation: ZERO Telugu text in English mode!)
    if (pakshaBadgeEl && pakshaTypeLabel && pakshaNameLabel) {
      const isWaxing = p.isWaxing;
      pakshaBadgeEl.className = `paksha-badge ${isWaxing ? 'waxing' : 'waning'}`;
      pakshaTypeLabel.textContent = isWaxing ? t.waxingType : t.waningType;
      pakshaNameLabel.textContent = isWaxing
        ? (isTe ? 'శుక్ల పక్షం (చంద్రవృద్ధి)' : 'Shukla Paksha (Waxing Phase)')
        : (isTe ? 'కృష్ణ పక్షం (చంద్రక్షయ)' : 'Krishna Paksha (Waning Phase)');
    }

    // 3. Illumination & Phase Category
    if (moonIllumEl) {
      moonIllumEl.innerHTML = `<strong>${p.illumination.toFixed(1)}%</strong> <span class="subtext">${t.illuminated}</span>`;
    }

    if (moonPhaseNameEl) {
      if (isTe) {
        if (p.elongation < 7.5 || p.elongation >= 352.5) moonPhaseNameEl.textContent = 'అమావాస్య (నూతన చంద్ర దశ)';
        else if (p.elongation < 82.5) moonPhaseNameEl.textContent = 'శుక్ల పక్ష వృద్ధి కళ (పాడ్యమి నుండి సప్తమి)';
        else if (p.elongation < 97.5) moonPhaseNameEl.textContent = 'శుక్ల అష్టమి (ప్రథమ పాద చంద్రుడు)';
        else if (p.elongation < 172.5) moonPhaseNameEl.textContent = 'శుక్ల పక్ష వృద్ధి గిబ్బస్ (నవమి నుండి చతుర్దశి)';
        else if (p.elongation < 187.5) moonPhaseNameEl.textContent = 'పౌర్ణమి (పూర్ణ చంద్ర బింబం)';
        else if (p.elongation < 262.5) moonPhaseNameEl.textContent = 'కృష్ణ పక్ష క్షయ గిబ్బస్ (పాడ్యమి నుండి సప్తమి)';
        else if (p.elongation < 277.5) moonPhaseNameEl.textContent = 'కృష్ణ అష్టమి (తృతీయ పాద చంద్రుడు)';
        else moonPhaseNameEl.textContent = 'కృష్ణ పక్ష క్షయ కళ (నవమి నుండి చతుర్దశి)';
      } else {
        if (p.elongation < 7.5 || p.elongation >= 352.5) moonPhaseNameEl.textContent = 'New Moon (Amavasya)';
        else if (p.elongation < 82.5) moonPhaseNameEl.textContent = 'Waxing Crescent (Shukla Prathama to Saptami)';
        else if (p.elongation < 97.5) moonPhaseNameEl.textContent = 'First Quarter Moon (Shukla Ashtami)';
        else if (p.elongation < 172.5) moonPhaseNameEl.textContent = 'Waxing Gibbous (Shukla Navami to Chaturdashi)';
        else if (p.elongation < 187.5) moonPhaseNameEl.textContent = 'Full Moon (Purnima)';
        else if (p.elongation < 262.5) moonPhaseNameEl.textContent = 'Waning Gibbous (Krishna Prathama to Saptami)';
        else if (p.elongation < 277.5) moonPhaseNameEl.textContent = 'Third Quarter Moon (Krishna Ashtami)';
        else moonPhaseNameEl.textContent = 'Waning Crescent (Krishna Navami to Chaturdashi)';
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
      if (isTe) {
        tithiNameEl.textContent = `${p.tithi.telugu} (${p.tithi.inPaksha}వ తిథి)`;
      } else {
        tithiNameEl.textContent = `${p.tithi.name} (Tithi ${p.tithi.inPaksha} of 15)`;
      }
    }

    if (tithiSubDetailEl) {
      if (isTe) {
        tithiSubDetailEl.textContent = `${p.tithi.telugu} • ${p.paksha.telugu}`;
      } else {
        tithiSubDetailEl.textContent = `${p.paksha.short} Paksha • ${p.tithi.name} (Lunar Day ${p.tithi.inPaksha})`;
      }
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

    // 5. Nakshatra, Masa, Vaaram (ZERO Telugu in English mode!)
    if (nakshatraNameEl) {
      nakshatraNameEl.innerHTML = isTe
        ? `<strong>${p.nakshatra.telugu}</strong> <span class="pada-badge">${p.nakshatra.pada}వ ${t.padaLabel}</span>`
        : `<strong>${p.nakshatra.name}</strong> <span class="pada-badge">${t.padaLabel} ${p.nakshatra.pada}</span>`;
    }

    if (masaNameEl) {
      masaNameEl.innerHTML = isTe
        ? `<strong>${p.masa.telugu} మాసం</strong>`
        : `<strong>${p.masa.sanskrit} Month</strong>`;
    }

    if (vaaramNameEl) {
      vaaramNameEl.innerHTML = isTe
        ? `<strong>${p.vaaram.telugu}</strong>`
        : `<strong>${p.vaaram.english} (${p.vaaram.sanskrit})</strong>`;
    }

    if (yogaNameEl) yogaNameEl.textContent = p.yoga;
    if (karanaNameEl) karanaNameEl.textContent = p.karana;

    // 6. Rashi Summary
    if (rashiSummaryEl) {
      rashiSummaryEl.innerHTML = isTe
        ? `<span>${t.sunInLabel} <strong>${p.rashi.sun.telugu} రాశిలో</strong></span>
           <span>${t.moonInLabel} <strong>${p.rashi.moon.telugu} రాశిలో</strong></span>`
        : `<span>${t.sunInLabel} <strong>${p.rashi.sun.english} (${p.rashi.sun.sanskrit})</strong></span>
           <span>${t.moonInLabel} <strong>${p.rashi.moon.english} (${p.rashi.moon.sanskrit})</strong></span>`;
    }
  }

  // ---------------- Vedic Timings ----------------
  function renderTimings() {
    const timings = SunCalc.calculateTimings(currentDate, selectedCity.lat, selectedCity.lon);
    if (!timings) return;

    const t = I18N[currentLang];
    const isTe = (currentLang === 'te');

    // Display current city name in Timings subtitle
    if (timingsSubEl) {
      let cityDisplay = '';
      if (selectedCity.isCurrentLocation) {
        if (isTe) {
          cityDisplay = `${selectedCity.nameTe || selectedCity.city} (${t.currentLocationLabel})`;
        } else {
          cityDisplay = `${selectedCity.city}${selectedCity.region ? ', ' + selectedCity.region : ''} (Current Location)`;
        }
      } else {
        cityDisplay = (t.cities && t.cities[selectedCity.id]) ? t.cities[selectedCity.id] : selectedCity.name;
      }
      timingsSubEl.textContent = `${t.timingsSub} • ${cityDisplay}`;
    }

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
    const isTe = (currentLang === 'te');

    if (watchYtBtn) watchYtBtn.href = newsData.url || links.channelDateSearchUrl;
    if (searchTodayBtn) searchTodayBtn.href = links.channelDateSearchUrl;
    if (searchChannelBtn) searchChannelBtn.href = links.channelGeneralSearchUrl;

    if (newsTitleEl) {
      let title = newsData.title || `4 Minutes 24 Headlines — ${links.dates.dateLong}`;
      if (!isTe && /[\u0C00-\u0C7F]/.test(title)) {
        title = title.replace(/[\u0C00-\u0C7F]+/g, '').replace(/\|\s*\|/g, '|').trim();
        if (title.length < 10) {
          title = `4 Minutes 24 Headlines | ${links.dates.dateLong} - TV9`;
        }
      }
      newsTitleEl.textContent = title;
    }

    if (newsTimestampEl) {
      newsTimestampEl.textContent = NewsHub.formatISTDateTime(newsData.publishedAt);
    }

    if (newsRelativeTimeEl) {
      const relTime = NewsHub.formatRelativeTime(newsData.publishedAt);
      if (isTe) {
        newsRelativeTimeEl.textContent = (relTime === 'Just now') ? 'ఇప్పుడే' : relTime.replace('ago', 'క్రితం');
      } else {
        newsRelativeTimeEl.textContent = relTime;
      }
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

        let itemTitle = item.title;
        if (!isTe && /[\u0C00-\u0C7F]/.test(itemTitle)) {
          itemTitle = itemTitle.replace(/[\u0C00-\u0C7F]+/g, '').replace(/\|\s*\|/g, '|').trim();
          if (itemTitle.length < 8) itemTitle = '4 Minutes 24 Headlines - TV9';
        }

        li.innerHTML = `
          <button class="bulletin-select-btn ${isCurrent ? 'active' : ''}" data-video-id="${item.videoId}">
            <span class="bulletin-thumb-wrap">
              <img src="${item.thumbnail}" alt="Thumbnail" class="bulletin-mini-thumb" loading="lazy" />
              <span class="play-overlay">▶</span>
            </span>
            <div class="bulletin-meta">
              <span class="bulletin-title">${itemTitle}</span>
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
    renderDharmaGuide();
    updateNewsSection(NewsHub.getCurrentData());
    updateLiveClock();
  }

  // ---------------- Initial Boot ----------------
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);

  if (citySelectEl) {
    citySelectEl.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'current_ip') {
        const detected = (typeof SunCalc !== 'undefined' && SunCalc.getDetectedLocation) ? SunCalc.getDetectedLocation() : null;
        if (detected) {
          selectedCity = detected;
        }
        localStorage.removeItem('morning_city_manual');
        renderTimings();
      } else {
        const found = SunCalc.CITIES.find(c => c.id === val);
        if (found) {
          selectedCity = found;
          localStorage.setItem('morning_city_manual', found.id);
          renderTimings();
        }
      }
    });
  }

  // Auto-detect current city from IP location in background
  if (typeof SunCalc !== 'undefined' && SunCalc.detectLocationFromIP) {
    SunCalc.detectLocationFromIP().then((loc) => {
      if (loc) {
        const manualCity = localStorage.getItem('morning_city_manual');
        // If user hasn't manually selected a specific static city, use the detected IP location
        if (!manualCity || manualCity === 'current_ip') {
          selectedCity = loc;
          renderTimings();
        }
        populateCities();
      }
    }).catch((err) => {
      console.warn('IP location detection notice:', err);
    });
  }

  // Apply Theme & Language
  applyTheme(currentTheme);
  applyLanguage(currentLang);

  // Setup components
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  setupDateNavigation();
  setupNewsTabs();
  setupKeyboardShortcuts();

  // Load news initially and periodically check for new bulletins (every 10 minutes)
  loadNews();
  setInterval(loadNews, 10 * 60 * 1000);
});

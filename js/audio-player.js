/**
 * Prabhata Text-to-Audio (TTS) Audio Briefing Engine
 * Provides spoken audio briefings for:
 *  1. Full Prabhata Daily Morning Briefing (Greeting, Panchangam, Presiding Deity, Sacred Mantra, Home Puja, Timings)
 *  2. Sacred Mantra & Meaning Audio Player
 * 
 * Strictly respects current page language:
 *  - English: 100% pure English with phonetic transliteration for seamless speech synthesis
 *  - Telugu: 100% authentic Telugu devotional speech synthesis
 * 
 * Features:
 *  - Sentence-chunking to bypass browser 15-second speech synthesis timeouts
 *  - Smart voice selector (locates te-IN, en-IN, or system natural voices)
 *  - Global toggle with unified play/stop state management across all UI audio buttons
 */

const PrabhataAudio = (() => {
  let isSpeaking = false;
  let activeType = null; // 'briefing' | 'mantra' | null
  let currentChunks = [];
  let currentChunkIdx = 0;
  let listeners = [];
  let cachedVoices = [];

  function isSupported() {
    return (typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  }

  // Populate voices cache as soon as browser reports them
  if (isSupported()) {
    const loadVoices = () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      } catch (e) {
        cachedVoices = [];
      }
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function onStateChange(cb) {
    if (typeof cb === 'function') listeners.push(cb);
  }

  function notifyState(playing, type) {
    isSpeaking = playing;
    activeType = playing ? (type || 'briefing') : null;
    listeners.forEach(cb => {
      try {
        cb(isSpeaking, activeType);
      } catch (err) {
        console.error('Audio state callback error:', err);
      }
    });
  }

  function stop() {
    if (isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    currentChunks = [];
    currentChunkIdx = 0;
    notifyState(false, null);
  }

  function getBestVoice(lang) {
    if (!isSupported()) return null;
    const voices = (cachedVoices && cachedVoices.length > 0)
      ? cachedVoices
      : (window.speechSynthesis.getVoices() || []);

    if (!voices || voices.length === 0) return null;

    if (lang === 'te') {
      // 1. Look for direct Telugu voice
      const teVoice = voices.find(v => {
        const vl = (v.lang || '').toLowerCase();
        return vl.startsWith('te') || v.name.toLowerCase().includes('telugu');
      });
      if (teVoice) return teVoice;

      // 2. Fallback to Hindi or Indian English voice if Telugu voice not installed locally
      const hiVoice = voices.find(v => (v.lang || '').toLowerCase().startsWith('hi'));
      if (hiVoice) return hiVoice;

      const inVoice = voices.find(v => (v.lang || '').toLowerCase().includes('in'));
      if (inVoice) return inVoice;

      return null;
    } else {
      // English: Prefer Indian English (en-IN) for accurate Sanskrit & Vedic name pronunciations
      const enInVoice = voices.find(v => {
        const vl = (v.lang || '').toLowerCase();
        return vl === 'en-in' || vl === 'en_in' || v.name.toLowerCase().includes('india');
      });
      if (enInVoice) return enInVoice;

      // Natural English voice
      const naturalEn = voices.find(v => {
        const vl = (v.lang || '').toLowerCase();
        return vl.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Online'));
      });
      if (naturalEn) return naturalEn;

      // Any English voice
      const anyEn = voices.find(v => (v.lang || '').toLowerCase().startsWith('en'));
      return anyEn || null;
    }
  }

  // Clean diacritical marks for standard browser English TTS voices
  function cleanEnForTTS(str) {
    if (!str) return '';
    return str
      .replace(/[āĀ]/g, 'aa')
      .replace(/[īĪ]/g, 'ee')
      .replace(/[ūŪ]/g, 'oo')
      .replace(/[ṛṚ]/g, 'ri')
      .replace(/[śŚṣṢ]/g, 'sh')
      .replace(/[ṅñṇ]/g, 'n')
      .replace(/[ṭḍ]/g, (m) => m === 'ṭ' ? 't' : 'd')
      .replace(/[ḥḤ]/g, 'h')
      .replace(/[ṃṂ]/g, 'm')
      .replace(/[॥।]/g, '.')
      .replace(/[🕉️✨📿🪐🪔📖🕊️☀️🌙⚡🔴▶️🔍📺]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function cleanTeForTTS(str) {
    if (!str) return '';
    return str
      .replace(/[॥।]/g, '.')
      .replace(/[🕉️✨📿🪐🪔📖🕊️☀️🌙⚡🔴▶️🔍📺]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Split text into coherent chunks of ~140-160 characters
  function splitIntoChunks(fullText) {
    if (!fullText) return [];
    const sentences = fullText.match(/[^.!?।॥\n]+[.!?।॥\n]*/g) || [fullText];
    const chunks = [];
    let current = '';

    for (let i = 0; i < sentences.length; i++) {
      const trimmed = sentences[i].trim();
      if (!trimmed) continue;
      if (current && (current.length + trimmed.length + 1) > 150) {
        chunks.push(current.trim());
        current = trimmed;
      } else {
        current = current ? (current + ' ' + trimmed) : trimmed;
      }
    }
    if (current.trim()) chunks.push(current.trim());
    return chunks;
  }

  // Build spoken briefing script
  function buildBriefingScript({ panchang, guide, timings, cityName, date, lang }) {
    const isTe = (lang === 'te');

    if (isTe) {
      const dayNames = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
      const dayName = dayNames[date.getDay()];

      let text = 'శుభోదయం. ప్రభాత నిత్య దర్శనానికి స్వాగతం. ';
      text += 'నేడు ' + dayName + ', ' + (cityName || 'హైదరాబాద్') + ' నగర పంచాంగ దర్శనం. ';

      // Panchangam
      text += 'నేటి హిందూ పంచాంగం: ';
      text += panchang.masa.telugu + ' మాసం, ' + panchang.paksha.telugu + ', ' + panchang.tithi.telugu + ' తిథి. ';
      if (panchang.tithi.endsApprox) {
        text += 'ముగింపు సమయం సుమారు ' + panchang.tithi.endsApprox + '. ';
      }
      text += 'నక్షత్రం: ' + panchang.nakshatra.telugu + ', ' + panchang.nakshatra.pada + 'వ పాదం. ';
      text += 'యోగం: ' + panchang.yoga + ', కరణం: ' + panchang.karana + '. ';

      // Observance & Deity
      text += 'నేటి విశేష దైవారాధన: ';
      text += cleanTeForTTS(guide.observanceTitle) + '. ';
      text += 'నేటి ప్రధాన అధిష్టాన దైవం: ' + cleanTeForTTS(guide.deityName) + '. ';
      text += cleanTeForTTS(guide.reasonText) + ' ';

      // Mantra
      text += 'నేటి ప్రధాన పవిత్ర మంత్రం: ';
      text += cleanTeForTTS(guide.mainMantra.sanskrit) + '. ';
      text += 'జప సంఖ్య: ' + guide.mainMantra.count + '. ';
      text += 'మంత్ర తాత్పర్యం: ' + cleanTeForTTS(guide.mainMantra.meaning) + ' ';

      // Weekday deity
      text += 'నేటి వార అధిపతి: ' + cleanTeForTTS(guide.weekdayMantra.name) + '. ';
      text += 'మంత్రం: ' + cleanTeForTTS(guide.weekdayMantra.text) + '. ';

      // Home Puja
      text += 'గృహ పూజా విధానం: ';
      text += 'సమర్పించవలసిన పుష్పాలు: ' + cleanTeForTTS(guide.puja.flowers) + '. ';
      text += 'నైవేద్యం: ' + cleanTeForTTS(guide.puja.naivedyam) + '. ';
      text += 'దాన ధర్మం: ' + cleanTeForTTS(guide.puja.charity) + '. ';
      if (guide.puja.specialPractice) {
        text += 'విశేష నియమం: ' + cleanTeForTTS(guide.puja.specialPractice) + '. ';
      }

      // Timings
      if (timings) {
        text += 'నేటి ముఖ్య కాలాలు: ';
        if (timings.sunrise) text += 'సూర్యోదయం ' + timings.sunrise + '. ';
        if (timings.sunset) text += 'సూర్యాస్తమయం ' + timings.sunset + '. ';
        if (timings.brahmaMuhurtham) text += 'బ్రహ్మ ముహూర్తం ' + timings.brahmaMuhurtham + '. ';
        if (timings.abhijitMuhurtham) text += 'అభిజిత్ ముహూర్తం ' + timings.abhijitMuhurtham + '. ';
        if (timings.rahuKalam) text += 'రాహు కాలం ' + timings.rahuKalam + '. ';
      }

      text += 'మీకు మరియు మీ కుటుంబ సభ్యులకు ఈ రోజు అత్యంత శుభప్రదంగా, ఆయురారోగ్యాలతో సాగాలని కోరుకుంటున్నాము. సర్వే జనాః సుఖినో భవంతు.';
      return text;
    } else {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const dayName = dayNames[date.getDay()];
      const dateStr = dayName + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

      let text = 'Good morning. Welcome to Prabhata, your daily morning sanctuary. ';
      text += 'Today is ' + dateStr + ', for ' + (cityName || 'your city') + '. ';

      // Panchangam
      text += 'Today\'s Astronomical Hindu Panchangam: ';
      text += 'Lunar Month is ' + panchang.masa.sanskrit + '. ';
      text += panchang.paksha.name + '. ';
      text += 'Tithi is ' + panchang.tithi.name + '. ';
      if (panchang.tithi.endsApprox) {
        text += 'This tithi continues until approximately ' + panchang.tithi.endsApprox + '. ';
      }
      text += 'Nakshatra is ' + panchang.nakshatra.name + ', Pada ' + panchang.nakshatra.pada + '. ';
      text += 'Yoga is ' + panchang.yoga + ', and Karana is ' + panchang.karana + '. ';

      // Observance & Deity
      text += 'Today\'s Spiritual Observance: ';
      text += cleanEnForTTS(guide.observanceTitle) + '. ';
      text += 'Presiding Deity: ' + cleanEnForTTS(guide.deityName) + '. ';
      text += cleanEnForTTS(guide.reasonText) + ' ';

      // Mantra
      text += 'Sacred Mantra of the Day: ';
      const mantraText = cleanEnForTTS(guide.mainMantra.translit || guide.mainMantra.sanskrit);
      text += mantraText + '. ';
      text += 'Recommended repetition: ' + guide.mainMantra.count + '. ';
      text += 'Meaning: ' + cleanEnForTTS(guide.mainMantra.meaning) + ' ';

      // Weekday Deity
      text += 'Today\'s Weekday Planetary Deity is ' + cleanEnForTTS(guide.weekdayMantra.name) + '. ';
      text += 'Mantra: ' + cleanEnForTTS(guide.weekdayMantra.text) + '. ';
      if (guide.weekdayMantra.meaning) {
        text += cleanEnForTTS(guide.weekdayMantra.meaning) + ' ';
      }

      // Home Puja
      text += 'Simple Home Puja: ';
      text += 'Flowers: ' + cleanEnForTTS(guide.puja.flowers) + '. ';
      text += 'Naivedyam offering: ' + cleanEnForTTS(guide.puja.naivedyam) + '. ';
      text += 'Charity: ' + cleanEnForTTS(guide.puja.charity) + '. ';
      if (guide.puja.specialPractice) {
        text += 'Special traditional practice: ' + cleanEnForTTS(guide.puja.specialPractice) + '. ';
      }

      // Timings
      if (timings) {
        text += 'Key Vedic Timings for today: ';
        if (timings.sunrise) text += 'Sunrise is at ' + timings.sunrise + '. ';
        if (timings.sunset) text += 'Sunset is at ' + timings.sunset + '. ';
        if (timings.brahmaMuhurtham) text += 'Brahma Muhurtham for morning meditation is from ' + timings.brahmaMuhurtham + '. ';
        if (timings.abhijitMuhurtham) text += 'Abhijit Muhurtham is from ' + timings.abhijitMuhurtham + '. ';
        if (timings.rahuKalam) text += 'Rahu Kalam window is from ' + timings.rahuKalam + '. ';
      }

      text += 'Wishing you and your family a peaceful, auspicious, and blessed day.';
      return text;
    }
  }

  // Build mantra script
  function buildMantraScript({ guide, lang }) {
    const isTe = (lang === 'te');
    if (isTe) {
      let text = 'నేటి ప్రధాన పవిత్ర మంత్రం: ';
      text += cleanTeForTTS(guide.mainMantra.sanskrit) + '. ';
      text += 'జప సంఖ్య: ' + guide.mainMantra.count + '. ';
      text += 'భావం: ' + cleanTeForTTS(guide.mainMantra.meaning) + '. ';
      text += 'వార అధిపతి మంత్రం: ' + cleanTeForTTS(guide.weekdayMantra.name) + '. ' + cleanTeForTTS(guide.weekdayMantra.text) + '.';
      return text;
    } else {
      let text = 'Sacred Mantra of the Day for ' + cleanEnForTTS(guide.deityName) + '. ';
      const mantraText = cleanEnForTTS(guide.mainMantra.translit || guide.mainMantra.sanskrit);
      text += mantraText + '. ';
      text += 'Repetition: ' + guide.mainMantra.count + '. ';
      text += 'Meaning: ' + cleanEnForTTS(guide.mainMantra.meaning) + '. ';
      text += 'Weekday Mantra for ' + cleanEnForTTS(guide.weekdayMantra.name) + ': ' + cleanEnForTTS(guide.weekdayMantra.text) + '.';
      return text;
    }
  }

  // Play chunks sequentially
  function playText(fullText, lang, type) {
    if (!isSupported()) {
      alert(lang === 'te'
        ? 'మీ బ్రౌజర్‌లో ఆడియో (Text-to-Speech) సదుపాయం అందుబాటులో లేదు.'
        : 'Text-to-speech audio is not supported in this browser.');
      return;
    }

    stop();

    const chunks = splitIntoChunks(fullText);
    if (!chunks || chunks.length === 0) return;

    currentChunks = chunks;
    currentChunkIdx = 0;
    notifyState(true, type);

    const voice = getBestVoice(lang);

    function speakCurrent() {
      if (!isSpeaking || currentChunkIdx >= currentChunks.length) {
        stop();
        return;
      }

      const chunkText = currentChunks[currentChunkIdx];
      const utter = new SpeechSynthesisUtterance(chunkText);

      utter.lang = (lang === 'te') ? 'te-IN' : 'en-IN';
      if (voice) utter.voice = voice;
      utter.rate = (lang === 'te') ? 0.92 : 0.95;
      utter.pitch = 1.0;

      utter.onend = () => {
        currentChunkIdx++;
        speakCurrent();
      };

      utter.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis chunk error:', e);
        }
        currentChunkIdx++;
        speakCurrent();
      };

      try {
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.error('SpeechSynthesis failed to speak:', err);
        stop();
      }
    }

    speakCurrent();
  }

  function speakBriefing(options) {
    const text = buildBriefingScript(options);
    playText(text, options.lang || 'en', 'briefing');
  }

  function speakMantra(options) {
    const text = buildMantraScript(options);
    playText(text, options.lang || 'en', 'mantra');
  }

  function toggleBriefing(options) {
    if (isSpeaking && activeType === 'briefing') {
      stop();
    } else {
      speakBriefing(options);
    }
  }

  function toggleMantra(options) {
    if (isSpeaking && activeType === 'mantra') {
      stop();
    } else {
      speakMantra(options);
    }
  }

  return {
    isSupported,
    stop,
    isPlaying: () => isSpeaking,
    getActiveType: () => activeType,
    onStateChange,
    buildBriefingScript,
    buildMantraScript,
    speakBriefing,
    speakMantra,
    toggleBriefing,
    toggleMantra
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PrabhataAudio;
}

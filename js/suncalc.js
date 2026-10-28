/**
 * Solar & Vedic Timing Calculations
 * Computes:
 *  - Sunrise & Sunset (NOAA Algorithm)
 *  - Day Length & Solar Noon
 *  - Brahma Muhurtham (Morning meditation period)
 *  - Abhijit Muhurtham (Auspicious midday window)
 *  - Rahu Kalam, Yamagandam, Gulika Kalam
 *  - Pre-configured city coordinates with auto-geolocation via IP address
 */

const SunCalc = (() => {
  const DEG2RAD = Math.PI / 180;
  const RAD2DEG = 180 / Math.PI;

  const CITIES = [
    { id: 'hyderabad', name: 'Hyderabad, TS', lat: 17.3850, lon: 78.4867, timezone: 'Asia/Kolkata' },
    { id: 'vijayawada', name: 'Vijayawada, AP', lat: 16.5062, lon: 80.6480, timezone: 'Asia/Kolkata' },
    { id: 'visakhapatnam', name: 'Visakhapatnam, AP', lat: 17.6868, lon: 83.2185, timezone: 'Asia/Kolkata' },
    { id: 'tirupati', name: 'Tirupati, AP', lat: 13.6288, lon: 79.4192, timezone: 'Asia/Kolkata' },
    { id: 'bengaluru', name: 'Bengaluru, KA', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' },
    { id: 'chennai', name: 'Chennai, TN', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata' },
    { id: 'mumbai', name: 'Mumbai, MH', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
    { id: 'delhi', name: 'New Delhi, DL', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata' },
    { id: 'london', name: 'London, UK', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
    { id: 'newyork', name: 'New York, US', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
    { id: 'sanfrancisco', name: 'San Francisco, US', lat: 37.7749, lon: -122.4194, timezone: 'America/Los_Angeles' }
  ];

  // Authentic Telugu translations for prominent Indian cities
  const TELUGU_CITY_NAMES = {
    'hyderabad': 'హైదరాబాద్',
    'secunderabad': 'సికింద్రాబాద్',
    'vijayawada': 'విజయవాడ',
    'visakhapatnam': 'విశాఖపట్నం',
    'vizag': 'విశాఖపట్నం',
    'tirupati': 'తిరుపతి',
    'guntur': 'గుంటూరు',
    'warangal': 'వరంగల్',
    'kurnool': 'కర్నూలు',
    'rajahmundry': 'రాజమండ్రి',
    'nellore': 'నెల్లూరు',
    'kadapa': 'కడప',
    'kakinada': 'కాకినాడ',
    'anantapur': 'అనంతపురం',
    'bengaluru': 'బెంగళూరు',
    'bangalore': 'బెంగళూరు',
    'chennai': 'చెన్నై',
    'madras': 'చెన్నై',
    'tiruchirappalli': 'తిరుచిరాపల్లి',
    'trichy': 'తిరుచిరాపల్లి',
    'coimbatore': 'కోయంబత్తూరు',
    'madurai': 'మదురై',
    'mumbai': 'ముంబై',
    'bombay': 'ముంబై',
    'delhi': 'న్యూ ఢిల్లీ',
    'new delhi': 'న్యూ ఢిల్లీ',
    'kolkata': 'కోల్‌కతా',
    'calcutta': 'కోల్‌కతా',
    'pune': 'పుణె'
  };

  let detectedLocation = null;

  // 1-indexed weekday periods (Sunday=0 to Saturday=6)
  // Each day divided into 8 periods
  const RAHU_PERIODS = [8, 2, 7, 5, 6, 4, 3]; // Sun -> Sat (1-based period index)
  const YAMA_PERIODS = [5, 4, 3, 2, 1, 7, 6];
  const GULIKA_PERIODS = [7, 6, 5, 4, 3, 2, 1];

  function getCachedLocation() {
    try {
      if (typeof localStorage !== 'undefined') {
        const cached = localStorage.getItem('morning_ip_location');
        if (cached) {
          const parsed = JSON.parse(cached);
          // Valid for 12 hours (43,200,000 ms)
          if (parsed && parsed.data && (Date.now() - parsed.timestamp < 12 * 3600 * 1000)) {
            return parsed.data;
          }
        }
      }
    } catch (e) {
      console.warn('Could not read cached location:', e);
    }
    return null;
  }

  function setCachedLocation(data) {
    try {
      if (typeof localStorage !== 'undefined' && data) {
        localStorage.setItem('morning_ip_location', JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      }
    } catch (e) {
      console.warn('Could not cache location:', e);
    }
  }

  /**
   * Auto-detect user's current city and coordinates from IP address
   * Uses high-reliability HTTPS endpoints with fallbacks and local caching
   */
  async function detectLocationFromIP() {
    // 1. Try cache first for instant synchronous-like render
    const cached = getCachedLocation();
    if (cached) {
      detectedLocation = cached;
      return cached;
    }

    // 2. Query geolocation APIs (multiple reliable HTTPS endpoints with fallbacks)
    const endpoints = [
      {
        url: 'https://ipwho.is/',
        parse: (d) => (d && d.success && d.city && d.latitude) ? {
          city: d.city,
          region: d.region_code || d.region || '',
          country: d.country || '',
          lat: parseFloat(d.latitude),
          lon: parseFloat(d.longitude),
          timezone: (d.timezone && d.timezone.id) || 'Asia/Kolkata'
        } : null
      },
      {
        url: 'https://get.geojs.io/v1/ip/geo.json',
        parse: (d) => (d && d.city && d.latitude) ? {
          city: d.city,
          region: d.region || '',
          country: d.country || '',
          lat: parseFloat(d.latitude),
          lon: parseFloat(d.longitude),
          timezone: d.timezone || 'Asia/Kolkata'
        } : null
      },
      {
        url: 'https://ipapi.co/json/',
        parse: (d) => (d && d.city && d.latitude && !d.error) ? {
          city: d.city,
          region: d.region_code || d.region || '',
          country: d.country_name || d.country || '',
          lat: parseFloat(d.latitude),
          lon: parseFloat(d.longitude),
          timezone: d.timezone || 'Asia/Kolkata'
        } : null
      }
    ];

    for (const ep of endpoints) {
      try {
        let fetchOptions = { headers: { 'Accept': 'application/json' } };
        if (typeof AbortController !== 'undefined') {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 5000);
          fetchOptions.signal = controller.signal;
          const res = await fetch(ep.url, fetchOptions);
          clearTimeout(timer);
          if (res.ok) {
            const json = await res.json();
            const parsed = ep.parse(json);
            if (parsed && !isNaN(parsed.lat) && !isNaN(parsed.lon)) {
              const cityKey = (parsed.city || '').toLowerCase().trim();
              const teluguName = TELUGU_CITY_NAMES[cityKey] || parsed.city;
              const regionSuffix = parsed.region ? `, ${parsed.region}` : '';

              const loc = {
                id: 'current_ip',
                name: `${parsed.city}${regionSuffix}`,
                city: parsed.city,
                region: parsed.region,
                country: parsed.country,
                nameTe: teluguName,
                lat: parsed.lat,
                lon: parsed.lon,
                timezone: parsed.timezone,
                isCurrentLocation: true
              };
              detectedLocation = loc;
              setCachedLocation(loc);
              return loc;
            }
          }
        }
      } catch (e) {
        // Continue to fallback endpoint
      }
    }

    return null;
  }

  function getDetectedLocation() {
    return detectedLocation || getCachedLocation();
  }

  function setDetectedLocation(loc) {
    detectedLocation = loc;
    if (loc) setCachedLocation(loc);
  }

  function getSunTimes(date, lat, lonEast) {
    const lw = -lonEast; // West longitude
    const jd = (date.getTime() / 86400000.0) + 2440587.5;
    const d = jd - 2451545.0;
    const n = Math.round(d - 0.0008 - lw / 360.0);
    const J_star = 2451545.0 + 0.0008 + lw / 360.0 + n;
    const M = (357.5291 + 0.98560028 * (J_star - 2451545.0)) % 360;
    const C = 1.9148 * Math.sin(M * DEG2RAD) + 0.02 * Math.sin(2 * M * DEG2RAD) + 0.0003 * Math.sin(3 * M * DEG2RAD);
    const lambda = (M + C + 180 + 102.9372) % 360;
    const J_transit = J_star + 0.0053 * Math.sin(M * DEG2RAD) - 0.0069 * Math.sin(2 * lambda * DEG2RAD);
    const delta = Math.asin(Math.sin(lambda * DEG2RAD) * Math.sin(23.44 * DEG2RAD));
    const cos_omega = (Math.sin(-0.833 * DEG2RAD) - Math.sin(lat * DEG2RAD) * Math.sin(delta)) / (Math.cos(lat * DEG2RAD) * Math.cos(delta));

    if (cos_omega < -1 || cos_omega > 1) {
      return null; // Polar night / day
    }

    const omega = Math.acos(cos_omega) * RAD2DEG;
    const J_rise = J_transit - omega / 360.0;
    const J_set = J_transit + omega / 360.0;

    const sunrise = new Date((J_rise - 2440587.5) * 86400000);
    const sunset = new Date((J_set - 2440587.5) * 86400000);
    const noon = new Date((J_transit - 2440587.5) * 86400000);

    return { sunrise, sunset, noon };
  }

  function calculateTimings(date = new Date(), lat = 17.3850, lon = 78.4867) {
    const sunTimes = getSunTimes(date, lat, lon);
    if (!sunTimes) return null;

    const { sunrise, sunset, noon } = sunTimes;
    const dayDurationMs = sunset.getTime() - sunrise.getTime();
    const period8Ms = dayDurationMs / 8;
    const weekday = date.getDay(); // 0 is Sunday

    // Rahu Kalam
    const rahuSlot = RAHU_PERIODS[weekday] - 1;
    const rahuStart = new Date(sunrise.getTime() + rahuSlot * period8Ms);
    const rahuEnd = new Date(rahuStart.getTime() + period8Ms);

    // Yamagandam
    const yamaSlot = YAMA_PERIODS[weekday] - 1;
    const yamaStart = new Date(sunrise.getTime() + yamaSlot * period8Ms);
    const yamaEnd = new Date(yamaStart.getTime() + period8Ms);

    // Gulika Kalam
    const gulikaSlot = GULIKA_PERIODS[weekday] - 1;
    const gulikaStart = new Date(sunrise.getTime() + gulikaSlot * period8Ms);
    const gulikaEnd = new Date(gulikaStart.getTime() + period8Ms);

    // Abhijit Muhurtham (8th muhurtha out of 15 daylight divisions: midpoint +- 24 min approx)
    const muhurtha15Ms = dayDurationMs / 15;
    const abhijitStart = new Date(sunrise.getTime() + 7 * muhurtha15Ms);
    const abhijitEnd = new Date(sunrise.getTime() + 8 * muhurtha15Ms);

    // Brahma Muhurtham (Starts 2 muhurthas / 96 mins before sunrise, lasts 48 mins)
    const brahmaStart = new Date(sunrise.getTime() - (96 * 60 * 1000));
    const brahmaEnd = new Date(sunrise.getTime() - (48 * 60 * 1000));

    // Day length format
    const totalMins = Math.round(dayDurationMs / 60000);
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    const dayLengthStr = `${hours}h ${mins}m`;

    return {
      sunrise,
      sunset,
      noon,
      dayLength: dayLengthStr,
      brahmaMuhurtham: { start: brahmaStart, end: brahmaEnd, label: 'బ్రహ్మ ముహూర్తం' },
      abhijitMuhurtham: { start: abhijitStart, end: abhijitEnd, label: 'అభిజిత్ ముహూర్తం' },
      rahuKalam: { start: rahuStart, end: rahuEnd, label: 'రాహు కాలం' },
      yamagandam: { start: yamaStart, end: yamaEnd, label: 'యమగండం' },
      gulikaKalam: { start: gulikaStart, end: gulikaEnd, label: 'గుళిక కాలం' }
    };
  }

  function formatTime(date, options = {}) {
    if (!date) return '--:--';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...options
    });
  }

  return {
    CITIES,
    TELUGU_CITY_NAMES,
    getCachedLocation,
    setCachedLocation,
    detectLocationFromIP,
    getDetectedLocation,
    setDetectedLocation,
    getSunTimes,
    calculateTimings,
    formatTime
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SunCalc;
}

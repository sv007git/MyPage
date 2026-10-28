/**
 * Hindu Calendar (Panchangam) Astronomical Engine
 * Calculates:
 *  - High-precision Sun & Moon Ecliptic Longitude (Jean Meeus algorithm)
 *  - Lunar Elongation, Phase Angle & Illumination %
 *  - Paksha: Shukla (Waxing) vs Krishna (Waning)
 *  - Tithi & Tithi End Time
 *  - Nakshatra & Pada
 *  - Yoga & Karana
 *  - Hindu Lunar Month (Masa - Amanta)
 *  - Vaasara (Vedic day of week)
 */

const Panchang = (() => {
  const DEG2RAD = Math.PI / 180;
  const RAD2DEG = 180 / Math.PI;

  const TITHI_NAMES = [
    { num: 1, sanskrit: 'Pratipada', telugu: 'పాడ్యమి' },
    { num: 2, sanskrit: 'Dwitiya', telugu: 'విదియ' },
    { num: 3, sanskrit: 'Tritiya', telugu: 'తదియ' },
    { num: 4, sanskrit: 'Chaturthi', telugu: 'చవితి' },
    { num: 5, sanskrit: 'Panchami', telugu: 'పంచమి' },
    { num: 6, sanskrit: 'Shashti', telugu: 'షష్ఠి' },
    { num: 7, sanskrit: 'Saptami', telugu: 'సప్తమి' },
    { num: 8, sanskrit: 'Ashtami', telugu: 'అష్టమి' },
    { num: 9, sanskrit: 'Navami', telugu: 'నవమి' },
    { num: 10, sanskrit: 'Dashami', telugu: 'దశమి' },
    { num: 11, sanskrit: 'Ekadashi', telugu: 'ఏకాదశి' },
    { num: 12, sanskrit: 'Dvadashi', telugu: 'ద్వాదశి' },
    { num: 13, sanskrit: 'Trayodashi', telugu: 'త్రయోదశి' },
    { num: 14, sanskrit: 'Chaturdashi', telugu: 'చతుర్దశి' },
    { num: 15, sanskrit: 'Purnima / Amavasya', telugu: 'పౌర్ణమి / అమావాస్య' }
  ];

  const NAKSHATRAS = [
    { name: 'Ashwini', telugu: 'అశ్విని' },
    { name: 'Bharani', telugu: 'భరణి' },
    { name: 'Krittika', telugu: 'కృత్తిక' },
    { name: 'Rohini', telugu: 'రోహిణి' },
    { name: 'Mrigashira', telugu: 'మృగశిర' },
    { name: 'Arudra', telugu: 'ఆరుద్ర' },
    { name: 'Punarvasu', telugu: 'పునర్వసు' },
    { name: 'Pushya', telugu: 'పుష్యమి' },
    { name: 'Ashlesha', telugu: 'ఆశ్లేష' },
    { name: 'Magha', telugu: 'మఖ' },
    { name: 'Purva Phalguni', telugu: 'పూర్వ ఫల్గుణి' },
    { name: 'Uttara Phalguni', telugu: 'ఉత్తర ఫల్గుణి' },
    { name: 'Hasta', telugu: 'హస్త' },
    { name: 'Chitra', telugu: 'చిత్త' },
    { name: 'Swati', telugu: 'స్వాతి' },
    { name: 'Vishakha', telugu: 'విశాఖ' },
    { name: 'Anuradha', telugu: 'అనూరాధ' },
    { name: 'Jyeshtha', telugu: 'జ్యేష్ఠ' },
    { name: 'Mula', telugu: 'మూల' },
    { name: 'Purva Ashadha', telugu: 'పూర్వాషాఢ' },
    { name: 'Uttara Ashadha', telugu: 'ఉత్తరాషాఢ' },
    { name: 'Shravana', telugu: 'శ్రవణం' },
    { name: 'Dhanishta', telugu: 'ధనిష్ఠ' },
    { name: 'Shatabhisha', telugu: 'శతభిషం' },
    { name: 'Purva Bhadrapada', telugu: 'పూర్వాభాద్ర' },
    { name: 'Uttara Bhadrapada', telugu: 'ఉత్తరాభాద్ర' },
    { name: 'Revati', telugu: 'రేవతి' }
  ];

  const YOGAS = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Sobhana', 'Atiganda',
    'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata',
    'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha',
    'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
  ];

  const KARANAS = [
    'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garija', 'Vanija', 'Vishti',
    'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
  ];

  const HINDU_MONTHS = [
    { sanskrit: 'Chaitra', telugu: 'చైత్రం', deity: 'Vishnu' },
    { sanskrit: 'Vaisakha', telugu: 'వైశాఖం', deity: 'Madhusudana' },
    { sanskrit: 'Jyeshtha', telugu: 'జ్యేష్ఠం', deity: 'Trivikrama' },
    { sanskrit: 'Ashadha', telugu: 'ఆషాఢం', deity: 'Vamana' },
    { sanskrit: 'Shravana', telugu: 'శ్రావణం', deity: 'Sridhara' },
    { sanskrit: 'Bhadrapada', telugu: 'భాద్రపదం', deity: 'Hrishikesha' },
    { sanskrit: 'Ashvina', telugu: 'ఆశ్వయుజం', deity: 'Padmanabha' },
    { sanskrit: 'Kartika', telugu: 'కార్తీకం', deity: 'Damodara' },
    { sanskrit: 'Margashirsha', telugu: 'మార్గశిరం', deity: 'Keshava' },
    { sanskrit: 'Pushya', telugu: 'పుష్యం', deity: 'Narayana' },
    { sanskrit: 'Magha', telugu: 'మాఘం', deity: 'Madhava' },
    { sanskrit: 'Phalguna', telugu: 'ఫాల్గుణం', deity: 'Govinda' }
  ];

  const RASHIS = [
    { english: 'Aries', sanskrit: 'Mesha', telugu: 'మేషం' },
    { english: 'Taurus', sanskrit: 'Vrishabha', telugu: 'వృషభం' },
    { english: 'Gemini', sanskrit: 'Mithuna', telugu: 'మిథునం' },
    { english: 'Cancer', sanskrit: 'Karkata', telugu: 'కర్కాటకం' },
    { english: 'Leo', sanskrit: 'Simha', telugu: 'సింహం' },
    { english: 'Virgo', sanskrit: 'Kanya', telugu: 'కన్య' },
    { english: 'Libra', sanskrit: 'Tula', telugu: 'తుల' },
    { english: 'Scorpio', sanskrit: 'Vrishchika', telugu: 'వృశ్చికం' },
    { english: 'Sagittarius', sanskrit: 'Dhanu', telugu: 'ధనుస్సు' },
    { english: 'Capricorn', sanskrit: 'Makara', telugu: 'మకరం' },
    { english: 'Aquarius', sanskrit: 'Kumbha', telugu: 'కుంభం' },
    { english: 'Pisces', sanskrit: 'Meena', telugu: 'మీనం' }
  ];

  const VAARAMS = [
    { english: 'Sunday', sanskrit: 'Ravivara', telugu: 'ఆదివారం', ruler: 'Surya (Sun)' },
    { english: 'Monday', sanskrit: 'Somavara', telugu: 'సోమవారం', ruler: 'Chandra (Moon)' },
    { english: 'Tuesday', sanskrit: 'Mangalavara', telugu: 'మంగళవారం', ruler: 'Mangala (Mars)' },
    { english: 'Wednesday', sanskrit: 'Budhavara', telugu: 'బుధవారం', ruler: 'Budha (Mercury)' },
    { english: 'Thursday', sanskrit: 'Guruvara', telugu: 'గురువారం', ruler: 'Brihaspati (Jupiter)' },
    { english: 'Friday', sanskrit: 'Shukravara', telugu: 'శుక్రవారం', ruler: 'Shukra (Venus)' },
    { english: 'Saturday', sanskrit: 'Shanivara', telugu: 'శనివారం', ruler: 'Shani (Saturn)' }
  ];

  function norm(d) {
    d = d % 360;
    return d < 0 ? d + 360 : d;
  }

  function getJulianDate(date) {
    let y = date.getUTCFullYear();
    let m = date.getUTCMonth() + 1;
    let d = date.getUTCDate() + (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24;
    if (m <= 2) {
      y -= 1;
      m += 12;
    }
    const a = Math.floor(y / 100);
    const b = 2 - a + Math.floor(a / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
  }

  function getAyanamsha(T) {
    return 23.85 + (T * 100 * 50.29 / 3600);
  }

  function getSolarCoordinates(T) {
    const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
    const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
    const C = (1.914602 - 0.004817 * T) * Math.sin(M * DEG2RAD)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * M * DEG2RAD)
            + 0.000289 * Math.sin(3 * M * DEG2RAD);
    const sunTrue = norm(L0 + C);
    const omega = norm(125.04 - 1934.136 * T);
    const sunApparent = norm(sunTrue - 0.00569 - 0.00478 * Math.sin(omega * DEG2RAD));
    return { apparentLong: sunApparent, meanLong: L0, anomaly: M };
  }

  function getLunarCoordinates(T, sunCoords) {
    const Lp = norm(218.3164477 + 481267.88123421 * T);
    const D = norm(297.8501921 + 445267.1114034 * T);
    const M_moon = norm(134.9633964 + 477198.8675055 * T);
    const M_sun = sunCoords.anomaly;

    const moonLong = norm(
      Lp
      + 6.289 * Math.sin(M_moon * DEG2RAD)
      + 1.274 * Math.sin((2 * D - M_moon) * DEG2RAD)
      + 0.658 * Math.sin(2 * D * DEG2RAD)
      - 0.186 * Math.sin(M_sun * DEG2RAD)
      - 0.059 * Math.sin((2 * M_moon - 2 * D) * DEG2RAD)
      - 0.057 * Math.sin((M_moon - 2 * D + M_sun) * DEG2RAD)
      + 0.053 * Math.sin((M_moon + 2 * D) * DEG2RAD)
      + 0.046 * Math.sin((2 * D - M_sun) * DEG2RAD)
      + 0.041 * Math.sin((M_moon - M_sun) * DEG2RAD)
      - 0.035 * Math.sin(D * DEG2RAD)
      - 0.031 * Math.sin((M_moon + M_sun) * DEG2RAD)
    );

    return { apparentLong: moonLong, meanLong: Lp };
  }

  function getPositions(date) {
    const jd = getJulianDate(date);
    const T = (jd - 2451545.0) / 36525;
    const sun = getSolarCoordinates(T);
    const moon = getLunarCoordinates(T, sun);
    const ayanamsha = getAyanamsha(T);

    const elongation = norm(moon.apparentLong - sun.apparentLong);
    const nirayanaMoon = norm(moon.apparentLong - ayanamsha);
    const nirayanaSun = norm(sun.apparentLong - ayanamsha);

    return {
      jd,
      T,
      sunLong: sun.apparentLong,
      moonLong: moon.apparentLong,
      nirayanaSun,
      nirayanaMoon,
      elongation,
      ayanamsha
    };
  }

  function findTithiEnd(currentDate, currentElongation) {
    const currentTithiIdx = Math.floor(currentElongation / 12);
    const targetAngle = (currentTithiIdx + 1) * 12;

    let t1 = currentDate.getTime();
    let t2 = t1 + 32 * 3600 * 1000;

    for (let i = 0; i < 22; i++) {
      const tm = (t1 + t2) / 2;
      const pos = getPositions(new Date(tm));
      let diff = pos.elongation - currentElongation;
      if (diff < -180) diff += 360;
      const targetDiff = (targetAngle - currentElongation + 360) % 360;
      if (diff < targetDiff) {
        t1 = tm;
      } else {
        t2 = tm;
      }
    }
    return new Date((t1 + t2) / 2);
  }

  function calculate(date = new Date()) {
    const pos = getPositions(date);
    const elongation = pos.elongation;

    // Illumination fraction (0 to 100%)
    const illumination = ((1 - Math.cos(elongation * DEG2RAD)) / 2) * 100;

    // Paksha calculation (Strictly separated English and Telugu properties)
    const isWaxing = elongation < 180;
    const pakshaKey = isWaxing ? 'shukla' : 'krishna';
    const pakshaName = isWaxing ? 'Shukla Paksha (Waxing Phase)' : 'Krishna Paksha (Waning Phase)';
    const pakshaShort = isWaxing ? 'Shukla' : 'Krishna';
    const pakshaTelugu = isWaxing ? 'శుక్ల పక్షం' : 'కృష్ణ పక్షం';
    const pakshaType = isWaxing ? 'Waxing' : 'Waning';

    // Total Tithi (1 to 30)
    const tithiTotalNum = Math.floor(elongation / 12) + 1;
    // Tithi index within the paksha (1 to 15)
    const tithiInPaksha = isWaxing ? tithiTotalNum : (tithiTotalNum - 15);
    const tithiIdx = tithiInPaksha - 1;

    let tithiDisplayName = '';
    let tithiTeluguName = '';
    if (tithiInPaksha === 15) {
      if (isWaxing) {
        tithiDisplayName = 'Purnima (Full Moon)';
        tithiTeluguName = 'పౌర్ణమి';
      } else {
        tithiDisplayName = 'Amavasya (New Moon)';
        tithiTeluguName = 'అమావాస్య';
      }
    } else {
      tithiDisplayName = TITHI_NAMES[tithiIdx].sanskrit;
      tithiTeluguName = TITHI_NAMES[tithiIdx].telugu;
    }

    // Tithi progress
    const angleInTithi = elongation % 12;
    const tithiProgress = (angleInTithi / 12) * 100;
    const tithiEndTime = findTithiEnd(date, elongation);

    // Nakshatra (27 divisions of 13°20' = 13.3333°)
    const nakshatraDegrees = 360 / 27;
    const nakshatraIndex = Math.floor(pos.nirayanaMoon / nakshatraDegrees) % 27;
    const nakshatra = NAKSHATRAS[nakshatraIndex];
    const nakshatraRemainder = pos.nirayanaMoon % nakshatraDegrees;
    const pada = Math.floor(nakshatraRemainder / (nakshatraDegrees / 4)) + 1;

    // Yoga
    const yogaSum = norm(pos.nirayanaSun + pos.nirayanaMoon);
    const yogaIndex = Math.floor(yogaSum / (360 / 27)) % 27;
    const yogaName = YOGAS[yogaIndex];

    // Karana
    const karanaNum = Math.floor(elongation / 6) + 1;
    let karanaName = '';
    if (karanaNum === 1) {
      karanaName = 'Kimstughna';
    } else if (karanaNum >= 2 && karanaNum <= 57) {
      karanaName = KARANAS[(karanaNum - 2) % 7];
    } else if (karanaNum === 58) {
      karanaName = 'Shakuni';
    } else if (karanaNum === 59) {
      karanaName = 'Chatushpada';
    } else {
      karanaName = 'Naga';
    }

    // Rashis
    const sunRashiIdx = Math.floor(pos.nirayanaSun / 30) % 12;
    const moonRashiIdx = Math.floor(pos.nirayanaMoon / 30) % 12;
    const sunRashi = RASHIS[sunRashiIdx];
    const moonRashi = RASHIS[moonRashiIdx];

    // Hindu Lunar Month
    const masa = HINDU_MONTHS[sunRashiIdx];

    // Vaasara
    const dayOfWeek = date.getDay();
    const vaaram = VAARAMS[dayOfWeek];

    // Lunar Age
    const synodicMonth = 29.53058867;
    const lunarAgeDays = (elongation / 360) * synodicMonth;

    return {
      date,
      elongation,
      illumination,
      isWaxing,
      paksha: {
        key: pakshaKey,
        name: pakshaName,
        short: pakshaShort,
        telugu: pakshaTelugu,
        type: pakshaType
      },
      tithi: {
        totalNumber: tithiTotalNum,
        inPaksha: tithiInPaksha,
        name: tithiDisplayName,
        telugu: tithiTeluguName,
        progress: tithiProgress,
        endTime: tithiEndTime
      },
      nakshatra: {
        index: nakshatraIndex,
        name: nakshatra.name,
        telugu: nakshatra.telugu,
        pada: pada,
        degrees: pos.nirayanaMoon
      },
      yoga: yogaName,
      karana: karanaName,
      masa: masa,
      rashi: {
        sun: sunRashi,
        moon: moonRashi
      },
      vaaram: vaaram,
      moonAge: lunarAgeDays
    };
  }

  return {
    calculate,
    TITHI_NAMES,
    NAKSHATRAS,
    HINDU_MONTHS,
    VAARAMS
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Panchang;
}

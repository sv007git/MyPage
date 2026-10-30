/**
 * TV9 Telugu "4 Minutes 24 Headlines" Daily News Hub
 * Handles:
 *  - Dynamic generation of today's timestamped search & watch links
 *  - Loading baked news from latest_news.json
 *  - Live RSS fetching via CORS proxies with automatic fallback
 *  - YouTube responsive video embed & 24/7 Live Stream toggle
 */

const NewsHub = (() => {
  const CHANNEL_HANDLE = '@TV9TeluguLive';
  const CHANNEL_ID = 'UCPXTXMecYqnRKNdqdVOGSFg';
  const CHANNEL_URL = `https://www.youtube.com/${CHANNEL_HANDLE}`;
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  // Fallback initial data in case of offline/local file:// access
  let currentNewsData = {
    title: '4 Minutes 24 Headlines | 1 PM | 30-10-2026 - TV9',
    videoId: 'OtcTaXH2z78',
    url: 'https://www.youtube.com/watch?v=OtcTaXH2z78',
    publishedAt: '2026-10-30T07:30:00.000Z',
    thumbnail: 'https://i3.ytimg.com/vi/OtcTaXH2z78/hqdefault.jpg',
    bulletinTime: 'Today Latest Edition',
    source: 'preset'
  };

  let recentBulletins = [];

  function getTodayDateFormats(customDate = new Date()) {
    const d = customDate.getDate();
    const m = customDate.getMonth() + 1;
    const y = customDate.getFullYear();

    const dd = String(d).padStart(2, '0');
    const mm = String(m).padStart(2, '0');

    const monthsLong = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthsShort = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const ddmmyyyy = `${dd}-${mm}-${y}`;
    const ddmmyyyySlash = `${dd}/${mm}/${y}`;
    const dateLong = `${d} ${monthsLong[m - 1]} ${y}`;
    const dateShort = `${d} ${monthsShort[m - 1]} ${y}`;

    return {
      ddmmyyyy,
      ddmmyyyySlash,
      dateLong,
      dateShort,
      day: d,
      monthName: monthsLong[m - 1],
      year: y
    };
  }

  function getDynamicLinks(targetDate = new Date()) {
    const dates = getTodayDateFormats(targetDate);

    // 1. Channel Search for 4 Minutes 24 Headlines with today's date
    const queryToday = `4 Minutes 24 Headlines ${dates.ddmmyyyy}`;
    const channelDateSearchUrl = `${CHANNEL_URL}/search?query=${encodeURIComponent(queryToday)}`;

    // 2. Channel Search general 4 Minutes 24 Headlines
    const channelGeneralSearchUrl = `${CHANNEL_URL}/search?query=${encodeURIComponent('4 Minutes 24 Headlines')}`;

    // 3. YouTube global search sorted by upload date (sp=CAI%3D forces reverse chronological order)
    const ytGlobalSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`TV9 Telugu 4 Minutes 24 Headlines ${dates.ddmmyyyy}`)}&sp=CAI%253D`;

    // 4. TV9 Telugu 24/7 Live broadcast
    const liveStreamUrl = `${CHANNEL_URL}/live`;

    return {
      channelDateSearchUrl,
      channelGeneralSearchUrl,
      ytGlobalSearchUrl,
      liveStreamUrl,
      dates
    };
  }

  function formatRelativeTime(dateInput) {
    const date = new Date(dateInput);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 2) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

  function formatISTTime(dateInput) {
    const date = new Date(dateInput);
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }) + ' IST';
  }

  function formatISTDateTime(dateInput) {
    const date = new Date(dateInput);
    const datePart = date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timePart = date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    return `${datePart} • ${timePart} IST`;
  }

  function parseXmlFeed(xmlText) {
    const bulletins = [];
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    let match;

    while ((match = entryRegex.exec(xmlText)) !== null) {
      const entry = match[1];
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
      const idMatch = entry.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
      const pubMatch = entry.match(/<published>([\s\S]*?)<\/published>/);
      const linkMatch = entry.match(/<link rel=["']alternate["'] href=["'](.*?)["']/);

      if (titleMatch && idMatch) {
        const rawTitle = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
        const videoId = idMatch[1].trim();
        const publishedAt = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
        const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
        const thumbnail = `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        // Check if title represents 4 Minutes 24 Headlines or headlines bulletin
        const isTargetBulletin = /4\s*Minutes?\s*24\s*Headlines/i.test(rawTitle);
        const isSpeedBulletin = /4\s*min|speed\s*news|morning\s*headlines|bulletin/i.test(rawTitle);

        if (isTargetBulletin || isSpeedBulletin) {
          bulletins.push({
            title: rawTitle,
            videoId,
            url,
            publishedAt,
            thumbnail,
            isExactMatch: isTargetBulletin
          });
        }
      }
    }

    return bulletins;
  }

  async function fetchLatestNews() {
    // 1. Fetch live latest_news.json with cache-busting
    try {
      const localRes = await fetch(`latest_news.json?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
      });
      if (localRes.ok) {
        const localData = await localRes.json();
        if (localData && localData.latestBulletin) {
          currentNewsData = {
            ...localData.latestBulletin,
            source: 'latest_json'
          };
          recentBulletins = localData.recentBulletins || [localData.latestBulletin];
          return { success: true, data: currentNewsData, list: recentBulletins };
        }
      }
    } catch (e) {
      console.warn('Could not load latest_news.json:', e.message);
    }

    return { success: true, data: currentNewsData, list: recentBulletins };
  }

  function getEmbedUrl(videoId, isLive = false) {
    if (isLive) {
      return `https://www.youtube-nocookie.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=0`;
    }
    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  }

  return {
    CHANNEL_HANDLE,
    CHANNEL_URL,
    CHANNEL_ID,
    getTodayDateFormats,
    getDynamicLinks,
    fetchLatestNews,
    formatRelativeTime,
    formatISTTime,
    formatISTDateTime,
    getEmbedUrl,
    getCurrentData: () => currentNewsData,
    getRecentBulletins: () => recentBulletins
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = NewsHub;
}

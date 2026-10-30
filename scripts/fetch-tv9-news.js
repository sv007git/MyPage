/**
 * Script to fetch TV9 Telugu's latest "4 Minutes 24 Headlines" bulletin
 * Uses YouTube Search (sorted by upload date) + Channel RSS fallback
 * to reliably capture every new edition published throughout the day.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CHANNEL_ID = 'UCPXTXMecYqnRKNdqdVOGSFg';
const CHANNEL_HANDLE = '@TV9TeluguLive';
const OUTPUT_FILE = path.join(__dirname, '..', 'latest_news.json');

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) nextUrl = 'https://www.youtube.com' + nextUrl;
        return resolve(fetchPage(nextUrl));
      }
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(d));
    }).on('error', reject);
  });
}

/**
 * Method 1: YouTube Search sorted by upload date (sp=CAI%253D)
 * This is the most reliable method because TV9 uploads 60-100 videos/day,
 * which buries the headlines bulletin from the 15-item channel RSS feed within minutes.
 */
async function fetchFromYouTubeSearch() {
  const query = 'TV9 Telugu 4 Minutes 24 Headlines';
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=CAI%253D`;
  console.log(`[Method 1] Searching YouTube: ${searchUrl}...`);

  const html = await fetchPage(searchUrl);
  const match = html.match(/var ytInitialData = ({.*?});<\/script>/) || html.match(/ytInitialData\s*=\s*({.*?});/);
  if (!match) {
    console.warn('[Method 1] ytInitialData not found in search HTML');
    return [];
  }

  const data = JSON.parse(match[1]);
  const results = [];

  function traverse(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.videoRenderer) {
      const vr = obj.videoRenderer;
      const videoId = vr.videoId;
      const title = vr.title?.runs?.[0]?.text || vr.title?.simpleText || '';
      const publishedText = vr.publishedTimeText?.simpleText || '';
      const channelTitle = vr.ownerText?.runs?.[0]?.text || '';
      const isTV9Telugu = (/TV9\s*Telugu/i.test(channelTitle) || /TV9/i.test(title)) && !/TV9\s*USA/i.test(channelTitle);

      const isTarget = /4\s*Minutes?\s*24\s*Headlines/i.test(title);
      const isSpeed = /4\s*min|speed\s*news|morning\s*headlines|bulletin/i.test(title);

      if (videoId && isTV9Telugu && (isTarget || isSpeed)) {
        results.push({
          title: title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim(),
          videoId,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          relativeTime: publishedText,
          channelTitle,
          isExactMatch: isTarget
        });
      }
    }
    for (const k of Object.keys(obj)) {
      traverse(obj[k]);
    }
  }

  traverse(data);

  // De-duplicate by videoId
  const seen = new Set();
  const deduped = [];
  for (const item of results) {
    if (!seen.has(item.videoId)) {
      seen.add(item.videoId);
      deduped.push(item);
    }
  }

  return deduped;
}

/**
 * Method 2: Channel RSS Feed
 */
async function fetchFromRss() {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  console.log(`[Method 2] Fetching Channel RSS: ${rssUrl}...`);

  const xml = await fetchPage(rssUrl);
  const entries = xml.split('<entry>').slice(1);
  const bulletins = [];

  for (const entry of entries) {
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
    const idMatch = entry.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/);
    const pubMatch = entry.match(/<published>([\s\S]*?)<\/published>/);
    const linkMatch = entry.match(/<link rel=["']alternate["'] href=["'](.*?)["']/);

    if (titleMatch && idMatch) {
      const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
      const videoId = idMatch[1].trim();
      const publishedAt = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
      const url = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
      const thumbnail = `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      const isTarget = /4\s*Minutes?\s*24\s*Headlines/i.test(title);
      const isGeneral = /4\s*min|speed\s*news|morning\s*headlines|bulletin/i.test(title);

      if (isTarget || isGeneral) {
        bulletins.push({
          title,
          videoId,
          url,
          publishedAt,
          thumbnail,
          channelTitle: 'TV9 Telugu Live',
          isExactMatch: isTarget
        });
      }
    }
  }

  return bulletins;
}

/**
 * Helper to estimate published date from relative text or title date
 * E.g., title contains "30-10-2026", "1 PM", or relative text contains "36 min ago"
 */
function enrichPublishedAt(bulletin) {
  if (bulletin.publishedAt) return bulletin;

  // Try extracting date from title (e.g. 30-10-2026)
  const dateMatch = bulletin.title.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
  const timeMatch = bulletin.title.match(/(\d{1,2})\s*(AM|PM)/i);

  if (dateMatch) {
    const [, d, m, y] = dateMatch;
    let hour = 8;
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      if (timeMatch[2].toUpperCase() === 'PM' && hour < 12) hour += 12;
      if (timeMatch[2].toUpperCase() === 'AM' && hour === 12) hour = 0;
    }
    // IST is UTC + 5:30
    const utcHours = hour - 5.5;
    const estDate = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10), Math.floor(utcHours), (utcHours % 1) * 60));
    bulletin.publishedAt = estDate.toISOString();
    return bulletin;
  }

  // Parse relative time (e.g. "2 hours ago", "36 min ago")
  const rel = bulletin.relativeTime || '';
  const now = Date.now();
  if (/(\d+)\s*sec/i.test(rel)) {
    const s = parseInt(rel.match(/(\d+)\s*sec/i)[1], 10);
    bulletin.publishedAt = new Date(now - s * 1000).toISOString();
  } else if (/(\d+)\s*min/i.test(rel)) {
    const m = parseInt(rel.match(/(\d+)\s*min/i)[1], 10);
    bulletin.publishedAt = new Date(now - m * 60000).toISOString();
  } else if (/(\d+)\s*h/i.test(rel)) {
    const h = parseInt(rel.match(/(\d+)\s*h/i)[1], 10);
    bulletin.publishedAt = new Date(now - h * 3600000).toISOString();
  } else if (/(\d+)\s*d/i.test(rel)) {
    const d = parseInt(rel.match(/(\d+)\s*d/i)[1], 10);
    bulletin.publishedAt = new Date(now - d * 86400000).toISOString();
  } else {
    bulletin.publishedAt = new Date().toISOString();
  }

  return bulletin;
}

async function main() {
  console.log(`Starting TV9 Telugu news sync at ${new Date().toISOString()}...`);

  let allBulletins = [];

  // Try Method 1: YouTube Search (Primary)
  try {
    const searchBulletins = await fetchFromYouTubeSearch();
    console.log(`[Method 1] Found ${searchBulletins.length} bulletins from search.`);
    allBulletins.push(...searchBulletins);
  } catch (err) {
    console.error('[Method 1] Error searching YouTube:', err.message);
  }

  // Try Method 2: Channel RSS Feed (Secondary)
  try {
    const rssBulletins = await fetchFromRss();
    console.log(`[Method 2] Found ${rssBulletins.length} bulletins from RSS.`);
    allBulletins.push(...rssBulletins);
  } catch (err) {
    console.error('[Method 2] Error fetching RSS feed:', err.message);
  }

  if (allBulletins.length === 0) {
    console.warn('No bulletins found from either method. Preserving existing latest_news.json.');
    return;
  }

  // De-duplicate by videoId
  const map = new Map();
  for (const b of allBulletins) {
    if (!map.has(b.videoId)) {
      map.set(b.videoId, enrichPublishedAt(b));
    }
  }

  const bulletins = Array.from(map.values());

  // Sort by published date descending (newest first)
  bulletins.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Pick latest exact match, or first bulletin
  const latest = bulletins.find(b => b.isExactMatch) || bulletins[0];

  console.log(`\n========================================`);
  console.log(`LATEST BULLETIN FOUND:`);
  console.log(`Title:       ${latest.title}`);
  console.log(`Video ID:    ${latest.videoId}`);
  console.log(`Published:   ${latest.publishedAt}`);
  console.log(`URL:         ${latest.url}`);
  console.log(`========================================\n`);

  const payload = {
    lastUpdated: new Date().toISOString(),
    channelTitle: 'TV9 Telugu Live',
    channelUrl: `https://www.youtube.com/${CHANNEL_HANDLE}`,
    channelId: CHANNEL_ID,
    latestBulletin: latest,
    recentBulletins: bulletins.slice(0, 8)
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Successfully written to ${OUTPUT_FILE}`);
}

main();

/**
 * Node script to fetch TV9 Telugu's RSS feed, extract the latest
 * "4 Minutes 24 Headlines" bulletin, and update latest_news.json.
 * Executed locally or via GitHub Actions scheduled workflow.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CHANNEL_ID = 'UCPXTXMecYqnRKNdqdVOGSFg';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUTPUT_FILE = path.join(__dirname, '..', 'latest_news.json');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseFeed(xml) {
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
          isExactMatch: isTarget
        });
      }
    }
  }

  return bulletins;
}

async function main() {
  console.log(`Fetching TV9 Telugu RSS feed: ${RSS_URL}...`);
  try {
    const xml = await fetchUrl(RSS_URL);
    const bulletins = parseFeed(xml);

    if (bulletins.length === 0) {
      console.warn('No headline bulletins found in recent 15 videos.');
      return;
    }

    const latest = bulletins.find(b => b.isExactMatch) || bulletins[0];
    console.log(`Found latest bulletin: [${latest.videoId}] ${latest.title}`);

    const payload = {
      lastUpdated: new Date().toISOString(),
      channelTitle: 'TV9 Telugu Live',
      channelUrl: 'https://www.youtube.com/@TV9TeluguLive',
      latestBulletin: latest,
      recentBulletins: bulletins.slice(0, 5)
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2));
    console.log(`Successfully updated ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Failed to fetch/parse TV9 feed:', err.message);
  }
}

main();

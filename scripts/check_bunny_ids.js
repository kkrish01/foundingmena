const fs = require('fs');
const shorts = JSON.parse(fs.readFileSync('scripts/live_shorts.json', 'utf8'));

console.log('Shorts count in live_shorts.json:', shorts.length);
shorts.forEach((s, idx) => {
  // Extract bunny ID from preview
  // e.g. https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/preview.webp
  const match = s.preview?.match(/b-cdn\.net\/([^\/]+)\//);
  const bunnyId = match ? match[1] : null;
  const videoUrl = bunnyId ? `https://vz-6e09e4d4-87b.b-cdn.net/${bunnyId}/play_480p.mp4` : null;
  console.log(`${idx + 1}. ${s.title} (${s.dur}) - video: ${videoUrl}`);
});

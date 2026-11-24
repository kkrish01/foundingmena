const fs = require('fs');
const s20 = fs.readFileSync('scripts/huda_script_20.txt', 'utf8');

// Find video URL or playback source
const bcdnMatches = [...s20.matchAll(/https:\/\/[^"\s]+\.(?:mp4|m3u8|b-cdn\.net\/[^"\s]+)/g)].map(m => m[0]);
console.log('Video / CDN links:', [...new Set(bcdnMatches)]);

// Find description and subtitles or data object
const descIdx = s20.indexOf('Sephora Dubai');
if (descIdx !== -1) {
  console.log('Description snippet:');
  console.log(s20.slice(Math.max(0, descIdx - 200), descIdx + 1200));
}

const fs = require('fs');
const fullHtml = fs.readFileSync('scripts/live_home_full.html', 'utf8');

// Find deals in HTML (not just flight)
const idx = fullHtml.indexOf('id="deals"');
console.log('id="deals" index:', idx);
if (idx !== -1) {
  console.log('Around id="deals":');
  console.log(fullHtml.substring(idx - 300, idx + 800));
}

// Check where deals is in flight
const fIdx = fullHtml.indexOf('"deals"');
console.log('"deals" flight index:', fIdx);
if (fIdx !== -1) {
  console.log(fullHtml.substring(fIdx - 200, fIdx + 800).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
}

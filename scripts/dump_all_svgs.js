const fs = require('fs');
const chunk = fs.readFileSync('scripts/spot_chunk.txt', 'utf8');
let str = chunk.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Also look into scripts/live_home_full.html if anything was split across chunks
const fullHtml = fs.readFileSync('scripts/live_home_full.html', 'utf8');

// Find all occurrences of dm-area, dm-spark, dm-share
['dm-area', 'dm-spark', 'dm-share'].forEach(cls => {
  const idx = fullHtml.indexOf(cls);
  console.log(`\n=== Occurrence of ${cls} at ${idx} ===`);
  if (idx !== -1) {
    console.log(fullHtml.substring(idx - 200, idx + 1500).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
  }
});

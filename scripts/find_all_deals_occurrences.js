const fs = require('fs');
const fullHtml = fs.readFileSync('scripts/live_home_full.html', 'utf8');

let pos = 0;
while (true) {
  const idx = fullHtml.toLowerCase().indexOf('deals', pos);
  if (idx === -1) break;
  console.log(`Found 'deals' at ${idx}:`);
  console.log(fullHtml.substring(idx - 100, idx + 150).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
  console.log('---');
  pos = idx + 10;
}

const fs = require('fs');
const html = fs.readFileSync('scripts/live_home_full.html', 'utf8');

['region', 'Substack', 'SUBSCRIBE', 'The newsletter'].forEach(term => {
  let pos = 0;
  while (true) {
    const idx = html.toLowerCase().indexOf(term.toLowerCase(), pos);
    if (idx === -1) break;
    console.log(`\n=== Term "${term}" at ${idx} ===`);
    console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 350)));
    pos = idx + 10;
    if (pos > idx + 500) break;
  }
});

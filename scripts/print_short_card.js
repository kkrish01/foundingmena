const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const idx = html.indexOf('/shorts/');
console.log('first /shorts/ index:', idx);
if (idx !== -1) {
  console.log(html.slice(Math.max(0, idx - 200), idx + 1200));
}

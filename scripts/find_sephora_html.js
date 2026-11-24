const fs = require('fs');
const html = fs.readFileSync('scripts/huda_page.html', 'utf8');

const idx = html.indexOf('Sephora');
console.log('Sephora in html:', idx);
if (idx !== -1) {
  console.log(html.slice(Math.max(0, idx - 400), idx + 800));
}

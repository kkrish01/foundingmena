const fs = require('fs');
const html = fs.readFileSync('scripts/huda_page.html', 'utf8');

const idx = html.indexOf('Sephora');
console.log(html.slice(Math.max(0, idx - 1500), idx + 2500));

const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const idx = html.indexOf('class="c in w-v shortc');
const endIdx = html.indexOf('</a>', idx);
console.log(html.slice(endIdx - 500, endIdx + 100));

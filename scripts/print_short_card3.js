const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const idx = html.indexOf('class="c in w-v shortc');
console.log(html.slice(idx + 1800, idx + 3000));

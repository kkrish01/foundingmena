const fs = require('fs');
const html = fs.readFileSync('scripts/live_home_full.html', 'utf8');

console.log(html.substring(335500, 336500));

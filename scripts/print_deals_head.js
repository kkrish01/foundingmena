const fs = require('fs');
const fullHtml = fs.readFileSync('scripts/live_home_full.html', 'utf8');

console.log(fullHtml.substring(652700, 653600).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));

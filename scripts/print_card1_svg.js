const fs = require('fs');
const fullHtml = fs.readFileSync('scripts/live_home_full.html', 'utf8');
const idx = fullHtml.indexOf('dm-area');
console.log(fullHtml.substring(idx - 50, idx + 2500).replace(/\\"/g, '"').replace(/\\\\/g, '\\'));

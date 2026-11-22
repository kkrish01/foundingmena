const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const start = html.indexOf('class="fm fnd full"');
console.log(html.slice(start, start + 3000));

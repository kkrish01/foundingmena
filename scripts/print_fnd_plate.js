const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const fndStart = html.indexOf('class="fm fnd full"');
const plateStart = html.indexOf('class="plate"', fndStart);
console.log(html.slice(plateStart, plateStart + 1500));

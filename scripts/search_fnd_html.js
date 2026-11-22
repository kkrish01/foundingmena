const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

const regex = /class="[^"]*fnd[^"]*"/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Match:', m[0]);
  console.log('Surrounding:', html.slice(Math.max(0, m.index - 100), m.index + 300));
  break;
}

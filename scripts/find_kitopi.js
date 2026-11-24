const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

const target = 'Kitopi: Mohamad Ballout';
const idx = content.indexOf(target);
console.log('Kitopi index:', idx);
if (idx !== -1) {
  console.log(content.slice(Math.max(0, idx - 400), idx + 2000));
}

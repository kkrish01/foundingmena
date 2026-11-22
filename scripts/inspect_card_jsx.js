const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

// Look for JSX or classes related to founder card
const idx = content.indexOf('fnd full');
console.log('fnd full index:', idx);
if (idx !== -1) {
  console.log(content.slice(Math.max(0, idx - 200), idx + 800));
}

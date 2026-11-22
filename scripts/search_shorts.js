const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

['fashion', 'lattafa', 'milk', 'laughed'].forEach(kw => {
  const idx = content.toLowerCase().indexOf(kw);
  console.log(`Keyword "${kw}" index:`, idx);
  if (idx !== -1) {
    console.log(content.slice(Math.max(0, idx - 100), idx + 200));
  }
});

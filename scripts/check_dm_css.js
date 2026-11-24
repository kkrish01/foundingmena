const fs = require('fs');
const css = fs.readFileSync('scripts/deals_style_2.css', 'utf8');

['dm-area', 'dm-spark', 'dm-share', '.dm-'].forEach(term => {
  const matches = css.match(new RegExp(`[^{}]*${term}[^{}]*\\{[^}]+\\}`, 'g'));
  if (matches) {
    console.log(`\n=== Matches for ${term} ===`);
    matches.forEach(m => console.log(m.trim()));
  }
});

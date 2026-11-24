const fs = require('fs');

['scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach(f => {
  const css = fs.readFileSync(f, 'utf8');
  const matches = css.match(/[^{}]*\bbtn\b[^{}]*\{[^}]+\}/g);
  if (matches) {
    console.log(`\n=== Matches for .btn in ${f} ===`);
    matches.forEach(m => console.log(m.trim()));
  }
});

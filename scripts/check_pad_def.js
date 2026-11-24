const fs = require('fs');

['scripts/deals_style_0.css', 'scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach((f, i) => {
  const css = fs.readFileSync(f, 'utf8');
  const matches = css.match(/[^{}]*--pad:[^;}]+/g);
  if (matches) {
    console.log(`\n=== --pad definitions in ${f} ===`);
    matches.forEach(m => console.log(m.trim()));
  }
});

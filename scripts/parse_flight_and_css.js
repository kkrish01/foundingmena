const fs = require('fs');

// Read flight text
const flight = fs.readFileSync('scripts/deals_flight.txt', 'utf8');
console.log('Flight snippet:\n', flight.substring(0, 3000));

// Read CSS files and extract rules with data-module
['scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach(f => {
  if (fs.existsSync(f)) {
    const css = fs.readFileSync(f, 'utf8');
    const matches = css.match(/[^{}]+data-module[^{}]*\{[^}]+\}/g);
    if (matches) {
      console.log(`\n=== Matched rules in ${f} (${matches.length}) ===`);
      matches.forEach(m => console.log(m.trim()));
    }
  }
});

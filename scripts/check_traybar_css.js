const fs = require('fs');
const css = fs.readFileSync('app/foundingmena.css', 'utf8');

['traybar', 'icobtn', 'trayin', 'tray-pad'].forEach(term => {
  const matches = css.match(new RegExp(`[^{}]*\\b${term}\\b[^{}]*\\{[^}]+\\}`, 'g'));
  if (matches) {
    console.log(`\n=== Matches for ${term} ===`);
    matches.forEach(m => console.log(m.trim()));
  }
});

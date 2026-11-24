const fs = require('fs');
const https = require('https');

https.get('https://foundingmena.com/_next/static/immutable/chunks/24yzhn-wr858_.css', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/deals_style_0.css', data);
    console.log('Saved deals_style_0.css, size:', data.length);
    
    // Check all 3 css files for sechead, section, rails, pad, spot
    ['scripts/deals_style_0.css', 'scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach(f => {
      const css = fs.readFileSync(f, 'utf8');
      ['.sechead', '.section', '#rails', '--pad', 'data-module__NYeKAW__spot'].forEach(term => {
        const regex = new RegExp(`[^{}]*\\b${term.replace('.', '\\.')}\\b[^{}]*\\{[^}]+\\}`, 'g');
        const matches = css.match(regex);
        if (matches) {
          console.log(`\n=== Matches for ${term} in ${f} ===`);
          matches.slice(0, 5).forEach(m => console.log(m.trim()));
        }
      });
    });
  });
});

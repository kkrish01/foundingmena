const fs = require('fs');

['scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach(f => {
  if (fs.existsSync(f)) {
    const css = fs.readFileSync(f, 'utf8');
    ['.section', '.sechead', '--pad', 'spot', '.cv', '.btn', '#rails'].forEach(term => {
      const regex = new RegExp(`[^{}]*\\b${term.replace('.', '\\.')}\\b[^{}]*\\{[^}]+\\}`, 'g');
      const matches = css.match(regex);
      if (matches) {
        console.log(`\n=== Matches for ${term} in ${f} ===`);
        matches.slice(0, 10).forEach(m => console.log(m.trim()));
      }
    });
  }
});

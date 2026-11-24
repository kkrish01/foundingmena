const fs = require('fs');

['scripts/deals_style_0.css', 'scripts/deals_style_1.css', 'scripts/deals_style_2.css'].forEach(f => {
  const css = fs.readFileSync(f, 'utf8');
  const idx = css.indexOf('sechead');
  if (idx !== -1) {
    console.log(`Found sechead in ${f} at ${idx}:`);
    console.log(css.substring(idx - 100, idx + 400));
  }
});

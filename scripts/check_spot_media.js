const fs = require('fs');
const css = fs.readFileSync('scripts/deals_style_2.css', 'utf8');

// Search for data-module__NYeKAW__spot and print its surrounding 500 characters
let pos = 0;
while (true) {
  const idx = css.indexOf('data-module__NYeKAW__spot', pos);
  if (idx === -1) break;
  console.log(`\n=== At index ${idx} ===`);
  console.log(css.substring(Math.max(0, idx - 200), Math.min(css.length, idx + 400)));
  pos = idx + 25;
}

const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

// Find section with "Shorts"
const shortsIdx = html.indexOf('id="watch"');
console.log('id="watch" index:', shortsIdx);
if (shortsIdx !== -1) {
  console.log(html.slice(shortsIdx, shortsIdx + 3000));
} else {
  const shortsText = html.indexOf('>Shorts<');
  console.log('>Shorts< index:', shortsText);
  if (shortsText !== -1) {
    console.log(html.slice(shortsText - 200, shortsText + 3000));
  }
}

const fs = require('fs');
const html = fs.readFileSync('scripts/article_page.html', 'utf8');

// Find stat box in html
const statIdx = html.indexOf('FINTECH');
console.log('FINTECH index in html:', statIdx);
if (statIdx !== -1) {
  console.log(html.slice(statIdx - 200, statIdx + 600));
}

// Find lead paragraph and subtitle
const leadIdx = html.indexOf('Trendyol is one of Turkey');
console.log('Lead paragraph index:', leadIdx);
if (leadIdx !== -1) {
  console.log(html.slice(leadIdx - 200, leadIdx + 800));
}

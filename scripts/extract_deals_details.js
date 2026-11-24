const fs = require('fs');
const https = require('https');

const html = fs.readFileSync('scripts/live_home_full.html', 'utf8');

// Find all CSS links
const cssMatches = [...html.matchAll(/href="([^"]+\.css)"/g)].map(m => m[1]);
console.log('CSS files:', cssMatches);

// Extract flight data around lead-total
const idx = html.indexOf('lead-total');
if (idx !== -1) {
  const slice = html.substring(idx - 300, idx + 6000);
  fs.writeFileSync('scripts/deals_flight.txt', slice);
  console.log('Wrote scripts/deals_flight.txt');
}

// Download CSS files to check data-module classes
cssMatches.forEach((cssUrl, i) => {
  const fullUrl = cssUrl.startsWith('http') ? cssUrl : `https://foundingmena.com${cssUrl}`;
  https.get(fullUrl, res => {
    let cssData = '';
    res.on('data', chunk => cssData += chunk);
    res.on('end', () => {
      if (cssData.includes('data-module') || cssData.includes('spot') || cssData.includes('dune')) {
        console.log(`Found data-module styles in CSS ${i}: ${cssUrl}`);
        fs.writeFileSync(`scripts/deals_style_${i}.css`, cssData);
      }
    });
  });
});

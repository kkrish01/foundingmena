const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf("Founding 30: Startups");
    const nextIdx = data.indexOf("Founding 30: Founders");
    const slice = data.substring(idx, nextIdx);
    fs.writeFileSync('scripts/all_startups_html.txt', slice);
    console.log('Saved all startups HTML slice, len:', slice.length);
  });
});

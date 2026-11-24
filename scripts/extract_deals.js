const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/live_home_full.html', data);
    const dealsIdx = data.indexOf('deals');
    console.log('Total length:', data.length);
    // Find section with deals
    const regex = /<section[^>]*id=["']deals["'][^>]*>([\s\S]*?)<\/section>/i;
    const match = data.match(regex);
    if (match) {
      console.log('Found section:');
      fs.writeFileSync('scripts/deals_section.html', match[0]);
      console.log('Wrote scripts/deals_section.html, length:', match[0].length);
    } else {
      console.log('Regex not matched, searching text:');
      const idx = data.indexOf('Deals &amp; data');
      if (idx !== -1) {
        console.log(data.substring(idx - 200, idx + 2500));
      } else {
        console.log('Not found');
      }
    }
  });
}).on('error', err => console.error(err));

const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/live_home.html', html);
    const idx = html.indexOf('the-30-founders');
    if (idx !== -1) {
      const section = html.slice(idx, idx + 10000);
      fs.writeFileSync('scripts/founders_section.html', section);
      console.log('Founders section saved!');
    } else {
      console.log('the-30-founders not found in raw html, checking scripts...');
    }
  });
}).on('error', console.error);

const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const pos = data.indexOf('\"companies\":[');
    console.log('Pos of companies:', pos);
    if (pos !== -1) {
      // Find where companies ends
      // Let's grab the JSON substring
      const sub = data.substring(pos + 12);
      // We can find matching bracket or write out 20000 chars
      fs.writeFileSync('scripts/companies_raw.txt', sub.substring(0, 50000));
      console.log('Saved 50000 chars of companies to scripts/companies_raw.txt');
    }
  });
});

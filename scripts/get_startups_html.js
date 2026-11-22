const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print HTML around MENA's Founding 30: Startups
    const idx = data.indexOf("Founding 30: Startups");
    if (idx !== -1) {
      console.log('Found Startups section at', idx);
      const htmlSlice = data.substring(idx - 50, idx + 8000);
      fs.writeFileSync('scripts/startups_html.txt', htmlSlice);
      console.log('Saved 8000 chars of startups HTML');
    }
  });
});

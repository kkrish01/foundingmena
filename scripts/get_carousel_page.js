const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/read/weekly-roundup-sept-21-25', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/weekly_roundup_page.html', html);
    console.log('Saved weekly_roundup_page.html! Length:', html.length);
    // Find all script tags
    const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
    scripts.forEach((s, i) => {
      if (s[1].includes('Paymob') || s[1].includes('visuals')) {
        console.log(`Script ${i} matches! Length:`, s[1].length);
        fs.writeFileSync(`scripts/carousel_script_${i}.txt`, s[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
      }
    });
  });
}).on('error', console.error);

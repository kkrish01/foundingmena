const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/shorts/huda-beauty-huda-kattan', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/huda_page.html', html);
    console.log('Saved huda_page.html! Length:', html.length);
    // Find all script tags
    const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
    scripts.forEach((s, i) => {
      if (s[1].includes('Sephora') || s[1].includes('lashes') || s[1].includes('b-cdn.net')) {
        console.log(`Script ${i} matches! Length:`, s[1].length);
        fs.writeFileSync(`scripts/huda_script_${i}.txt`, s[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
      }
    });
  });
}).on('error', console.error);

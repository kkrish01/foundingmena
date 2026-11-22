const https = require('https');
const fs = require('fs');

https.get('https://foundingmena.com/founders/wafa-al-obaidat', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/wafa_page.html', html);
    console.log('Saved wafa_page.html! Length:', html.length);
    // Find all script tags or text
    const shortsIdx = html.indexOf('ON FOUNDING MENA');
    console.log('ON FOUNDING MENA index:', shortsIdx);
    if (shortsIdx !== -1) {
      console.log(html.slice(shortsIdx, shortsIdx + 2000));
    }
  });
}).on('error', console.error);

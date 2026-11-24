const https = require('https');
const fs = require('fs');

const url = 'https://foundingmena.com/read/the-women-behind-some-of-menas-biggest-companies';

https.get(url, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/article_page.html', html);
    console.log('Saved article_page.html! Length:', html.length);
    // Find all script tags
    const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
    scripts.forEach((s, i) => {
      if (s[1].includes('Trendyol') || s[1].includes('category-defining')) {
        console.log(`Script ${i} matches! Length:`, s[1].length);
        fs.writeFileSync(`scripts/article_script_${i}.txt`, s[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'));
      }
    });
  });
}).on('error', console.error);

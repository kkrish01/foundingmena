const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const heroIdx = data.indexOf('class="hero"');
    const heroEnd = data.indexOf('Countries &amp; Sectors');
    console.log(data.substring(heroIdx, heroEnd));
  });
});

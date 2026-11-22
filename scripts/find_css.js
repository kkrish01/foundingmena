const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const css = data.match(/[^"'\s>]+\.css[^"'\s>]*/g) || [];
    console.log('CSS links:', [...new Set(css)]);
  });
});

const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all occurrences of "Tabby" across whole data
    let pos = 0;
    while ((pos = data.indexOf('Tabby', pos)) !== -1) {
      console.log('--- At pos ' + pos + ' ---');
      console.log(data.substring(Math.max(0, pos - 150), Math.min(data.length, pos + 250)));
      pos += 5;
    }
  });
});

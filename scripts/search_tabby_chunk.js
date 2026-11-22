const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const chunk4 = data.split('self.__next_f.push(')[4];
    const match = chunk4.match(/\{(\\\"|")name(\\\"|"):(\\\"|")Tabby(\\\"|").*?valuation(\\\"|"):(\\\"|")[^\\\"]+(\\\"|")/);
    if (match) {
      console.log('Tabby match:', match[0].substring(0, 500));
    } else {
      // Find "Tabby"
      const idx = chunk4.indexOf('Tabby');
      console.log('Tabby around:', chunk4.substring(idx - 100, idx + 400));
    }
  });
});

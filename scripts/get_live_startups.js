const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find startups array in chunk 4
    const chunks = data.split('self.__next_f.push(');
    chunks.forEach((c, idx) => {
      if (c.includes('Tabby') && c.includes('Ninja') && c.includes('MNT-Halan')) {
        console.log(`Found in chunk ${idx}, length: ${c.length}`);
        // search for startup objects
        const startIdx = c.indexOf('\"slug\":\"tabby\"');
        if (startIdx !== -1) {
          console.log(c.substring(startIdx - 50, startIdx + 2500));
        }
      }
    });
  });
});

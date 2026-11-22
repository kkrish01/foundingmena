const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for self.__next_f chunks containing "How Peak Games" or "Why Gulf Startups"
    const chunks = data.split('self.__next_f.push(');
    console.log('Total chunks:', chunks.length);
    chunks.forEach((c, idx) => {
      if (c.includes('Peak Games') || c.includes('Why Gulf Startups') || c.includes('01a188e2')) {
        console.log(`--- Match in chunk ${idx} ---`);
        // print decoded or slice
        console.log(c.substring(0, 1000));
      }
    });
  });
});

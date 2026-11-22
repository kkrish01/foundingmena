const https = require('https');

https.get('https://foundingmena.com/startups/tabby', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check self.__next_f chunks
    const chunks = data.split('self.__next_f.push(');
    console.log('Total chunks:', chunks.length);
    chunks.forEach((c, idx) => {
      if (c.includes('Hosam Arab') || c.includes('6.5bn') || c.includes('Why it’s in the Founding 30') || c.includes('Why it\'s in the Founding 30')) {
        console.log(`Match in chunk ${idx}:`);
        console.log(c.substring(0, 1500));
      }
    });
  });
});

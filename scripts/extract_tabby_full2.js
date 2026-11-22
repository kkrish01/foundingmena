const https = require('https');

https.get('https://foundingmena.com/startups/tabby', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const chunks = data.split('self.__next_f.push(');
    console.log('Chunk 5 sample:');
    console.log(chunks[5]?.substring(0, 3000));
    console.log('Chunk 6 sample:');
    console.log(chunks[6]?.substring(0, 3000));
  });
});

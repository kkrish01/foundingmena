const https = require('https');

https.get('https://foundingmena.com/startups/tabby', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all JSON or text in the chunks
    const chunks = data.split('self.__next_f.push(');
    console.log('Chunk 4 length:', chunks[4]?.length);
    console.log('Chunk 4 sample:');
    console.log(chunks[4]?.substring(0, 3000));
  });
});

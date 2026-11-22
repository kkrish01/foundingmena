const https = require('https');

https.get('https://foundingmena.com/startups/tabby', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Tabby page size:', data.length);
    // Find startup data or structure
    const titleIdx = data.indexOf('<h1');
    if (titleIdx !== -1) {
      console.log('h1 context:', data.substring(titleIdx - 100, titleIdx + 400));
    }
    // Check if it renders a tray or main page
    const mainIdx = data.indexOf('<main');
    if (mainIdx !== -1) {
      console.log('main context:', data.substring(mainIdx, mainIdx + 600));
    }
  });
});

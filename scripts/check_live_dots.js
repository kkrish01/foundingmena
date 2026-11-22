const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for dots markup in chunk 0 or all chunks
    const dotsIdx = data.indexOf('class="dots"');
    if (dotsIdx !== -1) {
      console.log('Dots in HTML:', data.substring(dotsIdx - 20, dotsIdx + 600));
    } else {
      console.log('dots not found directly');
    }
  });
});

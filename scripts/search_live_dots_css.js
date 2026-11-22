const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find all css files linked
    const cssFiles = data.match(/href="(\/_next\/static\/css\/[^"]+\.css)"/g) || [];
    console.log('CSS files:', cssFiles);
    cssFiles.forEach(f => {
      const url = 'https://foundingmena.com' + f.replace('href="', '').replace('"', '');
      https.get(url, (cRes) => {
        let css = '';
        cRes.on('data', c => css += c);
        cRes.on('end', () => {
          console.log(`CSS file ${url} length: ${css.length}`);
          // Search for .dots or .dot
          const regex = /\.dots[^{]*\{[^}]+\}|\.dot[^{]*\{[^}]+\}/g;
          let m;
          while ((m = regex.exec(css)) !== null) {
            console.log(m[0]);
          }
        });
      });
    });
  });
});

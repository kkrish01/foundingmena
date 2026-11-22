const https = require('https');

https.get('https://foundingmena.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const cssMatches = data.match(/\/_next\/static\/css\/[a-zA-Z0-9_\-]+\.css/g) || [];
    const unique = [...new Set(cssMatches)];
    console.log('CSS matches:', unique);
    if (unique.length > 0) {
      https.get('https://foundingmena.com' + unique[0], (cRes) => {
        let css = '';
        cRes.on('data', c => css += c);
        cRes.on('end', () => {
          console.log(`CSS size: ${css.length}`);
          const regex = /\.hero\s*\.dots[^{]*\{[^}]+\}|\.hero\s*\.dot[^{]*\{[^}]+\}|\.dots\s*\{[^}]+\}|\.dot\s*\{[^}]+\}/g;
          let m;
          while ((m = regex.exec(css)) !== null) {
            console.log(m[0]);
          }
        });
      });
    }
  });
});

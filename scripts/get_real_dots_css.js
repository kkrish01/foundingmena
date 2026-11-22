const https = require('https');

const files = [
  'https://foundingmena.com/_next/static/immutable/chunks/24yzhn-wr858_.css',
  'https://foundingmena.com/_next/static/immutable/chunks/3d46v6urhz3wi.css',
  'https://foundingmena.com/_next/static/immutable/chunks/2zduyl5si2iym.css'
];

files.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('=== URL:', url, 'len:', data.length);
      const regex = /\.dots[^{]*\{[^}]+\}|\.dot[^{]*\{[^}]+\}/g;
      let m;
      while ((m = regex.exec(data)) !== null) {
        console.log(m[0]);
      }
    });
  });
});

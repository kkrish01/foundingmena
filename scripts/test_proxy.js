const https = require('https');

function fetchProxy(targetUrl) {
  return new Promise((resolve, reject) => {
    https.get(targetUrl, {
      headers: {
        'Referer': 'https://foundingmena.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, res => {
      console.log(`Proxied ${targetUrl} -> status ${res.statusCode}, size ${res.headers['content-length']}`);
      resolve(res.statusCode);
    }).on('error', reject);
  });
}

fetchProxy('https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/play_480p.mp4');

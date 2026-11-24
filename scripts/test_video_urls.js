const https = require('https');

const urls = [
  'https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/preview.webp',
  'https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/play_480p.mp4',
  'https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/play_360p.mp4',
  'https://vz-6e09e4d4-87b.b-cdn.net/85c2ea44-2f47-4d16-890d-9cc96f84fbb1/playlist.m3u8'
];

urls.forEach(url => {
  https.request(url, { method: 'HEAD' }, res => {
    console.log(`${url} -> status: ${res.statusCode}, type: ${res.headers['content-type']}, length: ${res.headers['content-length']}`);
  }).on('error', err => console.error(err)).end();
});

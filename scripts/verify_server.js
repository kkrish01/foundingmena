const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Page status:', res.statusCode);
    const cssMatch = data.match(/href="(\/_next\/static\/css\/[^"]+)"/);
    if (cssMatch) {
      console.log('CSS URL:', cssMatch[1]);
      http.get('http://localhost:3000' + cssMatch[1], (cssRes) => {
        console.log('CSS Status:', cssRes.statusCode);
      });
    } else {
      console.log('No CSS URL matched');
    }
  });
});

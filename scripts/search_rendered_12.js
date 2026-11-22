const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for 12 in data
    const regex = /[^a-zA-Z0-9]12[^a-zA-Z0-9]/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      const start = Math.max(0, match.index - 50);
      const end = Math.min(data.length, match.index + 50);
      console.log('Match around 12:', data.substring(start, end));
    }
  });
});

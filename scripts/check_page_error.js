const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Print all matches of error/Error
    const regex = /error|Error/gi;
    let m;
    while ((m = regex.exec(data)) !== null) {
      console.log('--- ERROR CONTEXT ---');
      console.log(data.substring(Math.max(0, m.index - 100), Math.min(data.length, m.index + 200)));
    }
  });
});

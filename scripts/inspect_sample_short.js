const fs = require('fs');
const shorts = JSON.parse(fs.readFileSync('scripts/live_shorts.json', 'utf8'));
console.log('Sample short (Huda Beauty):', JSON.stringify(shorts[1], null, 2));

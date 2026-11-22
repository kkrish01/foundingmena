const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));
const st12 = data.startups[11] || data.startups.find((s, idx) => idx === 11);
console.log('Startup 12:', JSON.stringify(st12, null, 2));

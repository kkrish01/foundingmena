const fs = require('fs');
const founders = JSON.parse(fs.readFileSync('scripts/live_founders.json', 'utf8'));

console.log('Founder 1 (Wafa Al Obaidat) keys:', Object.keys(founders[0]));
console.log('Sample detail:', JSON.stringify(founders[0], null, 2));

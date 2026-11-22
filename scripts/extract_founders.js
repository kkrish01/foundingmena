const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

// Search for founder object structures
// Let's find occurrences of Wafa Al Obaidat
const wafaIdx = content.indexOf('Wafa Al Obaidat');
console.log('Snippet around Wafa:');
console.log(content.slice(Math.max(0, wafaIdx - 500), wafaIdx + 1500));

const fs = require('fs');
const s20 = fs.readFileSync('scripts/wafa_script_20.js', 'utf8');

// Print all classNames
const classNames = [...s20.matchAll(/\"className\":\"([^\"]+)\"/g)].map(m => m[1]);
console.log('Unique classNames:', [...new Set(classNames)]);

// Print headings or text
const texts = [...s20.matchAll(/\"children\":(?:\"([^\"]+)\"|\[\"([^\"]+)\")/g)].map(m => m[1] || m[2]).filter(Boolean);
console.log('Sample texts:', texts.slice(0, 30));

const fs = require('fs');
const s20 = fs.readFileSync('scripts/wafa_script_20.js', 'utf8');
const unescaped = s20.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
fs.writeFileSync('scripts/wafa_flight.txt', unescaped);
console.log('Saved unescaped flight stream. Length:', unescaped.length);

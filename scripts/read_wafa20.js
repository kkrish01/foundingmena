const fs = require('fs');
const s20 = fs.readFileSync('scripts/wafa_script_20.js', 'utf8');
console.log(s20.slice(0, 2000));

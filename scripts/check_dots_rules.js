const fs = require('fs');
const css = fs.readFileSync('app/foundingmena.css', 'utf8');

// Find all occurrences of .dots
const regex = /[^{}]*\.dots[^{}]*\{[^}]+\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0].trim());
}

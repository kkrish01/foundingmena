const fs = require('fs');
const html = fs.readFileSync('the_30_founders_main.html', 'utf8');

const firstCardMatch = html.match(/<a class="fm fnd[^"]*"[\s\S]*?<\/a>/);
if (firstCardMatch) {
  console.log('--- FOUNDER CARD SAMPLE ---');
  console.log(firstCardMatch[0]);
}

const secondCardMatch = html.match(/(<a class="fm fnd[^"]*"[\s\S]*?<\/a>)[\s\S]*?(<a class="fm fnd[^"]*"[\s\S]*?<\/a>)/);
if (secondCardMatch) {
  console.log('--- SECOND CARD ---');
  console.log(secondCardMatch[2]);
}

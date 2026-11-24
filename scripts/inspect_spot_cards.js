const fs = require('fs');
const chunk = fs.readFileSync('scripts/spot_chunk.txt', 'utf8');

// Unescape flight string
let str = chunk.replace(/\\"/g, '"').replace(/\\\\/g, '\\');

// Look for articles
const articles = str.split('["$","article",');
console.log('Total articles found:', articles.length - 1);

articles.slice(1).forEach((art, i) => {
  console.log(`\n================ CARD ${i + 1} ================`);
  // print first 1500 chars of each card
  console.log(art.substring(0, 1800));
});

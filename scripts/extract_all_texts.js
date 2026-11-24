const fs = require('fs');
const s21 = fs.readFileSync('scripts/article_script_21.txt', 'utf8');

const matches = [...s21.matchAll(/\"children\":\"([^\"]{10,})\"/g)].map(m => m[1]);
console.log('Matches count:', matches.length);
matches.forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.slice(0, 100)}...`);
});

fs.writeFileSync('scripts/article_all_texts.json', JSON.stringify(matches, null, 2));

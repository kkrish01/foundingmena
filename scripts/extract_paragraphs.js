const fs = require('fs');
const s21 = fs.readFileSync('scripts/article_script_21.txt', 'utf8');

// Find all text in s21
const matches = [...s21.matchAll(/\"children\":\[\[\"\$L1\",\"t\d+\",\{\"children\":\"([^\"]+)\"\}\]\]/g)].map(m => m[1]);
console.log('Paragraphs count:', matches.length);
matches.forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.slice(0, 80)}...`);
});

fs.writeFileSync('scripts/article_paragraphs.json', JSON.stringify(matches, null, 2));

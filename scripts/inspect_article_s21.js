const fs = require('fs');
const s21 = fs.readFileSync('scripts/article_script_21.txt', 'utf8');

// Find headings, paragraphs, and data blocks
const headings = [...s21.matchAll(/\"h[234]\"[^{]*\{[^{]*\"children\":(?:\"([^\"]+)\"|\[\"([^\"]+)\")/g)].map(m => m[1] || m[2]);
console.log('Headings in s21:', headings);

// Print first 2000 chars of s21
console.log('Snippet of s21:');
console.log(s21.slice(0, 1500));

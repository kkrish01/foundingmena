const fs = require('fs');
const groups = require('../data/the30FoundersComplete.json');

let fixed = 0;
groups.forEach(g => {
  g.cards.forEach(c => {
    const directMatch = c.rawHtml.match(/url=([^&]+)&/);
    if (directMatch) {
      const decoded = decodeURIComponent(directMatch[1]);
      c.rawHtml = c.rawHtml.replace(/srcset="[^"]*"/gi, '');
      c.rawHtml = c.rawHtml.replace(/src="\/_next\/image\?url=[^"]*"/gi, `src="${decoded}"`);
      fixed++;
    }
  });
});

console.log('Cleaned images for', fixed, 'cards');
fs.writeFileSync('data/the30FoundersClean.json', JSON.stringify(groups, null, 2));

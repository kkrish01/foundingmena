const fs = require('fs');

const enriched = JSON.parse(fs.readFileSync('scripts/enriched_shorts.json', 'utf8'));
const siteData = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));

siteData.shorts = enriched;
fs.writeFileSync('data/siteData.json', JSON.stringify(siteData, null, 2));
console.log('Updated data/siteData.json with 8 enriched shorts!');

const fs = require('fs');

const html = fs.readFileSync('scripts/all_startups_html.txt', 'utf8');

const cards = html.split('<a class="fm stp');
const startups = [];

cards.slice(1).forEach((card, i) => {
  const hrefMatch = card.match(/href="\/startups\/([^"]*)"/);
  const brandMatch = card.match(/style="--brand:([^"]*)"/);
  const groundBgMatch = card.match(/background-image:url\(([^)]*)\)/);
  const groundTintMatch = card.match(/--gtint:([^;]*);/);
  const markMatch = card.match(/class="markwrap"[\s\S]*?<img [^>]*src="([^"]*)"/);
  const crestMatch = card.match(/\/crest\/company-house-([0-9]+)\.svg/);
  const nameMatch = card.match(/<h3>([^<]*)<\/h3>/);
  const hookMatch = card.match(/<p class="line">([^<]*)<\/p>/);
  const statMatch = card.match(/<div class="stat"><b>([^<]*)<\/b><span>([^<]*)<\/span><\/div>/);
  const countryMatch = card.match(/class="chip cty" title="([^"]*)"/);
  const countryFlagMatch = card.match(/class="flg" src="([^"]*)"/);
  const sectorMatch = card.match(/class="chip sector" title="([^"]*)"/);
  const isFeatured = card.includes('FM featured');

  startups.push({
    id: hrefMatch ? hrefMatch[1] : `startup-${i+1}`,
    name: nameMatch ? nameMatch[1] : '',
    rank: crestMatch ? parseInt(crestMatch[1]) : i + 1,
    brandColor: brandMatch ? brandMatch[1] : '#6af990',
    groundBg: groundBgMatch ? groundBgMatch[1] : '',
    groundTint: groundTintMatch ? groundTintMatch[1] : (brandMatch ? brandMatch[1] : '#6af990'),
    markSvg: markMatch ? markMatch[1] : '',
    country: countryMatch ? countryMatch[1] : '',
    countryFlag: countryFlagMatch ? countryFlagMatch[1] : '',
    sector: sectorMatch ? sectorMatch[1] : '',
    hook: hookMatch ? hookMatch[1] : '',
    valuation: statMatch ? statMatch[1] : '',
    isFeatured: isFeatured
  });
});

console.log('Parsed count:', startups.length);
console.log('HALA markSvg:', startups[3].markSvg);
fs.writeFileSync('scripts/parsed_startups.json', JSON.stringify(startups, null, 2));

// Update siteData.json
const siteData = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));
siteData.startups = startups;
fs.writeFileSync('data/siteData.json', JSON.stringify(siteData, null, 2));
console.log('Successfully updated data/siteData.json with authentic 30 startups!');

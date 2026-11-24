const fs = require('fs');
const html = fs.readFileSync('the_30_main.html', 'utf8');

// Find all <a> inside .podium
const podiumStart = html.indexOf('<div class="podium">');
const podiumEnd = html.indexOf('</div><div class="fmfoot"', podiumStart);
const podiumHtml = html.slice(podiumStart, podiumEnd > 0 ? podiumEnd : undefined);

// Split by <a class="fm stp row
const items = podiumHtml.split(/<a class="fm stp row/g).slice(1);
console.log('Total items in podium:', items.length);

const parsed = items.map((itemStr, idx) => {
  const full = '<a class="fm stp row' + itemStr;
  const hrefMatch = full.match(/href="([^"]+)"/);
  const brandMatch = full.match(/--brand:([^;"]+)/);
  const gtintMatch = full.match(/--gtint:([^;"]+)/);
  const bgImgMatch = full.match(/background-image:url\(([^)]+)\)/);
  const logoMatch = full.match(/<img[^>]+src="([^"]+)"[^>]*style="[^"]*left:[^"]*top:[^"]*"/i) || full.match(/<div class="markwrap">[\s\S]*?<img[^>]+src="([^"]+)"/);
  const crestMatch = full.match(/src="(\/crest\/[^"]+)"/);
  const nameMatch = full.match(/<h3[^>]*>([^<]+)<\/h3>/);
  const descMatch = full.match(/<p class="desc"[^>]*>([\s\S]*?)<\/p>/);
  const chips = [...full.matchAll(/<span class="chip[^"]*"[^>]*>([\s\S]*?)<\/span>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const stats = [...full.matchAll(/<div><span>([^<]+)<\/span><b>([^<]+)<\/b><\/div>/g)].map(m => ({ label: m[1], value: m[2] }));

  return {
    rank: idx + 1,
    href: hrefMatch ? hrefMatch[1] : '',
    name: nameMatch ? nameMatch[1].trim() : '',
    desc: descMatch ? descMatch[1].trim() : '',
    brand: brandMatch ? brandMatch[1].trim() : '',
    gtint: gtintMatch ? gtintMatch[1].trim() : '',
    bgImg: bgImgMatch ? bgImgMatch[1].trim() : '',
    logo: logoMatch ? logoMatch[1] : '',
    crest: crestMatch ? crestMatch[1] : '',
    chips,
    stats,
    rawHtml: full.slice(0, full.indexOf('</a>') + 4)
  };
});

console.log('Parsed sample item 1:', JSON.stringify(parsed[0], null, 2));
console.log('Parsed sample item 2:', JSON.stringify(parsed[1], null, 2));
fs.writeFileSync('scripts/the_30_data.json', JSON.stringify(parsed, null, 2));
console.log('Saved to scripts/the_30_data.json');

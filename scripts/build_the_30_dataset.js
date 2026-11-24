const fs = require('fs');
const html = fs.readFileSync('the_30_main.html', 'utf8');

const podiumStart = html.indexOf('<div class="podium">');
const podiumEnd = html.indexOf('</div><div class="fmfoot"', podiumStart);
const podiumHtml = html.slice(podiumStart, podiumEnd > 0 ? podiumEnd : undefined);

const items = podiumHtml.split(/<a class="fm stp row/g).slice(1);

const startups = items.map((itemStr, idx) => {
  const full = '<a class="fm stp row' + itemStr;
  const isInkDark = full.includes('inkdark');
  const hrefMatch = full.match(/href="([^"]+)"/);
  const brandMatch = full.match(/--brand:([^;"]+)/);
  const gtintMatch = full.match(/--gtint:([^;"]+)/);
  const bgImgMatch = full.match(/background-image:url\(([^)]+)\)/);
  const crestMatch = full.match(/src="(\/crest\/[^"]+)"/);
  const isFeatured = full.includes('FM featured');
  
  // Country
  const ctyMatch = full.match(/<span class="chip cty"[^>]*title="([^"]+)"[^>]*style="([^"]+)"[^>]*>[\s\S]*?<img class="flg" src="([^"]+)"/);
  const country = ctyMatch ? ctyMatch[1] : '';
  const countryStyle = ctyMatch ? ctyMatch[2] : '';
  const countryFlag = ctyMatch ? ctyMatch[3] : '';

  // Sector
  const sectorMatch = full.match(/<span class="chip sector"[^>]*title="([^"]+)"[^>]*>[\s\S]*?<i class="sw"[^>]*style="background:([^;"]+)"/);
  const sector = sectorMatch ? sectorMatch[1] : '';
  const sectorGradient = sectorMatch ? sectorMatch[2] : '';

  // Logo / Mark
  const logoMatch = full.match(/<div class="markwrap">[\s\S]*?<img[^>]+src="([^"]+)"/);
  const logo = logoMatch ? logoMatch[1] : '';
  const markwrapMatch = full.match(/<div class="markwrap">([\s\S]*?)<\/div>/);
  const markwrapInner = markwrapMatch ? markwrapMatch[1].trim() : '';

  // Title / H3
  const h3Match = full.match(/<h3>([\s\S]*?)<\/h3>/);
  const h3Content = h3Match ? h3Match[1].trim() : '';
  const hasWordmark = h3Content.includes('<img');
  let name = '';
  if (hasWordmark) {
    const altMatch = h3Content.match(/alt="([^"]+)"/);
    name = altMatch ? altMatch[1] : '';
  } else {
    name = h3Content.replace(/<[^>]+>/g, '').trim();
  }

  // Description / Hook
  const lineMatch = full.match(/<p class="line">([\s\S]*?)<\/p>/);
  const hook = lineMatch ? lineMatch[1].trim() : '';

  // Stats
  const statValuationMatch = full.match(/<div><b>([^<]+)<\/b><span>Valuation<\/span><\/div>/);
  const statHeadcountMatch = full.match(/<div><b>([^<]+)<\/b><span>Headcount<\/span><\/div>/);
  const statGrowthMatch = full.match(/<div><b>([^<]+)<\/b><span>Growth<\/span><\/div>/);

  const slug = hrefMatch ? hrefMatch[1].replace('/startups/', '') : '';

  return {
    rank: idx + 1,
    id: slug,
    slug,
    name,
    href: hrefMatch ? hrefMatch[1] : '',
    isInkDark,
    brandColor: brandMatch ? brandMatch[1].trim() : '#F0702F',
    groundTint: gtintMatch ? gtintMatch[1].trim() : '#F0702F',
    groundBg: bgImgMatch ? bgImgMatch[1].trim() : '',
    crest: crestMatch ? crestMatch[1] : `/crest/company-house-${idx + 1}.svg`,
    logo,
    markwrapInner,
    isFeatured,
    country,
    countryStyle,
    countryFlag,
    sector,
    sectorGradient,
    hasWordmark,
    h3Content,
    hook,
    valuation: statValuationMatch ? statValuationMatch[1] : '',
    headcount: statHeadcountMatch ? statHeadcountMatch[1] : '',
    growth: statGrowthMatch ? statGrowthMatch[1] : ''
  };
});

console.log('Successfully parsed startups:', startups.length);
fs.writeFileSync('data/the30Data.json', JSON.stringify(startups, null, 2));
console.log('Saved to data/the30Data.json');

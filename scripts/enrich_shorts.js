const https = require('https');
const fs = require('fs');

const shorts = JSON.parse(fs.readFileSync('scripts/live_shorts.json', 'utf8'));

// Order matching Image 1:
const order = [
  'kitopi-mohamad-ballout',
  'huda-beauty-huda-kattan',
  'tabby-hosam-arab',
  'anghami-elie-habib',
  'getir-nazim-salur',
  'yassir-noureddine-tayebi',
  'trendyol-demet-mutlu',
  'instadeep-karim-beguir'
];

function fetchPage(href) {
  return new Promise((resolve) => {
    https.get(`https://foundingmena.com${href}`, (res) => {
      let html = '';
      res.on('data', c => html += c);
      res.on('end', () => resolve(html));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const enriched = [];
  for (const s of shorts) {
    const match = s.preview?.match(/b-cdn\.net\/([^\/]+)\//);
    const bunnyId = match ? match[1] : null;
    const videoUrl = bunnyId ? `https://vz-6e09e4d4-87b.b-cdn.net/${bunnyId}/play_480p.mp4` : null;

    console.log(`Fetching ${s.href}...`);
    const html = await fetchPage(s.href);
    
    // Extract description from meta or paragraph
    let desc = '';
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i) 
      || html.match(/<div class="cap[^"]*"[^>]*><p><span>([\s\S]*?)<\/span><\/p><\/div>/);
    if (descMatch) {
      desc = descMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&');
    }

    // Extract with
    let withPerson = '';
    const withMatch = html.match(/<div class="with">With <span><a[^>]*>([^<]+)<\/a><\/span><\/div>/);
    if (withMatch) {
      withPerson = withMatch[1];
    } else {
      withPerson = s.title.split(':')[1]?.trim() || '';
    }

    // Extract overlay hook/quote if present
    const item = {
      id: s.id,
      slug: s.href.replace('/shorts/', ''),
      href: s.href,
      title: s.title,
      company: s.title.split(':')[0]?.trim() || '',
      person: withPerson || s.title.split(':')[1]?.trim() || '',
      description: desc || `${s.title} on Founding MENA. Watch the full story.`,
      image: s.image,
      preview: s.preview,
      videoUrl: videoUrl,
      dur: s.dur,
      country: s.country,
      countryFlag: s.countryFlag,
      countryColour: s.countryColour,
      sector: s.sector,
      tag: s.tag || 'Short'
    };
    enriched.push(item);
  }

  // Sort by defined order
  enriched.sort((a, b) => {
    let ia = order.indexOf(a.slug);
    let ib = order.indexOf(b.slug);
    if (ia === -1) ia = 99;
    if (ib === -1) ib = 99;
    return ia - ib;
  });

  fs.writeFileSync('scripts/enriched_shorts.json', JSON.stringify(enriched, null, 2));
  console.log('Saved enriched shorts!');
}

run();

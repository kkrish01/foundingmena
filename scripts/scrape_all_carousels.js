const https = require('https');
const fs = require('fs');

const carouselsToFetch = [
  { slug: 'weekly-roundup-sept-21-25', url: 'https://foundingmena.com/read/weekly-roundup-sept-21-25' },
  { slug: 'mckinsey-mafia', url: 'https://foundingmena.com/read/mckinsey-mafia' },
  { slug: 'top-women-founders', url: 'https://foundingmena.com/read/top-women-founders' },
  { slug: 'qatar-university', url: 'https://foundingmena.com/read/qatar-university-carousel' },
  { slug: 'careem', url: 'https://foundingmena.com/read/careem-carousel' }
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function run() {
  const results = {};

  for (const item of carouselsToFetch) {
    console.log(`Fetching ${item.slug}...`);
    const html = await fetchHtml(item.url);
    
    // Find all slide images for this carousel
    const matches = [...html.matchAll(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/storage\/v1\/object\/public\/media\/visuals\/[^"'\s&\\]+\.(?:png|jpg|webp)/g)].map(m => m[0]);
    // Filter to those belonging to this slug or folder
    const uniqueSlides = [...new Set(matches)].sort();
    
    // Extract title, description, date, tags
    let title = '';
    const titleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) || html.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (titleMatch) title = titleMatch[1].replace(' · Founding MENA', '').trim();

    let desc = '';
    const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
    if (descMatch) desc = descMatch[1].replace(/&#x27;/g, "'").replace(/&amp;/g, '&').trim();

    // Extract tags
    const tagMatches = [...html.matchAll(/<a[^>]*class="[^"]*tag[^"]*"[^>]*>[\s\S]*?<span>([^<]+)<\/span>/g)].map(m => m[1]);

    results[item.slug] = {
      slug: item.slug,
      title: title || item.slug,
      description: desc,
      slides: uniqueSlides,
      slideCount: uniqueSlides.length,
      tags: [...new Set(tagMatches)]
    };

    console.log(`- ${item.slug}: ${uniqueSlides.length} slides found`);
  }

  fs.writeFileSync('scripts/live_carousels_data.json', JSON.stringify(results, null, 2));
  console.log('Saved to scripts/live_carousels_data.json');
}

run();

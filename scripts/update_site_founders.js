const fs = require('fs');

const liveFounders = JSON.parse(fs.readFileSync('scripts/live_founders.json', 'utf8'));
const siteData = JSON.parse(fs.readFileSync('data/siteData.json', 'utf8'));

console.log(`Original founders count in siteData: ${siteData.founders?.length}`);
console.log(`Live founders count: ${liveFounders.length}`);

// Map live founders to siteData format preserving all extra fields for modal tray!
siteData.founders = liveFounders.map((f, idx) => ({
  id: f.slug || f.id || `founder-${idx + 1}`,
  name: f.name,
  slug: f.slug,
  brandColor: f.tint || '#A8401A',
  groundBg: f.groundKey ? `https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/grounds/grey_${f.groundKey}.jpg` : 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/grounds/grey_g47.jpg',
  groundTint: '#A8401A',
  cutoutImg: f.cutout,
  portrait: f.portrait,
  role: f.role,
  company: f.company,
  companySlug: f.companySlug,
  companyLetter: f.companyMark?.letter || (f.company ? f.company[0] : 'F'),
  companyTint: f.companyMark?.tint || f.tint || '#7D3C98',
  companyMarkSvg: f.companyMark?.svg || null,
  country: f.country,
  countryFlag: f.countryFlag,
  countryColour: f.countryColour,
  sector: f.sector,
  hook: f.bio || f.hook || '',
  bio: f.bio || '',
  body: f.body || [],
  university: f.university || null,
  educations: f.educations || [],
  career: f.career || [],
  careerRows: f.careerRows || [],
  honours: f.honours || [],
  links: f.links || [],
  tags: f.tags || []
}));

fs.writeFileSync('data/siteData.json', JSON.stringify(siteData, null, 2));
console.log('Successfully updated data/siteData.json with 30 authentic founders!');

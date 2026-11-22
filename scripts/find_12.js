const fs = require('fs');
const files = [
  'components/StartupsRail.tsx',
  'components/FoundersRail.tsx',
  'components/HeroCarousel.tsx',
  'components/CountriesSectors.tsx',
  'components/ShortsRail.tsx',
  'components/CarouselsRail.tsx',
  'components/ArticlesGrid.tsx',
  'components/DealsDataSection.tsx',
  'components/NewsletterBanner.tsx',
  'components/Sidebar.tsx',
  'components/Appbar.tsx'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('>12<') || line.includes('"12"') || line.includes("'12'")) {
      console.log(f, idx + 1, line.trim());
    }
  });
});

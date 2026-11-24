const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scripts/live_carousels_data.json', 'utf8'));

const folderMap = {
  'weekly-roundup-sept-21-25': 'weekly-roundup-sept-21-25',
  'mckinsey-mafia': 'mckinsey-mafia',
  'top-women-founders': 'top-women-founders',
  'qatar-university': 'qatar-university-carousel',
  'careem': 'careem-carousel'
};

const dateMap = {
  'weekly-roundup-sept-21-25': '28 SEP 2026',
  'mckinsey-mafia': '25 SEP 2026',
  'top-women-founders': '24 SEP 2026',
  'qatar-university': '22 SEP 2026',
  'careem': '20 SEP 2026'
};

const cleaned = {};

for (const key of Object.keys(data)) {
  const item = data[key];
  const folder = folderMap[key];
  const itemSlides = item.slides.filter(s => s.includes(`/${folder}/`)).sort();
  cleaned[key] = {
    ...item,
    folder,
    date: dateMap[key] || 'SEP 2026',
    slides: itemSlides,
    slideCount: itemSlides.length
  };
  console.log(`${key}: ${itemSlides.length} exact slides`);
  console.log(itemSlides);
}

fs.writeFileSync('scripts/cleaned_carousels.json', JSON.stringify(cleaned, null, 2));

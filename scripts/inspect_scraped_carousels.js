const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/live_carousels_data.json', 'utf8'));

for (const key of Object.keys(data)) {
  const item = data[key];
  console.log(`=== ${key} ===`);
  console.log('Title:', item.title);
  console.log('Desc:', item.description);
  console.log('Tags:', item.tags);
  console.log('Slides count:', item.slides.length);
  console.log('First 3 slides:', item.slides.slice(0, 3));
}

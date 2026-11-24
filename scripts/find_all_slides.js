const fs = require('fs');
const html = fs.readFileSync('scripts/weekly_roundup_page.html', 'utf8');

// Find all image URLs with "visuals" in html
const images = [...html.matchAll(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/storage\/v1\/object\/public\/media\/visuals\/[^"'\s&]+/g)].map(m => m[0]);
console.log('All visuals images in HTML:', [...new Set(images)]);

// Let's also check all .webp or .png images in HTML
const allImgs = [...html.matchAll(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/storage\/v1\/object\/public\/[^"'\s&]+\.(?:webp|png|jpg|jpeg)/g)].map(m => m[0]);
console.log('Sample images:', [...new Set(allImgs)].slice(0, 20));

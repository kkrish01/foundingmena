const fs = require('fs');
const s17 = fs.readFileSync('scripts/carousel_script_17.txt', 'utf8');

// Find all image URLs or slide objects
const imageMatches = [...s17.matchAll(/https:\/\/qcmmrdyvzrooardtmwmx\.supabase\.co\/storage\/v1\/object\/public\/media\/visuals\/[^"'\s]+/g)].map(m => m[0]);
console.log('Slide images found in s17:', [...new Set(imageMatches)]);

// Check for description snippet
const descIdx = s17.indexOf('Paymob');
if (descIdx !== -1) {
  console.log('Snippet around Paymob:');
  console.log(s17.slice(Math.max(0, descIdx - 200), descIdx + 800));
}

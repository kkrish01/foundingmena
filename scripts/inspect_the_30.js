const fs = require('fs');
const html = fs.readFileSync('the_30.html', 'utf8');

const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
if (mainMatch) {
  console.log('Main found, length:', mainMatch[0].length);
  fs.writeFileSync('the_30_main.html', mainMatch[0]);
}

// Find CSS links or style tags
const links = [...html.matchAll(/<link rel="stylesheet"[^>]+href="([^"]+)"/g)].map(m => m[1]);
console.log('CSS links:', links);

// Let's inspect class names and main headers
const headerSection = html.match(/<section[^>]*class="[^"]*the-30[^"]*"[^>]*>[\s\S]*?<\/section>/i) ||
                     html.match(/<div[^>]*class="[^"]*the-30[^"]*"[^>]*>[\s\S]*?<\/div>/i);

console.log('Header section found:', !!headerSection);

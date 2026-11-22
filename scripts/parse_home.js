const fs = require('fs');
const html = fs.readFileSync('scripts/live_home.html', 'utf8');

// Find all script tags
const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
console.log('Script sources:', scripts);

// Check for JSON or window.__
const jsonMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
jsonMatches.forEach((m, i) => {
  if (m[1].includes('Wafa') || m[1].includes('Sophie') || m[1].includes('founders')) {
    console.log(`Script ${i} matches founder keywords! Length:`, m[1].length);
    fs.writeFileSync(`scripts/match_${i}.js`, m[1]);
  }
});

// Check if there are Supabase queries or API calls in the chunks
console.log('Checking for strings: Wafa, Sophie, Rowan...');
console.log('Wafa index:', html.indexOf('Wafa'));
console.log('Sophie index:', html.indexOf('Sophie'));

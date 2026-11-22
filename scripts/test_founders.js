const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

const regex = /"founders":\s*(\[[\s\S]*?\])(?=,\s*"(?:shorts|carousels|articles|deals|site|page)")/i;
const match = content.match(regex);
if (match) {
  try {
    const parsed = JSON.parse(match[1]);
    console.log('Regex found founders! Count:', parsed.length);
    fs.writeFileSync('scripts/live_founders.json', JSON.stringify(parsed, null, 2));
  } catch (e) {
    console.log('JSON parse error:', e.message);
  }
} else {
  // Try searching for "founders":
  const idx = content.indexOf('"founders":');
  console.log('indexOf "founders":', idx);
  if (idx !== -1) {
    console.log('Snippet:', content.slice(idx, idx + 200));
  }
}

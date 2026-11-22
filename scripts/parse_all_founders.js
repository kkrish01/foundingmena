const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

// Find the JSON object where "founders": [ exists
const fIdx = content.indexOf('\"founders\":[');
if (fIdx !== -1) {
  // Let's parse out the founders array
  let depth = 0;
  let start = fIdx + '\"founders\":'.length;
  let end = -1;
  for (let i = start; i < content.length; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end !== -1) {
    const foundersJson = content.slice(start, end);
    const parsed = JSON.parse(foundersJson);
    console.log('Successfully parsed founders! Total count:', parsed.length);
    fs.writeFileSync('scripts/live_founders.json', JSON.stringify(parsed, null, 2));
    console.log('Saved to scripts/live_founders.json');
  }
}

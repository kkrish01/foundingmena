const fs = require('fs');
let content = fs.readFileSync('scripts/match_19.js', 'utf8');

const target = '\\"founders\\":[';
let pos = 0;
while (true) {
  let idx = content.indexOf(target, pos);
  if (idx === -1) break;
  console.log('Found occurrence at index:', idx);
  // Check if Wafa is in the next 10000 chars
  if (content.slice(idx, idx + 10000).includes('Wafa')) {
    console.log('*** FOUND WAFA AT OCCURRENCE:', idx);
    let slice = content.slice(idx, idx + 50000);
    // Find where this array ends
    // In this string, quotes are escaped like \"
    let arrayStart = idx + target.length - 1;
    // Let's find the closing ] that corresponds
    let depth = 0;
    let end = -1;
    for (let i = arrayStart; i < content.length; i++) {
      if (content[i] === '[') depth++;
      else if (content[i] === ']') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    let raw = content.slice(arrayStart, end);
    let simpleUnescape = raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    try {
      let founders = JSON.parse(simpleUnescape);
      console.log('Parsed founders successfully! Total:', founders.length);
      fs.writeFileSync('scripts/live_founders.json', JSON.stringify(founders, null, 2));
      // Print first 4 founders
      founders.slice(0, 5).forEach((f, i) => {
        console.log(`${i + 1}. ${f.name} (${f.company}) - cutout: ${f.cutout} - portrait: ${f.portrait}`);
      });
    } catch (e) {
      console.log('Parse error:', e.message);
      fs.writeFileSync('scripts/failed_raw.txt', simpleUnescape);
    }
  }
  pos = idx + target.length;
}

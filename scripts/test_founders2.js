const fs = require('fs');
let content = fs.readFileSync('scripts/match_19.js', 'utf8');

// Find the target
const target = '\\"founders\\":[';
const idx = content.indexOf(target);
console.log('Index of target:', idx);

if (idx !== -1) {
  let start = idx + target.length - 1; // pointing to '['
  let depth = 0;
  let end = -1;
  let inString = false;
  let escape = false;

  for (let i = start; i < content.length; i++) {
    const c = content[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (c === '\\') {
      escape = true;
      continue;
    }
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (c === '[') depth++;
      else if (c === ']') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  console.log('End:', end);
  if (end !== -1) {
    let raw = content.slice(start, end);
    // Unescape \" to " and \\ to \
    // In the script, it's a JSON string inside a JS string
    try {
      // If raw is JSON-escaped, let's parse it as a JSON string first
      let unescaped = JSON.parse('"' + raw + '"');
      let founders = JSON.parse(unescaped);
      console.log('Parsed successfully! Count:', founders.length);
      fs.writeFileSync('scripts/live_founders.json', JSON.stringify(founders, null, 2));
    } catch (e) {
      // Or replace \" with "
      let simpleUnescape = raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      let founders = JSON.parse(simpleUnescape);
      console.log('Parsed with simple unescape! Count:', founders.length);
      fs.writeFileSync('scripts/live_founders.json', JSON.stringify(founders, null, 2));
    }
  }
}

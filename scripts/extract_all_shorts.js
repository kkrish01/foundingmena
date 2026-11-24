const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

// Find the section for shorts cards
const target = '\"title\":\"Shorts\"';
const idx = content.indexOf(target);
console.log('Shorts title index:', idx);

if (idx !== -1) {
  // Let's find "cards":[ around here
  const cardsIdx = content.indexOf('\"cards\":[', idx);
  console.log('cards index:', cardsIdx);
  if (cardsIdx !== -1) {
    let start = cardsIdx + '\"cards\":'.length;
    let depth = 0;
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
    const raw = content.slice(start, end);
    const unescaped = raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    try {
      const parsed = JSON.parse(unescaped);
      console.log('Parsed shorts count:', parsed.length);
      fs.writeFileSync('scripts/live_shorts.json', JSON.stringify(parsed, null, 2));
      parsed.forEach((s, i) => {
        console.log(`${i+1}. ${s.title} | ${s.dur} | img: ${s.image} | preview: ${s.preview}`);
      });
    } catch (e) {
      console.error('Parse error:', e.message);
    }
  }
}

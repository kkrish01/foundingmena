const fs = require('fs');
const content = fs.readFileSync('scripts/match_19.js', 'utf8');

const target = 'Kitopi: Mohamad Ballout';
const idx = content.indexOf(target);

if (idx !== -1) {
  // Search backward for cards: [
  const backSlice = content.slice(Math.max(0, idx - 30000), idx);
  // Find the last occurrence of cards":[
  const lastCards = backSlice.lastIndexOf('cards\\":[');
  console.log('lastCards in backSlice:', lastCards);
  if (lastCards !== -1) {
    const globalCardsStart = (idx - 30000) + lastCards + 'cards\\":'.length;
    let depth = 0;
    let end = -1;
    for (let i = globalCardsStart; i < content.length; i++) {
      if (content[i] === '[') depth++;
      else if (content[i] === ']') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    const raw = content.slice(globalCardsStart, end);
    const unescaped = raw.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    try {
      const parsed = JSON.parse(unescaped);
      console.log('Parsed shorts count:', parsed.length);
      fs.writeFileSync('scripts/live_shorts.json', JSON.stringify(parsed, null, 2));
      parsed.forEach((s, i) => {
        console.log(`${i+1}. ${s.title} | ${s.dur} | ${s.href}`);
      });
    } catch (e) {
      console.error('Parse error:', e.message);
    }
  }
}

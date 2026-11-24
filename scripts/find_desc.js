const fs = require('fs');
const s20 = fs.readFileSync('scripts/huda_script_20.txt', 'utf8');

const descIdx = s20.indexOf('Sephora Dubai');
console.log('descIdx:', descIdx);
if (descIdx !== -1) {
  console.log(s20.slice(Math.max(0, descIdx - 300), descIdx + 800));
} else {
  console.log('Sephora Dubai not found directly, let us search for "lashes"');
  const lashesIdx = s20.indexOf('lashes');
  console.log('lashesIdx:', lashesIdx);
  if (lashesIdx !== -1) {
    console.log(s20.slice(Math.max(0, lashesIdx - 300), lashesIdx + 800));
  }
}

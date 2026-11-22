const fs = require('fs');
const html = fs.readFileSync('scripts/wafa_page.html', 'utf8');

// Find script tags in wafa_page.html
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
console.log('Script count:', scripts.length);
scripts.forEach((s, i) => {
  if (s[1].includes('Wafa') || s[1].includes('PLAYBOOK')) {
    console.log(`Script ${i} length:`, s[1].length);
    fs.writeFileSync(`scripts/wafa_script_${i}.js`, s[1]);
  }
});
